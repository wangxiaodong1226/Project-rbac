
import {Request,Response,NextFunction} from 'express'
import HttpException from '../../exceptions/http.exception';
import Staff from '../../models/Staff';
import Role, { IRoleDocument } from '../../models/Role';


// 一个借口 一个资源地址 一个控制器： 一个权限
const rolesAccessMiddleware =(allowAccess:string)=>{

  return async (req:Request,res:Response,next:NextFunction)=>{
    // return next()
    let staff = req.staff!
  
    // 超级管理员 : 登录认证 需要认证，但是 权限认证 无限制，最高权限
    if(staff.isSuper){
      return next() //放过
    }
   
    // 当前用户的角色
    const staffWithdRoles =await Staff.findById(staff._id).populate('roles')
    const staffRoles:IRoleDocument[] = staffWithdRoles!.roles
  
    if(!staffRoles || staffRoles.length<1){
      return next(new HttpException(403,'roleAccessMiddleware 权限限制,当前用户没有分配角色'))
    }
  
    // 当前用户 的 所有角色 的 所有权限
    let staffAccessNames : string[] = []

    for (let i = 0; i < staffRoles.length; i++) {
      const staffRole = staffRoles[i];

      const roleWithAccesss = await Role.findById(staffRole._id).populate('accesss')
      
      const roleAccessNames =  roleWithAccesss!.accesss.map(roleAccess=>{
        return roleAccess.name
      })

      for (let j = 0; j < roleAccessNames.length; j++) {
        const element = roleAccessNames[j];
         staffAccessNames.push(element)
      }
    }

    console.log('staffAccessNames',staffAccessNames);
    
    const chekcAccess = staffAccessNames.indexOf(allowAccess) !== -1

    if(chekcAccess){
      return next()
    }else{
      return next(new HttpException(403,'roleAccessMiddleware 权限限制,当前角色的权限不匹配，没有访问权限'))
    }
  }
}



export default rolesAccessMiddleware