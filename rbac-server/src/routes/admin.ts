
import express ,{Router}from 'express'
import * as staffController from '../controller/admin/staff'
import * as accessController from '../controller/admin/access'
import * as roleController from '../controller/admin/role'
import authAdminMiddleware from '../middleware/admin/authAdmin.middleware'
import rolesAccessMiddleware from '../middleware/admin/rolesAccess.middleware'

// 后台路由
const adminRouter:Router = express.Router()

// login
adminRouter.post('/staffs/login',staffController.staffLogin)

adminRouter.get('/staffs/currentStaff',authAdminMiddleware,staffController.currentStaff)

// staff 
// 单角色 第一种：参数 角色roleAccessMiddleware('admin')，第二种 ：参数是权限  roleAccessMiddleware('role list')
// 多角色 ：  rolesAccessMiddleware(['role1','rol2',....]）
// test:rolesAccessMiddleware(['role list1','role one1'])
adminRouter.get('/staffs',authAdminMiddleware,rolesAccessMiddleware('staff list'),staffController.staffList)
adminRouter.get('/staffs/:id',authAdminMiddleware,rolesAccessMiddleware('staff one'),staffController.staffOne)
adminRouter.post('/staffs',authAdminMiddleware,rolesAccessMiddleware('staff save'),staffController.staffSave)
adminRouter.put('/staffs/:id',authAdminMiddleware,rolesAccessMiddleware('staff update'),staffController.staffUpdate)
adminRouter.post('/staffs/:id/role/:roleId',authAdminMiddleware,rolesAccessMiddleware('staff role'),staffController.staffRole)
adminRouter.post('/staffs/:id/role',authAdminMiddleware,rolesAccessMiddleware('staff roles'),staffController.staffRoles)

// role
adminRouter.get('/roles',authAdminMiddleware,rolesAccessMiddleware('role list'),roleController.roleList)
adminRouter.get('/roles/:id',authAdminMiddleware,rolesAccessMiddleware('role one'),roleController.roleOne)
adminRouter.post('/roles',authAdminMiddleware,rolesAccessMiddleware('role save'),roleController.roleSave)
adminRouter.put('/roles/:id',authAdminMiddleware,rolesAccessMiddleware('role update'),roleController.roleUpdate)
adminRouter.post('/roles/:id/accesss',authAdminMiddleware,roleController.roleAccess)

// access
adminRouter.get('/accesss',authAdminMiddleware,rolesAccessMiddleware('access list'),accessController.accessList)
adminRouter.get('/accesss/:id',authAdminMiddleware,rolesAccessMiddleware('access one'),accessController.accessOne)
adminRouter.post('/accesss',authAdminMiddleware,rolesAccessMiddleware('access save'),accessController.accessSave)
adminRouter.put('/accesss/:id',authAdminMiddleware,rolesAccessMiddleware('access update'),accessController.accessUpdate)
adminRouter.delete('/accesss/:id',authAdminMiddleware,rolesAccessMiddleware('access delete'),accessController.accessDelete)



export default adminRouter