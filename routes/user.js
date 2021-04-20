const { Router } = require('express')
const { check } = require('express-validator')
const { fieldValidator } = require('../middlewares/field-validator')

const Role = require('../models/role')
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users')

const router = Router()

router.get('/', getUsers)
router.post('/', [
    check('email', 'El correo no es válido').isEmail(),
    check('name', 'Ingrese un nombre').notEmpty(),
    check('password', 'Debe contener al menos 4 caracteres').isLength({ min: 4 }),
    check('role').custom(async(role = '')=>{
        const existRole = await Role.findOne({role})
        if(!existRole){
            throw new Error('El rol no existe.')
        }
    }),
    fieldValidator
], createUser)
router.put('/:id', updateUser)
router.delete('/', deleteUser)


module.exports = router