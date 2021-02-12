import { IStaffDocument } from "../models/Staff";

declare global {
  namespace Express {
    export interface Request{
      staff?:IStaffDocument
    }
  }
}