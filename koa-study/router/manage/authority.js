const { returnMsg, queryFn, jwtVerify} = require("../../utils");
const jwt = require("jsonwebtoken");
const Router = require("koa-router");
const router = new Router();

router.get("/", async (ctx) => {
        let sql = `SELECT authority FROM authority WHERE status=0`;
        let result = await queryFn(sql);
        ctx.body = returnMsg(0,'success', result);

  });
  router.post("/", async (ctx) => {

    let token =ctx.request.headers['cms-token']
    //鉴权
    if(!jwtVerify(token)){
      ctx.body = returnMsg(2, 'token过期或不存在');
      return;
  }

    ctx.body = returnMsg(0, 'success','token正常');


});
router.post("/add", async (ctx) => {
    let { name, disable } = ctx.request.body;

    let token =ctx.request.headers['cms-token']
    
    //鉴权
    if(!jwtVerify(token)){
      ctx.body = returnMsg(2, 'token过期或不存在');
      return;
  }

  let sql_ = `SELECT username,authority FROM user WHERE token='${token}'`;
  let result_ = await queryFn(sql_);
  if(result_.length>0){
      if(result_[0].authority !== 'super'){
        ctx.body = returnMsg(2, "没有权限");
        return
      }

  }


    disable == 1 ? disable : disable=0
    let sql = `INSERT INTO authority VALUES (null,'${name}',${disable})`;
    let result = await queryFn(sql);
    ctx.body = returnMsg(0,'success', result);

});

router.post("/update", async (ctx) => {
  let { name, disable } = ctx.request.body;

  let token =ctx.request.headers['cms-token']
  
  //鉴权
  if(!jwtVerify(token)){
    ctx.body = returnMsg(2, 'token过期或不存在');
    return;
}

let sql_ = `SELECT username,authority FROM user WHERE token='${token}'`;
let result_ = await queryFn(sql_);
if(result_.length>0){
    if(result_[0].authority !== 'super'){
      ctx.body = returnMsg(2, "没有权限");
      return
    }

}
  disable == 1 ? disable : disable=0
  let sql = `UPDATE authority SET status=${disable} WHERE authority='${name}'`;
  let result = await queryFn(sql);
  ctx.body = returnMsg(0,'success', result);

});



module.exports = router;