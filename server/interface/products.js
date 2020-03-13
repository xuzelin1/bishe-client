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

export default router;
