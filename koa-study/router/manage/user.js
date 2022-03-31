const { returnMsg, queryFn, jwtVerify } = require("../../utils");
const moment = require('moment')
const Router = require("koa-router");
const router = new Router();



router.get("/", async (ctx) => {
    let sql = `SELECT id,username,email,avatar,authority,isban FROM user`;
    let result = await queryFn(sql);
    ctx.body = returnMsg(0,'success', result);

});
router.post("/edit", async (ctx) => {
    let { username,authority } = ctx.request.body;

    let token =ctx.request.headers['cms-token']
    
    //鉴权
    if(!jwtVerify(token)){
      ctx.body = returnMsg(2, 'token过期或不存在');
      return;
  }

  let sql1 = `SELECT * FROM user WHERE username='${username}'`
  let result1 = await queryFn(sql1)
  if(result1.length === 0 ){
      ctx.body = returnMsg(2, '用户不存在')
      return
  }
  if(authority === ''){
    ctx.body = returnMsg(2, '参数错误')
    return
  }

    let sql = `UPDATE user SET authority='${authority}'  WHERE username='${username}'`;
    let result = await queryFn(sql);
    ctx.body = returnMsg(0,'success', result);

});
module.exports = router;