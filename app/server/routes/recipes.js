const express = require('express');
const router = express.Router();
const db = require('../models');

const { Op } = db.Sequelize;

// Вспомогательная функция нормализации входа
function normalizeInput(input) {
  if (Array.isArray(input) && input.length === 3) {
    const [summary, ingredients, steps] = input;
    return {
      summary: summary || {},
      ingredients: Array.isArray(ingredients) ? ingredients : (ingredients ? [ingredients] : []),
      steps: Array.isArray(steps) ? steps : (steps ? [steps] : [])
    };
  }
  if (input && (input.summary || input.ingredients || input.steps)) {
    return {
      summary: input.summary || {},
      ingredients: Array.isArray(input.ingredients) ? input.ingredients : (input.ingredients ? [input.ingredients] : []),
      steps: Array.isArray(input.steps) ? input.steps : (input.steps ? [input.steps] : [])
    };
  }
  return { summary: {}, ingredients: [], steps: [] };
}

// POST /recipes - создание рецепта
router.post('/recipes', async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const data = normalizeInput(req.body);
    const { summary, ingredients, steps } = data;

    // Обязателен categoryId
    if (!summary || !summary.categoryId) {
      return res.status(400).json({ error: 'categoryId is required' });
    }

    // Проверка существования категории
    const category = await db.category.findByPk(summary.categoryId);
    if (!category) {
      return res.status(400).json({ error: 'Category not found' });
    }

    // Создаём рецепт с categoryId и authorId
    const recipe = await db.recipe.create({
      title: summary.title,
      description: summary.description,
      img: summary.img,
      categoryId: summary.categoryId,
      authorId: summary.authorId || null
    }, { transaction: t });

    // Ингредиенты
    const ingRows = (ingredients || []).map(i => {
      const { title, count, unit, ...rest } = i;
      return {
        title,
        count,
        unit,
        recipeId: recipe.id,
        extras: rest && Object.keys(rest).length ? rest : null
      };
    });

    if (ingRows.length) {
      await db.recipeIngredient.bulkCreate(ingRows, { transaction: t });
    }

    // Шаги
    const stepRows = (steps || []).map(s => {
      const { description, img, ...rest } = s;
      return {
        description,
        img,
        recipeId: recipe.id,
        extras: rest && Object.keys(rest).length ? rest : null
      };
    });

    if (stepRows.length) {
      await db.recipeStep.bulkCreate(stepRows, { transaction: t });
    }

    await t.commit();
    res.status(201).json({ recipeId: recipe.id });
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(400).json({ error: err.message || 'Bad request' });
  }
});

// GET /recipes - получение списка рецептов с фильтрацией
router.get('/recipes', async (req, res) => {
  try {
    const { search, categories, authorId } = req.query;

    const where = {};

    // Фильтр по имени (title)
    if (search) {
      where.title = { [Op.like]: `%${search.trim()}%` };
    }

    // Фильтр по категориям
    if (categories) {
      const ids = Array.isArray(categories)
        ? categories.map(Number)
        : String(categories).split(',').map(v => Number(v));

      const cleaned = ids.filter(n => !Number.isNaN(n));
      if (cleaned.length) {
        where.categoryId = { [Op.in]: cleaned };
      }
    }

    // Фильтр по автору
    if (authorId) {
      const aid = Number(authorId);
      if (!Number.isNaN(aid)) {
        where.authorId = aid;
      }
    }

    // Запрос
    const recipes = await db.recipe.findAll({
      where,
      include: [
        { model: db.recipeIngredient, as: 'ingredients' },
        { model: db.recipeStep, as: 'steps' },
        { model: db.category, as: 'category', attributes: ['id', 'title'] },
        { model: db.user, as: 'author', attributes: ['id', 'name', 'img'] }
      ],
      order: [['id', 'ASC']]
    });

    const out = recipes.map(r => {
      return {
        id: r.id,
        title: r.title,
        description: r.description,
        img: r.img,
        categoryId: r.categoryId,
        category: r.category ? { id: r.category.id, title: r.category.title } : null,
        authorId: r.authorId,
        author: r.author ? { id: r.author.id, name: r.author.name, img: r.author.img } : null,
        ingredients: r.ingredients || [],
        steps: r.steps || [],
        createdAt: r.createdAt,
        updatedAt: r.updatedAt
      };
    });

    res.json(out);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// GET /recipes/:id - получение конкретного рецепта
router.get('/recipes/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const recipe = await db.recipe.findByPk(id, {
      include: [
        { model: db.recipeIngredient, as: 'ingredients' },
        { model: db.recipeStep, as: 'steps' },
        { model: db.category, as: 'category', attributes: ['id', 'title'] },
        { model: db.user, as: 'author', attributes: ['id', 'name', 'img'] }
      ]
    });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const result = {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      img: recipe.img,
      categoryId: recipe.categoryId,
      category: recipe.category ? { id: recipe.category.id, title: recipe.category.title } : null,
      authorId: recipe.authorId,
      author: recipe.author ? { id: recipe.author.id, name: recipe.author.name, img: recipe.author.img } : null,
      ingredients: recipe.ingredients || [],
      steps: recipe.steps || [],
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt
    };

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// GET /categories - получение списка категорий
router.get('/categories', async (req, res) => {
  try {
    const categories = await db.category.findAll({
      attributes: ['id', 'title'],
      order: [['id', 'ASC']]
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;