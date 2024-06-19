const jwt = require('jsonwebtoken');

const secret = 'sua-chave-secreta'; // Use uma chave secreta segura e armazene-a em variáveis de ambiente

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.userId = decoded.userId;
        next();
    });
};

module.exports = {
    verifyToken
};
