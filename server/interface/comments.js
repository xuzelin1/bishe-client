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

export default router;
