const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const divulgadorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
<<<<<<< HEAD
        trim: true
    },

=======
        trim: true,
        unique: true
    },
>>>>>>> 5b850e7d94029eafa581d5283490de51039d7153
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        trim: true
    },
    cnpj: {
        type: String,
        trim: true
    }
});

// Validar que pelo menos um dos campos cpf ou cnpj está preenchido
divulgadorSchema.pre('validate', function(next) {
    if (!this.cpf && !this.cnpj) {
        next(new Error('Pelo menos um dos campos CPF ou CNPJ é obrigatório'));
    } else {
        next();
    }
});

//método para hashear a senha quando enviada ao banco de dados
divulgadorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Divulgador', divulgadorSchema);