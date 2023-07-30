import axios from 'axios'

axios.defaults.baseURL = 'https://localhost:5173'
axios.defaults.headers = {
	'X-Requested-With': 'XMLHttpRequest',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE',
	'Access-Control-Allow-Headers': 'x-requested-with,content-type',
}

console.log(process.env.NODE_ENV)


// 请求拦截器
axios.interceptors.request.use(
	config => {
		config.data = JSON.stringify(config.data);
		config.headers = {}
		// console.log(config)
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);
//响应拦截器即异常处理
axios.interceptors.response.use(response => {
	return response
}, err => {
	if (err && err.response) {
		let str = ''
		switch (err.response.status) {
			case 400:
				str = '错误请求'
				break;
			case 401:
				str = '未授权，请重新登录'
				break;
			case 403:
				str = '拒绝访问'
				break;
			case 404:
				str = '请求错误,没有找到该资源'
				break;
			case 405:
				str = '请求方法未允许'
				break;
			case 408:
				str = '请求超时'
				break;
			case 500:
				str = '服务器端出错'
				break;
			case 501:
				str = '网络未实现'
				break;
			case 502:
				str = '网络错误'
				break;
			case 503:
				str = '服务不可用'
				break;
			case 504:
				str = '网络超时'
				break;
			case 505:
				str = '版本不支持该请求'
				break;
			default:
				str = `连接错误${err.response.status}`
				console.log(`连接错误${err.response.status}`)
		}
		console.log(str)
	} else {
		// console.log('连接到服务器失败,请检查网络问题')
	}
	return Promise.resolve(err.response)
})


export default axios;
