const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: "Carece del token requerido para Efectuar esta Consulta"
        });
    };

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        //enviar el dato en el request -  en este caso estoy agregando el id en el request
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: "El token es inválido"
        });
    };

};




module.exports = {
    validarJWT
};