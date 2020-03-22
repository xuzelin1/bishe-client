import Store from '../dbs/models/store';
import Router from 'koa-router';

let router = new Router({prefix: '/stores'})

router.get('/getMyStoreInfo', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const {
      _id,
    } = ctx.session.passport.user;
    console.log(_id)
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

export default router;
