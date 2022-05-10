<template>
  <div class="main">
    <div class="loginbox">
      <div>
        <el-image :src="loginButton" fit="fill"></el-image>
      </div>
      <div style="position: absolute; right: 200px; top: 200px">
        <div style="font-size: 24px; font-weight: bold; margin-bottom: 20px">欢迎登录</div>
        <el-form class="fom">
          <el-form-item>
            <el-input :prefix-icon="User" placeholder="请输入用户名" class="mb10 int" v-model="user"> </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              :prefix-icon="Lock"
              placeholder="请输入密码"
              class="mb10 int"
              v-model="pass"
            ></el-input>
          </el-form-item>
        </el-form>
        <div style="margin-top: 50px">
          <el-button type="primary" class="btn" @click="login()">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
;
<script setup lang="ts">
import { reactive, ref, Ref } from "vue";
import loginButton from "../assets/img/login-button.png";
import { ElMessage } from "element-plus";
import { useRouter, RouteRecordRaw } from "vue-router";
import { User, Lock } from "@element-plus/icons-vue";
import developerRoutes from "../router/developer";
import userRoutes from "../router/user";

interface UserList {
  [key: string]: string;
}
const user: Ref<string> = ref("user1");
const pass: Ref<string> = ref("123456");
const userList: UserList[] = reactive([
  {
    id: "1",
    userName: "user1",
    password: "123456",
  },
  {
    id: "2",
    userName: "user2",
    password: "123456",
  },
]);
const router = useRouter();
const routes: RouteRecordRaw = {
  path: "/",
  component: () => import("../views/Index.vue"),
  // redirect: () => {
  //   const redirectPath = localStorage.getItem("redirectPath");
  //   localStorage.removeItem("redirectPath");
  //   return redirectPath || "/";
  // },
  children: [
    {
      path: "/componentFactory/compoentmangement",
      name: "组件注册",
      component: () => import("../views/component/Componentmanagement.vue"),
    },
    ...developerRoutes,
    ...userRoutes,
  ],
};

const login = (): void => {
  let isLogin: boolean = false;
  for (let users of userList) {
    if (users.userName === user.value && users.password === pass.value) {
      sessionStorage.setItem("user", user.value);
      if (user.value === "user1") {
        routes.redirect = "/applicationDev/home";
        // routes?.children.concat(developerRoutes);
      } else {
        routes.redirect = "/applicationDev/home";
        // routes?.children.concat(userRoutes);
      }
      router.addRoute(routes);
      router.push("/");
      isLogin = true;
      return;
    }
  }
  if (!isLogin) {
    ElMessage.error("用户名或密码错误");
  }
  console.log(router);
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("../assets/img/bg.png") no-repeat center;
  background-size: 100% 100%;
  .loginbox {
    padding: 40px;
    position: relative;
    display: flex;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .mange {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      margin: 25px 0;
    }
    .fom {
      width: 300px;
      .int {
        border-radius: 20px;
      }
    }
    .btn {
      width: 300px;
    }
    :deep(.el-input__inner) {
      width: 300px;
    }
    :deep(.el-form-item:not(:first-child)) {
      margin-top: 25px;
    }
  }
}
</style>
