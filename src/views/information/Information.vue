<template>
  <el-container>
    <el-aside width="90px" default-active="1">
      <div :class="changenum == 1 ? 'ui backgr' : 'ui'" @click="todevpent">
        <img src="../../assets/img/基本信息节点.png" />
        <span>开发日志</span>
      </div>
      <div :class="changenum == 2 ? 'ui backgr' : 'ui'" @click="tozjzc">
        <img src="../../assets/img/发布部署节点.png" />
        <span>异常日志</span>
      </div>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { Ref } from "vue";

// let dis = false;
let changenum: Ref<number> = ref(1);
const router = useRouter();

// const look = () => {
//   dis = !dis;
// };
const todevpent = () => {
  changenum.value = 1;
  router.push("/inforManager/examine");
};
const tozjzc = () => {
  changenum.value = 2;
  router.push("/inforManager/report");
};
todevpent();
</script>

<style lang="less" scoped>
.backgr {
  background: #bad7ff;
}
.ui {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  height: 90px;
  cursor: pointer;
  img {
    width: 25px;
  }
  span {
    font-size: 14px;
    margin-top: 10px;
  }
}
.displayin {
  display: none;
}
.el-container {
  position: relative;
  .xd {
    position: absolute;
    top: 200px;
    right: 0;
    width: 50px;
    line-height: 40px;
    color: white;
    .xdcl {
      background: #0084f0;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .xdmain {
      background: white;
      border: 1px solid skyblue;
    }
  }
}
.el-aside {
  background: white;
  height: calc(100vh - 52px);
}
</style>
>
