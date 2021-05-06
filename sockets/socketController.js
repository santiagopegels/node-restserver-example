const { Socket } = require('socket.io')
const { verifyJWT } = require('../helpers')
const { Chat } = require('../models')

const chat = new Chat()

const socketController = async (socket = new Socket(), io) => {

    const user = await verifyJWT(socket.handshake.headers['x-token'])

    if (!user) {
        return socket.disconnect()
    }

    chat.connectUser(user)

    io.emit('active-users', chat.usersArray)

    io.on('disconnect', () => {
        chat.disconnectUser(user.id)
        
        io.emit('active-users', chat.usersArray)
    })

    console.log("Se conecto el usuario", user.name);

}

module.exports = socketController