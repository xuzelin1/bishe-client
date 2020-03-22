import Product from '../dbs/models/products';
import Router from 'koa-router';

let router = new Router({prefix: '/products'})

router.post('/list', async (ctx) => {
  const {
    type = '',
    page = 1,
    count = 10,
  } = ctx.request.body;
  let res = await Product.find({type})
  // .limit(count).skip((page - 1) * count);

  ctx.body = {
    data: res,
  }
})

router.post('/salerList', async (ctx) => {
  const {
    page = 1,
    count = 10,
  } = ctx.request.body;
  if (ctx.isAuthenticated()) {
    const {
      _id,
    } = ctx.session.passport.user;
    let total = await Product.find({salerId: _id}).countDocuments();
    let res = await Product.find({salerId: _id}).populate('storeId').limit(count).skip((page - 1) * count);
    ctx.body = {
      data: res,
      total,
    }
  } else {
    ctx.body = {
      code: -1,
      msg:'请登录',
    }
  }
})


router.post('/detail', async (ctx) => {
  const {
    _id
  } = ctx.request.body;
  let data = await Product.findById({_id});
  ctx.body = {
    data,
  }
})

router.post('/guess', async (ctx) => {
  const {
    guess,
  } = ctx.request.body;
  let data = await Product.find({name:eval("/"+guess+"/i")},null,{limit:3});
  ctx.body = {
    guesslist: data,
  }
})

router.post('/create', async (ctx) => {
  const {
    name,
    price,
    oldPrice,
    desc,
    url,
    area,
    type,
    position,
    inventory,
    percapita,
    keywords,
    storeId,
  } = ctx.request.body;
  
  if (ctx.isAuthenticated()) {
    const {
      _id,
    } = ctx.session.passport.user;

    let res = await Product.create({
      name,
      price,
      oldPrice,
      desc,
      url,
      area,
      type,
      position,
      percapita: 0,
      star: 5,
      commentNum: 0,
      salenum: 0,
      inventory,
      keywords,
      storeId,
      salerId: _id,
    });
    ctx.body = {
      data: res,
    }
  } else {
    ctx.body = {
      code: -1,
      msg:'请登录',
    }
  }
})


router.post('/edit', async (ctx) => {
  const {
    _id,
    name,
    price,
    oldPrice,
    desc,
    url,
    area,
    type,
    position,
    inventory,
    keywords,
  } = ctx.request.body;

  let res = await Product.findByIdAndUpdate({_id}, {
    name,
    price,
    oldPrice,
    desc,
    url,
    area,
    type,
    position,
    inventory,
    keywords,
  }, {new: true});
  ctx.body = {
    data: res,
  }
})

export default router;
