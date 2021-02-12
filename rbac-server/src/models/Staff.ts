
import {Schema,model,Model,Document} from 'mongoose'
import { IRoleDocument } from './Role'


export interface IStaffDocument extends Document{
  username:string,
  password:string,
  isSuper:boolean,
  role:IRoleDocument['_id'],
  roles:IRoleDocument['_id'][]
}

const staffSchema:Schema = new Schema({
  username:String,
  password:String,
  isSuper:{type:Boolean,default:false},
  role:{  //角色id
    type:Schema.Types.ObjectId,
    ref:'Role'
  },
  roles:[ //角色ids
    {  
      type:Schema.Types.ObjectId,
      ref:'Role'
    }
  ]
},{
  timestamps:true
})

const Staff: Model<IStaffDocument> = model<IStaffDocument>("Staff",staffSchema)

export default Staff
