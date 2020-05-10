import Sales from '../dbs/models/Sales';
import Router from 'koa-router';

const map = {
  '00': '购物车',
  '01': '待付款',
  '02': '待评价（已付款）',
  '03': '已评价',
  '10': '已取消',
  '11': '已退款',
}

let router = new Router({prefix: '/Sales'})

router.post('/detail', async (ctx) => {
  const {
    _id,
  } = ctx.request.body;
  const detail = await Sales.findById({_id}).populate('proId');
  ctx.body = {
    code: -1,
    detail,
  }
})

router.post('/salelist', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const {
      _id,
    } = ctx.session.passport.user;
    const {
      status = '-1',
    } = ctx.request.body;
    let salelist = {};
    if(status === '-1') {
      salelist = await Sales.find({userId: _id, status: {$gt: '00'}}).populate('proId');
    } else {
      salelist = await Sales.find({userId: _id, status}).populate('proId');
    }
    ctx.body = {
      salelist,
    }
  }
})

// 商家的订单列表
router.post('/salerList', async (ctx) => {
  const {
    storeId,
    page = 1,
    count = 10,
    createTime = '',
  } = ctx.request.body;
  let total = 0;
  let salelist = [];
  if (createTime) {
    total = await Sales.find({storeId, createTime}).countDocuments();
    salelist = await Sales.find({storeId, createTime}).populate('proId').skip((page - 1) * count).limit(count);
  } else {
    total = await Sales.find({storeId}).countDocuments();
    salelist = await Sales.find({storeId}).populate('proId').skip((page - 1) * count).limit(count);
  }
  ctx.body = {
    total,
    salelist,
  }
})

router.post('/create', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const {
      _id,
    } = ctx.session.passport.user;

    const {
      proId,
      createTime,
      total = 0,
      productNum = 1,
      status = '00',
      storeId,
    } = ctx.request.body;
    let statusZh = map[status];

    let newSale = await Sales.create({
      proId,
      userId:_id,
      createTime,
      total,
      productNum,
      status,
      statusZh,
      storeId,
    })
    ctx.body = {
      newSale,
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请登录'
    }
  }
})

router.post('/status', async (ctx) => {
  const { submitArray, status } = ctx.request.body;
  let statusZh = map[status];
  let res = [];
  for(let i in submitArray) {
    let t = await Sales.findByIdAndUpdate({_id: submitArray[i]}, {status, statusZh}, {new: true});
    res.push(t);
  }
  ctx.body = {
    code: 0,
    msg: '成功',
  }
})

router.post('/delete', async (ctx) => {
  const { submitArray } = ctx.request.body;
  for(let i in submitArray) {
    await Sales.findByIdAndDelete({_id: submitArray[i]});
  }
  ctx.body = {
    code: 0,
    msg: '成功',
  }
})

export default router;
