const socket = io()

const formCrear = document.getElementById('formularioDeCrear')
const formEliminar = document.getElementById('formularioDeEliminar')

formCrear.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = new FormData(e.target)
    const prod = Object.fromEntries(data)
    console.log(prod)
    socket.emit('nuevoProducto', prod)
    socket.on('mensajeCreado' , (mensaje) => {
           Swal.fire(
             mensaje)
    })
    e.target.reset()
})

formEliminar.addEventListener('submit', (e) => {
    e.preventDefault()

    const dataId = new FormData(e.target)
    const data = Object.fromEntries(dataId)
    const id = JSON.stringify(data)
    console.log(id)
    socket.emit('productoEliminar' , id)
    socket.on('mensajeEliminado' , (mensaje) => {
        Swal.fire(
            mensaje
            )})
            e.target.reset()
})

