const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // Campo para armazenar o caminho da imagem
    createdBy: { type: Schema.Types.ObjectId, ref: 'Divulgador', required: true }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
