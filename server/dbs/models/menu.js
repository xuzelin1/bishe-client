import mongoose from 'mongoose'
const Schema = mongoose.Schema
const MenuSchema=new Schema({
  key:{
    type:String,
    unique:true,
    require:true,
  },
  childs:{
    type: Array,
    require:true,
  },
  title: {
    type: String,
    required: false,
  },
  hot: {
    type: Number,
    require: false,
  }
})

export default mongoose.model('Menu',MenuSchema)
