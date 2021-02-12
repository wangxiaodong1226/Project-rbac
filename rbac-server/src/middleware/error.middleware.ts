import {Request,Response,NextFunction} from 'express'
import HttpException from '../exceptions/http.exception'
const errormiddleware = (error:HttpException,req:Request,res:Response,next:NextFunction)=>{
  console.log(error);
  
  const status = error.status || 500;
  const message = error.message || '服务器端错误'
  const errors= error.errors || '服务器端错误'
  
  res.status(status).json({
    flag:false,
    message:message,
    errors:errors
  })
}

export default errormiddleware