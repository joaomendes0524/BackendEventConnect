//configuração do mongoose e conexão com o banco de dados
const mongoose = require('mongoose');

const connectDB = async () => {
    const dbURI = 'mongodb+srv://JoaoMendes:LMkRdzzDlYXu9kZz@eventconnect.s5uoxvs.mongodb.net/?retryWrites=true&w=majority&appName=EventConnect';
    try {
        await mongoose.connect(dbURI);
        console.log('Conectado ao Banco de Dados');
    } catch (err) {
        console.error('Erro ao conectar ao Banco de Dados', err);
        process.exit(1);
    }
};

module.exports = connectDB;
