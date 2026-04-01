const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models');
const path = require('path');
const fs = require('fs');

// Функция для начального заполнения категорий
async function seedCategories() {
  const categoryNames = ['Прочее', 'Завтраки', 'Супы', 'Десерты', 'Горячее', 'Закуски', 'Напитки'];
  for (const title of categoryNames) {
    await db.category.findOrCreate({ where: { title } });
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

    // Поддержка загрузки файлов
    const uploadDir = path.resolve(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    // Раздача статических файлов по /uploads
    app.use('/uploads', express.static(uploadDir));

    // Подключение маршрутов (включая новые /api/upload/images)
    app.use('/', require('./routes/images'));

    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server initialized on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Error starting server:', err);
  }
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Старые роуты
app.use('/', require('./routes/recipes'));
app.use('/', require('./routes/user'));

startServer();