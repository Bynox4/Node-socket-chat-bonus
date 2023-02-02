// referencias de jQuery
const divUsuarios = $('#divUsuarios');
const formSent = $('#formSent');
const txtMessage = $('#txtMessage');
const divChatbox = $('#divChatbox');


// Funciones para renderizar usuarios
const renderUsers = ( persons ) => {

    console.log(persons);

    let html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> '+ params.get('room') +'</span></a>';
    html += '</li>';


    for (let i = 0; i < persons.length; i++) {
        html += '<li>';
        html += '    <a data-id="' + persons[i].id + '"  href="javascript:void(0)"><img src="assets/images/users/person.svg" alt="user-img" class="img-circle"> <span>' + persons[i].name + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }
    divUsuarios.html(html)
}

const renderMessages = ( msg, I ) => {
    let html = '';
    let date = new Date(msg.date);
    let hour = date.getHours() + ':' + date.getMinutes();

    let adminClass = 'info';
    if (msg.name === 'Administrador') {
        adminClass = 'danger';
    }

    if (I) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + msg.name + '</h5>';
        html += '        <div class="box bg-light-inverse">' + msg.msg + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/person.svg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hour + '</div>';
        html += '</li>';

    } else {

        html += '<li class="animated fadeIn">';

        if (msg.name !== 'Administrador') {
            html += '    <div class="chat-img"><img src="assets/images/users/person.svg" alt="user" /></div>';
        }

        html += '    <div class="chat-content">';
        html += '        <h5>' + msg.name + '</h5>';
        html += '        <div class="box bg-light-' + adminClass + '">' + msg.msg + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hour + '</div>';
        html += '</li>';

    }
    divChatbox.append(html);
}

const scrollBottom = () =>{

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


// Listeners
divUsuarios.on('click', 'a', function() {

    const id = $(this).data('id');

    if (id) {
        console.log(id);
    }

});

formSent.on('submit', (e) =>{
    e.preventDefault();

    if(txtMessage.val().trim().length === 0){
        return;
    }
    socket.emit('createMessage', {
        name: nameU,
        msg: txtMessage.val()
    }, (msg) => {
        txtMessage.val('').focus();
        renderMessages(msg, true);
        scrollBottom()
    });
});

