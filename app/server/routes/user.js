const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /users - получение списка всех пользователей
router.get('/users', async (req, res) => {
  try {
    const users = await db.user.findAll({
      attributes: ['id', 'name', 'secondName', 'createdAt', 'updatedAt'],
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
      attributes: ['id', 'name', 'secondName', 'createdAt', 'updatedAt']
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// POST /users - добавление нового пользователя
router.post('/users', async (req, res) => {
  try {
    const { name, secondName } = req.body;

    // Валидация обязательных полей
    if (!name || !secondName) {
      return res.status(400).json({ 
        error: 'name and secondName are required' 
      });
    }

    const newUser = await db.user.create({
      name: name.trim(),
      secondName: secondName.trim()
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        secondName: newUser.secondName,
        createdAt: newUser.createdAt
      }
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || 'Bad request' });
  }
});

module.exports = router;