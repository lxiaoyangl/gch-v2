/**
发送请求的工具函数
 */
//引入axios qs
import axios from "axios";
import { ApiUrl } from '../../url'
import qs from "qs";
import {
  Message
} from "element-ui";

/*第一层if判断生产环境和开发环境*/
// dev 开发环境
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ?
  `${window.location.origin}/` : `${ApiUrl}/`; //路径

// 服务器地址 在所有请求上拼接
axios.defaults.timeout = 5000; //设置请求超时
/**
 * 请求拦截
 */
// axios.interceptors.request.use((config) => {
//   let token = localStorage.getItem("t_k") || ""; // 取出本地token
//   if (token) {
//     config.headers.Authorization = token; // 统一在请求头携带token
//   }
//   return config;
// });
/**
 * 响应拦截
 */
// axios.interceptors.response.use((response) => {
//   // 如果有code 和 message
//   let {
//     code,
//     msg
//   } = response.data; // 取出code 和 msg
//   // if (code == '200') {
//   //   Message({
//   //     message: msg,
//   //     type: "success",
//   //   })
//   //   return response
//   // }
// },
//   (error) => { //抛出错误
//     // let {
//     //   code,
//     //   msg
//     // } = error.response; // 取出code 和 msg
//     // if (code == 205)
//     //   Message({
//     //     message: msg,
//     //     type: "error",
//     //   });
//     return Promise.reject(error)
//   });

export default {
  //封装get请求
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    })
  },
  // 封装post请求
  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 封装delete请求
  delete(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, {
          params
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

