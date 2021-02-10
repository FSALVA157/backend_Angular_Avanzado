/**
 * ruta utilizada: /api/usuarios
 */
const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuarios.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { Router } = require('express');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio y debe ser válido').isEmail(),
    validarCampos,
], postUsuario);

router.put('/:id',
    validarJWT, [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('img', 'la imagen es obligatoria').not().isEmpty(),
        validarCampos
    ],
    putUsuario);

router.delete('/:id', validarJWT, deleteUsuario);




module.exports = router;