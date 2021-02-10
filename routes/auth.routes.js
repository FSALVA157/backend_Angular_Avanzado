const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

router = Router();
router.post('/', [
    check('email', 'El email es necesario').not().isEmpty(),
    check('password', 'La clave es necesaria').not().isEmpty(),
    validarCampos
], login);

module.exports = router;