/**
 * @description 存储项目的相关接口配置
 * @author bobetax
 * @createtime 2021/04/07 09:40
 */

import request, { get, post } from "./http";

const API = {
  user: {
    /**
     * @description 登录
     * @param {*Object} data 入参
     */
    login(data) {
      return post("/user/login", data);
    },
    logout(data) {
      return get("/user/login", data);
    },
    getUserInfo(data) {
      return request({
        url: "/user/login",
        type: "get",
        data,
      });
    },
  },
};

export default API;
