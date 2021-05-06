const { Router } = require('express')
const { check } = require('express-validator')
const { fieldValidator, validateJWT } = require('../middlewares')
const {login, googleSignin, refreshToken} = require('../controllers/auth')

const router = Router()

router.post('/login',[
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'Ingrese la contraseña').notEmpty(),
    fieldValidator
], login)

router.post('/google',[
    check('id_token', 'El id token es necesario').notEmpty(),
    fieldValidator
], googleSignin)

router.get('/', validateJWT, refreshToken)

module.exports = router