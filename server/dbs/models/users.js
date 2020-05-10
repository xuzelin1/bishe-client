import mongoose from 'mongoose'
import { url } from 'koa-router'
const Schema = mongoose.Schema
const UserSchema=new Schema({
  username:{
    type:String,
    unique:true,
    require:true,
  },
  password:{
    type:String,
    require:true,
  },
  avatar: {
    type: String,
    required: false,
  },
  email:{
    type:String,
    require:true,
  },
  pwdStrength: {
    type: Number,
    require: true,
  },
  roles: {
    type: Array,
    require: true,
  },
  forbid: {
    type: Boolean,
    require: true,
  }
})

export default mongoose.model('User',UserSchema)
