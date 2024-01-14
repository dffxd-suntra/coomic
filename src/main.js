// prepare
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

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const initSession = require("./method/InitSession");
const app = new Koa();
const router = new Router({ prefix: "/v1/" });
const httpServer = Http.createServer(app.callback());
const io = new SocketIO.Server(httpServer, {});
const debug = argv.dev == "true";

app.keys = new KeyGrip(["this is my key", "this is also my key"], "sha256");

app.use(bodyParser());
app.use(Session(config.sessionConfig, app));
app.use(cors({ // 如无需cors请删除
    origin: "*",
    allowMethods: "*",
    allowHeaders: "*"
}));
app.use(clientip());
app.use(logger());
app
    .use(initSession())
    .use(router.routes())
    .use(router.allowedMethods())
    .use((ctx) => {// hold 404
        ctx.response.status = 404;
        ctx.body = { code: 404, msg: "nothing here" };
    });

// website
if (debug) {
    console.log("DEBUG mode on.");
    router.all("session/clear/", (ctx) => {
        ctx.session = null;
        ctx.body = { code: 200, msg: "ok" };
    });
    router.all("session/list/", (ctx) => {
        ctx.body = ctx.session;
    });
    router.all("ctx/", (ctx) => {
        console.log(ctx);
        ctx.body = { code: 200, msg: "ok" };
    });
    router.all("params/:user_id(\\d{1,9})?/", (ctx) => {
        console.log(ctx);
        ctx.body = { code: 200, msg: "ok" };
    });
}

const userRouter = require("./routes/users").routes();
router.use("users/", userRouter);

// socket.io 适配 koa-session
io.use((socket, next) => {
    let ctx = app.createContext(socket.request, new Http.OutgoingMessage());
    socket.session = ctx.session;
    console.log(socket);
    if (ctx.session.is_login != true) {
        socket.emit("doLogout", { msg: "you must login" });
        socket.disconnect(true);
        return;
    }
    next();
});

httpServer.listen(config.port); // default 3000

console.log(`服务器开放在本地: http://localhost:${config.port}/`);

function cleanup() {
    console.log("应用已关闭.");
}
process.on("exit", cleanup);

process.on("SIGINT", function () {
    process.exit(0);
});