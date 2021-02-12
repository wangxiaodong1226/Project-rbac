
import {Request,Response,NextFunction} from 'express'
import HttpException from '../../exceptions/http.exception'
import jwt from 'jsonwebtoken'
import config from '../../config'
import Staff, { IStaffDocument } from '../../models/Staff'
import { JWT_Payload_Adimn } from '../../types/jwt'

// interface IRequst extends Request{
//   staff?:IStaffDocument
// }

const authAdminMiddleware =async (req:Request,res:Response,next:NextFunction)=>{
  // console.log(req.headers);
  // authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTRjZGVmZTY3ODhlMGJlMGE2Y2VmOSIsImlhdCI6MTYxMjE0OTE2NSwiZXhwIjoxNjEyMTg1MTY1fQ.m_rC48FpjU4k4XqrzdxerYYLTzGWvDgT5cW9PKxS5ZA',
  
  // 验证 authorization
  const authorization = req.headers.authorization
  // console.log(authorization);
  if(!authorization){
    return next(new HttpException(401,"authorization 必须提供"))
  }
  
  //获取 token
  const token = authorization.split('Bearer ')[1]
  if(!token){
    return next(new HttpException(401,"authorization token 必须提供,格式：Bearer token"))
  }

  try {
      // 验证token,解签  （header,payload,签名密文）
    const jwtData = jwt.verify(token,config.auth.adminSecretKey) as JWT_Payload_Adimn
    // console.log(jwtData);  //{ id: '6014cdefe6788e0be0a6cef9', iat: 1612149165, exp: 1612185165 }
    
    // 验证用户是否存在
    const staff = await Staff.findById(jwtData.id)
    if(staff){
      req.staff = staff
      return next() //放过
    }else{
      return next(new HttpException(401,"staff 用户不存在 "))
    }
  } catch (error) {
    // console.log(error);
    // jwt 验证失败 会够catch 
    return next(new HttpException(401,"toke 无效或者过期",error.message))
  }

 


}

export default authAdminMiddleware