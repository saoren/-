/*
 * @Author: L.柠@95736614
 * @Date: 2022-02-21 21:19:53
 * @LastEditTime: 2022-02-21 23:12:56
 */

const Router = require("koa-router");
const router = new Router();

const { returnMsg,queryFn,strTimeToTimeStamps } = require("../../utils");



router.post("/", async (ctx) => {
  let { username, password,email,code } = ctx.request.body;

  if (username && password) {
    let sql = `SELECT * FROM user WHERE username='${username}'`
    let result = await queryFn(sql)
    if(result.length>0 ){
        ctx.body = returnMsg(2, "注册失败", '该用户已存在')
        return
    }
    
    
  } else {
    ctx.body = returnMsg(1, "参数错误")
    return
  }

  let sql_getcode =`SELECT create_time,email_code FROM email_code WHERE email_code='${code}'`
  let result  =  await queryFn(sql_getcode)
  if(result.length === '' || result.length <= 0){
    ctx.body = returnMsg(2, "验证码错误")
    return
  }

  let create_time =strTimeToTimeStamps(result[0].create_time) 
      let now_time = timestamp=new Date().getTime()

      if(now_time-create_time <= 300000){
        let sql1=`INSERT INTO user VALUES (null,'${username}','${password}','${email}',null,'super','avatar.png',0)`
        await queryFn(sql1)
        ctx.body = returnMsg(0, "success");
      
    }else{
      ctx.body = returnMsg(2, "验证码失效");
    }
  //写入数据库   分配一个token.头像
});

module.exports = router;
