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

const updateUser = (req, res = response) => {
    const { id } = req.params
    res.json({
        msg: 'Get Users',
        id
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