const socket = io()

const formCrear = document.getElementById('formularioDeCrear')
const formEliminar = document.getElementById('formularioDeEliminar')

formCrear.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = new FormData(e.target)
    const prod = Object.fromEntries(data)
    socket.emit('nuevoProducto', prod)

    socket.on('mensaje' , (mensaje) => {
Swal.fire(
    mensaje
    )})
    e.target.reset()
})

formEliminar.addEventListener('submit', (e) => {
    e.preventDefault()

    const dataId = new FormData(e.target)
    const id = Object.values(dataId)
    socket.emit('productoEliminar' , id)

    socket.on('mensaje' , (mensaje) => {
        Swal.fire(
            mensaje
            )})
            e.target.reset()
})

