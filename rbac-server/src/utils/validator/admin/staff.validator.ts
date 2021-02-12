
import validator from 'validator'

interface staffError {
  username?:string,
  password?:string
}

export const validateStaffLogin = (username:string,password:string)=>{
  
  let error: staffError= {}

  if(validator.isEmpty(username)){
    error.username = '用户名不能为空'
  }

  if(validator.isEmpty(password)){
    error.password = '密码不能为空'
  }
                // ["username","password"] / []
  let validate = Object.keys(error).length <1 

  return {error,validate}
}