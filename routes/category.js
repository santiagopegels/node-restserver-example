const { Router } = require('express')
const { check } = require('express-validator')
const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory } = require('../controllers/categories')

const {
    fieldValidator,
    validateJWT,
    isAdminRole,
    hasRole } = require('../middlewares/index')

const router = Router()

router.get('/', [
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'Ingrese la contraseña').notEmpty(),
    fieldValidator
], getCategories)

router.get('/:id', [
    check('id', 'Falta el id').notEmpty(),
    fieldValidator
], getCategory)

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').notEmpty(),
    fieldValidator
], createCategory)

router.put('/:id', [
    validateJWT,
    check('id', 'Falta el id').notEmpty(),
    check('name', 'El nombre es obligatorio').notEmpty(),
    fieldValidator
], updateCategory)

router.delete('/:id', [
    check('id', 'Falta el id').notEmpty(),
    fieldValidator
], deleteCategory)

module.exports = router