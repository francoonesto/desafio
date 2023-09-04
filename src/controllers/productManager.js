import { promises as fs } from  'fs'
import { v4 as uuidv4 } from 'uuid'


export  class ProductManager {
    constructor(path) {
     this.products = []
     this.path = path
    }

    static aumentoId(){

        return uuidv4()
    }

async addProduct(prod) {
    const products = JSON.parse(await fs.readFile(this.path , 'utf-8'))
    const existe = products.find(producto => producto.code === prod.code)

    if(existe){
        throw new Error("Producto ya existe")}
    else{
        prod.id = ProductManager.aumentoId()
        products.push(prod)
        await fs.writeFile(this.path , JSON.stringify(products))
    }}

async getProducts() {
const products = JSON.parse(await fs.readFile(this.path , 'utf-8'))

return products
}
async getProductById (id) {
    const products = JSON.parse(await fs.readFile(this.path , 'utf-8'))
    const prod = products.find(prod => prod.id === id)

if(!prod){
    throw new Error(`Producto no encontrado`)
}

    return prod}

async updateProduct (id , {title ,description,code,price,stock,category}){
    const products = JSON.parse(await fs.readFile(this.path , 'utf-8'))
    const indice = products.findIndex(product => product.id === id)

    if (!indice) {
throw new Error("Producto no existe")
    }
    else{
        products[indice].title = title
        products[indice].description = description
        products[indice].code = code
        products[indice].price = price
        products[indice].stock = stock
        products[indice].category = category

        await fs.writeFile(this.path , JSON.stringify(products))
    }
    }
async deleteProduct(id) {
    const products = JSON.parse(await fs.readFile(this.path , 'utf-8'))
    const prods = products.find(pro => pro.id === id)
    if(!prods)
    {throw new Error("Producto no existe")}
    else
    {await fs.writeFile(this.path , JSON.stringify(products.filter(p => p.id != id )))}}
}


