const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Rota para registrar um novo User
router.post('/register', userController.registerUser);

// Rota para autenticar um User
router.post('/login', userController.loginUser);

// Rota para listar todos os Users (protegida por autenticação)
router.get('/', authMiddleware.verifyToken, userController.getAllUsers);

module.exports = router;
