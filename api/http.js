import Vue from "vue";
import store from "@/store";
import uni_request from "@/common/uni_request.js";
import QS from "qs";

const dataURL = "http://cdn.blackhw.com"; // 引用资源地址
const testURL = "http://server.st712.com"; // 测试接口
let baseURL = "";

if (process.env.NODE_ENV == "development") {
  //开发
  baseURL = "http://bssdzs188.com";
} else if (process.env.NODE_ENV == "production") {
  //线上
  baseURL = "http://bssdzs188.com";
}

export const request = uni_request({
  baseURL: baseURL,
  //   baseURL: testURL, //测试接口
  header: {
    "content-type": "application/x-www-form-urlencoded",
  },
  timeout: 60000,
  // #ifdef H5
  withCredentials: true,
  // #endif
});

Vue.prototype.$dataURL = dataURL;
Vue.prototype.$baseURL = baseURL;

// request拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log("request error----------");
    return Promise.error(error);
  }
);

// respone拦截器
request.interceptors.response.use(
  (response) => {
    if (response.statusCode === 200 && response.data.code === 0) {
      return Promise.resolve(response);
    } else if (response.statusCode === 200 && response.data.code == -1) {
      uni.showToast({
        icon: "none",
        title: "登录失败",
      });
      store.commit("$uStore", {
        name: "vuex_token",
        value: "",
      });
      console.log(">>>>>>>>>>>>Clear token!");
      console.log("NowToken:", store.state.vuex_token);
      uni.reLaunch({ url: "/pages/login/login" });
      return Promise.reject(response || "error");
    } else if (response.statusCode === 200 && response.data.code !== 0) {
      uni.showToast({
        icon: "none",
        title: response.data.msg,
      });
      return Promise.reject(response || "error");
    } else {
      uni.showToast({
        icon: "none",
        title: "请求失败",
      });
      return Promise.reject(response || "error");
    }
  },
  (error) => {
    console.log(error);
  }
);

export function http(type, url, params) {
  const httpType = type ? type : "get";
  if (httpType === "get") {
    return get(url, params);
  } else {
    return post(url, params);
  }
}

/**
 * get请求方法
 * @param {String} url 请求的url地址
 * @param {Object} params 请求时携带的参数
 */
export function get(url, params) {
  return request.get(url, params);
}

/**
 * post请求方法
 * @param {String} url 请求的url地址
 * @param {Object} params 请求时携带的参数
 */
export function post(url, params) {
  return request.post(url, params);
}

/**
 * @desc 上传文件
 * @param {String} url 请求的url地址
 * @param {file} file 文件参数
 */
export function uploadFile(url, file) {
  return request.uploadFile(url, file);
}
