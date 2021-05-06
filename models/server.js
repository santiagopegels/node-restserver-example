const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { dbConnection } = require('../database/config')
const {createServer} =require('http')
const socketIO = require('socket.io')

const socketController = require('../sockets/socketController')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.server = createServer(this.app)
        this.io = socketIO(this.server)

        this.paths = {
            auth: '/api/auth',
            user: '/api/users',
            category: '/api/categories',
            product: '/api/products',
            search: '/api/search',
            upload: '/api/uploads'
        }


        //Connect DB
        this.connectingDB()

        //Middlewares
        this.middlewares()

        //Routes
        this.routes()

        //Sockets Events
        this.sockets()
    }

    middlewares() {
        //CORS
        this.app.use(cors())

        //Json Format 
        this.app.use(express.json())

        this.app.use(express.static('public'))

        //Upload File Config
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    async connectingDB() {
        await dbConnection()
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.user, require('../routes/user'))
        this.app.use(this.paths.category, require('../routes/category'))
        this.app.use(this.paths.product, require('../routes/product'))
        this.app.use(this.paths.search, require('../routes/search'))
        this.app.use(this.paths.upload, require('../routes/upload'))
    }

    sockets(){
        this.io.on('connection', socketController)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server Port: ${this.port}`)
        })
    }
}

module.exports = Server