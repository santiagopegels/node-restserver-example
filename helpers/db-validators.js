const Role = require('../models/role')
const User = require('../models/user')

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

module.exports = {
    isValidRole,
    existsEmail,
    existsUserById,
    hasUserDeleted
}