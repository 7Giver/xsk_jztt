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
 * 图片上传
 * @param {file} image 二进制图片 (必填)
 */
export function uploadImage(file) {
  return uploadFile(`/${version}/default/upload`, file);
}

/**
 * 获取城市列表
 */
export function getCityList() {
  return get(`/${version}/default/district`);
}

/**
 * 文章不喜欢原因
 */
export function getUnlikeList() {
  return get(`/${version}/default/feedback`);
}

/**
 * 兴趣一级标签
 */
export function getFirstTag() {
  return get(`/${version}/default/category`);
}

/**
 * 兴趣二级标签
 * @param {ids} token 选择的一级标签 (必填)
 */
export function getSecondTag(str) {
  return get(`/${version}/default/sub-category`, { ids: str });
}

/**
 * 用户标签提交
 * @param {string} token 登录Token (必填)
 * @param {string} ids 用户选择的标签id (必填)
 */
export function postUserTag(params) {
  return post(`/${version}/label/submit`, params);
}

/**
 * 消息中心
 * @param {string} token 登录Token (必填)
 */
export function getNotice(token) {
  return get(`/${version}/log/notice`, { token: token });
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
 * 用户文章、视频列表
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
 * 用户文章、视频列表
 * @param {string} token 登录Token (必填)
 * @param {string} ids id字符串 (必填，逗号隔开)
 */
export function deleteWorks(params) {
  return post(`/${version}/user/delete-trends`, params);
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
export function postUserFocus(params) {
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
 * 消息列表
 * @param {string} token 登录Token (必填)
 * @param {string} type 类型 (必填，1-点赞，2-评论，3-关注，5-邀请好友通知，9-系统消息)
 * @param {?number} page 页码 (必填)
 * @param {?number} limit 每页条数（必填，默认20条）
 */
export function noticeList(params) {
  return get(`/${version}/log/notice-list`, params);
}

/**
 * 消息已读
 * @param {string} token 登录Token (必填)
 * @param {string} type 类型 (1-点赞，2-评论，3-关注，5-邀请好友通知，9-系统消息，传空表示全部已读)
 */
export function noticeRead(params) {
  return get(`/${version}/log/read`, params);
}

/**
 * 草稿箱列表
 * @param {string} token 登录Token (必填)
 * @param {string} type 类型 (1-文章，2-视频)
 */
export function getDrafts(params) {
  return get(`/${version}/user/drafts`, params);
}

/**
 * 批量删除草稿
 * @param {string} token 登录Token (必填)
 * @param {string} ids 文章id组成的字符串 (必填)
 */
export function deleteDrafts(params) {
  return post(`/${version}/user/delete-draft`, params);
}

/**
 * 我的评论
 * @param {string} token 登录Token (必填)
 * @param {string} lastid 类似page (必填，上一接口返回的lastid)
 * @param {string} limit 查询数量 (必填)
 */
export function mineComment(params) {
  return get(`/${version}/comment/mine`, params);
}

/**
 * 删除我的评论
 * @param {string} token 登录Token (必填)
 * @param {?string} id 评论id (必填)
 */
export function deleteComment(params) {
  return post(`/${version}/comment/delete`, params);
}

/**
 * 我的好友
 * @param {string} token 登录Token (必填)
 * @param {string} page 页码 (必填)
 * @param {string} limit 查询数量 (必填)
 */
export function getFriend(params) {
  return get(`/${version}/user/friend`, params);
}

/**
 * 文章列表
 * @param {string} token 登录Token (必填)
 * @param {string} page 页码 (必填)
 * @param {string} limit 查询数量 (必填)
 * @param {string} title 搜索关键词 (必填)
 * @param {string} cid 分类id (必填)
 * @param {string} type 类型 (1-文章，2-视频，0或不传混合)
 */
export function getArticleList(params) {
  return get(`/${version}/article/list`, params);
}

/**
 * 文章详情
 * @param {string} token 登录Token (必填)
 * @param {string} id 文章id (必填)
 * @param {string} uid 分享人id (必填)
 */
export function getArticleDetail(params) {
  return get(`/${version}/article/detail`, params);
}

/**
 * 文章收藏
 * @param {string} token 登录Token (必填)
 * @param {string} id 文章id (必填)
 * @param {number} type 1-收藏，2-取消收藏 (必填)
 */
export function collectArticle(params) {
  return post(`/${version}/article/favor`, params);
}

/**
 * 文章点赞
 * @param {string} token 登录Token (必填)
 * @param {string} id 文章id (必填)
 * @param {number} type 1-点赞，2-取消点赞 (必填)
 */
export function likeArticle(params) {
  return post(`/${version}/article/like`, params);
}

/**
 * 文章评论
 * @param {string} token 登录Token (必填)
 * @param {string} article_id 文章id (必填)
 * @param {string} page 页码 (必填)
 * @param {string} limit 查询数量 (必填)
 */
export function articleComment(params) {
  return get(`/${version}/comment/list`, params);
}

/**
 * 文章二级评论
 * @param {string} token 登录Token (必填)
 * @param {string} article_id 文章id (必填)
 * @param {string} page 页码 (必填)
 * @param {string} limit 查询数量 (必填)
 * @param {string} comment_id 父级评论id (必填)
 */
export function secondComment(params) {
  return get(`/${version}/comment/sub-list`, params);
}

/**
 * 提交文章评论
 * @param {string} token 登录Token (必填)
 * @param {string} article_id 文章id (必填)
 * @param {string} parent_id 评论id (如果是评论别人的评论，传入此id)
 * @param {string} content 评论内容 (必填)
 */
export function commentSubmit(params) {
  return post(`/${version}/comment/submit`, params);
}

/**
 * 评论点赞
 * @param {string} token 登录Token (必填)
 * @param {string} id 评论id (必填)
 * @param {string} type (必填，1-点赞，2-取消点赞)
 */
export function likeComment(params) {
  return post(`/${version}/comment/likes`, params);
}

/**
 * 提交不喜欢原因
 * @param {string} token 登录Token (必填)
 * @param {string} id 文章id (必填)
 * @param {string} content 不喜欢原因 (必填)
 */
export function postDislike(params) {
  return post(`/${version}/article/dislike`, params);
}

/**
 * 首页红包数据
 * @param {string} token 登录Token (必填)
 */
export function getRedBag(token) {
  return get(`/${version}/index/pop`, { token: token });
}

/**
 * 领取新人奖励
 * @param {string} token 登录Token (必填)
 * @param {?number} type 红包类型 (必填，1-新人红包)
 */
export function receiveReward(params) {
  return post(`/${version}/index/receive`, params);
}

/**
 * 文章阅读（默认每阅读5秒，调用一次）
 * @param {string} token 登录Token (必填)
 * @param {?number} id 文章id (必填)
 */
export function articleRead(params) {
  return post(`/${version}/article/read`, params);
}

/**
 * 文章阅读结束
 * @param {string} token 登录Token (必填)
 * @param {?number} track_id 文章id (必填)
 */
export function articleClose(params) {
  return post(`/${version}/article/close`, params);
}

/**
 * 菜单导航
 */
export function navBarTag(token) {
  return get(`/${version}/default/nav`);
}
