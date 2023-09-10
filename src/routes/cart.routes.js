import { Router } from "express";
import cartModel from "../models/carts.models.js";

const cartRouter = Router()

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
    } catch (e) {
        res.status(400).send({ error: e })
    }
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