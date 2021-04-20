const express = require('express')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        //Middlewares
        this.middlewares()

        //Routes
        this.routes()
    }

    middlewares(){
        this.app.use( express.static('public') )
    }

    routes(){
        this.app.get('/api', (req, res)=> {
            res.send('Hola')
        })
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server Port: ${this.port}`)
        })
    }
}

module.exports = Server