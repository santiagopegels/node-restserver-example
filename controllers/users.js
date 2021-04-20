const { request, response } = require('express')
const bcrypt = require('bcryptjs')

const User = require('../models/user')


const getUsers = (req = request, res = response) => {

    const params = req.query

    res.json({
        msg: 'Get Users',
        params
    })
}

const createUser = (req, res = response) => {
    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role })
    //Encrypt password
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    user.save()

    res.json({
        msg: 'Create Users',
        user
    })
}

const updateUser = async (req, res = response) => {
    const { id } = req.params
    const {_id, password, google, email, ...resto} = req.body
    
    if(password){
        const salt = bcrypt.genSaltSync()
        resto.password = bcrypt.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, resto, {new: true})
    
    res.json({
        msg: 'Actualizado',
        user
    })
}

const deleteUser = (req, res = response) => {
    res.json({
        msg: 'Get Users'
    })
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}