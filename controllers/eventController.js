const Event = require('../models/eventModel');
const Divulgador = require('../models/divulgadorModel');
const moment = require('moment');
const { uploadImage } = require('../middleware/upload');

// Criar um novo evento
const createEvent = async (req, res) => {
  const { title, description, date } = req.body;

  try {
      const divulgador = await Divulgador.findById(req.userId);
      if (!divulgador) {
          return res.status(403).json({ message: 'Apenas divulgadores podem criar eventos' });
      }

      // Converter a data para o formato ISO 8601
      const formattedDate = moment(date, 'DD-MM-YYYY').toISOString();

      let imageUrl = null;
      if (req.file) {
          // Fazer upload da imagem para o Firebase Storage
          imageUrl = await uploadImage(req.file);
      }

      const event = new Event({
          title,
          description,
          date: formattedDate,
          image: imageUrl, // Adiciona a URL da imagem ao evento
          createdBy: req.userId
      });

      await event.save();
      res.status(201).json(event);
  } catch (err) {
      res.status(400).json({ message: `Erro ao criar evento: ${err.message}` });
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

        // Converter a data para o formato ISO 8601 se estiver presente
        if (date) {
            event.date = moment(date, 'DD-MM-YYYY').toISOString();
        }

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