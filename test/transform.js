const request = require('supertest');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const transform = require('../');

describe('transform middleware', () => {

  describe('request query', () => {
    let app;

    beforeEach(async () => {
      app = new Koa();

      app.use(transform());
      app.use(async ctx => ctx.body = JSON.stringify(ctx.query));
    });

    it('make snake to camel', async () => {
      await request(app.listen())
        .get('/?user_id=1&post_id=2&_=3')
        .expect(200)
        .expect('{"userId":"1","postId":"2","_":"3"}');
    });
  });

  describe('request body', () => {
    let app;

    beforeEach(async () => {
      app = new Koa();

      app.use(bodyParser());
      app.use(transform());

      app.use(async ctx => ctx.body = JSON.stringify(ctx.request.body));
    });

    it('make snake to camel', async () => {
      await request(app.listen())
        .post('/')
        .send({ user_id: 1, post_id: 2, _: 3 })
        .expect(200)
        .expect('{"userId":1,"postId":2,"_":3}');
    });
  });

  describe('response body', () => {
    let app;

    beforeEach(async () => {
      app = new Koa();

      app.use(transform());
      app.use(async ctx => {
        ctx.body = {
          userId: 1,
          postId: 2,
          TestId: 3,
        };
      });
    });

    it('make camel to snake', async () => {
      await request(app.listen())
        .get('/')
        .expect(200)
        .expect({ user_id: 1, post_id: 2, _test_id: 3 });
    });
  });
});
