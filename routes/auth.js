const { Router } = require('express')
const { check } = require('express-validator')
const { fieldValidator } = require('../middlewares/field-validator')
const {login} = require('../controllers/auth')

const router = Router()

router.post('/login',[
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'Ingrese la contraseña').notEmpty(),
    fieldValidator
], login)

module.exports = router