const Koa = require('koa');
var Router = require('koa-router');
const render = require('koa-art-template');
const app = new Koa();
const path = require('path')
var router = new Router();
render(app, {
  root: path.join(__dirname, 'view'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});
// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
router.get('/', (ctx, next) => {
  // ctx.router available
  ctx.render('index', {
    title : '跳转页'
  })
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);