import Router from 'koa-router';
import User from '../dbs/models/users';

let router = new Router({
  prefix: '/accounts',
})

router.post('/list', async (ctx) => {
  const {
    roles = 'admin',
  } = ctx.request.body;

  const list = await User.find({ roles: { $elemMatch: { $eq: roles } } });
  ctx.body = {
    code: 0,
    list,
  }
})

router.post('/create', async (ctx) => {
  const {
    username,
    password,
    email,
    avatar,
    pwdStrength,
    roles = ['admin'],
    forbid = false,
  } = ctx.request.body;
  const res = await User.create({
    username,
    password,
    email,
    avatar,
    pwdStrength,
    roles,
    forbid,
  })
  ctx.body = {
    code: 0,
    res,
  };
})

router.post('/forbid', async (ctx) => {
  const {
    _id,
    curForbid,
  } = ctx.request.body;
  let forbid = !curForbid;

  await User.findByIdAndUpdate({_id}, {$set: {forbid}}, {new: true}, (err, doc, res) => {
    ctx.body = {
      code: 0,
      data: doc,
    };
  })
})

export default router;