const express = require('express');
const router = express.Router();
const db = require('../models');
// const bcrypt = require('bcrypt');

// GET /users - получение списка всех пользователей
router.get('/users', async (req, res) => {
  try {
    const users = await db.user.findAll({
      attributes: ['id', 'name', 'img', 'createdAt', 'updatedAt'],
      include: [{
        model: db.auth,
        as: 'auth',
        attributes: ['id', 'log', 'userId']
      }],
      order: [['id', 'ASC']]
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// GET /users/:id - получение информации о конкретном пользователе
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.user.findByPk(id, {
      attributes: ['id', 'name', 'img', 'createdAt', 'updatedAt'],
      include: [{
        model: db.auth,
        as: 'auth',
        attributes: ['id', 'log', 'userId']
      }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Получаем ID рецептов пользователя
    const userRecipes = await db.recipe.findAll({
      where: { authorId: id },
      attributes: ['id'],
      order: [['id', 'ASC']]
    });

    const recipeIds = userRecipes.map(r => r.id);

    res.json({
      id: user.id,
      name: user.name,
      img: user.img,
      auth: user.auth,
      recipeIds: recipeIds,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// POST /users - добавление нового пользователя с логином и паролем
router.post('/users', async (req, res) => {
  const t = await db.sequelize.transaction();
  
  try {
    const { name, img, log, pas } = req.body;

    if (!name) {
      await t.rollback();
      return res.status(400).json({ error: 'name is required' });
    }

    if (!log || !pas) {
      await t.rollback();
      return res.status(400).json({ error: 'log and pas are required' });
    }

    const existingAuth = await db.auth.findOne({ 
      where: { log: log.trim() },
      transaction: t 
    });
    
    if (existingAuth) {
      await t.rollback();
      return res.status(400).json({ error: 'Login already exists' });
    }

    const newUser = await db.user.create({
      name: name.trim(),
      img: img || null
    }, { transaction: t });

    // const hashedPassword = await bcrypt.hash(pas, 10);
    const hashedPassword = pas;

    await db.auth.create({
      userId: newUser.id,
      log: log.trim(),
      pas: hashedPassword
    }, { transaction: t });

    await t.commit();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        img: newUser.img,
        log: log.trim()
      }
    });
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(400).json({ error: err.message || 'Bad request' });
  }
});

// POST /users/login - авторизация пользователя
router.post('/users/login', async (req, res) => {
  try {
    const { log, pas } = req.body;

    if (!log || !pas) {
      return res.status(400).json({ error: 'log and pas are required' });
    }

    const authRecord = await db.auth.findOne({
      where: { log: log.trim() }
    });

    if (!authRecord) {
      return res.status(401).json({ error: 'Invalid login or password' });
    }

    // const isPasswordValid = await bcrypt.compare(pas, authRecord.pas);
    const isPasswordValid = pas === authRecord.pas;

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid login or password' });
    }

    const user = await db.user.findByPk(authRecord.userId);

    // Получаем ID рецептов пользователя
    const userRecipes = await db.recipe.findAll({
      where: { authorId: authRecord.userId },
      attributes: ['id'],
      order: [['id', 'ASC']]
    });

    const recipeIds = userRecipes.map(r => r.id);

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        img: user.img
      },
      recipeIds: recipeIds
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;