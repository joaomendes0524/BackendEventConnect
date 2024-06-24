const jwt = require('jsonwebtoken');

<<<<<<< HEAD
const secret = process.env.SECRET;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1]; // Divide o header e pega a segunda parte que é o token
    if (!token) {
        return res.status(401).json({ message: 'Token malformado' });
=======
const secret = 'sua-chave-secreta'; // Use uma chave secreta segura e armazene-a em variáveis de ambiente

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
>>>>>>> 5b850e7d94029eafa581d5283490de51039d7153
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
<<<<<<< HEAD
            console.error('Erro ao verificar token:', err);
            return res.status(401).json({ message: 'Token inválido' });
        }

        console.log('Token decodificado:', decoded);
        req.userId = decoded.divulgadorId;
=======
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.userId = decoded.userId;
>>>>>>> 5b850e7d94029eafa581d5283490de51039d7153
        next();
    });
};

module.exports = {
    verifyToken
};
