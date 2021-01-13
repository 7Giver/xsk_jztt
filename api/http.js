import Vue from "vue";
import uni_request from "common/uni_request.js";
import QS from "qs";

const dataURL = "http://cdn.blackhw.com"; // 引用资源地址
const testURL = "http://server.st712.com"; // 测试接口
let baseURL = "";

Vue.prototype.$dataURL = dataURL;

if (process.env.NODE_ENV == "development") {
  //开发
  baseURL = "http://ztc1.blackhw.com";
} else if (process.env.NODE_ENV == "production") {
  //线上
  baseURL = "http://ztc1.blackhw.com";
}

const request = uni_request({
  baseURL: baseURL,
  //   baseURL: testURL, //测试接口
  header: {
    "content-type": "multipart/form-data",
  },
  timeout: 60000,
  // #ifdef H5
  withCredentials: true,
  // #endif
});

export function http(type, url, params) {
  const httpType = type ? type : "get";
  if (httpType === "get") {
    return get(url, params);
  } else {
    return post(url, params);
  }
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return request.get(url, { params: params });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return request.post(url, QS.stringify(params));
}

/**
 * @desc 上传文件
 * @param url
 * @param file
 */
export function uploadFile(url, file) {
  let formdata = new FormData();
  formdata.append("upfile", file);
  return request.post(url, formdata);
}
