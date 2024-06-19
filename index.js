//importando express para criação do servidor web
const express = require("express")
//importando a conexão com o banco de dados
const connectDB = require("./database/database");

//importando o cors
const cors = require("cors");


//criando uma instância executável do express
const app = express();

//configuração do cors
app.use(cors({
    origin: '*', // Pode especificar a origem que deseja permitir. '*' permite todas.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
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
app.use('/event', eventRoutes);

//importando rotas de comentário
const commentRoutes = require('./routes/comment');
app.use('/comment', commentRoutes);




//servidor web
app.listen(3000, ()=>{
    console.log('Servidor rodando em:"http://localhost:3000"')
});

