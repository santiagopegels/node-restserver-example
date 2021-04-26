const { Router } = require('express')
const { check } = require('express-validator')
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct } = require('../controllers/products')

const {
    fieldValidator,
    validateJWT,
    isAdminRole } = require('../middlewares/index')

const { existsProductById } = require('../helpers/db-validators')

const router = Router()

router.get('/', [
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'Ingrese la contraseña').notEmpty(),
    fieldValidator
], getProducts)

router.get('/:id', [
    check('id', 'Falta el id').notEmpty(),
    check('id').custom(existsProductById),
    fieldValidator
], getProduct)

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').notEmpty(),
    fieldValidator
], createProduct)

router.put('/:id', [
    validateJWT,
    check('id', 'Falta el id').notEmpty(),
    check('id').custom(existsProductById),
    check('name', 'El nombre es obligatorio').notEmpty(),
    fieldValidator
], updateProduct)

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Falta el id').notEmpty(),
    check('id').custom(existsProductById),
    fieldValidator
], deleteProduct)

module.exports = router