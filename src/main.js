const Http = require("http");
const Koa = require("koa");
const Router = require("@koa/router");
const Session = require("koa-session");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const logger = require("koa-logger");
const SocketIO = require("socket.io");
const config = require("./config/config");
const clientip = require("koa-clientip");
const KeyGrip = require("keygrip");
const initSession = require("./method/InitSession");

const app = new Koa();
const router = new Router();
const httpServer = Http.createServer(app.callback());
const io = new SocketIO.Server(httpServer, {});
const debug = true;

app.keys = new KeyGrip(["this is my key", "this is also my key"], "sha256");

app.use(bodyParser());
app.use(Session(config.sessionConfig, app));
app.use(cors({
    origin: "*",
    allowMethods: "*",
    allowHeaders: "*"
}));
app.use(clientip());
app.use(logger());

// 只有新建的session或无登陆session才会触发
app.use(initSession());

// 以后改成router引入
if (debug) {
    router.all("/api/session/clear", (ctx, next) => {
        ctx.session = { isNew: true };
        ctx.body = { code: 200, msg: "ok" };
    });
    router.all("/api/session/list", (ctx, next) => {
        ctx.body = ctx.session;
    });
}

router.use((ctx, next) => {
    if(!ctx.session.permissions.visit_site) {
        ctx.response.status = 401;
        ctx.body = { code: 401, msg: "您没有访问主站的权限" };
        return;
    }
    next();
});

const userRouter = require("./routes/users").routes();

router.use("/api/users", userRouter);

// hold 404
router.use((ctx, next) => {
    ctx.response.status = 404;
    ctx.body = { code: 404, msg: "nothing here" };
});

app
    .use(router.routes())
    .use(router.allowedMethods());

// socket.io 适配 koa-session
io.use((socket, next) => {
    let ctx = app.createContext(socket.request, new Http.OutgoingMessage());
    socket.session = ctx.session;
    console.log(socket);
    if (socket.session.user_id == undefined) {
        socket.emit("doLogout", { msg: "you not login" });
        socket.disconnect(true);
    }
    next();
});

httpServer.listen(config.port); // default 3000

console.log(`服务器开放在本地端口： ${config.port}`);