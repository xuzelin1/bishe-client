import Sales from '../dbs/models/Sales';
import Router from 'koa-router';

let router = new Router({prefix: '/Sales'})

router.post('/salelist', async (ctx) => {
  const {
    userId,
    status,
  } = ctx.request.body;
  let salelist = await Sales.find({userId,}).populate('proId');
  ctx.body = {
    salelist,
  }
})

export default router;
