import { get, post, uploadFile } from "./http";

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
