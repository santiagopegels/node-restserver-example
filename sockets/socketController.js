const {Socket} = require('socket.io')
const {verifyJWT} = require('../helpers')

const socketController = async (socket = new Socket()) => {
    
    const user = await verifyJWT(socket.handshake.headers['x-token'])
    
    if(!user){
        return socket.disconnect()
    }

    console.log("Se conecto el usuario", user.name);
    
}

module.exports = socketController