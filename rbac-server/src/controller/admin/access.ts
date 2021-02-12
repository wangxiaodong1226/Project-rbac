import {Request,Response,NextFunction} from 'express'
import { validateAccessSave } from '../../utils/validator/admin/access.validator'
import HttpException from '../../exceptions/http.exception'
import Access from '../../models/Access'


// access 保存
export  const accessSave =async  (req:Request,res:Response,next:NextFunction)=>{
  try {
    let {name,desc} =  req.body
    // 接口数据验证
    let {errors,validate} = validateAccessSave(name,desc)
    if(!validate){
      throw new HttpException(422,"Access 验证错误",errors)
    }

    // 业务验证
    const accessFind =await  Access.findOne({name})
    if(accessFind){
      throw new HttpException(422,"权限命名已经存在")
    }

    const accessNew = new Access({name,desc})
    const accessSave = await accessNew.save()
    res.json({
      flag:true,
      data:{
        message:'创建成功',
        access:accessSave
      }
    })
  } catch (error) {
    next(error)
  }
}

// access 列表
export  const accessList =async  (req:Request,res:Response,next:NextFunction)=>{
  try {
    const pageSize = Number(req.query.pageSize)
    const current = Number(req.query.current)
    const accesss = await Access.find({}).limit(pageSize).skip((current-1)*pageSize)

    const total = await Access.count({})

    res.json({
      status:true,
      data:accesss,
      total,
      pageSize,
      current
    })
  } catch (error) {
    next(error)
  }
}

// access 详情
export  const accessOne =async  (req:Request,res:Response,next:NextFunction)=>{
  try {
    const {id} = req.params
    
    const accessFind = await Access.findById(id)
    if(!accessFind){
      throw new HttpException(422,"Access 不存在 ")
    }

    res.json({
      flag:true,
      data:{
        message:'获取权限详情成功',
        access:accessFind
      }
    })
  } catch (error) {
    next(error)
  }
}

// access 更新
export  const accessUpdate =async  (req:Request,res:Response,next:NextFunction)=>{
  try {
    let {id} =  req.params
    let {name,desc} =  req.body
    // 接口数据验证
    let {errors,validate} = validateAccessSave(name,desc)
    if(!validate){
      throw new HttpException(422,"Access 传参验证错误",errors)
    }

    // 业务验证
    const accessFind =await  Access.findById(id)
    if(!accessFind){
      throw new HttpException(422,"权限不存在")
    }

    // findByIdAndUpdate 默认返回 修改前对象；添加options : {new:true}  返回修改后对象
    const accessUpdate = await Access.findByIdAndUpdate(id,{name,desc},{new:true})
    
    res.json({
      flag:true,
      data:{
        message:'更新成功',
        access:accessUpdate
      }
    })
  } catch (error) {
    next(error)
  }
}

// access 删除
export  const accessDelete =async  (req:Request,res:Response,next:NextFunction)=>{
  try {
    let {id} =  req.params
    
    // 业务验证 ： access 是否存在
    const accessFind =await  Access.findById(id)
    if(!accessFind){
      throw new HttpException(422,"权限不存在")
    }

    const accessDelete = await Access.findByIdAndDelete(id)
    res.json({
      flag:true,
      data:{
        message:'删除成功',
        access:accessDelete
      }
    })
  } catch (error) {
    next(error)
  }
}

