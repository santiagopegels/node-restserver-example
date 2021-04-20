const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.userAPIPath = '/api/users'

        //Middlewares
        this.middlewares()

        //Routes
        this.routes()
    }

    middlewares(){
        //CORS
        this.app.use(cors())

        //Json Format 
        this.app.use(express.json())

        this.app.use( express.static('public') )
    }

    routes(){
        this.app.use(this.userAPIPath, require('../routes/user'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server Port: ${this.port}`)
        })
    }
}

module.exports = Server