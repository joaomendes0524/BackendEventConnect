const multer = require('multer');
const path = require('path');
 
// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Diretório para armazenar as imagens
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
 
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