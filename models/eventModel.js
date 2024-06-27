const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Divulgador',
        required: true
    },
    image: {
        type: String, // Adiciona o campo para armazenar o URL da imagem
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);