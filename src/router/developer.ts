import { Routes } from "./router";
const routes: Routes[] = [
  {
    name: "应用开发首页",
    path: "/applicationDev/home",
    mate: {
      title: "首 页",
      icon: "HomeFilled",
    },
    component: () => import("../views/home/ApplicationDevHome.vue"),
  },
  {
    path: "/componentFactory/compoenttemplate",
    name: "组件开发模板",
    mate: {
      title: "组件开发",
      icon: "Ticket",
    },
    component: () => import("../views/component/ComponentTemplate.vue"),
    // children: [
    //   {
    //     path: "/componentFactory/compoentmangement",
    //     name: "组件注册",
    //     component: () => import("../views/component/Componentmanagement.vue"),
    //   },
    // ],
  },
  {
    path: "/componentFactory/component",
    name: "组件仓库",
    mate: {
      title: "组件仓库",
      icon: "Shop",
    },
    component: () => import("../views/component/Component.vue"),
  },
  {
    path: "/fidlddata",
    name: "应用开发",
    mate: {
      title: "应用开发",
      icon: "Grid",
    },
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
  {
    path: "/application/management",
    name: "开发应用中心",
    mate: {
      title: "应用管理",
      icon: "ScaleToOriginal",
    },
    component: () => import("../views/application/management/ManagementDev.vue"),
  },
  {
    path: "/inforManager",
    name: "信息管理",
    redirect: "/inforManager/examine",
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
    mate: {
      title: "日志管理",
      icon: "Reading",
    },
  },
  // {
  //   path: "/chart",
  //   name: "chart",
  //   component: () => import("../views/chatr/index.vue"),
  //   mate: {
  //     title: "chart",
  //     icon: "Reading",
  //   },
  // },
];

export default routes;
