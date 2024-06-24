// routes/event.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// Rota para criar um novo evento (protegida por autenticação)
router.post('/', authMiddleware.verifyToken, upload.single('image'), eventController.createEvent);

// Rota para listar todos os eventos
router.get('/', eventController.getAllEvents);

// Rota para atualizar um evento (protegida por autenticação)
router.put('/:id', authMiddleware.verifyToken, upload.single('image'), eventController.updateEvent);

// Rota para deletar um evento (protegida por autenticação)
router.delete('/:id', authMiddleware.verifyToken, eventController.deleteEvent);

module.exports = router;
