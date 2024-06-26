//importando express para criação do servidor web
const express = require("express")
//importando a conexão com o banco de dados
const connectDB = require("./database/database");
//importando o cors
const cors = require("cors");
require("dotenv").config();


//criando uma instância executável do express
const app = express();

//configuração do cors
app.use(cors({
    origin: '*', // Pode especificar a origem que deseja permitir. '*' permite todas.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permite incluir cookies nas requisições
}));

//criando uma instância executável da conexão com DB
connectDB();

//configuração para o express ler dados .json
app.use(express.json());

//importando as rotas para o index
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

// Importar rotas de divulgadores
const divulgadorRoutes = require('./routes/divulgador');
app.use('/divulgador', divulgadorRoutes);

//importando rotas de evento
const eventRoutes = require('./routes/event');
app.use('/events', eventRoutes);

//importando rotas de comentário
const commentRoutes = require('./routes/comment');
app.use('/comment', commentRoutes);

// Importando o middleware de upload
const { upload, uploadToFirebase } = require('./middleware/upload');

// Rota para upload de arquivos
app.post('/upload', upload.single('file'), uploadToFirebase, (req, res) => {
    if (req.file && req.file.firebaseUrl) {
        res.json({ message: 'Upload bem-sucedido', url: req.file.firebaseUrl });
    } else {
        res.status(400).json({ message: 'Nenhum arquivo enviado' });
    }
});

//servidor web
app.listen(3000, ()=>{
    console.log('Servidor rodando em:"http://localhost:3000"')
});