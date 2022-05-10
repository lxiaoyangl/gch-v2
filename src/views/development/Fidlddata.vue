<template>
  <el-container>
    <el-aside width="90px" default-active="1">
      <router-link v-for="item in links" :to="item.path">
        <div class="ui">
          <img :src="item.icon" />
          <span>{{ item.name }}</span>
        </div>
      </router-link>

      <!-- <div :class="changenum == 2 ? 'ui backgr' : 'ui'" @click="tozjzc">
        <img src="../../assets/img/应用数据节点.png" />
        <span>应用数据</span>
      </div>
      <div :class="changenum == 3 ? 'ui backgr' : 'ui'" @click="tozjgl">
        <img src="../../assets/img/处理流程节点.png" />
        <span>处理流程</span>
      </div>
      <div :class="changenum == 4 ? 'ui backgr' : 'ui'" @click="tosj">
        <img src="../../assets/img/可视化设计节点.png" />
        <span>可视化</span>
      </div>
      <div :class="changenum == 5 ? 'ui backgr' : 'ui'" @click="tobs">
        <img src="../../assets/img/发布部署节点.png" />
        <span>发布部署</span>
      </div> -->
    </el-aside>
    <!-- <div class="xd">
      <div class="xdcl">
        <i class="el-icon-paperclip" @click="look">向导</i>
      </div>
      <div :class="dis == true ? 'xdmain' : 'xdmain displayin'">
        <div class="db">
          <el-steps direction="vertical" :active="1">
            <el-step title="基本信息"></el-step>
            <el-step title="应用数据"></el-step>
            <el-step title="处理流程"></el-step>
            <el-step title="应用视图"></el-step>
            <el-step title="发布部署"></el-step>
          </el-steps>
        </div>
      </div>
    </div> -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import jbxx from "../../assets/img/基本信息节点.png";
import yysj from "../../assets/img/应用数据节点.png";
import cllc from "../../assets/img/处理流程节点.png";
import yysv from "../../assets/img/可视化设计节点.png";
import fbbs from "../../assets/img/发布部署节点.png";
import { ref } from "vue";

const links = ref([
  {
    path: "/fidlddata/basic",
    name: "基本信息",
    icon: jbxx,
  },
  {
    path: "/fidlddata/fldata",
    name: "应用数据",
    icon: yysj,
  },
  {
    path: "/fidlddata/arrange",
    name: "处理流程",
    icon: cllc,
  },
  {
    path: "/fidlddata/vis",
    name: "应用视图",
    icon: yysv,
  },
  {
    path: "/fidlddata/appDevlopFinish",
    name: "发布部署",
    icon: fbbs,
  },
]);
</script>

<style lang="less" scoped>
.on {
  .ui {
    background: #bad7ff;
    color: #48a1f5;
  }
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
.el-aside {
  background: white;
  height: calc(100vh - 52px);
}
.xd {
  position: absolute;
  top: 40px;
  right: 0;
  width: 50px;
  line-height: 40px;
  color: white;
  z-index: 999999;
  .xdcl {
    background: #0084f0;
    text-align: center;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
  }
  .xdmain {
    background: white;
    border: 1px solid skyblue;
  }
  .displayin {
    display: none;
  }
}
:deep(.el-step.is-vertical) {
  justify-content: center;
  flex-wrap: wrap;
}
:deep(.el-step.is-vertical .el-step__title) {
  font-size: 14px;
}
</style>
