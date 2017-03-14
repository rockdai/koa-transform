# koa-transform
Transform request parameters style

## Useage
```js
const Koa = require('koa');
const transform = require('koa-transform');

const app = new Koa();
app.use(transform());

app.use(async ctx => {
  // the `ctx.query` and `ctx.request.body` 
  // will be transformed to camel style
  // when request /?post_id=1
  ctx.query; // -> { postId: 1 }

  // the data set to `ctx.body`
  // will be transformed to snake style
  ctx.body = { userId: 1 } // -> { user_id: 1 }
});
```
