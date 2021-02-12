import { IStaffDocument } from "../models/Staff";


export interface JWT_Payload_Adimn {
  id:IStaffDocument['_id'],
  username:string,
  currentRole:string
}