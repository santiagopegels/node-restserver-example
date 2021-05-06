const miFormulario = document.querySelector('form')

const url = (window.location.hostname.includes('localhost'))
        ? 'http://localhost:5000/api/auth/'
        : 'https://node-curso-santip.herokuapp.com/api/auth/'

miFormulario.addEventListener('submit', ev => {
    ev.preventDefault()

    const formData = {}

    for(let element of miFormulario.elements){
        if( element.name.length > 0 ){
            formData[element.name] = element.value
        }
    }

    fetch(url + 'login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then( data => console.log(data))
    .catch(error => console.log(error))

})

        function onSignIn(googleUser) {
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
            var id_token = googleUser.getAuthResponse().id_token;
            const data = {id_token}

            fetch(url + 'google', {
                headers: {'Content-Type' : 'application/json'},
                method: 'POST',
                body: JSON.stringify(data)
            })
            .then( resp => resp.json() )
            .then( ({token}) => {
                localStorage.setItem('token', token);
                
            })
            .catch(error => console.log('algo salio mal'));
        }
        function signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });
        }