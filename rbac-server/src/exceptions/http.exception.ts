

class HttpException extends Error{
  status:number;
  message:string;
  errors?:any;

  constructor(status:number,message:string,errors?:any){
    super()
    this.status = status
    this.message = message
    this.errors = errors
  }
}
// status
// 200 201 204 401 403 404 422 500

export default HttpException