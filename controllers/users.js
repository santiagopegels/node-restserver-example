const { request, response } = require('express')
const bcrypt = require('bcryptjs')

const User = require('../models/user')


const getUsers = async (req = request, res = response) => {

    const { page = 1, limit = 10 } = req.query;

    const query = {status: true}

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
    ])

    res.json({
        msg: 'Get Users',
        users,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalRegisters: total
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
    const { _id, password, google, email, ...resto } = req.body

    if (password) {
        const salt = bcrypt.genSaltSync()
        resto.password = bcrypt.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, resto, { new: true })

    res.json({
        msg: 'Actualizado',
        user
    })
}

const deleteUser = async (req, res = response) => {

    const { id } = req.params

    const user = await User.findByIdAndUpdate(id, {status: false})


    res.json({
        msg: 'Usuario Borrado',
        user
    })
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}