const socket = io()

const botonChat = document.getElementById('botonChat')
const mensajes = document.getElementById('mensajes')
const value = document.getElementById('chatBox')

let user

Swal.fire({
    title: "Identificarse",
    text: "Ingrese su email",
    input: "text",
    inputValidator: (valor) => {
        return !valor && 'Ingrese un email valido'
    },
    allowOutsideClick:false
}).then(resultado => {
    user= resultado.value
    console.log(user)
})

botonChat.addEventListener('click' , () => {
    let hora = new Date().toLocaleString()
    if(value.value.trim().length > 0) {
        socket.emit('mensaje' , {hora:hora , user:user , mensaje: value.value})
        value.value = ""
    }
})

socket.on('mensajes' , arrayMensajes => {
    mensajes.innerHTML = ""
    arrayMensajes.forEach(mensaje =>{
    mensajes.innerHTML  += `<p>${mensaje.user}:${mensaje.mensaje}<br>[${mensaje.hora}]</p>`
    })
})
