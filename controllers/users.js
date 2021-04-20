const {response} = require('express')

const getUsers = (req, res = response) => {
    res.json({
        msg: 'Get Users'
    })
}

const createUser = (req, res = response) => {
    res.json({
        msg: 'Create Users'
    })
}

const updateUser = (req, res = response) => {
    res.json({
        msg: 'Get Users'
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