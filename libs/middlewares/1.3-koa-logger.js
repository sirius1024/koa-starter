const logger = require('koa-logger');
app.use(logger());

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    Logger.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});