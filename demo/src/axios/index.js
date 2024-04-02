import axios from 'axios'
import { Message } from '@/components/Message'
const baseURL = 'https://localhost:8081/demo/'
const timeOut = 2000
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
    try {
      //模拟请求报错
      const limit = 1;
      const arr = Object.keys(httpStatusCode);
      return Math.random() > limit ? Promise.reject(new Error(arr[Math.floor(Math.random() * arr.length)])) : result
    } catch (error) {
      Message.error(httpStatusCode[error.message]);
    }
  },
  error => {
    console.log(error)
    let errorText = "连接错误"
    if (error && error.response) {
      errorText = httpStatusCode[error.response.status];
      Message.error(errorText);
    }
    return Promise.resolve(error.response)
  })



export default service
