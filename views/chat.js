let socket = io()

const mensaje = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const mail = document.getElementById('handle');
const btnProduct = document.getElementById('submitProduct');

btn.addEventListener('click',(e)=>{
    console.log("se emitio el evento");
    socket.emit('chat-message',{
        mensaje: mensaje.value,
        mail: mail.value
    })
    console.log(mensaje.value)
    console.log(mail.value) 
    mensaje.value = "";
})

// Eventos de los sockets

socket.on('chat-message', (data)=>{
    console.log("volvio a recibir el evento");
    console.log(data)
    renderChat(data);
})


function renderChat(mensajes){
    output.innerHTML = ""
    mensajes.forEach( (data)=>{
        output.innerHTML += `<p><strong>${data.mail}: </strong>${data.mensaje}</p>`
    })
};