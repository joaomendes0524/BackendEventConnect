const mongoose = require('mongoose');
<<<<<<< HEAD
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // Campo para armazenar o caminho da imagem
    createdBy: { type: Schema.Types.ObjectId, ref: 'Divulgador', required: true }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
=======

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
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
>>>>>>> 5b850e7d94029eafa581d5283490de51039d7153
