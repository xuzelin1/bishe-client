import mongoose from 'mongoose'
const Schema = mongoose.Schema
const CommentSchema=new Schema({
  proId: {
    type:String,
    require:true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require:true,
  },
  createTime: {
    type:String,
    require:true,
  },
  star: {
    type:Number,
    require: true,
  },
  content: {
    type:String,
    require:true,
  },
})

export default mongoose.model('Comment',CommentSchema)
