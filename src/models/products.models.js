import { Schema , model } from "mongoose";

const prodSchema = new Schema({
title:{
    type: String,
    required: true
},
description:{
    type: String,
    required: true
},
code:{
    type: Number,
    required: true,
    unique: true
},
price:{
    type: Number,
    required: true
},
stock:{
    type: Number,
    required: true
},
category:{
    type: String,
    required: true,
    index:true
},
status:{
    type: Boolean,
    default: true
},
thumbnails:[]
})

const prodModel = model('products' , prodSchema)

export default prodModel