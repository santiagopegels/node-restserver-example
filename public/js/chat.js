
const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5000/api/auth/'
    : 'https://node-curso-santip.herokuapp.com/api/auth/'


let user = null
let socketServer = null

const txtUid = document.querySelector('#txtUid')
const txtMessage = document.querySelector('#txtMessage')
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

    socketServer = io({
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

    socketServer.on('receive-message', (payload) => {
        console.log(payload)
    })

    socketServer.on('private-message', () => {

    })

    socketServer.on('active-users', drawUsers)
}

const drawUsers = (users = []) => {

    let usersHtml = ''

    users.forEach(({ name, uid }) => {

        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${name}</h5>
                    
                    <span class="fs-6 text-muted">${uid}</span>
                </p>
            </li>
        `
    });

    connectUserList.innerHTML = usersHtml
}

txtMessage.addEventListener('keyup', ({ keyCode }) => {
    const message = txtMessage.value
    const uid = txtUid.value
    if (keyCode !== 13) { return; }

    if(message.length === 0) {return;}

    socketServer.emit('send-message', {message, uid})

})

const main = async () => {
    await validateJWT()
}

main()