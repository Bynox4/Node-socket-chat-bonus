const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utilities/utilities');


const users = new Users();
io.on('connection', (client) => {
    
    client.on('enterChat', (data, cb) => {

        if ( !data.name || !data.room ){
            return cb({
                error: true,
                msg: 'name/room required'
            });
        }

        client.join(data.room);

        users.addPerson( client.id, data.name, data.room );

        client.broadcast.to(data.room).emit('listPersons', users.getPersonForRoom(data.room) );
        client.broadcast.to(data.room).emit('createMessage', createMessage('Administrador', `${ data.name } joined the chat`))

        cb(users.getPersonForRoom(data.room));
    });

    client.on('createMessage', (data, cb) => {
        const person = users.getPerson(client.id);
        const message = createMessage( person.name, data.msg )
        client.broadcast.to(person.room).emit('createMessage', message );
        cb(message);
    })

    client.on('disconnect', () => {
        const personRemoved = users.deletePerson( client.id );

        client.broadcast.to(personRemoved.room).emit('createMessage', createMessage('Administrdor', `${personRemoved.name} left the chat`));
        client.broadcast.to(personRemoved.room).emit('listPersons', users.getPersonForRoom(personRemoved.room) );
    })
    
    // Message Privados
    client.on('messagePrivate', data => {
        client.broadcast.to(data.para).emit('messagePrivate', createMessage(users.getPerson(client.id), data.msg))
    })
});