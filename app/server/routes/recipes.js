const express = require('express');
const router = express.Router();
const db = require('../models'); 

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

    // создать рецепт
    const recipe = await db.recipe.create({
      title: summary.title,
      description: summary.description,
      img: summary.img
    }, { transaction: t });

    //.ingredients
    const ingRows = (ingredients || []).map(i => {
      const { title, count, unit, ...rest } = i;
      return {
        title,
        count: amount,
        unit,
        recipeId: recipe.id,
        extras: rest && Object.keys(rest).length ? rest : null
      };
    });

    if (ingRows.length) {
      await db.recipeIngredient.bulkCreate(ingRows, { transaction: t });
    }

    //.steps
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
    const recipes = await db.recipe.findAll({
      include: [
        { model: db.recipeIngredient }, // ингредиенты
        { model: db.recipeStep }        // шаги
      ],
      order: [
        [ db.recipe, 'id', 'ASC' ], // опционально — порядок рецептов
        [ db.recipeStep, 'id', 'ASC' ],
        [ db.recipeIngredient, 'id', 'ASC' ]
      ]
    });

    // По желанию: привести к удобному JSON (заменить recipeSteps -> steps и т.д.)
    const out = recipes.map(r => ({
      id: r.id,
      title: r.title,
      description: r.description,
      img: r.img,
      ingredients: r.recipeIngredients || r.ingredients || [],
      steps: r.recipeSteps || r.steps || [],
      createdAt: r.createdAt,
      updatedAt: r.updatedAt
    }));

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
        { model: db.recipeIngredient }, // ингредиенты
        { model: db.recipeStep }        // шаги
      ]
      // можно добавить order если хотите:
      // order: [[ db.recipeStep, 'id', 'ASC' ], [ db.recipeIngredient, 'id', 'ASC' ]]
    });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Опционально: отсортировать шаги/ингредиенты по id на стороне сервера
    if (recipe.recipeSteps && Array.isArray(recipe.recipeSteps)) {
      recipe.recipeSteps.sort((a, b) => a.id - b.id);
    }
    if (recipe.recipeIngredients && Array.isArray(recipe.recipeIngredients)) {
      recipe.recipeIngredients.sort((a, b) => a.id - b.id);
    }

    res.json(recipe); // вернёт объект рецепта + вложенные массивы
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;