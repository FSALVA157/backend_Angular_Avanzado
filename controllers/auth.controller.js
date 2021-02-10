/**
 * path: /api/login
 */
const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req = request, res = response) => {
    const { password, email } = req.body;
    try {
        let user = null;
        try {
            user = await Usuario.findOne({ email: email });

            if (!user) {
                throw new Error;
            }
        } catch (error) {
            return res.status(404).json({
                ok: false,
                message: "El usuario que esta utilizando no Existe"
            });
        }

        const verificaPass = bcrypt.compareSync(password, user.password);
        if (verificaPass) {
            //generar token
            const token = await generarJWT(user._id);



            res.status(200).json({
                ok: true,
                token
            });
        } else {
            res.status(400).json({
                ok: false,
                message: "EL LOGIN ES INCORRECTO"
            });
        }




    } catch (error) {
        res.status(400).json({
            ok: false,
            message: "Error Inesperado hable con el Administrador"
        });
    }
};

module.exports = {
    login
}