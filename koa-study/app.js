const Koa = require('koa2')
const app =new Koa()

const {host,port} = require("./utils")

const Router =require("koa-router")
const router = new Router()

const cors =require("koa2-cors")

const static =require("koa-static")
const path =require("path")


const manage =require("./router/manage")
const nomatch =require("./router/nomatch")


//引入获取请求体
const bodyParser = require('koa-bodyparser');



router.get('/',async ctx=>{
    ctx.body= '首页数据'
})





router.use("/manage",manage.routes(),manage.allowedMethods())
router.use("/404",nomatch.routes(),nomatch.allowedMethods())
//重定向必须在配置路由的下面
app.use(async (ctx,next)=>{
    await next();//放行下一个中间件
    if(parseInt(ctx.status) === 404 ){
        ctx.response.redirect('./404')//重定向到404
    }

})


app.use(cors()) //允许跨域
app.use(bodyParser());	// bodyParser

app.use(router.routes(), router.allowedMethods())





app.use(static( path.join(__dirname, "static") ))

app.listen(port,()=>{
    console.log(`Server is running at ${host}:${port}`)
})