var socket = io();

const params = new URLSearchParams( window.location.search );

if ( !params.has('name') || !params.has('room') ){
    window.location = 'index.html';
    throw new Error('name or room required')
}

const user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('enterChat', user, ( resp ) => {
        console.log('User connect', resp);
    } )
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('createMessage', {
//     name: 'Fernando',
//     msg: 'Hola Mundo'
// }, (resp) => {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('createMessage', (msg) => {
    console.log('Servidor:', msg);
});

// Escuchar cambios de usuarios
// user entra o sale del chat
socket.on('listPersons', (people) => {
    console.log('Servidor:', people);
})

// messages privadas
socket.on('messagePrivate', (msg) => {
    console.log('Message Private:', msg);
})