import  { Router }  from 'express'
import  { ProductManager }  from '../controllers/productManager.js'

const prodManager = new ProductManager('src/models/productos.json')

const routerProd = Router()

routerProd.get('/', async(req,res) => {
const {limit} = req.query

const prods = await prodManager.getProducts()
const productos = prods.slice(0 , limit)
res.status(200).send(productos)
} )
routerProd.get('/:id' , async(req,res) => {
    const {id} = req.params

    try{
        const prods = await prodManager.getProductById(id)
        res.status(200).send(prods)}
        catch(error){res.status(400).send(error.message)}
})

routerProd.post('/' , async(req,res) => {
    try{
        await prodManager.addProduct(req.body)
        res.status(200).send("Producto creado correctamente")
    }
    catch(error){res.status(400).send(error.message)}
})

routerProd.put('/:id' , async(req,res) => {
    try{
    const {id} = req.params
    await prodManager.updateProduct(id , req.body)
    res.status(200).send("Producto actualizado")}
    catch(error){res.status(400).send(error.message)}
})

routerProd.delete('/:id' , async(req,res) => {
const {id} = req.params

    try{
    await prodManager.deleteProduct(id)
    res.status(200).send("Producto eliminado correctamente")}
    catch(error){res.status(400).send(error.message)}
})


export default routerProd