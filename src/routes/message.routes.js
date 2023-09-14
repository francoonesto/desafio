import { Router } from "express";
import messageModel from "../models/messages.models.js"

const messRouter = Router()

messRouter.get('/', async (req,res) => {
    try{
        const mess = await messageModel.find()
        res.status(200).send({resultado:'OK' ,message: mess})
    }
    catch(error){
     res.status(400).send({error: `Error , message no encontrado : ${error}`})
    }
})

export default messRouter