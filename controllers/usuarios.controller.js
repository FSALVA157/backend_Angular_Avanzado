const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'nombre password email img role google');

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    });
}

const postUsuario = async(req, res = response) => {

    try {
        const { email, password } = req.body;
        const existe = await Usuario.findOne({ email });
        if (existe) {
            return res.status(400).json({
                ok: false,
                message: 'El email ya se encuentra registrado'
            });
        }
        const usuario = new Usuario(req.body);

        //encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        const usuarioCreado = await usuario.save();
        const token = await generarJWT(usuarioCreado._id);
        res.json({
            ok: true,
            token,
            usuarioCreado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error Inesperado'
        });
    }

}

const putUsuario = async(req = request, res = response) => {
    const { id } = req.params;
    const { password, email, role, google, ...campos } = req.body;
    try {
        const newUser = await Usuario.findById(id);
        if (!newUser) {
            return res.status(404).json({
                ok: false,
                message: "El usuario que intenta actualizar no Existe"
            });
        }

        const auxiliar = await Usuario.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            auxiliar,
            uid: req.uid
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error Inesperado'
        });
    }
};

const deleteUsuario = async(req = request, res = response) => {
    const id = req.params.id;

    try {
        try {
            const user = await Usuario.findById(id);
            if (!user) {
                throw new Error;
            }
        } catch (error) {
            return res.status(404).json({
                ok: false,
                message: "El usuario que intenta eliminar no Existe"
            });
        }

        const userDeleted = await Usuario.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            userDeleted,
            uid: req.uid
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error Inesperado'
        });
    }
}

module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
};