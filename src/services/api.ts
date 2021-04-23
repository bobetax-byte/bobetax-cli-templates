/**
 * @description API 封装
 * @author bobetax
 * @createtime 2021-04-23 10:40
*/
import { post, get } from "./http"

const API = {
	user: {
		login(data:object) {
			return post('/login', data)
		},
		logout(data:object) {
			return get('/logout', data)
		}
	}
}

export default API
