const Divulgador = require('../models/divulgadorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET

// Registrar um novo Divulgador
const registerDivulgador = async (req, res) => {
    const { name, username, email, password, cpf, cnpj } = req.body;

    try {
        const divulgador = new Divulgador({ name, username, email, password, cpf, cnpj });
        await divulgador.save();
        res.status(201).json(divulgador);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }   
};

// Autenticar um Divulgador
const loginDivulgador = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        const divulgador = await Divulgador.findOne({ email });
        if (!divulgador) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const isMatch = await bcrypt.compare(password, divulgador.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ divulgadorId: divulgador._id }, secret, { expiresIn: '1h' });

        res.json({ message: 'Login bem-sucedido', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Listar todos os Divulgadores (apenas para demonstração, pode ser removido ou protegido)
const getAllDivulgadores = async (req, res) => {
    try {
        const divulgadores = await Divulgador.find();
        res.json(divulgadores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    registerDivulgador,
    loginDivulgador,
    getAllDivulgadores
};