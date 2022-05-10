import VisualDesign from "../views/applicationInfo/visualDesign/VisualDesign.vue";
import Process from "../views/applicationInfo/process/Process.vue";
import BasicInfo from "../views/applicationInfo/basicInfo/BasicInfo.vue";
import IsolateTheGrouping from "../views/applicationInfo/isolateTheGrouping/IsolateTheGrouping.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import userRoutes from "./user";
import developerRoutes from "./developer";
import { Routes } from "./router";
// import store from "../store/index";
// import {
//   Message
// } from "element-ui";

// 解决重复跳转的警告
// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err);
// };
// Vue.use(Router);

const routes: Routes[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/index",
    // redirect: "/login",
    component: () => import("../views/Index.vue"),
    children: [
      {
        userId: "0",
        path: "/home",
        name: `首  页`,
        component: () => import("../views/home/OperationHome.vue"),
      },
      // {
      //   userId: '0',
      //   path: "/operationHome",
      //   name: `首  页`,
      //   component: () => import("../views/home/OperationHome.vue"),
      // },

      //应用开发人员
      {
        userId: "2",
        name: "开发应用中心",
        path: "/application/management",
        component: () => import("../views/application/management/ManagementDev.vue"),
      },

      //运维人员
      {
        userId: "4",
        name: "运维应用中心",
        path: "/applicationDevOps/management",
        component: () => import("../views/application/management/ManagementDevOps.vue"),
      },
      {
        userId: "4",
        name: "应用用户首页",
        path: "/applicationHome/home",
        component: () => import("../views/home/ApplicationHome.vue"),
      },
      {
        name: "应用开发首页",
        path: "/applicationDev/home",
        component: () => import("../views/home/ApplicationDevHome.vue"),
      },
      // {
      //   path: "/target",
      //   name: "目标态势",
      //   component: () => import("../views/target/Target.vue"),
      // },
      {
        name: "应用中心",
        path: "/applicationUser/management",
        component: () => import("../views/application/management/ManagementUser.vue"),
      },
      {
        name: "流程管理",
        path: "/applicationUser/process",
        component: () => import("../views/application/processManager/ProcessChoreographer.vue"),
      },
      {
        name: "应用数据管理",
        path: "/applicationUser/dataManager",
        component: () => import("../views/application/dataManager/dataInfoManager.vue"),
      },
      {
        userId: "4",
        path: "/resource",
        name: "资源中心",
        redirect: "/resource/management",
        component: () => import("../views/resource/Resource.vue"),
        children: [
          {
            path: "/resource/management",
            name: "资源管理",
            component: () => import("../views/resource/management/Management.vue"),
          },
          {
            path: "/resource/modeling",
            name: "资源模型",
            component: () => import("../views/resource/modeling/Modeling.vue"),
          },
          {
            path: "/resource/group",
            name: "资源组",
            component: () => import("../views/resource/group/Group.vue"),
          },
          {
            path: "/resource/gplot",
            name: "资源拓扑",
            component: () => import("../views/resource/gplot/Gplot.vue"),
          },
          {
            path: "/resource/create",
            name: "新建资源",
            component: () => import("../views/resource/management/ResourceCreate.vue"),
          },
          {
            path: "/resource/dictionary",
            name: "字典库",
            component: () => import("../views/resource/dictionary/Dictionary.vue"),
          },
        ],
      },
      {
        userId: "2",
        path: "/fidlddata",
        name: "应用开发",
        redirect: "/fidlddata/basic",
        component: () => import("../views/development/Fidlddata.vue"),
        children: [
          {
            path: "/fidlddata/basic",
            name: "基本信息",
            component: () => import("../views/development/Basic.vue"),
          },
          {
            path: "/fidlddata/fldata",
            name: "应用数据",
            component: () => import("../views/development/Fldata.vue"),
          },
          {
            path: "/fidlddata/flow",
            name: "处理流程",
            component: () => import("../views/development/Processflow.vue"),
          },
          {
            path: "/fidlddata/arrange",
            name: "组件编排",
            component: () => import("../views/development/Arrange.vue"),
          },
          {
            path: "/fidlddata/vis",
            name: "可视化",
            component: () => import("../views/development/Visualization.vue"),
          },
          {
            path: "/fidlddata/release",
            name: "发布部署",
            component: () => import("../views/development/Releasedeployment.vue"),
          },
          {
            path: "/fidlddata/appUnderDevelop",
            name: "应用开发中",
            component: () => import("../views/development/AppUnderDevelopment.vue"),
          },
          {
            path: "/fidlddata/appDevlopFinish",
            name: "应用开发完成",
            component: () => import("../views/development/AppDevelopmentFinish.vue"),
          },
        ],
      },
      // {
      //   userId: '1,4',
      //   path: "/componentFactory",
      //   name: "组件仓库",
      //   // redirect: "/componentFactory/component",
      //   component: () => import("../views/component/ComponentFactory.vue"),
      //   children: [
      {
        path: "/componentFactory/component",
        name: "组件管理",
        component: () => import("../views/component/Component.vue"),
        children: [],
      },
      {
        path: "/componentFactory/compoentmangement",
        name: "组件注册",
        component: () => import("../views/component/Componentmanagement.vue"),
        children: [],
      },
      {
        path: "/componentFactory/compoenttemplate",
        name: "组件开发模板",
        component: () => import("../views/component/ComponentTemplate.vue"),
        children: [],
      },
      {
        path: "/componentFactory/componentModes",
        name: "组件管理",
        component: () => import("../views/component/ComponentModes.vue"),
        children: [],
      },
      {
        path: "/componentFactory/componentDevOps",
        name: "组件管理",
        component: () => import("../views/component/ComponentDevOps.vue"),
        children: [],
      },
      //   ]
      // },
      {
        userId: "4",
        path: "/userCenter",
        name: "用户中心",
        component: () => import("../views/userCenter/UserCenter.vue"),
      },
      {
        userId: "0",
        path: "/log",
        name: "运维日志",
        component: () => import("../views/log/Log.vue"),
      },
      {
        userId: "0",
        path: "/inforManager",
        name: "信息管理",
        redirect: "/inforManager/report",
        component: () => import("../views/information/Information.vue"),
        children: [
          {
            path: "/inforManager/report",
            name: "告警通知",
            component: () => import("../views/information/Report.vue"),
          },
          {
            path: "/inforManager/examine",
            name: "审批信息",
            component: () => import("../views/information/Examine.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/application/management/black",
    name: "应用新增页面",
    redirect: "/application/basicInfo",
    component: () => import("../views/applicationInfo/ApplicationInfo.vue"),
    children: [
      {
        path: "/application/basicInfo",
        name: "基本信息",
        component: BasicInfo,
        // component: () => import("../views/applicationInfo/process/Process.vue"),
      },
      {
        path: "/application/process",
        name: "流程编排",
        component: Process,
        // component: () => import("../views/applicationInfo/process/Process.vue"),
      },
      {
        path: "/application/visualDesign",
        name: "可视化设计",
        component: VisualDesign,
        // component: () => import("../views/applicationInfo/visualDesign/VisualDesign.vue"),
      },
      {
        path: "/application/isolateTheGrouping",
        name: "隔离分组",
        component: IsolateTheGrouping,
        // component: () => import("../views/applicationInfo/isolateTheGrouping/IsolateTheGrouping.vue"),
      },
    ],
  },
  {
    path: "/application/management/applicationManagement",
    name: "应用管理页面",
    redirect: "/applicationManagement/processChoreographer",
    component: () => import("../views/applicationManagement/ApplicationManagement.vue"),
    children: [
      {
        path: "/applicationManagement/applicationOfMonitoring",
        name: "应用监控",
        component: () => import("../views/applicationManagement/applicationOfMonitoring/ApplicationOfMonitoring.vue"),
      },
      {
        path: "/applicationManagement/dataAdministration",
        redirect: "/dataAdministration/processData",
        name: "数据管理",
        component: () => import("../views/applicationManagement/dataAdministration/DataAdministration.vue"),
        children: [
          {
            name: "流程数据",
            path: "/dataAdministration/processData",
            component: () => import("../views/applicationManagement/dataAdministration/processData/ProcessData.vue"),
          },
          {
            name: "信号数据",
            path: "/dataAdministration/signalData",
            component: () => import("../views/applicationManagement/dataAdministration/signalData/SignalData.vue"),
          },
          {
            name: "协议数据",
            path: "/dataAdministration/protocolData",
            component: () => import("../views/applicationManagement/dataAdministration/protocolData/ProtocolData.vue"),
          },
        ],
      },
      {
        path: "/applicationManagement/visualDesign",
        name: "可视化设计",
        component: () => import("../views/applicationManagement/visualDesign/VisualDesign.vue"),
      },
      {
        path: "/applicationManagement/isolateTheGrouping",
        name: "隔离分组",
        component: () => import("../views/applicationManagement/isolateTheGrouping/IsolateTheGrouping.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("../views/Err404.vue"),
  },
];

// const routes = [{
//     path: '/login',
//     name: 'login',
//     component: () => import('../views/Login.vue'),
//   },
//   {
//     path: '/',
//     redirect: "/home",
//     component: () => import('../views/Index.vue'),
//     children: [{
//       path: '/home',
//       component: () => import('../views/home/Home.vue'),
//     }, ]
//   },
// ]
const router = createRouter({
  //   //激活类名
  linkActiveClass: "on",
  history: createWebHashHistory(),
  routes,
});
// const router = createRouter({
//   //激活类名
//   linkActiveClass: "on",
//   createHashHistory(),
//   routes,
// });
// /**
//  * 动态计算路由
//  * @param {*全部路由} asyncRoutes
//  * @param {*用户能关联的路由} userAddressable
//  */
// function getMenus(userAddressable) {
//   let arr = []
//   if (!userAddressable) return []
//   userAddressable.forEach(v => {
//     let obj = {
//       path: '/' + v.url,
//       name: v.name,
//       component: () => import('../views/' + v.route + '.vue'),
//       children: [],
//       visible: true,
//       mate: {
//         buttonVisibel: [],
//         id: v.id,
//         pId: v.pId,
//         leve: v.leve,
//         des: v.des
//       }
//     }
//     if (v.type == 'menu') { //处理菜单
//       if (!v.url.includes('/')) {
//         arr.push(obj)
//       } else {
//         arr.forEach(pv => {
//           if (pv.mate.id == v.pId) {
//             pv.children.push(obj)
//           }
//         })
//       }
//     } else if (v.type == 'button') { //处理按钮
//       arr.forEach(pv => {
//         if (pv.children.length > 0) {
//           pv.children.forEach(cv => {
//             if (v.pId == cv.mate.id) {
//               cv.mate.buttonVisibel.push(v)
//             }
//           })
//         } else {
//           if (v.pId == pv.mate.id) {
//             pv.mate.buttonVisibel.push(v)
//           }
//         }
//       })
//     }
//   })
//   return arr
// }

// /*
//   判断在不在左侧显示
//   参数1：当前路由对象
//   参数2: 当前角色
// */
// function isVisible(router) {
//   if (router.visible) {
//     return true;
//   } else {
//     return false;
//   }
// }

// /**
//  * 计算菜单
//  * 参数1： 当前有权限访问的路由
//  * 参数2： 当前角色
//  */
// function calcMenus(accessRoutes) {
//   let arr = accessRoutes.filter((router) => {
//     if (isVisible(router)) {
//       return true;
//     } else {
//       return false;
//     }
//   });
//   return arr;
// }

// /*
//   根据当前角色，动态创建出可以当前角色可以访问的路由
// */
// export function createRoutes() {
//   let asyncRoutes = [{
//     path: '/',
//     redirect: "/home",
//     visible: true,
//     component: () => import('../views/Index.vue'),
//     children: []
//   }]
//   // let userAddressable = store.state.userAddressable
//   let userAddressable = JSON.parse(localStorage.getItem('SET_USER_ADDRESSABLE'))
//   // 计算出有权限访问的路由
//   asyncRoutes[0].children = getMenus(userAddressable);
//   asyncRoutes = asyncRoutes.concat([{
//     path: '*',
//     name: 'err404',
//     visible: false,
//     component: () => import('../views/Err404.vue'),
//   }, ])
//   // 动态添加路由 【把算出来的权限路由 动态挂载】
//   router.addRoutes(asyncRoutes);
//   // 计算动态的菜单
//   let menus = calcMenus(asyncRoutes);
//   // console.log(menus);
//   // 存入仓库
//   store.commit('SET_MENUS', menus)
//   // store.commit('SET_BUTTON', menus)
// }
// createRoutes()
//路由守卫
router.beforeEach((to, from, next) => {
  next();
  // let isLogin = localStorage.getItem("t_k") ? true : false;

  // let localTime = (new Date()).getTime()
  // if ((cookies.get("overTime") - localTime) / 1000 <= 300) {
  //   Message({
  //     type: "error",
  //     message: '您的身份即将过期'
  //   });
  // }
  // if (!cookies.get("overTime") && window.location.hash !== '#/login' && window.location.hash !== '#/') {
  //   Message({
  //     type: "error",
  //     message: '您的身份已过期,请重新登陆'
  //   });
  //   localStorage.clear();
  //   window.location.hash = '#/login'
  // }
  // if (isLogin) {
  //   next(); // 如果登录过 直接放行
  // } else {
  //   if (to.path === "/login") {
  //     next();
  //   } else {
  //     next({
  //       path: "/login"
  //     }); // 去的就是别的页面 重置到登录
  //   }
  // }
});

export default router;
