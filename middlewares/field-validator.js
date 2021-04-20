const { validationResult } = require('express-validator')

const fieldValidator = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }
}

module.exports = {
    fieldValidator
}