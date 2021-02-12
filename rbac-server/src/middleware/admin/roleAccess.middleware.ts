
import {Request,Response,NextFunction} from 'express'
import HttpException from '../../exceptions/http.exception';
import Staff from '../../models/Staff';
import Role from '../../models/Role';



//01： allowRole:string ,02 allowAccess:string ,  参数形式 ：['role list','role save']
const roleAccessMiddleware =(allowAccesss:string[])=>{

  return async (req:Request,res:Response,next:NextFunction)=>{
    // return next()
    let staff = req.staff!
  
    // 超级管理员 : 登录认证 需要认证，但是 权限认证 无限制，最高权限
    if(staff.isSuper){
      return next() //放过
    }
   
    // 当前用户的角色
    const staffRole =await Role.findById(staff.role).populate('accesss')
    console.log('staffRole',staffRole);
    
    if(!staffRole){
      return next(new HttpException(403,'roleAccessMiddleware 权限限制,当前用户没有分配角色'))
    }
  
    //单角色层级判断
    // const staffRoleName = staffRole.name
    // console.log(staffRoleName,allowRole);
    // if(staffRoleName===allowRole){
    //   return next()
    // }else{
    //   return next(new HttpException(403,'roleAccessMiddleware 权限限制,当前角色不匹配，没有访问权限'))
    // }

    // 单角色 权限层级判断
    // 获取当前用户的所有权限 （staff -依据role - accesss）
    // const staffAccesss =staffRole.accesss.map(item=>{
    //   return item.name
    // })
    // console.log(staffAccesss); //["role list","role one","role update"]
    
    // const chekcAccess = staffAccesss.indexOf(allowAccess) !== -1
    // if(chekcAccess){
    //   return next()
    // }else{
    //   return next(new HttpException(403,'roleAccessMiddleware 权限限制,当前角色的权限不匹配，没有访问权限'))
    // }
    
    // 单角色 权限层级判断 ,参数数组 allowAccesss:string[]
    const staffAccesss =staffRole.accesss.map(item=>{
      return item.name
    })
    console.log(staffAccesss); //["role list","role one","role update"]
    
    
    const chekcAccess = allowAccesss.some(allowedAccess=>{
                          return staffAccesss.indexOf(allowedAccess) !== -1
                        })

    if(chekcAccess){
      return next()
    }else{
      return next(new HttpException(403,'roleAccessMiddleware 权限限制,当前角色的权限不匹配，没有访问权限'))
    }
  
  }
}



export default roleAccessMiddleware