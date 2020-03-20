import Comments from '../dbs/models/comments';
import Router from 'koa-router';

let router = new Router({prefix: '/comments'})

router.post('/list', async (ctx) => {
  const {
    proId,
  } = ctx.request.body;
  let list = await Comments.find({proId}).populate('userId');
  ctx.body = {
    list,
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
      star = 5,
      content = '暂无评价',
    } = ctx.request.body;

    let newComment = await Comments.create({
      proId,
      userId: _id,
      createTime,
      star,
      content,
    })
    ctx.body = {
      newComment,
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请登录'
    }
  }
})

export default router;
