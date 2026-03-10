const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models');

// Функция для начального заполнения категорий
async function seedCategories() {
  const categoryNames = ['Завтраки', 'Супы', 'Десерты', 'Горячее', 'Закуски', 'Напитки'];
  for (const name of categoryNames) {
    await db.category.findOrCreate({ where: { name } });
  }
  console.log('Seeded initial recipe categories');
}
async function startServer() {
  try {
    await db.sequelize.sync({ force: true });
    console.log('#SEQUELIZE: Drop and re-synced db.');

    await db.sequelize.sync();
    const count = await db.category.count();
    if (count === 0) {
      await seedCategories();
    } else {
      console.log('Categories already seeded or not empty.');
    }



    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server initialized on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Error starting server:', err);
  }
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./routes/recipes'));

startServer();