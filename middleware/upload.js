const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bucket = require('../config/firebaseConfig'); // Certifique-se de importar a configuração do Firebase

// Configuração do armazenamento
const storage = multer.memoryStorage(); // Usar memória temporária para armazenar a imagem

// Configuração do filtro de arquivos
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Erro: Apenas imagens são permitidas!'));
};

// Inicializar multer com as configurações
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de 5MB
  fileFilter: fileFilter
});

// Middleware para enviar arquivo ao Firebase Storage
const uploadToFirebase = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const blob = bucket.file(`uploads/${uuidv4()}_${req.file.originalname}`);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  blobStream.on('error', (err) => {
    next(err);
  });

  blobStream.on('finish', () => {
    req.file.firebaseUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    next();
  });

  blobStream.end(req.file.buffer);
};

module.exports = {
  upload,
  uploadToFirebase
};
