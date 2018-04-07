const Koa = require('koa');
const app = new Koa();
const path = require('path');
const router = require('koa-simple-router');
const serve = require('koa-static');
const convert = require('koa-convert');
const render = require('koa-swig');
const co = require('co');
//静态文件资源
app.use(convert(serve(path.join(__dirname,'./public'))));
//路由
app.use(router(_ => {
    _.get('/', (ctx, next) => {
        ctx.body = 'hello'
    });
    _.get('/index', (ctx, next) => {
        ctx.body = {
            data: 123
        }
    }) ;
    //app.use(async ctx => ctx.body = await ctx.render('index'));
    _.get('/html',async (ctx, next) => {
        ctx.body = await ctx.render('index');
    })
}));

//koa v2.x 支持的文件模板
app.context.render = co.wrap(render({
    root: path.join(__dirname, 'views'),
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    writeBody: false
}));

// app.use(async ctx => ctx.body = await ctx.render('index'));

app.listen(3000, () => {
    console.log("sever started")
});