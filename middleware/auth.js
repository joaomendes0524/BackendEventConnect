const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1]; // Divide o header e pega a segunda parte que é o token
    if (!token) {
        return res.status(401).json({ message: 'Token malformado' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.error('Erro ao verificar token:', err);
            return res.status(401).json({ message: 'Token inválido' });
        }

        console.log('Token decodificado:', decoded);
        req.userId = decoded.divulgadorId;
        next();
    });
};

module.exports = {
    verifyToken
};
