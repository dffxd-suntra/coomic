const Http = require("http");
const Koa = require('koa');
const Router = require('@koa/router');
const SocketIO = require("socket.io");

const app = new Koa();
const router = new Router();
const httpServer = Http.createServer(app.callback());
const io = new SocketIO.Server(httpServer, {});

router.get('/', (ctx, next) => {
    ctx.body = "<h1>Hello World!</h1>";
    console.log(ctx);
});

app
    .use(router.routes())
    .use(router.allowedMethods());

httpServer.listen(3000);