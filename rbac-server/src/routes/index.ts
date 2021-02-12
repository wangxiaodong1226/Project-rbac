
import express ,{Router}from 'express'
import * as userController from '../controller/index/user'
import adminRouter from './admin'

// router module
const router:Router = express.Router()

// 前台路由
router.post('/users/regist',userController.userRegit)
router.post('/users/login',userController.userLogin)

// 后台路由 ： /admin 后台专用，需要后台路由模块化抽离
router.use('/admin',adminRouter)

export default router