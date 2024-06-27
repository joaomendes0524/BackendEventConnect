const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Rota para registrar um novo User
router.post('/register',  userController.registerUser);

// Rota para autenticar um User
router.post('/login',  userController.loginUser);

// Rota para listar todos os Users (protegida por autenticação)
router.get('/', authMiddleware.verifyToken, userController.getAllUsers);

// Criar um novo perfil
router.post('/', authMiddleware.verifyToken, profileController.createProfile);

// Obter um perfil
router.get('/:userId', profileController.getProfile);

// Atualizar um perfil
router.put('/:userId', authMiddleware.verifyToken, profileController.updateProfile);

// Deletar um perfil
router.delete('/:userId', authMiddleware.verifyToken, profileController.deleteProfile);

module.exports = router;