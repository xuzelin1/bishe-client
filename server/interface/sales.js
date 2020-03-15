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

export default router;
