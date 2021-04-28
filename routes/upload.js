const { Router } = require('express')

const { check } = require('express-validator')
const { fieldValidator, validateUploadFile } = require('../middlewares')
const { allowedCollections } = require('../helpers')

const {upload, updateCollectionImage, getImage} = require('../controllers/uploads')

const router = Router()

router.post('/',validateUploadFile, upload)

router.put('/:collection/:id', [
    validateUploadFile,
    check('id', 'No es un ID válido.').isMongoId(),
    check('collection').custom(collection => allowedCollections(collection, ['users', 'products'])),
    fieldValidator
], updateCollectionImage)

router.get('/:collection/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    check('collection').custom(collection => allowedCollections(collection, ['users', 'products'])),
    fieldValidator
], getImage)


module.exports = router