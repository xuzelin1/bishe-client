import Product from '../dbs/models/products';
import Router from 'koa-router';

let router = new Router({prefix: '/products'})

router.post('/list', async (ctx) => {
  const {
    type,
  } = ctx.request.body;
  let res = await Product.find({type});
  ctx.body = {
    data: res,
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

export default router;
