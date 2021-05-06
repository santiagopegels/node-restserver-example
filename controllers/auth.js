const { response } = require("express");
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const { generateJWT } = require('../helpers/generateJWT')
const { googleVerify } = require('../helpers/google-verify')

const login = async (req, res = response) => {

    const { email, password } = req.body

    try {

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                msg: 'Correo o password incorrecto'
            })
        }

        if (!user.status) {
            return res.status(400).json({
                msg: 'Correo o password incorrecto'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Correo o password incorrecto'
            })
        }

        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Algo salió mal'
        })
    }

}

const googleSignin = async (req, res) => {
    const { id_token } = req.body

    try {

        const { name, img, email } = await googleVerify(id_token)

        let user = await User.findOne({ email })

        if (!user) {
            const data = {
                name,
                email,
                password: 'p4ssw0rd',
                img,
                google: true
            }

            user = new User(data)
            await user.save()
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Status desactivado'
            })
        }

        const token = await generateJWT(user.id)


        res.json({
            user,
            token
        })
    } catch (error) {
        return res.status(400).json({
            msg: error
        })
    }

}

const refreshToken = async (req, res) => {
    const {user} = req

    const token = await generateJWT(user.id)
    
    return res.json({
        user,
        token
    })
}

module.exports = {
    login,
    googleSignin,
    refreshToken
}