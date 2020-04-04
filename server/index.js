const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

import bodyParser from 'koa-bodyparser'

import users from './interface/users';
import geo from './interface/geo';
import search from './interface/search';
import categroy from './interface/categroy'
import products from './interface/products'
import comments from './interface/comments'
import sales from './interface/sales'
import stores from './interface/stores'
import menus from './interface/menus'
import accounts from './interface/accounts'

import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import mongoose from 'mongoose'
mongoose.set('useFindAndModify', false)

const app = new Koa()
app.keys = ['xzl', 'keyskeys']
app.use(session({key: 'xzl', prefix: 'xzl:uid', store: new Redis()}))
app.use(json()) 
app.use(bodyParser({
  extendTypes:['json','form','text']
}))

mongoose.connect(dbConfig.dbs,{
  useNewUrlParser:true
})

app.use(passport.initialize())
app.use(passport.session())
  app.use(categroy.routes()).use(categroy.allowedMethods())

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(users.routes()).use(users.allowedMethods());
  app.use(geo.routes()).use(geo.allowedMethods());
  app.use(search.routes()).use(search.allowedMethods());
  app.use(categroy.routes()).use(categroy.allowedMethods())
  app.use(products.routes()).use(products.allowedMethods())
  app.use(comments.routes()).use(comments.allowedMethods())
  app.use(sales.routes()).use(sales.allowedMethods())
  app.use(stores.routes()).use(stores.allowedMethods())
  app.use(menus.routes()).use(menus.allowedMethods())
  app.use(accounts.routes()).use(accounts.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
