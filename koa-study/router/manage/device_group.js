const { returnMsg, queryFn, jwtVerify } = require("../../utils");
const moment = require('moment')
const Router = require("koa-router");
const router = new Router();



router.get("/", async (ctx) => {
    let sql = `SELECT id,name,beizhu,belong,status,create_time,update_time FROM device_group`;
    let result = await queryFn(sql);
    ctx.body = returnMsg(0,'success', result);

});
router.post("/add", async (ctx) => {
    let { name, status, beizhu,belong } = ctx.request.body;

    let token =ctx.request.headers['cms-token']
    
    //鉴权
    if(!jwtVerify(token)){
      ctx.body = returnMsg(2, 'token过期或不存在');
      return;
  }

  let sql1 = `SELECT * FROM device_group WHERE name='${name}'`
  let result1 = await queryFn(sql1)
  if(result1.length>0 ){
      ctx.body = returnMsg(2, '分组已存在')
      return
  }



    let now_time= moment().format("YYYY-MM-DD HH:mm:ss")
    status == 1 ? status : status = 0
    let sql = `INSERT INTO device_group VALUES (null,'${name}','${beizhu}','${belong}',${status},'${now_time}',null)`;
    let result = await queryFn(sql);
    ctx.body = returnMsg(0,'添加成功', result);

});
router.post("/update", async (ctx) => {
    let { name, status,beizhu } = ctx.request.body;

    let token =ctx.request.headers['cms-token']
    
    //鉴权
    if(!jwtVerify(token)){
      ctx.body = returnMsg(2, 'token过期或不存在');
      return;
  }

  let sql1 = `SELECT * FROM device_group WHERE name='${name}'`
  let result1 = await queryFn(sql1)
  if(result1.length === 0 ){
      ctx.body = returnMsg(2, '分组不存在')
      return
  }



    let now_time= moment().format("YYYY-MM-DD HH:mm:ss")
    status == 1 ? status : status = 0
    let sql = `UPDATE device_group SET status='${status}',update_time='${now_time}',beizhu='${beizhu}' WHERE name='${name}'`;
    let result = await queryFn(sql);
    ctx.body = returnMsg(0,'修改成功', result);

});

router.post("/delete", async (ctx) => {
    let { name } = ctx.request.body;

    let token =ctx.request.headers['cms-token']
    
    //鉴权
    if(!jwtVerify(token)){
      ctx.body = returnMsg(2, 'token过期或不存在');
      return;
  }

  let sql1 = `SELECT * FROM device_group WHERE name='${name}'`
  let result1 = await queryFn(sql1)
  if(result1.length === 0 ){
      ctx.body = returnMsg(2, '分组不存在')
      return
  }


    let sql = `DELETE FROM device_group WHERE name='${name}'`;
    let result = await queryFn(sql);
    ctx.body = returnMsg(0,'删除成功', result);

});


module.exports = router;