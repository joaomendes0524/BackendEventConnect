const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/auth');

// Rota para criar um novo evento (apenas para divulgadores autenticados)
router.post('/', authMiddleware.verifyToken, eventController.createEvent);

// Rota para listar todos os eventos
router.get('/', eventController.getAllEvents);

// Rota para atualizar um evento (apenas para divulgadores autenticados)
router.put('/:id', authMiddleware.verifyToken, eventController.updateEvent);

// Rota para deletar um evento (apenas para divulgadores autenticados)
router.delete('/:id', authMiddleware.verifyToken, eventController.deleteEvent);

module.exports = router;
