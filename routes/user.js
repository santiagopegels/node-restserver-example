const { Router } = require('express')
const { check } = require('express-validator')
const { fieldValidator } = require('../middlewares/field-validator')

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users')
const { isValidRole, existsEmail, existsUserById, hasUserDeleted } = require('../helpers/db-validators')

const router = Router()

router.get('/', getUsers)

router.post('/', [
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(existsEmail),
    check('name', 'Ingrese un nombre').notEmpty(),
    check('password', 'Debe contener al menos 4 caracteres').isLength({ min: 4 }),
    check('role').custom(isValidRole),
    fieldValidator
], createUser)

router.put('/:id',[
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(existsUserById),
    check('role').custom(isValidRole),
    fieldValidator
], updateUser)

router.delete('/:id',[
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(existsUserById),
    check('id').custom(hasUserDeleted),
    fieldValidator
], deleteUser)


module.exports = router