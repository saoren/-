const Router =require("koa-router")
const router = new Router()
const path =require("path")
const fs =require('fs')
const types =require('mime-types')
router.get('/',async ctx=>{
    let filepath = path.join(__dirname,"../../static/image/404.png")
    
    let file =fs.readFileSync(filepath)
    let mimetypes = types.lookup(filepath)
    ctx.set("content-type",mimetypes)

    



    ctx.body= file
})


module.exports = router
