const Router = require("koa-router");
const router = new Router();

const { returnMsg,queryFn } = require("../../utils");
const moment = require('moment')

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host:'smtp.163.com',
    secreConnection:true,
    port:465,
    secure:true,
    auth:{
        user:'lemonyunk@163.com',
        pass:'APUJYHBHXKAYYCZK'
    }
})



router.post('/send',async (ctx)=>{
    let { email } = ctx.request.body;


    const getVerCode = () => {
        let verCode = Math.floor((Math.random()*1000000)+1);
        if (verCode < 100000) {
            return getVerCode();
        }
        return verCode;
    }
 
    let sql_getemail =`SELECT email FROM user WHERE email='${email}'`
    let result_email  =  await queryFn(sql_getemail)
    if(result_email.length>0){
      ctx.body = returnMsg(2, "邮箱已存在");
      return
    }

    if(email){
        let now_time= moment().format("YYYY-MM-DD HH:mm:ss")
        const code =getVerCode()
        let sql = `INSERT INTO email_code VALUES (null,'${email}','${now_time}','${code}')`
        await queryFn(sql)
        var mailOptions ={
            from:'lemonyunk@163.com',
            to: email,
            subject:'柠檬云控中心',
            html:
            `
            <h3 style="height: 50px;background-color: azure; text-align: center; line-height: 50px; color:aquamarine;">柠檬云控中心</h3>
            
            <p style="font-size: 12px">#您好</p>

            <p style="font-size: 12px">&nbsp;&nbsp;您收到此邮件,是因为我们收到了您的注册请求。您的验证码(5分钟内有效)是:</p>
            <br>
            <p style="color:red;text-align: center;">${code}</p>
            <br>
            <p style="font-size: 12px">如果您没有请求注册云控后台,请您忽略此邮件。</p>
        
            <div style="float: right;font-size: 12px"">
                柠檬云控中心
                <br>
                <br>
                ${now_time}
            </div>

            `
        }

    }

    const getEmail = ()=>{
        return new Promise((resolve, reject) => {
            transporter.sendMail (mailOptions,(err,info)=>{
                if(err){
                    reject(err)
                    
                }else{
                    resolve('success')
                }
            })
          });
    }

    let result = await getEmail()
      result === 'success'
      ?
      ctx.body= returnMsg(0, "success",'发送成功')
      :
      ctx.body= returnMsg(2, "fail", err);
      


    

})






module.exports = router;