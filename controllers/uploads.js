const response = require("express");
const { uploadFile } = require('../helpers')

const upload = async (req, res = response) => {

  try {

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded.');
      return;
    }

    const msg = await uploadFile(req.files, undefined, 'images')

    res.json({
      msg
    })
  }

  catch (error) {
    return res.status(400).json({
      msg: error
    })
  }
}

const updateCollectionImage = (req, res = response) => {
  const {id, collection} = req.params

  return res.json({
    id,
    collection
  })
}

module.exports = {
  upload,
  updateCollectionImage
}