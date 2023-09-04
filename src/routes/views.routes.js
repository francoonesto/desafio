import { Router } from 'express'
import  { ProductManager }  from '../controllers/productManager.js'

const prodManager = new ProductManager('src/models/productos.json')

const routerViews = Router()

routerViews.get('/' , async(req,res) =>{
    const prods = await prodManager.getProducts()

    res.status(200).send(prods)
})

export default routerViews