import express from 'express'
import multer from 'multer'
import {engine} from 'express-handlebars'
import {Server} from 'socket.io'
import routerProd from './routes/product.routes.js'
import routerCart from './routes/cart.routes.js'
import routerViews from './routes/views.routes.js'
import path from 'path'
import {__dirname} from './path.js'
import { ProductManager } from './controllers/productManager.js'

const PORT = 8080
const app = express()

//Server
const server = app.listen(PORT,() => {console.log(`Server on port ${PORT}`)})

const io = new Server(server)

//Config
const storage = multer.diskStorage({destination:(req,file,cb) => {
    cb(null,'src/public/image')},
    filename:(req,file,cb) => {cb(null , `${Date.now}${file.originalname}`)}
})

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.engine('handlebars', engine())
app.set('view engine','handlebars')
app.set('views',path.resolve(__dirname,'./views'))

const upload = multer({storage: storage})

//Conexion de socket
io.on("connection", (socket) => {
    console.log("Conectado a socket.io")
    const product = new ProductManager('src/models/productos.json')
socket.on('nuevoProducto', (prod) => {
    console.log(prod)
  product.addProduct(prod)
    socket.emit("mensajeCreado" , "El producto se creo correctamente")
})
socket.on('productoEliminar', (id) => {
    console.log(id)
    product.deleteProduct(id)
    io.emit("mensajeEliminado" , "El producto se elimino correctamente")
})
})

//Routes
app.use('/static', express.static(path.join(__dirname , '/public')))
app.use('/api/products', routerProd)
app.use('api/carts', routerCart)
app.use('/realtimeproducts', routerViews)

//HBS
app.get('/static', (req,res) =>{
   res.render('realTimeProducts',{
    titulo:"RealTimeProducts",
    rutaCSS:"real",
    rutaJS:"real",
   })
})



app.post('/upload' , upload.single('product'),(req,res) => {
    console.log(req.file)
    console.log(req.body)
    res.status(200).send("imagen cargada")
}) // o fields para varias /single 1