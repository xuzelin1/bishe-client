import Router from 'koa-router';
import User from '../dbs/models/users';

let router = new Router({
  prefix: '/accounts',
})

router.get('/list', async (ctx) => {
  const {
    roles = 'admin',
  } = ctx.request.body;

  const result = await User.find({ roles: { $elemMatch: { $eq: roles } } }); 
  console.log(result);
})
