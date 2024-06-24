<<<<<<< HEAD
// routes/event.js
=======
>>>>>>> 5b850e7d94029eafa581d5283490de51039d7153
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/auth');
<<<<<<< HEAD
const upload = require('../middleware/upload');

// Rota para criar um novo evento (protegida por autenticação)
router.post('/', authMiddleware.verifyToken, upload.single('image'), eventController.createEvent);
=======

// Rota para criar um novo evento (apenas para divulgadores autenticados)
router.post('/', authMiddleware.verifyToken, eventController.createEvent);
>>>>>>> 5b850e7d94029eafa581d5283490de51039d7153

// Rota para listar todos os eventos
router.get('/', eventController.getAllEvents);

<<<<<<< HEAD
// Rota para atualizar um evento (protegida por autenticação)
router.put('/:id', authMiddleware.verifyToken, upload.single('image'), eventController.updateEvent);

// Rota para deletar um evento (protegida por autenticação)
=======
// Rota para atualizar um evento (apenas para divulgadores autenticados)
router.put('/:id', authMiddleware.verifyToken, eventController.updateEvent);

// Rota para deletar um evento (apenas para divulgadores autenticados)
>>>>>>> 5b850e7d94029eafa581d5283490de51039d7153
router.delete('/:id', authMiddleware.verifyToken, eventController.deleteEvent);

module.exports = router;
