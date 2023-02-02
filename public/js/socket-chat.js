const socket = io();

const params = new URLSearchParams(window.location.search);

const nameU = params.get('name');
const room = params.get('room');

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('name or room required');
}

const usuario = {
    name: nameU,
    room
};



socket.on('connect', () => {
    console.log('Conectado al servidor');

    socket.emit('enterChat', usuario, (resp) => {
        // console.log('Usuarios conectados', resp);
        renderUsers(resp);
    });

});

// escuchar
socket.on('disconnect', () => {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     nombre: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('createMessage', (msg) => {
    // console.log('Servidor:', mensaje);
    renderMessages(msg, false);
    scrollBottom();
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listPersons', (personas) => {
    renderUsers(personas);
});

// Mensajes privados
socket.on('messagePrivate', (mensaje) => {

    console.log('Mensaje Privado:', mensaje);

});