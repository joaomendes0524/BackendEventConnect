const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET

// Registrar um novo User
const registerUser = async (req, res) => {
    const { name, username, email, password} = req.body;

    try {
        const user = new User({ name, username, email, password});
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Autenticar um usuário
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
        
        res.json({ message: 'Login bem-sucedido', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Listar todos os Users (apenas para demonstração, pode ser removido ou protegido)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers
};