import { get, post, uploadFile } from "./http";

const version = "v1"; //接口版本

/**
 * 获取手机验证码
 * @param {?number} mobile 手机号 (必填)
 */
export function getOauthCode(tel) {
  return get("/api/oauth/message", { mobile: tel });
}

/**
 * 用户登录
 * @param {?number} mobile 手机号 (必填)
 * @param {?string} code 短信验证码 (必填)
 * @param {?string} invite 邀请码
 * @param {?string} openid 微信openid (没有表示未授权)
 */
export function userLogin(params) {
  return post("/api/oauth/login", params);
}

/**
 * 用户任务列表
 * @param {string} token 登录Token (必填)
 */
export function getTaskList(token) {
  return get(`/${version}/user/task`, { token: token });
}

/**
 * 金币、通宝详情
 * @param {string} token 登录Token (必填)
 * @param {?number} page 页码 (必填)
 * @param {?number} limit 每页条数（必填，默认10条）
 * @param {?number} type 类型 (必填，0--全部，1--金币变动，2--通宝变动)
 */
export function getCoinData(params) {
  return get(`/${version}/log/balance`, params);
}
