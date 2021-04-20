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

module.exports = {
    isValidRole,
    existsEmail
}