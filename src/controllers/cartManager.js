import { promises as fs } from  'fs'
import { v4 as uuidv4 } from 'uuid'

export class CartManager{
 constructor(path){
 this.prodsCart = []
 this.path = path
}

static aumentoId(){

    return uuidv4()
}

async crearCart() {
    const cart = JSON.parse(await fs.readFile(this.path , 'utf-8'))

   const crear = cart.push({id: CartManager.aumentoId() , products:[]})
         await fs.writeFile(this.path,JSON.stringify(cart))

    return crear
    }

    async cartById(id) {
    const cart = JSON.parse(await fs.readFile(this.path , 'utf-8'))
    const existe = cart.find(existe => existe.id === id)

    if(!existe){
     throw new Error("Producto no encontrado")
    }

    return existe}

    async cart(){
        const cart = JSON.parse(await fs.readFile(this.path , 'utf-8'))

        return cart
    }

async addProductToCart(cid , pid){
    const carts =JSON.parse(await fs.readFile(this.path , 'utf-8'))
    const carrito = carts.find(c => c.id === cid)
    const products = carrito.products
    const productCart = products.find(products => products.productid === pid)

    if(!carrito){
        throw new Error("Carrito no existe")}
    if(!productCart){
        products.push({productid:CartManager.aumentoId() , quantity : 1})
        await fs.writeFile(this.path , JSON.stringify(carts))}
    else{
        productCart.quantity++
        await fs.writeFile(this.path , JSON.stringify(carts))}
    }}