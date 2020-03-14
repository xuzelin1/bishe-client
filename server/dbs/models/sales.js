import mongoose from 'mongoose'
const Schema = mongoose.Schema
const SaleSchema=new Schema({
  proId: {
    type:String,
    require:true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require:true,
  },
  proId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    require:true,
  },
  userId: {
    type:String,
    require:true,
  },
  createTime: {
    type:String,
    require:true,
  },
  total: {
    type:Number,
    require:true,
  },
  productNum: {
    type:Number,
    require:true,
  },
  statusZh: {
    type:String,
    require:true,
  },
  status: {
    /**
     * 00: 购物车
     * 01：待付款
     * 02：待评价（已付款）
     * 03：已评价
     * 10：已取消
     * 11：已退款
     */
    type: String,
    require:true,
  }
})

export default mongoose.model('Sale',SaleSchema)
