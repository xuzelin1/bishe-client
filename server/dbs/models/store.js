import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ProductSchema=new Schema({
  name: {
    type:String,
    require:true,
  },
  position: {
    type:String,
    require:true,
  },
  introduction: {
    type:String,
    require:true,
  },
  salerId: {
    type:String,
    require:true,
  },
})

export default mongoose.model('Store',ProductSchema)
