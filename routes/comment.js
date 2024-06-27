const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');

// Rota para criar um novo comentário (apenas para usuários autenticados)
router.post('/', authMiddleware.verifyToken, commentController.createComment);

// Rota para listar todos os comentários de um evento
router.get('/:eventId', commentController.getCommentsByEvent);

module.exports = router;