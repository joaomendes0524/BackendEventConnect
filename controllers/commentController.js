const Comment = require('../models/commentModel');
const Event = require('../models/eventModel');
const User = require('../models/userModel');

// Criar um novo comentário
const createComment = async (req, res) => {
    const { text, eventId } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }

        const comment = new Comment({
            text,
            createdBy: req.user.id,
            eventId
        });

        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Listar todos os comentários de um evento
const getCommentsByEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const comments = await Comment.find({ eventId }).populate('createdBy', 'name username');
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createComment,
    getCommentsByEvent
};