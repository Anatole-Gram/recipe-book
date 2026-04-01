// routes/images.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Путь к папке загрузок (за пределами routes)
const uploadDir = path.resolve(__dirname, '../uploads');

// Убедимся, что папка существует
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Фильтр MIME-типов изображений (опционально)
const imageMimeTypes = /image\/jpeg|image\/png|image\/gif|image\/webp|image\/svg\+xml/;
const imageFilter = (req, file, cb) => {
  if (imageMimeTypes.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

// Хранилище Multer: сохраняем на диск
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '';
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, base + '-' + unique + ext);
  }
});

const upload = multer({ storage, fileFilter: imageFilter });

// POST /api/upload/images
// Формат отправки: FormData, поле 'files' (множественный выбор)
router.post('/upload/images', upload.array('files', 100), (req, res) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const results = files.map((f) => {
    const url = `${req.protocol}://${req.get('host')}/uploads/${f.filename}`;
    const name = f.originalname;
    return [name, url];
  });

  res.json(results);
});

module.exports = router;