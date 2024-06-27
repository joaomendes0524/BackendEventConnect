const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/auth');

// Criar um novo perfil
router.post('/', authMiddleware.verifyToken, profileController.createProfile);

// Obter um perfil
router.get('/:userId', profileController.getProfile);

// Atualizar um perfil
router.put('/:userId', authMiddleware.verifyToken, profileController.updateProfile);

// Deletar um perfil
router.delete('/:userId', authMiddleware.verifyToken, profileController.deleteProfile);

module.exports = router;
