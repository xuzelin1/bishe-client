import Router from 'koa-router';
import Redis from 'koa-redis';
import nodeEmail from 'nodemailer';
import User from '../dbs/models/users';
import Passport from './utils/passport';
import Email from '../dbs/config';
import axios from './utils/axios';

let router = new Router({
  prefix: '/users',
})

let Store = new Redis().client;

// 注册接口
router.post('/signup', async (ctx) => {
  const {
    username,
    password,
    email,
    code,
    pwdStrength,
  } = ctx.request.body;

  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code');
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码过期，请重试',
        };
        return false;
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请输入正确的验证码',
      };
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码',
    };
  }

  let user = await User.find({username});
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '该用户名已被注册',
    };
    return;
  }
  let nuser = await User.create({username, password, email, pwdStrength});
  if (nuser) {
    let res = await axios.post('/users/signin', {username, password});
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user,
      };
    } else {
      ctx.body = {
        code: -1,
        msg: 'error',
      };
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败',
    };
  }
})

// 登录接口
router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err,
      }
    } else {
      if (user) {
        ctx.cookies.set(
          'username',
          user.username,
        )
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user,
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info,
        }
      }
    }
  })(ctx, next)
})

// 验证接口
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username;
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '请求过于频繁，请稍后重试',
    };
    return false;
  }
  let transporter = nodeEmail.createTransport({
    service: 'qq',
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass,
    },
  })

  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username,
  };
  let mailOptions = {
    from: `认证邮件 <${Email.smtp.user}>`,
    to: ko.email,
    subject: '《广东工业大学学生团购网》注册码',
    html: `您的邀请码是${ko.code}，请勿泄露给未知人员。如果非本人操作，请忽略此邮件`,
  }
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err);
    } else {
      Store.hmset(`nodemail:${ko.user}`, code, ko.code, 'expire', ko.expire, 'email', ko.email);
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，有效期为1分钟',
  };
})

// 退出接口
router.get('/exit', async (ctx, next) => {
  await ctx.logout();
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0,
    };
  } else {
    ctx.body = {
      code: -1,
    };
  }
})

// 获取用户信息接口
router.get('/getUser', async (ctx) => {
  let res = ctx.response;
  if (ctx.isAuthenticated()) {
    const {
      _id,
    } = ctx.session.passport.user;
    const result = await User.findById({_id})
    const {
      username,
      email,
      avatar,
      pwdStrength,
    } = result;
    ctx.body = {
      user: username,
      email,
      _id,
      avatar,
      pwdStrength,
    };
  }
})

// 编辑头像
router.post('/avatar', async (ctx) => {
  let {
    _id,
    avatar,
  } = ctx.request.body;
  await User.findOneAndUpdate({_id}, {$set: {avatar: avatar}}, {new: true}, (err, doc, res) => {
    console.log('doc: ',doc, 'res: ', res);
    ctx.body = {
      code: 0,
      msg: '修改成功',
    };
  });
})

// 编辑邮箱
router.post('/email', async (ctx) => {
  if (ctx.isAuthenticated()) {
    let _id = ctx.request.body._id;
    let email = ctx.request.body.email;
    await User.findByIdAndUpdate({_id}, {$set: {email}}, {new: true}, (err, doc, res) => {
      console.log(err, doc, res);
      ctx.body = {
        code: 0,
        data: doc,
      };
    })
  }
})

// 修改昵称
router.post('/username', async (ctx) => {
  if (ctx.isAuthenticated()) {
    let _id = ctx.request.body._id;
    let username = ctx.request.body.username;
    await User.findByIdAndUpdate({_id}, {$set: {username}}, {new: true}, (err, doc, res) => {
      console.log(err, doc, res);
      ctx.body = {
        code: 0,
        data: doc,
      };
    })
  }
})

// 修改密码
router.post('/password', async (ctx) => {
  if (ctx.isAuthenticated()) {
    let _id = ctx.request.body._id;
    let {
      prePassword,
      newPassword,
      confirmPassword,
      pwdStrength,
    } = ctx.request.body;
    if (ctx.isAuthenticated()) {
      let res = await User.findById({_id});
      if(res.password !== prePassword) {
        ctx.body = {
          code: -1,
          msg: '密码错误',
        }
      }
      else if(confirmPassword !== newPassword) {
        ctx.body = {
          code: -1,
          msg: '两次密码不同',
        }
      } else {
        await User.findByIdAndUpdate({_id}, {$set: {password: newPassword, pwdStrength,}}, {new: true}, (err, doc, res) => {
          ctx.body = {
            code: 0,
            data: doc,
          };
        })
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请重新登录',
      }
    }
  }
})

export default router;
