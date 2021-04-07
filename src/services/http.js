import axios from "axios";
import store from "./store/index";

// 超时时间
const TIMEOUT = 5000;

let service = axios.create({
  baseURL: process.env.VUE_API_URL, //url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: TIMEOUT,
});

// request拦截
service.interceptors.request.use(
  (config) => {
    console.log("config", config);
    // token 拦截
    // do something before request is sent
    // let token = "token";
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers["token"] = token;
    //   config.headers.Authorization = "Bearer " + token;
    // }
    return config;
  },
  (error) => {
    // do something with request error
    console.error(error); // for debug
    return Promise.reject(error);
  }
);

// request 拦截
service.interceptors.response.use(
  // 请求成功，这里可以继续做拦截
  (res) => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  // 请求失败
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        store.commit("changeNetwork", false);
      } else {
        return Promise.reject(error);
      }
    }
  }
);

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      // dosomethins
      // toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      //  tip("登录过期，请重新登录");
      localStorage.removeItem("token");
      store.commit("loginSuccess", null);
      setTimeout(() => {
        // toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      // tip("请求的资源不存在");
      break;
    default:
      console.log(other);
  }
};

const post = function (url, data) {
  return service.post(url, data);
};

const get = function (url, params) {
  return service.request({
    method: "get",
    url,
    params,
  });
};

export default service;
export { post, get };
