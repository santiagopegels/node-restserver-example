

class Message {
    constructor(uid, name, message) {
        this.uid = uid
        this.name = name
        this.message = message
    }
}

class Chat {
    constructor() {
        this.messages = []
        this.users = {}
    }

    get lastsMessages() {
        return this.messages.splice(0, 10)
    }

    get userArray() {
        return Object.values(this.users)
    }

    sendMessage(uid, name, message) {
        this.messages.unshift(new Message(uid, name, message))
    }

    connectUser(user) {
        this.users[user.id] = user
    }

    disconnectUser(id) {
        delete this.users[id]
    }
}

module.exports = Chat
