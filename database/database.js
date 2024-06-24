//configuração do mongoose e conexão com o banco de dados
const mongoose = require('mongoose');

const connectDB = async () => {
<<<<<<< HEAD
    const dbURI = 'mongodb+srv://JoaoMendes:BDUAQeML1V0BMv9V@eventconnect.s5uoxvs.mongodb.net/?retryWrites=true&w=majority&appName=EventConnect';
=======
    const dbURI = 'mongodb+srv://JoaoMendes:4OJPcgxeCulm6m0B@eventconnect.s5uoxvs.mongodb.net/?retryWrites=true&w=majority&appName=EventConnect';
>>>>>>> 5b850e7d94029eafa581d5283490de51039d7153
    try {
        await mongoose.connect(dbURI);
        console.log('Conectado ao Banco de Dados');
    } catch (err) {
        console.error('Erro ao conectar ao Banco de Dados', err);
        process.exit(1);
    }
};

module.exports = connectDB;
