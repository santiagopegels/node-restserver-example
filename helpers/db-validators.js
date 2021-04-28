const Role = require('../models/role')
const {User, Category, Product} = require('../models')

const isValidRole = async(role = '')=>{
    const existRole = await Role.findOne({role})
    if(!existRole){
        throw new Error('El rol no existe.')
    }
}

const existsEmail = async(email = '') =>{
    const existsEmail = await User.findOne({email})
    if(existsEmail){
        throw new Error('El correo ya se encuentra registrado.')
    }
}

const existsUserById = async(id = '') =>{
    const existsUser = await User.findById(id)
    if(!existsUser){
        throw new Error('El usuario no existe.')
    }
}

const hasUserDeleted = async(id = '') =>{
    const {status} = await User.findById(id)
    if(!status){
        throw new Error('El usuario ya ha sido eliminado.')
    }
}

const existsCategoryById = async(id = '') =>{
    const existsCategory = await Category.findById(id)   
    if(!existsCategory){
        throw new Error('La categoría no existe.')
    }
}

const existsProductById = async(id = '') =>{
    const existsProduct = await Product.findById(id)   
    if(!existsProduct){
        throw new Error('El producto no existe.')
    }
}

const allowedCollections = (collection = '', allowedCollections = []) =>{

    const include = allowedCollections.includes(collection)
    if(!include){
        throw new Error(`La Colección ${collection} no está permitida.`)
    }

    return true
}

module.exports = {
    isValidRole,
    existsEmail,
    existsUserById,
    hasUserDeleted,
    existsCategoryById,
    existsProductById,
    allowedCollections
}