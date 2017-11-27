// const bodyparser = require('koa-bodyparser');
//
// app.use(bodyparser({
//     enableTypes: ['json', 'form', 'text']
// }));


const koaBody = require('koa-body');
app.use(koaBody({
    multipart: true,
    encoding: 'utf-8',
    patchNode: true
}));
