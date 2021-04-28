

const validateUploadFile = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    next()
}

module.exports = {
    validateUploadFile
}