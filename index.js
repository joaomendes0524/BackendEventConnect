//importando express para criação do servidor web
const express = require("express")
//importando a conexão com o banco de dados
const connectDB = require("./database/database");
<<<<<<< HEAD
//importando o cors
const cors = require("cors");
require('dotenv').config();
=======

//importando o cors
const cors = require("cors");
>>>>>>> 5b850e7d94029eafa581d5283490de51039d7153


//criando uma instância executável do express
const app = express();

<<<<<<< HEAD

=======
>>>>>>> 5b850e7d94029eafa581d5283490de51039d7153
//configuração do cors
app.use(cors({
    origin: '*', // Pode especificar a origem que deseja permitir. '*' permite todas.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
<<<<<<< HEAD
    credentials: true, // Permite incluir cookies nas requisições
=======
>>>>>>> 5b850e7d94029eafa581d5283490de51039d7153
}));

//criando uma instância executável da conexão com DB
connectDB();

//configuração para o express ler dados .json
app.use(express.json());

<<<<<<< HEAD



=======
>>>>>>> 5b850e7d94029eafa581d5283490de51039d7153
//importando as rotas para o index
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

// Importar rotas de divulgadores
const divulgadorRoutes = require('./routes/divulgador');
app.use('/divulgador', divulgadorRoutes);

//importando rotas de evento
const eventRoutes = require('./routes/event');
<<<<<<< HEAD
app.use('/events', eventRoutes);
=======
app.use('/event', eventRoutes);
>>>>>>> 5b850e7d94029eafa581d5283490de51039d7153

//importando rotas de comentário
const commentRoutes = require('./routes/comment');
app.use('/comment', commentRoutes);




//servidor web
app.listen(3000, ()=>{
    console.log('Servidor rodando em:"http://localhost:3000"')
});

