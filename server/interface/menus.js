import Menu from '../dbs/models/menu';
import Router from 'koa-router';

let router = new Router({prefix: '/menus'})

router.get('/list', async (ctx) => {
  let res = await Menu.find()
  ctx.body = {
    data: res,
  }
})

router.post('/create', async (ctx) => {
  const {
    key,
    title,
    childs,
    hot,
  } = ctx.request.body;
  try {
    let res = await Menu.create({
      key,
      title,
      childs,
      hot,
    }, {new: true});
    ctx.body = {
      code: 0,
      data: res,
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e,
    }
  }
})

router.post('/edit', async (ctx) => {
  const {
    _id,
    key,
    title,
    childs,
  } = ctx.request.body;

  let res = await Menu.findByIdAndUpdate({_id}, {
    key,
    title,
    childs,
  }, {new: true});
  ctx.body = {
    data: res,
  }
})

export default router;
