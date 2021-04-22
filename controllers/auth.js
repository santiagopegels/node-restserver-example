const { response } = require("express");
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const {generateJWT} = require('../helpers/generateJWT')

const login = async (req, res = response) => {

    const { email, password } = req.body
    
    try {

        const user = await User.findOne( {email} )

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

module.exports = {
    login
}