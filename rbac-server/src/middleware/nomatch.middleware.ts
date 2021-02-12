import {Request,Response,NextFunction} from 'express'
import HttpException from '../exceptions/http.exception'
export  const noMatch = (req:Request,res:Response,next:NextFunction)=>{
  // res.status(404).json({
  //   flag:false,
  //   message:'Router Url not found'
  // })

  const noMatchError:HttpException = new HttpException(404,'访问路径不匹配')
  next(noMatchError)
}