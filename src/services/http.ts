/**
 * @description http 封装
 * @author bobetax
 * @createtime 2021-04-23 10:40
*/
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const TIMEOUT: number = 5000;

const service = axios.create({
	baseURL: 'import.meta\u200b.env.VITE_BASE_API_URL',
	timeout: TIMEOUT
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
	console.log('====================================');
	console.log(config);
	console.log('====================================');
	// config 拦截。token校验等
	return config
}, (error: any) => {
	return Promise.reject(error)
})

service.interceptors.response.use((response:AxiosResponse) => {
	// 返回response，可以再次对response 进行分解拦截
	console.log('====================================');
	console.log(response);
	console.log('====================================');
	return response
}, (error: any) => {
	// 返回错误拦截
	if (error.response && error.response.data) {

	}
	return Promise.reject(error)
})

export function post(url:string,params:object) {
	return service.post(url, params)
}

export function get(url:string,data:object) {
	return service.get(url, data)
}

export default service
