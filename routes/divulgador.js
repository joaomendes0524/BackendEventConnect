const express = require('express');
const router = express.Router();
const divulgadorController = require('../controllers/divulgadorController');
const authMiddleware = require('../middleware/auth');

// Rota para registrar um novo Divulgador
router.post('/register', divulgadorController.registerDivulgador);

// Rota para autenticar um Divulgador
router.post('/login', divulgadorController.loginDivulgador);

// Rota para listar todos os Divulgadores (protegida por autenticação)
router.get('/', authMiddleware.verifyToken, divulgadorController.getAllDivulgadores);

module.exports = router;