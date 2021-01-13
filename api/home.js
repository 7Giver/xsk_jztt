import { get, post, uploadFile } from "./http";

/**
 * @desc 获取素材分类信息
 */
export function getAreaList(str) {
  return get(str + "api/index/district", {});
}
