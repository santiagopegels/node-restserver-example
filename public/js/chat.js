
const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5000/api/auth/'
    : 'https://node-curso-santip.herokuapp.com/api/auth/'


let user = null
let socketServer = null

const txtUid = document.querySelector('#txtUid')
const txtMensaje = document.querySelector('#txtMensaje')
const connectUserList = document.querySelector('#connectUserList')
const chatList = document.querySelector('#chatList')
const btnLogout = document.querySelector('#btnLogout')

const validateJWT = async () => {

    const token = localStorage.getItem('token')

    if (!token) {
        window.location = 'index.html'
        throw new Error('No existe token')
    }

    const resp = await fetch(url, {
        headers: { 'x-token': token }
    })

    const { user: userDB, token: tokenDB } = await resp.json()

    localStorage.setItem('token', tokenDB)
    user = userDB

    document.title = user.name

    await conectSocket()

}

const conectSocket = async () => {

    const socketServer = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    })

    socketServer.on('connect', () => {
        console.log('Sockets online');
    })


    socketServer.on('disconnect', () => {
        console.log('Sockets offline');
    })

    socketServer.on('recieve-message', ()=> {
        
    })

    socketServer.on('private-message', ()=> {
        
    })

    socketServer.on('active-users', ()=> {
        
    })

}

const main = async () => {
    await validateJWT()
}

main()