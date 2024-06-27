const multer = require('multer');
const path = require('path');

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

module.exports = upload;