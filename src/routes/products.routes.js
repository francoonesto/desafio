import  { Router }  from 'express'
import prodModel from '../models/products.models.js'
// import  { ProductManager }  from '../controllers/productManager.js'

// const prodManager = new ProductManager('src/models/productos.json')

const prodRouter = Router()

prodRouter.get('/', async (req,res) => {
    const {limit} = req.body
    try{
      const prods = await prodModel.find().limit(limit)
      res.status(200).send({resultado:'OK' ,message: prods})
    }
    catch(error){
     res.status(400).send({error: `Error , producto no encontrado : ${error}`})
    }
})

prodRouter.get('/:id', async (req,res) => {
    const {id} = req.params
    try{
      const prod = await prodModel.findById(id)
      if(prod){
      res.status(200).send({resultado:'OK' ,message: prod})
      }else{
        res.status(404).send({resultado:'Error' ,message: prod})
      }
    }
    catch(error){
     res.status(400).send({error: `Error , producto no encontrado : ${error}`})
    }
})

prodRouter.put('/:id', async (req,res) => {
    const {id} = req.params
    const {title,description,price,code,category,stock,status} = req.body
    try{
      const respuesta = await prodModel.findByIdAndUpdate(id , {title,description,price,code,category,stock,status})
      if(respuesta){
      res.status(200).send({resultado:'OK' ,message: respuesta})
}else{res.status(404).send({resultado:'Error' ,message: respuesta})}
}
    catch(error){
     res.status(400).send({error: `Error , el producto no pudo ser actualizado : ${error}`})
    }
})

prodRouter.delete('/:id' , async(req,res) => {
    const {id} = req.params

    try{
        const respuesta = await prodModel.findByIdAndDelete(id)
        if(respuesta){
          res.status(200).send({resultado:'OK' ,message: respuesta})
    }else{res.status(404).send({resultado:'Error' ,message: respuesta})}
    }
      catch(error){
       res.status(400).send({error: `Error , el producto no pudo ser eliminado : ${error}`})
      }
  })

prodRouter.post('/', async (req,res) => {
    const {title,description,price,code,category,stock} = req.body
    try{
      const respuesta = await prodModel.create({title,description,price,code,category,stock})
      if(respuesta){
        res.status(200).send({resultado:'OK' ,message: respuesta})
  }else{res.status(404).send({resultado:'Error' ,message: respuesta})}
  }
    catch(error){
     res.status(400).send({error: `Error , el producto no pudo ser creado : ${error}`})
    }
})

export default prodRouter







// routerProd.get('/', async(req,res) => {
// const {limit} = req.query

// const prods = await prodManager.getProducts()
// const productos = prods.slice(0 , limit)
// res.status(200).send(productos)
// } )
// routerProd.get('/:id' , async(req,res) => {
//     const {id} = req.params

//     try{
//         const prods = await prodManager.getProductById(id)
//         res.status(200).send(prods)}
//         catch(error){res.status(400).send(error.message)}
// })

// routerProd.post('/' , async(req,res) => {
//     try{
//         await prodManager.addProduct(req.body)
//         res.status(200).send("Producto creado correctamente")
//     }
//     catch(error){res.status(400).send(error.message)}
// })

// routerProd.put('/:id' , async(req,res) => {
//     try{
//     const {id} = req.params
//     await prodManager.updateProduct(id , req.body)
//     res.status(200).send("Producto actualizado")}
//     catch(error){res.status(400).send(error.message)}
// })

// routerProd.delete('/:id' , async(req,res) => {
// const {id} = req.params

//     try{
//     await prodManager.deleteProduct(id)
//     res.status(200).send("Producto eliminado correctamente")}
//     catch(error){res.status(400).send(error.message)}
// })


// export default routerProd