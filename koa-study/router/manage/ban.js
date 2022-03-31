const { returnMsg, queryFn, jwtVerify } = require("../../utils");
const Router = require("koa-router");
const router = new Router();

router.post("/de-archive", async (ctx) => {
  let { username } = ctx.request.body;
  let token =ctx.request.headers['cms-token']
  
        //鉴权
        if(!jwtVerify(token)){
          ctx.body = returnMsg(2, 'token过期或不存在');
          return;
      }

      let sql_ = `SELECT username,authority FROM user WHERE token='${token}'`;
      let result_ = await queryFn(sql_);
      if(result_.length>0){
          if(result_[0].authority !== 'super' && result_[0].authority !== 'admin'){
            ctx.body = returnMsg(2, "没有权限");
            return
          }

      }


      let sql_getusername = `SELECT * FROM user WHERE username='${username}'`;
      let result_getusername = await queryFn(sql_getusername);
      if(result_getusername.length === 0){
        ctx.body = returnMsg(2, "用户不存在");
        return
      }
      if(result_getusername[0].isban == '0'){
        ctx.body = returnMsg(2, '已是解封状态')
        return
      }

      let sql = `UPDATE user SET isban=0 WHERE username='${username}'`;
      let result = await queryFn(sql);
      result.changedRows === 1
      ?
      ctx.body = returnMsg(0, '解封成功',result)
      :
      ctx.body = returnMsg(2, '解封失败')

});
router.post("/", async (ctx) => {
    let { username } = ctx.request.body;
    let token =ctx.request.headers['cms-token']
    
          //鉴权
          if(!jwtVerify(token)){
            ctx.body = returnMsg(2, 'token过期或不存在');
            return;
        }

        let sql_ = `SELECT username,authority FROM user WHERE token='${token}'`;
        let result_ = await queryFn(sql_);
        if(result_.length>0){
            if(result_[0].authority !== 'super' && result_[0].authority !== 'admin'){
              ctx.body = returnMsg(2, "没有权限");
              return
            }

        }


        let sql_getusername = `SELECT * FROM user WHERE username='${username}'`;
        let result_getusername = await queryFn(sql_getusername);
        if(result_getusername.length === 0){
          ctx.body = returnMsg(2, "用户不存在");
          return
        }

        if(result_getusername[0].isban === 1){
          ctx.body = returnMsg(2, '已被封禁')
          return
        }


        let sql = `UPDATE user SET isban=1 WHERE username='${username}'`;
        let result = await queryFn(sql);
        result.changedRows === 1
        ?
        ctx.body = returnMsg(0, '封号成功',result)
        :
        ctx.body = returnMsg(2, '封号失败')

  });

module.exports = router;