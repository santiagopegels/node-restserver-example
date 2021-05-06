
const url = (window.location.hostname.includes('localhost'))
? 'http://localhost:5000/api/auth/'
: 'https://node-curso-santip.herokuapp.com/api/auth/'


let user = null
let socket =null

const validateJWT = async () => {

    const token = localStorage.getItem('token')

    if(!token) {
    window.location = 'index.html'
        throw new Error('No existe token')
    }

    const resp = await fetch(url, {
        headers : {'x-token': token}
    })
    
    const {user: userDB, token: tokenDB} = await resp.json()
    
    localStorage.setItem('token', tokenDB)
    user = userDB

}

const main = async() => {
    await validateJWT()
}

main()
//const socket = io()