import { Router } from 'express';
import cartModel from '../models/carts.models.js';

const cartRouter = Router()

cartRouter.get('/:cid/products/:pid', async (req, res) => {
    const {cid , pid} = req.params
    try {
        const cart = await cartModel.findById(cid)
        if(cart){
        const prodId = cart.products.findIndex(prod => prod.id_prod.toString() === pid)

        if(prodId){
        res.status(200).send({ respuesta: 'OK', mensaje: `el numerito ${prodId}` })}
        }}
    catch (error) {
        res.status(400).send({error: `Error , carrito no encontrado : ${error}`})
    }
})
cartRouter.get('/:cid', async (req, res) => {
    const {cid} = req.params
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
        const cart = await cartModel.findById(cid)
        const indice = cart.products.findIndex(i => i._id === pid)
          if(indice !== -1){
            cart.products.splice(indice , 1)
            const respuesta = await cartModel.findByIdAndUpdate(cid , cart)
            res.status(200).send({respuesta: 'OK' , mensaje: respuesta})
           }else{
            res.status(404).send({respuesta: 'OK' , mensaje: "No encontrado"})}}
        catch (error) { res.status(400).send({error: `Error , el producto no encontrado en carrito : ${error}`})}
})

cartRouter.put('/:cid/products/:pid', async (req, res) => {
    const {cid , pid} = req.params
    const {quantity} = req.body
    try{
      const cart = await cartModel.findById(cid)
      const prod = cart.products.findIndex(p => p.id_prod === pid)
      if(prod > 0){
        cart.products.push({quantity : quantity + quantity})
        const respuesta = await cartModel.findByIdAndUpdate(pid, cart)
        res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
    }else{
        res.status(404).send({ respuesta: 'Error', mensaje: prod })
    }
       }catch(error){
     res.status(400).send({error: `Error , el producto no pudo ser actualizado : ${error}`})
    }
})


cartRouter.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    try {
        const cart = await cartModel.findById(cid)
        const prodId = cart.products.findIndex.toString()(i => i._id === pid)

        if(prodId === -1){
            cart.products.push({ id_prod: pid, quantity: quantity })
            await cartModel.findByIdAndUpdate(cid, cart)
            res.status(200).send({ respuesta: 'OK', message: "El producto fue agregado correctamente" })
        }
        else{
            res.status(404).send({respuesta:'Error' , message: "El producto ya existe"})
        }
    } catch (error) {
        res.status(400).send({error: `Error , ya existe el prod en este carrito: ${error}`})
    }
})

cartRouter.post('/', async (req, res) => {
    const {cid} = req.params

    try{
        const cart = await cartModel.findById(cid)
        if(!cart){
        cartModel.create({})
    res.status(200).send("cart vacio creado")}else{res.status(404).send("cart ya existe")}}
    catch(e){res.status(400).send({e : `Error , ${e}`})}
})

export default cartRouter
