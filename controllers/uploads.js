const path = require('path')
const response = require("express");
const { v4: uuidv4 } = require('uuid');

const uploadFile = (req, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  const { file } = req.files;
  const fileNameSplit = file.name.split('.')
  const extension = fileNameSplit[fileNameSplit.length - 1]

  const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'] 

  if(!allowedExtensions.includes('extension')){
    return res.status(400).json({
      msg: 'El tipo de archivo no está permitido.'
    })
  } 

  const fileName = uuidv4() + '.' + extension

  uploadPath = path.join(__dirname, '../uploads/', fileName);

  file.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).json({ err });
    }

    res.json({ msg: 'El archivo se subio a ' + uploadPath });
  });

}

module.exports = {
  uploadFile
}