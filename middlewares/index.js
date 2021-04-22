const fieldValidator = require('../middlewares/field-validator')
const jwtValidator = require('../middlewares/validate-jwt')
const rolesValidator = require('../middlewares/validate-role')

module.exports = {
    ...fieldValidator,
    ...jwtValidator,
    ...rolesValidator
}