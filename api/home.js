import { get, post, uploadFile } from "./http";

const version = "v1"; //接口版本

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
 * 获取用户信息
 * @param {string} token 登录Token (必填)
 */
export function getUserInfo(token) {
  return get(`/${version}/user/info`, { token: token });
}

/**
 * 获取手机验证码
 * @param {?number} mobile 手机号 (必填)
 */
export function getOauthCode(tel) {
  return get("/api/oauth/message", { mobile: tel });
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
 * @param {?number} type 类型 (必填，0-全部，1-金币变动，2-通宝变动)
 */
export function getCoinData(params) {
  return get(`/${version}/log/balance`, params);
}

/**
 * 系统设置信息
 * @param {string} token 登录Token (必填)
 */
export function getSystemConfig(token) {
  return get(`/${version}/user/system`, { token: token });
}

/**
 * 个人主页信息
 * @param {string} token 登录Token (必填)
 */
export function getUserIndex(token) {
  return get(`/${version}/user/index`, { token: token });
}

/**
 * 用户文章、视频（个人主页）
 * @param {string} token 登录Token (必填)
 * @param {?number} page 页码 (必填)
 * @param {?number} limit 每页条数 (必填，默认10条)
 * @param {?string} sid 用户加密sid (传空表示查看自己的文章、视频)	
 * @param {?number} type 类型 (必填，0-全部，1-文章，2-视频)
 */
export function getUserWorks(params) {
  return get(`/${version}/user/trends`, params);
}

/**
 * 用户关注、粉丝列表
 * @param {string} token 登录Token (必填)
 * @param {?number} page 页码 (必填)
 * @param {?number} limit 每页条数 (必填，默认10条)
 * @param {?string} sid 用户加密sid (传空表示查看自己的文章、视频)	
 * @param {?number} type 类型 (必填，1-关注列表，2-粉丝列表)
 */
export function getFoucfans(params) {
  return get(`/${version}/user/fan-list`, params);
}

/**
 * 用户关注、取消关注
 * @param {string} token 登录Token (必填)
 * @param {?number} focus_id 被（取消）关注人id (必填)
 * @param {?string} opt 操作（必填，focus-关注，cancel-取消关注）
 */
export function getFocus(params) {
  return post(`/${version}/user/focus`, params);
}

/**
 * 用户设置字体大小
 * @param {string} token 登录Token (必填)
 * @param {string} font 字体大小(大，中，小)
 */
export function setFontSize(params) {
  return post(`/${version}/user/font`, params);
}

/**
 * 签到页面信息
 * @param {string} token 登录Token (必填)
 * @param {string} date 需要查看的年月 (必填，如：2021-01)
 */
export function getSign(params) {
  return get(`/${version}/sign/index`, params);
}

/**
 * 签到请求
 * @param {string} token 登录Token (必填)
 */
export function postSign(params) {
  return post(`/${version}/sign/sign`, params);
}

/**
 * 我的收藏列表
 * @param {string} token 登录Token (必填)
 * @param {?number} page 页码 (必填)
 * @param {?number} limit 每页条数（必填，默认10条）
 */
export function getFavor(params) {
  return get(`/${version}/log/favor`, params);
}

/**
 * 批量删除收藏
 * @param {string} token 登录Token (必填)
 * @param {string} id_str id组成的字符串(必填，如：23,44,78)	
 */
export function deleteFavor(params) {
  return post(`/${version}/log/delete-favor`, params);
}

/**
 * 我的足迹列表
 * @param {string} token 登录Token (必填)
 * @param {?number} page 页码 (必填)
 * @param {?number} limit 每页条数（必填，默认10条）
 */
export function getTrack(params) {
  return get(`/${version}/log/track`, params);
}

/**
 * 完善个人信息
 * @param {string} token 登录Token (必填)
 * @param {?string} avatar 头像 (必填)
 * @param {?string} name 昵称 (必填)
 * @param {?string} intro 简介 (必填)
 * @param {?string} address 地址 (必填)
 * @param {?string} birthday 出生年月 (必填)
 */
export function editUser(params) {
  return post(`/${version}/user/edit`, params);
}

/**
 * 图片上传
 * @param {file} image 二进制图片 (必填)
 */
export function uploadImage(file) {
  return uploadFile(`/${version}/default/upload`, file);
}