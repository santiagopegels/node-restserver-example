const fieldValidator = require('../middlewares/field-validator')
const jwtValidator = require('../middlewares/validate-jwt')
const rolesValidator = require('../middlewares/validate-role')
const uploadFileValidator = require('../middlewares/validate-upload-file')

module.exports = {
    ...fieldValidator,
    ...jwtValidator,
    ...rolesValidator,
    ...uploadFileValidator
}