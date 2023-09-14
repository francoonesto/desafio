// const socket = io()

// const formCrear = document.getElementById('formularioDeCrear')
// const formEliminar = document.getElementById('formularioDeEliminar')
// const formCart = document.getElementById('formularioDeCarrito')

// formCrear.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const data = new FormData(e.target)
//     const prod = Object.fromEntries(data)
//     console.log(prod)
//     socket.emit('nuevoProducto', prod)
//     socket.on('mensajeCreado' , (mensaje) => {
//            Swal.fire(
//              mensaje)
//     })
//     e.target.reset()
// })

// formEliminar.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const dataId = new FormData(e.target)
//     const id = Object.fromEntries(dataId)
//     console.log(id)
//     socket.emit('productoEliminar' , id)
//     socket.on('mensajeEliminado' , (mensaje) => {
//         Swal.fire(
//             mensaje
//             )})
//             e.target.reset()
// })

// formCart.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const data = new FormData(e.target)
//     const cartId = Object.fromEntries(data)
//     console.log(cartId)
//     socket.emit('nuevoCart', cartId)
//     socket.on('mensaggeCreado' , (mensaje) => {
//            Swal.fire(
//              mensaje)
//     })
//     e.target.reset()
// })