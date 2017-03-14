/**
 * Module dependencies.
 */
const isJSON = require('koa-is-json');
const trans = require('var-style');
const snakeToCamel = trans.snakeToCamel;
const camelToSnake = trans.camelToSnake;

module.exports = () => {
  return function transform(ctx, next) {
    ctx.query = snakeToCamel(Object.assign({}, ctx.query));

    if (ctx.request.body) {
      ctx.request.body = snakeToCamel(Object.assign({}, ctx.request.body));
    }

    return next().then(function () {
      if (isJSON(ctx.body)) {
        ctx.body = camelToSnake(Object.assign({}, ctx.body));
      }
    });
  };
};
