const { v4: uuidv4 } = require('uuid');
const path = require('path')

const uploadFile = (files, allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'], folderPath='') => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const fileNameSplit = file.name.split('.')
        const extension = fileNameSplit[fileNameSplit.length - 1]
        
        if (!allowedExtensions.includes(extension)) {
            return reject('El tipo de archivo no está permitido.') 
        }

        const fileName = uuidv4() + '.' + extension

        uploadPath = path.join(__dirname, '../uploads/',folderPath, fileName);

        file.mv(uploadPath, function (err) {
            if (err) {
                return reject(err)
            }

            resolve(`El archivo ${fileName} se subió correctamente`);
        });
    })
}

module.exports = {
    uploadFile
}