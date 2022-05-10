<template>
  <div class="cont">
    <div class="left">
      <div class="list-tree">
        <div class="title">
          <img src="../../../assets/img/全部菜单.png" />
          <span style="margin-left: 10px; color: #3f3fec; font-weight: bold">全部实列</span>
        </div>
        <div>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleCloseMenu"
            unique-opened
          >
            <el-menu-item index="1">
              <img class="menuImage" src="../../../assets/img/待上架菜单.png" />
              <span slot="title">运行中<span style="float: right">2</span></span>
            </el-menu-item>
            <el-menu-item index="2">
              <img class="menuImage" src="../../../assets/img/待授权菜单.png" />
              <span slot="title">失败<span style="float: right">6</span></span>
            </el-menu-item>
            <el-menu-item index="3">
              <img class="menuImage" src="../../../assets/img/应用异常菜单.png" />
              <span slot="title">已完成<span style="float: right; color: red">9</span></span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="cont-main">
      <div class="top">
        <div>
          <span class="mr10">流程实例</span>
          <!-- <el-button type="danger" size="small">删除</el-button> -->
        </div>
        <div class="dfc">
          <span> <el-select placeholder="应用类型" size="small" style="width: 100px" class="mr10"></el-select></span>
          <span><el-select placeholder="流程类型" size="small" style="width: 100px" class="mr10"></el-select></span>
          <span><el-select placeholder="状态" size="small" style="width: 100px" class="mr10"></el-select></span>
          <span class="mr10">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
              style="width: 300px"
            >
            </el-date-picker>
          </span>
          <span
            ><el-input
              suffix-icon="el-icon-search"
              size="small"
              v-model="topinput"
              placeholder="输入流程名称"
            ></el-input
          ></span>
        </div>
      </div>
      <Table :tableData="tableData" :height="400"></Table>
      <div>
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 30, 40]"
          :current-page="1"
          :total="1000"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "./comp/Table.vue";
export default {
  name: "",
  components: { Table },
  directives: {},
  data() {
    return {
      topinput: "",
      value1: "",
      tableData: [
        {
          appName: "南海侦察",
          appType: "侦察",
          flowName: "南海守卫",
          flowId: "1",
          flowType: "解调",
          startTime: "2021/01/23 12:45:34",
          endTime: "2021/01/23 12:45:34",
          state: "正常",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
        {
          appName: "南海侦察",
          appType: "侦察",
          flowName: "南海守卫",
          flowId: "2",
          flowType: "解调",
          startTime: "2021/01/23 12:45:34",
          endTime: "2021/01/23 12:45:34",
          state: "正常",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
        {
          appName: "南海侦察",
          appType: "侦察",
          flowName: "南海守卫",
          flowId: "3",
          flowType: "解调",
          startTime: "2021/01/23 12:45:34",
          endTime: "2021/01/23 12:45:34",
          state: "异常",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
        {
          appName: "南海侦察",
          appType: "侦察",
          flowName: "南海守卫",
          flowId: "4",
          flowType: "解调",
          startTime: "2021/01/23 12:45:34",
          endTime: "2021/01/23 12:45:34",
          state: "停止",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
        {
          appName: "南海侦察",
          appType: "侦察",
          flowName: "南海守卫",
          flowId: "5",
          flowType: "解调",
          startTime: "2021/01/23 12:45:34",
          endTime: "2021/01/23 12:45:34",
          state: "正常",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
        {
          appName: "南海侦察",
          appType: "侦察",
          flowName: "南海守卫",
          flowId: "6",
          flowType: "解调",
          startTime: "2021/01/23 12:45:34",
          endTime: "2021/01/23 12:45:34",
          state: "正常",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
        {
          appName: "南海侦察",
          appType: "侦察",
          flowName: "南海守卫",
          flowId: "7",
          flowType: "解调",
          startTime: "2021/01/23 12:45:34",
          endTime: "2021/01/23 12:45:34",
          state: "停止",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
      ],
      multipleSelection: [],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.cont {
  width: 100%;
  display: flex;
  .left {
    .list-tree {
      width: 200px;
      height: 100%;
      line-height: 36px;
      background: #f5f9ff;
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      .menutitle {
        img {
          margin-left: 10px !important;
        }
      }
      .menuImage {
        margin-right: 10px;
      }
      .title {
        padding-left: 20px;
        display: flex;
        align-items: center;
        background: white;

        span {
          color: black;
          font-size: 16px;
          margin-right: 10px;
        }
        div {
          background: white;
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          border-radius: 20px;
        }
      }
      :deep(.el-menu-item.is-active) {
        border-left: 5px solid #409eff;
      }
    }
  }
  .cont-main {
    margin: 15px;
    background: white;
    height: calc(100vh - 130px);
    width: 100%;
    .top {
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 15px;
    }
    :deep(.el-pagination) {
      background: #fff;
    }
  }
}
</style>
