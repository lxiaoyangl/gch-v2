import { Routes } from "./router";
const routes: Routes[] = [
  {
    path: "/applicationHome/home",
    name: "应用用户首页",
    mate: {
      title: "首页",
      icon: "HomeFilled",
    },
    component: () => import("../views/home/ApplicationHome.vue"),
  },
  {
    path: "/applicationUser/management",
    name: "应用中心",
    mate: {
      title: "应用中心",
      icon: "Grid",
    },
    component: () => import("../views/application/management/ManagementUser.vue"),
  },
  {
    path: "/resource",
    name: "资源管理",
    mate: {
      title: "资源管理",
      icon: "Cpu",
    },
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
    path: "/applicationUser/dataManager",
    name: "数据管理",
    mate: {
      title: "数据管理",
      icon: "DataAnalysis",
    },
    component: () => import("../views/application/dataManager/dataInfoManager.vue"),
  },
  {
    path: "/applicationUser/process",
    name: "流程管理",
    mate: {
      title: "实例管理",
      icon: "DocumentCopy",
    },
    component: () => import("../views/application/processManager/ProcessChoreographer.vue"),
  },
  {
    path: "/userCenter",
    name: "用户管理",
    mate: {
      title: "用户管理",
      icon: "UserFilled",
    },
    component: () => import("../views/userCenter/UserCenter.vue"),
  },
  {
    path: "/inforManager",
    name: "信息管理",
    mate: {
      title: "信息管理",
      icon: "Reading",
    },
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
];

export default routes;
