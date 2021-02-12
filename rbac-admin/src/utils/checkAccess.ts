import { CurrentUser } from "@/models/user";


const checkStaffAccess = (currentUser:CurrentUser,access:string)=>{
  const isSuper = currentUser.isSuper;
  const staffAccesss = currentUser.accesss!

  if(isSuper){
    return true
  }

  if(staffAccesss.indexOf(access)!=-1){
    return true
  }

  return false
}

export default checkStaffAccess
