const Router =require("koa-router")
const router = new Router()
const {query}= require('../../utils')




const Login= require('./login')
const Register= require('./register')
const sendMail =require('./email')
const ban =require('./ban')
const authority =require('./authority')
const device_group =require('./device_group')
const user =require('./user')




router.use('/login',Login.routes(),Login.allowedMethods())
router.use('/register',Register.routes(),Register.allowedMethods())
router.use('/email',sendMail.routes(),sendMail.allowedMethods())
router.use('/ban',ban.routes(),ban.allowedMethods())
router.use('/authority',authority.routes(),authority.allowedMethods())
router.use('/devicegroup',device_group.routes(),device_group.allowedMethods())
router.use('/user',user.routes(),user.allowedMethods())

module.exports = router
