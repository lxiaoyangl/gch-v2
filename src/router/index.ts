// import VisualDesign from "../views/applicationInfo/visualDesign/VisualDesign.vue";
// import Process from "../views/applicationInfo/process/Process.vue";
// import BasicInfo from "../views/applicationInfo/basicInfo/BasicInfo.vue";
// import IsolateTheGrouping from "../views/applicationInfo/isolateTheGrouping/IsolateTheGrouping.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import userRoutes from "./user";
import developerRoutes from "./developer";

// 解决重复跳转的警告
// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err);
// };
// Vue.use(Router);

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../views/Index.vue"),
    redirect: (): string => {
      const roles = sessionStorage.getItem("user");
      if (roles == "user1") {
        return "/applicationDev/home";
      } else if (roles == "user2") {
        return "/applicationHome/home";
      }
      return "/login";
    },
    children: [
      {
        path: "/componentFactory/compoentmangement",
        name: "组件注册",
        component: () => import("../views/component/Componentmanagement.vue"),
      },
      ...developerRoutes,
      ...userRoutes,
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("../views/Err404.vue"),
  },
];

const router = createRouter({
  //   //激活类名
  linkActiveClass: "on",
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next();
  } else {
    let token = sessionStorage.getItem("user");
    if (token) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
