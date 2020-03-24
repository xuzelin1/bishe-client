import Store from '../dbs/models/store';
import Router from 'koa-router';

let router = new Router({prefix: '/stores'})

router.get('/getMyStoreInfo', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const {
      _id,
    } = ctx.session.passport.user;
    let res = await Store.findOne({salerId: _id})
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
    position,
    introduction,
  } = ctx.request.body;

  let res = await Store.findByIdAndUpdate({_id}, {
    name,
    position,
    introduction,
  }, {new: true});
  ctx.body = {
    data: res,
  }
})

export default router;
