const express = require ('express')
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/auth');
const { upload, uploadImage } = require('../middleware/upload'); // Verifique o caminho correto do arquivo de middleware upload
const router = express.Router();


// Rota para criar um novo evento
router.post('/create', authMiddleware.verifyToken, upload.single('image'), async (req, res) => {
  try {
    const imageUrl = await uploadImage(req.file);
    // Chame seu controlador para criar o evento usando a imageUrl, por exemplo:
    await eventController.createEvent(req, res, imageUrl);
  } catch (error) {
    console.error('Erro ao fazer upload de imagem para o Firebase:', error);
    return res.status(500).send('Erro ao fazer upload de imagem');
  }
});

// Rota para listar todos os eventos
router.get('/', eventController.getAllEvents);

// Rota para atualizar um evento (apenas para divulgadores autenticados)
router.put('/:id', authMiddleware.verifyToken, upload.single('image'), async (req, res) => {
  try {
    const imageUrl = await uploadImage(req.file);
    // Chame seu controlador para atualizar o evento usando a imageUrl, por exemplo:
    await eventController.updateEvent(req, res, req.params.id, imageUrl);
  } catch (error) {
    console.error('Erro ao fazer upload de imagem para o Firebase:', error);
    return res.status(500).send('Erro ao fazer upload de imagem');
  }
});

// Rota para deletar um evento (apenas para divulgadores autenticados)
router.delete('/:id', authMiddleware.verifyToken, async (req, res) => {
  try {
    // Chame seu controlador para deletar o evento, por exemplo:
    await eventController.deleteEvent(req, res, req.params.id);
  } catch (error) {
    console.error('Erro ao deletar evento:', error);
    return res.status(500).send('Erro ao deletar evento');
  }
});

module.exports = router;
