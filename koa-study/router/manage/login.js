const { returnMsg, queryFn, jwtVerify } = require("../../utils");
const jwt = require("jsonwebtoken");
const Router = require("koa-router");
const router = new Router();



router.post("/", async (ctx) => {
    let { username, password } = ctx.request.body;
    let sql = `SELECT * FROM user WHERE username='${username}'`;
    let result = await queryFn(sql);
    if(result.length === 0){
      ctx.body = returnMsg(2, "账号密码错误");
      return
    }
    if(result[0].isban === 1){
      ctx.body = returnMsg(2, "用户已被封禁");
      return
    }
    if (result[0].password === password) {
      //查询数据库
  
      if (result.length > 0) {
        //存在
        // 根据username和password生成token
        let token = jwt.sign(
          { username, password }, // 携带信息
          "lemon", // 秘钥
          { expiresIn: "1h" } // 有效期：1h一小时
        );
        let sql1 = `UPDATE user SET token='${token}' WHERE username='${username}'`;
        await queryFn(sql1);
        let NResult = await queryFn(sql);
  
        let ReturnObj={
          username:NResult[0].username,
          'cms-token':NResult[0].token,
          avatar:NResult[0].avatar
  
        }
        ctx.body = returnMsg(0, "登录成功", ReturnObj);
      } else {
        //不存在
        ctx.body = returnMsg(2, "用户不存在", "用户不存在,请先注册");
      }
    } else {
  
      ctx.body = returnMsg(1, "用户名或密码错误");
    }
  });
  
  router.post("/delete", async (ctx) => {
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
            if(result_[0].authority !== 'super'){
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

        let sql = `DELETE FROM user WHERE username='${username}'`;
        let result = await queryFn(sql);
        result.length > 0
        ?
        ctx.body = returnMsg(0, 'success',result)
        :
        ctx.body = returnMsg(2, '删除失败')

  });
  module.exports = router;
  