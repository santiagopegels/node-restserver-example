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
    socket.emit('receive-message', chat.lastsMessages)

    //Connect to user private chat
    socket.join( user.id )

    socket.on('disconnect', () => {
        chat.disconnectUser(user.id)

        io.emit('active-users', chat.usersArray)
    })

    socket.on('send-message', ({uid, message}) => {

        if(uid){
            //Private message
            socket.to(uid).emit('private-message', { from: user.name, message})
        } else {
            chat.sendMessage(user.id, user.name, message)
            io.emit('receive-message', chat.lastsMessages)         
        }
    })
}

module.exports = socketController