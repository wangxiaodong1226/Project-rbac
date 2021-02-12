import {Request,Response,NextFunction} from 'express'
export  const userRegit = (req:Request,res:Response,next:NextFunction)=>{

  let body = req.body
  console.log(body);


  res.json({
      flag:true,
      data:{
        msg:'user regist'
      }
  })
}

export  const userLogin = (req:Request,res:Response,next:NextFunction)=>{

  let body = req.body
  // console.log(body);
  
  res.json({
      flag:true,
      data:{
        msg:'user login'
      }
  })
}

