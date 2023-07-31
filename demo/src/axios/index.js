import axios from 'axios'
import { ElMessage } from 'element-plus'
const baseURL = 'https://localhost:5173/'
const timeOut = 3000
const headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE',
  'Access-Control-Allow-Headers': 'x-requested-with,content-type',
}
const service = axios.create({
  baseURL: baseURL,
  timeout: timeOut,
  headers: headers
})


// 请求拦截器
service.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data)
    config.headers = {}
    return config
  },
  error => {
    return Promise.reject(error)
  }
)


//响应拦截器即异常处理
const httpStatusCode = {
  400: "错误请求",
  401: "未授权，请重新登录",
  403: "拒绝访问",
  404: "请求错误,没有找到该资源",
  405: "请求方法未允许",
  408: "请求超时",
  500: "服务器端出错",
  501: "网络未实现",
  502: "网络错误",
  503: "服务不可用",
  504: "网络超时",
  505: "版本不支持该请求",
}
service.interceptors.response.use(
  response => {
    const result = {
      data: response.data,
      statusCode: response.status,
      statusText: response.statusText
    }
    return result
  },
  error => {
    let errorText = "连接错误"
    if (error && error.response) {
      errorText = httpStatusCode[error.response.status]
    }
    ElMessage.error(errorText)
    return Promise.resolve(error.response)
  })



export default service
