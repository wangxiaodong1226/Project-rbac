import express,{Express,Request,Response, NextFunction} from 'express'
import { noMatch } from './middleware/nomatch.middleware'
import errormiddleware from './middleware/error.middleware'
import router from './routes'
import mongoose from 'mongoose'
import config from './config'
import md5 from 'md5'
import Staff from './models/Staff'

// middleware s
import helmet from 'helmet'
import morgan  from 'morgan'
import cors from 'cors'

const app:Express = express()

// 日志 记录行为
app.use(morgan('dev'))
// 安全中间件 ： 非对称加密 + 对称加密 + 单向数据加密
app.use(helmet())
//跨域 客户端 proxy , 服务端 
app.use(cors())

// 数据处理中间件
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 定义路由
app.use('/api',router)

// 404 中间件
app.use(noMatch)

// 错误 中间件
app.use(errormiddleware)


// 启动数据库
// 所有的配置应该是动态 不能写死 ： 方便不同的环境 开发 测试 线上 生产
const initDB =  async ():Promise<void>=>{
  const mongodbURL = `${config.db.host}:${config.db.port}/${config.db.database}`
  const options = {useNewUrlParser: true, useUnifiedTopology: true}
  await mongoose.connect(mongodbURL,options)
  console.log('Connect to mongodb success');
}

// 启动服务
const initSever = async (): Promise<boolean>=>{
  return new Promise((resolve,reject)=>{
    app.listen('7000',()=>{
      console.log('server is running on 7000');
      resolve(true)
    })
    .on("error",error=>{
      console.log(error);
      reject(false)
    })
  })
}

// 创建超级管理员
const initAdmin=async ():Promise<any>=>{
  try {
    const superConfig = config.superAdmin
    // 用户名唯一
    const username = superConfig.username
    const superAdmin = await Staff.findOne({username})
    if(superAdmin) return ;
    const password = md5(superConfig.password)
    const staff = new Staff({username,password,isSuper:true})
    await staff.save()
    console.log('Super admin create success');
    return Promise.resolve(true)
  } catch (error) {
    console.log(error.message);
    return Promise.reject(error)
  }
}

const main = async ()=>{
  await initDB()
  await initSever()
  await initAdmin()
}
main()











