import {Request,Response,NextFunction} from 'express'
import Staff, { IStaffDocument } from '../../models/Staff'
import HttpException from '../../exceptions/http.exception'
import md5 = require('md5')
import { validateStaffLogin } from '../../utils/validator/admin/staff.validator'
import jwt from 'jsonwebtoken'
import  config from '../../config'
import Role, { IRoleDocument } from '../../models/Role'
import { JWT_Payload_Adimn } from '../../types/jwt'


const generateToken = (payload:JWT_Payload_Adimn)=>{
  // let payload = {id}
  let privateKey = config.auth.adminSecretKey
  let options = {expiresIn : '10h'}
  const token = jwt.sign(payload,privateKey,options)
  return token
}
//staff 登录
export  const staffLogin =async  (req:Request,res:Response,next:NextFunction)=>{
  try {
    
    let {username,password} = req.body
    console.log(username,password);
    
    // 接口数据验证
    let {error,validate} = validateStaffLogin(username,password)
    if(!validate){
      throw new HttpException(422,"Staff 验证错误",error)
    }
    // 业务验证：
    // 1 验证员工是否存在
    const staff = await Staff.findOne({username}).populate('role')
    if(!staff){
      throw new HttpException(422,"staff not found")
    }
    

    // 2 验证密码
   const match = md5(password) === staff.password
   if(!match){
    throw new HttpException(422,"password not mactch")
   }
    // 生成token
  //  console.log(staff);
  //  let currentRole = staff.role.name
   const payload = {id:staff._id,username:staff.username,currentRole:'admin'}
   const token = generateToken(payload)

    // 返回结果
    res.json({
        status:true,
        data:{
          token,
          currentAuthority:'admin',
          username:staff.username
        }
    })
  } catch (error) {
    next(error)
  }
}

// staff 当前用户
export  const currentStaff =async  (req:Request,res:Response,next:NextFunction)=>{
  try {

    const staff = req.staff  as IStaffDocument

    // 当前用户的角色
    const staffWithdRoles =await Staff.findById(staff._id).populate('roles')
    const staffRoles:IRoleDocument[] = staffWithdRoles!.roles

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

    // 返回结果
    res.json({
        status:true,
        data:{
          userid:staff._id,
          name:staff.username,
          avatar:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=289237221,199580710&fm=26&gp=0.jpg',
          isSuper:staff.isSuper,
          accesss:staffAccessNames
        }
    })
  } catch (error) {
    next(error)
  }
}

// staff 列表
export  const staffList =async  (req:Request,res:Response,next:NextFunction)=>{
  try {
    
    const staffs = await Staff.find({}).populate('roles')

    // 返回结果
    res.json({
        status:true,
        data:staffs
    })
  } catch (error) {
    next(error)
  }
}

// staff 一个
export  const staffOne =async  (req:Request,res:Response,next:NextFunction)=>{
  try {
    const {id} = req.params
    const staff = await Staff.findById(id)

    // 返回结果
    res.json({
        flag:true,
        data:{
          staff
        }
    })
  } catch (error) {
    next(error)
  }
}

// staff 保存
export  const staffSave =async  (req:Request,res:Response,next:NextFunction)=>{
  try {
    
    let {username,password} = req.body
    
    // 接口数据验证
    let {error,validate} = validateStaffLogin(username,password)
    if(!validate){
      throw new HttpException(422,"Staff 验证错误",error)
    }

    // 验证员工是否存在
    const staff = await Staff.findOne({username})
    if(staff){
      throw new HttpException(422,"staff 用户名已经存在")
    }

    const staffNew = new Staff({
      username,
      password:md5(password)
    })
    const staffSave = await staffNew.save()
    // 返回结果
    res.json({
        status:true,
        data:{
          message:'创建成功',
          staff:staffSave
        }
    })
  } catch (error) {
    next(error)
  }
}

// staff 修改
export  const staffUpdate =async  (req:Request,res:Response,next:NextFunction)=>{
  try {
    let {id} = req.params
    let {username,password} = req.body
    
    // 接口数据验证
    let {error,validate} = validateStaffLogin(username,password)
    if(!validate){
      throw new HttpException(422,"Staff 验证错误",error)
    }

    // 验证员工是否存在
    const staff = await Staff.findById(id)
    if(!staff){
      throw new HttpException(422,"修改用户不存在")
    }

    const staffUpdate = await Staff.findByIdAndUpdate(id,
      {username,
      password:md5(password)},
      {new:true}
    )
    // 返回结果
    res.json({
        flag:true,
        data:{
          message:'修改成功',
          staff:staffUpdate
        }
    })
  } catch (error) {
    next(error)
  }
}


// staff 分配单角色
export  const staffRole =async  (req:Request,res:Response,next:NextFunction)=>{
  try {
    let {id,roleId} = req.params
   
    // 验证员工是否存在
    const staff = await Staff.findById(id)
    if(!staff){
      throw new HttpException(422,"被分配角色的用户不存在")
    }

    // 验证角色是否存在
    const role = await Role.findById(roleId)
    if(!staff){
      throw new HttpException(422,"分配的角色不存在")
    }

    staff.role = roleId
    
    const staffRole = await staff.save()
   
    // 返回结果
    res.json({
        flag:true,
        data:{
          message:'授权成功',
          staff:staffRole
        }
    })
  } catch (error) {
    next(error)
  }
}


// staff 分配多角色
export  const staffRoles =async  (req:Request,res:Response,next:NextFunction)=>{
  try {
    let {id} = req.params
    let {roles} = req.body
   
    // 验证员工是否存在
    const staff = await Staff.findById(id)
    if(!staff){
      throw new HttpException(422,"被分配角色的用户不存在")
    }


    staff.roles = roles
    const staffRole = await staff.save()
   
    // 返回结果
    res.json({
        status:true,
        data:{
          message:'授权成功',
          staff:staffRole
        }
    })
  } catch (error) {
    next(error)
  }
}

