import req from "./http";
import qs from "qs";

/**
 * 登录
 */
//查看用户列表
// export function verify(params) {
//   return req.post("/login/verify", qs.stringify(params), {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   }
//   )
// }


/**
 * @name getPerformanceList
 * @description 获取列表
 * @date 2020-3-4
 * @param {any}
 */
export function getPerformanceList(params) {
  return req.get("/performance/list", params)
}

/**
 * @name createPerformanceNode
 * @description 新增
 * @date 2020-3-4
 * @param {any}
 */
export function createPerformanceNode(params) {
  return req.post("/performance/save", params)
}