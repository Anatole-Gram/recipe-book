const express = require('express');
const router = express.Router();
const db = require('../models'); 

const { Op } = db.Sequelize; // операции Sequelize

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
  // если пришёл объект
  if (input && (input.summary || input.ingredients || input.steps)) {
    return {
      summary: input.summary || {},
      ingredients: Array.isArray(input.ingredients) ? input.ingredients : (input.ingredients ? [input.ingredients] : []),
      steps: Array.isArray(input.steps) ? input.steps : (input.steps ? [input.steps] : [])
    };
  }
  return { summary: {}, ingredients: [], steps: [] };
}

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

    // создать рецепт с categoryId
    const recipe = await db.recipe.create({
      title: summary.title,
      description: summary.description,
      img: summary.img,
      categoryId: summary.categoryId
    }, { transaction: t });

    // .ingredients
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

    // .steps
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

router.get('/recipes', async (req, res) => {
  try {
    // новые query-параметры
    const { search, categories } = req.query;

    // формируем условия WHERE для модели Recipe
    const where = {};

    // Фильтр по имени (title)
    if (search) {
      where.title = { [Op.like]: `%${search.trim().split(/\s+/)}%` };
    }

    // Фильтр по категориям (categoryId)
    if (categories) {
      const ids = Array.isArray(categories)
        ? categories.map(Number)
        : String(categories).split(',').map(v => Number(v));

      const cleaned = ids.filter(n => !Number.isNaN(n));
      if (cleaned.length) {
        where.categoryId = { [Op.in]: cleaned };
      }
    }

    // сам запрос
    const recipes = await db.recipe.findAll({
      where,
      include: [
        { model: db.recipeIngredient, as: 'ingredients' },
        { model: db.recipeStep, as: 'steps' },
        { model: db.category, as: 'category', attributes: ['id', 'title'] } // исправлено: 'category'
      ],
      order: [
        ['id', 'ASC']
      ]
    });

    const out = recipes.map(r => {
      const category = r.category;

      return {
        id: r.id,
        title: r.title,
        description: r.description,
        img: r.img,
        categoryId: r.categoryId,
        category: category ? { id: category.id, title: category.title } : null,
        ingredients: r.ingredients || r.recipeIngredients || [],
        steps: r.steps || r.recipeSteps || [],
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

router.get('/recipes/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const recipe = await db.recipe.findByPk(id, {
      include: [
        { model: db.recipeIngredient, as: 'ingredients' }, 
        { model: db.recipeStep, as: 'steps' },               
        { model: db.category, as: 'category', attributes: ['id','title'] } 
      ]
    });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // определить категорию
    const category = recipe.categories || recipe.category;

    const result = {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      img: recipe.img,
      categoryId: recipe.categoryId,
      category: category ? { id: category.id, title: category.title } : null,
      ingredients: recipe.ingredients || recipe.recipeIngredients || [],
      steps: recipe.steps || recipe.recipeSteps || [],
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt
    };

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


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