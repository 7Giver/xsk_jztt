import Vue from "vue";
import uni_request from "common/uni_request.js";
import QS from "qs";

const dataURL = "http://cdn.blackhw.com"; // 引用资源地址
const testURL = "http://server.st712.com"; // 测试接口
let baseURL = "";

Vue.prototype.$dataURL = dataURL;

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

// request拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log('request error----------');
    return Promise.error(error);
  }
);

// respone拦截器
request.interceptors.response.use(
  (response) => {
    if (response.statusCode === 200 && response.data.code === 0) {
      return Promise.resolve(response);
    } else {
      uni.showToast({
        icon: "none",
        title: '请求失败',
      });
      return Promise.reject(response || "error");
    }
  },
  (error) => {
    console.log(error); // for debug
    if (error.response) {
      switch (error.response.status) {
        // 404请求不存在
        case 404:
          uni.showToast({
            icon: "none",
            title: "请求404了,请检查网络或稍后再试!",
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          uni.showToast({
            icon: "none",
            title: error.response.statusText,
          });
          break;
      }
      return Promise.reject(error.response);
    } else {
      uni.showToast({
        icon: "none",
        title: "请求失败，请检查网络或稍后再试!",
      });
      return Promise.reject(error);
    }
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
  let formdata = new FormData();
  formdata.append("upfile", file);
  return request.post(url, formdata);
}
