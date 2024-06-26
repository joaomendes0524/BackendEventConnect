const Event = require('../models/eventModel');
const Divulgador = require('../models/divulgadorModel');
const bucket = require('../config/firebaseConfig');
const { v4: uuidv4 } = require('uuid');

// Criar um novo evento
const createEvent = async (req, res) => {
  const { title, description, date } = req.body;

  try {
    const divulgador = await Divulgador.findById(req.userId);
    if (!divulgador) {
      return res.status(403).json({ message: 'Apenas divulgadores podem criar eventos' });
    }

    let imageUrl = null;
    if (req.file) {
      const blob = bucket.file(`images/${uuidv4()}_${req.file.originalname}`);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype
        }
      });

      blobStream.on('error', (err) => {
        console.error('Erro no upload da imagem:', err);
        res.status(500).json({ message: 'Erro no upload da imagem' });
      });

      blobStream.on('finish', async () => {
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        const event = new Event({
          title,
          description,
          date,
          createdBy: req.userId,
          image: imageUrl
        });
        await event.save();
        res.status(201).json(event);
      });

      blobStream.end(req.file.buffer);
    } else {
      const event = new Event({
        title,
        description,
        date,
        createdBy: req.userId
      });
      await event.save();
      res.status(201).json(event);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Listar todos os eventos
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name username');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Atualizar um evento
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    if (event.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Você não tem permissão para editar este evento' });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;

    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Deletar um evento
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    if (event.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Você não tem permissão para deletar este evento' });
    }

    await event.remove();
    res.json({ message: 'Evento deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent
};
