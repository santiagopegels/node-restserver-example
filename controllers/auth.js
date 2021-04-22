const { response } = require("express");
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const login = (req, res = response) => {

    const { email, password } = req.body

    try {

        const user = User.findOne({ email })

        if (!user) {
           return res.status(400).json({
                msg: 'Correo o password incorrecto'
            })
        }

        if(!user.status){
          return res.status(400).json({
                msg: 'Correo o password incorrecto'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password)

        if(!validPassword){
            return res.status(400).json({
                msg: 'Correo o password incorrecto'
            })
        }



    } catch (error) {
        res.status(500).json({
            msg: 'Algo salió mal'
        })
    }

}

module.exports = {
    login
}