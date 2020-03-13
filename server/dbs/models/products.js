import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ProductSchema=new Schema({
  name: {
    type:String,
    require:true,
  },
  price: {
    type:String,
    require:true,
  },
  oldPrice: {
    type:String,
    require:true,
  },
  desc: {
    type:String,
  },
  url: {
    type:String,
    require:true,
  },
  area: {
    type:String,
    require:true,
  },
  salenum: {
    type:Number,
    require:true,
  },
  type: {
    type:String,
    require:true,
  },
  salerId: {
    type:Number,
    require:true,
  },
  commentNum: {
    type:Number,
    require:true,
  },
  star: {
    type:Number,
    require:true,
  },
  position: {
    type:String,
    require:true,
  },
  percapita: {
    type:Number,
    require:true,
  },
})

export default mongoose.model('Product',ProductSchema)
