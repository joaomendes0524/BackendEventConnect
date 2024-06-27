const multer = require('multer');
const { storage } = require('../config/firebaseconfig'); // Certifique-se de ajustar o caminho
const { ref, getDownloadURL, uploadBytes } = require('firebase/storage');


// Configuração do armazenamento em memória
const memoryStorage = multer.memoryStorage(); // Armazena a imagem em memória para ser enviada ao Firebase

// Configuração do filtro de arquivos
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(file.originalname.toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Erro: Apenas imagens são permitidas!'));
};

// Inicializar multer com as configurações
const upload = multer({
  storage: memoryStorage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de 5MB
  fileFilter: fileFilter
});

// Função para fazer upload de imagem para o Firebase Storage
const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${Date.now()}_${file.originalname}`);
  const snapshot = await uploadBytes(storageRef, file.buffer);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

module.exports = { upload, uploadImage };