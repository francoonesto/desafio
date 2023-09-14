import { Router } from "express";
import cartModel from "../models/carts.models.js";

const cartRouter = Router()

cartRouter.get('/', async (req, res) => {
    try {
        const cart = await cartModel.find()
        if(cart){
        res.status(200).send({ respuesta: 'OK', mensaje: cart })}
        }
    catch (error) {
        res.status(400).send({error: `Error , carrito no encontrado : ${error}`})
    }
})

cartRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params

    try {
        const cart = await cartModel.findById(cid)
        if(cart){
        res.status(200).send({ respuesta: 'OK', mensaje: cart })}
        }
    catch (error) {
        res.status(400).send({error: `Error , carrito no encontrado : ${error}`})
    }
})

cartRouter.delete('/:cid', async (req, res) => {
    const { cid } = req.params

    try {
        const cart = await cartModel.findByIdAndDelete(cid)
        if(cart){
        res.status(200).send({ respuesta: 'OK', mensaje: cart })}
        else{
        res.status(404).send({resultado:'Error' ,message: cart})
        }
        }
    catch (error) {
        res.status(400).send({error: `Error , carrito no encontrado : ${error}`})
    }
})

cartRouter.delete('/:cid/products/:pid', async (req, res) => {
    const { cid , pid } = req.params

    try {
        const cart = await cartModel.findById(cid , pid)
        if(cart){
        cart.products.splice(pid)
        const respuesta = await cartModel.findByIdAndUpdate(cid , cart)
        res.status(200).send({ respuesta: 'OK', mensaje: respuesta })}
        else{
        res.status(404).send({resultado:'Error' ,message: respuesta})
        }
        }
    catch (error) {
        res.status(400).send({error: `Error , carrito no encontrado : ${error}`})
    }
})

cartRouter.put('/:cid', async (req, res) => {
    const {cid} = req.params
    const {quantity} = req.body
    try{
      const respuesta = await prodModel.findByIdAndUpdate(cid , {quantity})
      if(respuesta){
      res.status(200).send({resultado:'OK' ,message: respuesta})
}else{res.status(404).send({resultado:'Error' ,message: respuesta})}
}
    catch(error){
     res.status(400).send({error: `Error , el producto no pudo ser actualizado : ${error}`})
    }
})


cartRouter.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            cart.products.push({ id_prod: pid, quantity: quantity })
            const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
            res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
        }
    } catch (error) {
        res.status(400).send({error: `Error , carrito no encontrado : ${error}`})
    }
})

cartRouter.post('/', async (req, res) => {
    try{cartModel.create({})
    res.status(200).send("cart vacio creado")}
    catch(e){res.status(400).send({e : `Error , carrito ya creado`})}
})

export default cartRouter
// import { CartManager } from '../controllers/cartManager.js'

// const cartManager = new CartManager('src/models/carrito.json')

// const routerCart = Router()

// routerCart.post('/' , async (req,res) =>{

//     try{
//         await cartManager.crearCart()
//         res.status(200).send("Cart creado")}
//     catch{res.status(400).send("No pudo crearse")}
// })

// routerCart.get('/' , async (req,res) => {

//     const cart = await cartManager.cart()

//     res.status(200).send(cart)

// })

// routerCart.get('/:cid' , async (req,res) => {
//         try{
//             const {cid} = req.params
//             const cart = await cartManager.cartById(cid)
//             res.status(200).send(cart)
//         }
//         catch(error){res.status(400).send(error.message)}
//     })

//     routerCart.post('/:cid/product/:pid' , async (req,res) =>{
// try{
//      await cartManager.addProductToCart(req.params.cid , req.params.pid)
//      res.status(200).send("creado")}
//     catch(error){res.status(400).send(error.message)}
//     })

// export default routerCart