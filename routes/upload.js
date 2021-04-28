const { Router } = require('express')

const { check } = require('express-validator')
const { fieldValidator } = require('../middlewares/field-validator')
const { existsUserById,allowedCollections } = require('../helpers')

const {upload, updateCollectionImage} = require('../controllers/uploads')

const router = Router()

router.post('/', upload)

router.put('/:collection/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(existsUserById),
    check('collection').custom(collection => allowedCollections(collection, ['users', 'products'])),

    fieldValidator
], updateCollectionImage)

module.exports = router