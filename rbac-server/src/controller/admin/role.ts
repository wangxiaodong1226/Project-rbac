import {Request,Response,NextFunction} from 'express'
import { validateAccessSave } from '../../utils/validator/admin/access.validator'
import HttpException from '../../exceptions/http.exception'
import Access from '../../models/Access'
import Role from '../../models/Role'
import { validateRoleSave } from '../../utils/validator/admin/role.validator copy'


// role 保存
export  const roleSave =async  (req:Request,res:Response,next:NextFunction)=>{
  try {
    let {name,desc} =  req.body

    // 接口数据验证
    let {errors,validate} = validateRoleSave(name,desc)
    if(!validate){
      throw new HttpException(422,"Role 验证错误",errors)
    }

    // 业务验证 : 角色名称唯一
    const roleFind =await  Role.findOne({name})
    if(roleFind){
      throw new HttpException(422,"角色名称已经存在")
    }

    const roleNew = new Role({name,desc})
    const roleSave = await roleNew.save()
    res.json({
      flag:true,
      data:{
        message:'创建成功',
        access:roleSave
      }
    })
  } catch (error) {
    next(error)
  }
}

// role 列表
export  const roleList =async  (req:Request,res:Response,next:NextFunction)=>{
  try {
    const roles = await Role.find({})
    res.json({
      status:true,
      data:roles
    })
  } catch (error) {
    next(error)
  }
}

// role 详情
export  const roleOne =async  (req:Request,res:Response,next:NextFunction)=>{
  try {
    const {id} = req.params
    
    const roleFind = await Role.findById(id).populate('accesss')
    if(!roleFind){
      throw new HttpException(422,"Role 不存在 ")
    }

    res.json({
      flag:true,
      data:{
        message:'获取角色详情成功',
        role:roleFind
      }
    })
  } catch (error) {
    next(error)
  }
}

// role 更新
export  const roleUpdate =async  (req:Request,res:Response,next:NextFunction)=>{
  try {
    let {id} =  req.params
    let {name,desc} =  req.body
    
    // 接口数据验证
    let {errors,validate} = validateRoleSave(name,desc)
    if(!validate){
      throw new HttpException(422,"Role 传参验证错误",errors)
    }

    // 业务验证
    const RoleFind =await  Role.findById(id)
    if(!RoleFind){
      throw new HttpException(422,"角色不存在")
    }

    // findByIdAndUpdate 默认返回 修改前对象；添加options : {new:true}  返回修改后对象
    const roleUpdate = await Role.findByIdAndUpdate(id,{name,desc},{new:true})
    
    res.json({
      flag:true,
      data:{
        message:'更新成功',
        role:roleUpdate
      }
    })
  } catch (error) {
    next(error)
  }
}

// role 授权
export  const roleAccess =async  (req:Request,res:Response,next:NextFunction)=>{
  try {
   
    let {id} =  req.params //角色id
    let {accesss}  = req.body // 被授权的多个权限
   
    // 业务验证 ： 角色是否存在
    const roleFind =await  Role.findById(id)
    if(!roleFind){
      throw new HttpException(422,"角色不存在")
    }

    roleFind.accesss = accesss
    const roleSave = await roleFind.save()

    res.json({
      flag:true,
      data:{
        message:'角色授权成功',
        role:roleSave
      }
    })
  } catch (error) {
    next(error)
  }
}


