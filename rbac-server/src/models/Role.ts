
import {Schema,model,Model,Document} from 'mongoose'
import { IAccessDocument } from './Access'

export interface IRoleDocument extends Document{
  name:string,
  desc:string,
  // accesss:Schema.Types.ObjectId[]
  accesss:IAccessDocument['_id'][]
}

const roleSchema:Schema = new Schema({
  name:{
    type:String,
    required:[true,'role name is requried'], //model 验证
    trim:true
  }, // 角色名称
  desc:String,  // 角色描述 
  accesss:[
    {
      type:Schema.Types.ObjectId,
      ref:'Access' 
    }
  ]
},{
  timestamps:true
})

const Role: Model<IRoleDocument> = model<IRoleDocument>("Role",roleSchema)

export default Role
