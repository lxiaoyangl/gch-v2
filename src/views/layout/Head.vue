<template>
  <div class="head">
    <div class="title">国产化信号处理平台</div>
    <div class="center">
      <!-- <Menu /> -->
      <el-menu
        :default-active="defaultActive"
        class="title-menu"
        background-color="#252E3F"
        text-color="#909399"
        active-text-color="#fff"
        :router="true"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item v-for="(item, i) in routeList" :index="item.path" :route="item.path">
          <span style="display: flex; align-items: center">
            <el-icon><component class="icon" :is="item.mate?.icon"></component></el-icon>
            {{ item.mate?.title }}
          </span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <div class="msg">
        <el-badge :value="12" :max="99" class="item">
          <el-icon><Message /></el-icon>
        </el-badge>
      </div>
      <div class="user" @click="logout">
        <div class="avat">
          <el-icon><UserFilled /></el-icon>
        </div>
        <span>管理员xxx</span>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref, reactive, computed } from "vue";
import { Ref } from "vue";
import { useRouter } from "vue-router";
import { Message, UserFilled } from "@element-plus/icons-vue";
import userRouteList from "../../router/user";
import devRouteList from "../../router/developer";
import { Routes } from "../../router/router";
import Menu from "../../components/Menu";

let routeList = reactive<Routes[]>([]);
let defaultActive: Ref<string> = ref("");

const router = useRouter();
let flag = sessionStorage.getItem("user");
if (flag == "user2") {
  routeList = userRouteList;
} else if (flag == "user1") {
  routeList = devRouteList;
}

const handleSelect = (key: string) => {
  localStorage.setItem("activeNav", key);
};
const logout = () => {
  router.push("/login");
};
defaultActive = computed(() => {
  let activeNav = localStorage.getItem("activeNav") || routeList[0].path;
  if (activeNav) {
    return activeNav;
  } else {
    return "";
  }
});
const icons = computed(() => {
  return (item: Routes) => {
    if (item.mate?.icon) {
      return item.mate.icon;
    }
    return "";
  };
});
</script>

<style lang="less">
.head {
  background-color: #252e3f;
  border: 1px solid #686e78;
  border-bottom: none;
  flex: 0 0 50px;
  color: #fff;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 16px;
    font-weight: 700;
    line-height: 50px;
    letter-spacing: 1px;
    flex: 0 0 180px;
  }
  .center {
    flex: 1;
    height: 50px;
    display: flex;
    justify-content: center;
    .el-menu {
      flex: 1;
      display: flex;
      justify-content: center;
      border: none;
    }
  }
  .right {
    height: 100%;
    display: flex;
    align-items: center;
    flex: 0 0 180px;

    .msg {
      font-size: 24px;
      margin: 0 20px;
      margin-right: 30px;
      .el-badge__content {
        border: none;
      }
    }
    .user {
      display: flex;
      align-items: center;
      cursor: pointer;
      .avat {
        font-size: 24px;
        height: 25px;
        width: 25px;
        background-color: #4079fa;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 8px;
      }
    }
  }
}
</style>
