import express from 'express'
import multer from 'multer'
import {engine} from 'express-handlebars'
import {Server} from 'socket.io'
import mongoose, { Mongoose } from 'mongoose'
import prodRouter from './routes/products.routes.js'
import cartRouter from './routes/cart.routes.js'
import messRouter from './routes/message.routes.js'
import path from 'path'
import {__dirname} from './path.js'


const PORT = 8080
const app = express()

const mensajes = []

mongoose.connect('mongodb+srv://francoonesto2001:Franco42178708@francoo.m4cx3dq.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('BDD conectada'))
.catch((error) => console.log('Error en conexion', error))

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
socket.on('mensaje' ,async (info) => {
    // const mensajes = messageModel.find(info)

//     if(mensajes == {}){
//    messageModel.createCollection(messages)
// }else{
   mensajes.push(info)
//    messageModel.create(info)
// }

    io.emit('mensajes' , mensajes)
})
})

//Routes
app.use('/static', express.static(path.join(__dirname , '/public')))
app.use('/api/products', prodRouter)
app.use('/api/carts', cartRouter)
app.use('/api/messages' , messRouter)

//HBS
// app.get('/static/form', (req,res) =>{
//    res.render('realTimeProducts',{
//     titulo:"RealTimeProducts",
//     rutaCSS:"real",
//     rutaJS:"real",
//    })
// })
app.get('/static', (req,res) =>{
    res.render('chat',{
     titulo:"chat",
     rutaCSS:"chat",
     rutaJS:"chat",
    })
 })



app.post('/upload' , upload.single('product'),(req,res) => {
    console.log(req.file)
    console.log(req.body)
    res.status(200).send("imagen cargada")
}) // o fields para varias /single 1