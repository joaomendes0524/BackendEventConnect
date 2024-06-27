const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, refPath: 'userModel', required: true },
    userModel: { type: String, required: true, enum: ['User', 'Divulgador'] },
    bio: { type: String, default: '' },
    avatar: { type: String, default: '' }, // URL para a imagem do avatar
    // Adicione outros campos conforme necessário
});

module.exports = mongoose.model('Profile', profileSchema);
