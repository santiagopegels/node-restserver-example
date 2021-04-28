const response = require("express");
const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL)

const { uploadFile } = require('../helpers')

const { User, Product } = require('../models')

const upload = async (req, res = response) => {

  try {

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

const updateCollectionImage = async (req, res = response) => {
  const { id, collection } = req.params

  let model

  switch (collection) {
    case 'users':
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: 'No existe el usuario con ese id'
        })
      }
      break;
    case 'products':
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: 'No existe el producto con ese id'
        })
      }
      break;

    default:
      return res.status(500).json({
        msg: `Implementar la colección ${collection}`
      })
      break;
  }

  if (model.img_local) {
    const imgPath = path.join(__dirname, '../uploads', collection, model.img)
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath)
    }
  }

  if (model.img) {
    const nameArray = model.img.split('/')
    const name = nameArray[nameArray.length - 1]
    const [public_id] = name.split('.')
    cloudinary.uploader.destroy( public_id )
  }

  //Save in Cloudinary
  const { tempFilePath } = req.files.file

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
  model.img = secure_url

  //Save in Localhost
  const name = await uploadFile(req.files, undefined, collection)
  model.img_local = name

  await model.save()

  return res.json({
    model
  })
}

const updateCollectionImageCloudinary = async (req, res = response) => {
  const { id, collection } = req.params

  let model

  switch (collection) {
    case 'users':
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: 'No existe el usuario con ese id'
        })
      }
      break;
    case 'products':
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: 'No existe el producto con ese id'
        })
      }
      break;

    default:
      return res.status(500).json({
        msg: `Implementar la colección ${collection}`
      })
      break;
  }

  if (model.img) {
    const imgPath = path.join(__dirname, '../uploads', collection, model.img)
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath)
    }
  }

  const { tempFilePath } = req.files.file

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
  model.img = secure_url

  await model.save()

  return res.json({
    model
  })
}

const getImage = async (req, res = response) => {
  const { id, collection } = req.params

  let model

  switch (collection) {
    case 'users':
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: 'No existe el usuario con ese id'
        })
      }
      break;
    case 'products':
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: 'No existe el producto con ese id'
        })
      }
      break;

    default:
      return res.status(500).json({
        msg: `Implementar la colección ${collection}`
      })
      break;
  }

  if (model.img) {
    const imgPath = path.join(__dirname, '../uploads', collection, model.img)
    if (fs.existsSync(imgPath)) {
      return res.sendFile(imgPath)
    }
  }

  const noImagePath = path.join(__dirname, '../assets', 'no-image.jpg')
  return res.sendFile(noImagePath)

}

module.exports = {
  upload,
  updateCollectionImage,
  updateCollectionImageCloudinary,
  getImage

}