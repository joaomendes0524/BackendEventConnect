const Profile = require('../models/profileModel');
const User = require('../models/userModel');
const Divulgador = require('../models/divulgadorModel');

// Criar um novo perfil
const createProfile = async (req, res) => {
    const { userId, userModel, bio, avatar } = req.body;

    try {
        let user;
        if (userModel === 'User') {
            user = await User.findById(userId);
        } else if (userModel === 'Divulgador') {
            user = await Divulgador.findById(userId);
        }

        if (!user) {
            return res.status(404).json({ message: `${userModel} não encontrado` });
        }

        const profile = new Profile({
            user: userId,
            userModel,
            bio,
            avatar
        });

        await profile.save();
        user.profile = profile._id;
        await user.save();

        res.status(201).json(profile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Obter um perfil
const getProfile = async (req, res) => {
    const { userId, userModel } = req.params;

    try {
        const profile = await Profile.findOne({ user: userId, userModel }).populate('user', 'username email');
        if (!profile) {
            return res.status(404).json({ message: 'Perfil não encontrado' });
        }

        res.json(profile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Atualizar um perfil
const updateProfile = async (req, res) => {
    const { userId, userModel } = req.params;
    const { bio, avatar } = req.body;

    try {
        const profile = await Profile.findOne({ user: userId, userModel });
        if (!profile) {
            return res.status(404).json({ message: 'Perfil não encontrado' });
        }

        if (bio) profile.bio = bio;
        if (avatar) profile.avatar = avatar;

        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Deletar um perfil
const deleteProfile = async (req, res) => {
    const { userId, userModel } = req.params;

    try {
        const profile = await Profile.findOneAndDelete({ user: userId, userModel });
        if (!profile) {
            return res.status(404).json({ message: 'Perfil não encontrado' });
        }

        let user;
        if (userModel === 'User') {
            user = await User.findById(userId);
        } else if (userModel === 'Divulgador') {
            user = await Divulgador.findById(userId);
        }

        if (user) {
            user.profile = null;
            await user.save();
        }

        res.json({ message: 'Perfil deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createProfile,
    getProfile,
    updateProfile,
    deleteProfile
};
