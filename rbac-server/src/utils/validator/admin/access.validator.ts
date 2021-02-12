
import validator from 'validator'

interface accessError {
  name?:string,
  desc?:string
}

export const validateAccessSave = (name:string,desc:string)=>{
  
  let errors: accessError= {}

  if(validator.isEmpty(name)){
    errors.name = '权限名称不能为空'
  }

  if(validator.isEmpty(desc)){
    errors.desc = '权限描述不能为空'
  }
               
  let validate = Object.keys(errors).length <1 

  return {errors,validate}
}