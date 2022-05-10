<template>
  <div class="processChoreographer">
    <div class="left">
      <div class="list-tree">
        <div class="title">
          <img src="../../../assets/img/全部菜单.png"/>
          <span style="margin-left:10px;color: #3f3fec;font-weight: bold;">全部应用</span>
        </div>
        <div>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleCloseMenu"
            unique-opened
          >
            <el-menu-item>
              <img class="menuImage" src="../../../assets/img/待上架菜单.png"/>
              <span slot="title">运行中<span style="float: right;">2</span></span>
            </el-menu-item>
            <el-menu-item>
              <img class="menuImage" src="../../../assets/img/待授权菜单.png"/>
              <span slot="title">空闲中<span style="float: right;">6</span></span>
            </el-menu-item>
            <el-menu-item>
              <img class="menuImage" src="../../../assets/img/应用异常菜单.png"/>
              <span slot="title">异常应用<span style="float: right;color:red;">9</span></span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="right">
      <Table :tableData="tableData" />
      <Pagination />
    </div>
  </div>
</template>

<script>
// import Vfd from "vfd";
import Table from "./comp/Table.vue";
import Pagination from "./comp/Pagination.vue";

export default {
  components: {
    // Vfd,
    Table,
    Pagination,
  },
  data() {
    return {
      editableTabsValue: "1",
      tabIndex: 1,
      editableTabs: [
        {
          title: "流程列表",
          name: "1",
        },
      ],
      tableData: [
        {
          lcname: "载波群组处理流程",
          lctype: "流程类型",
          time: "2021/01/23 12:45:34",
          maxdata: "20",
          state: "停止",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
        {
          lcname: "载波群组处理流程",
          lctype: "流程类型",
          time: "2021/01/23 12:45:34",
          maxdata: "20",
          state: "启动",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
        {
          lcname: "载波群组处理流程",
          lctype: "流程类型",
          time: "2021/01/23 12:45:34",
          maxdata: "20",
          state: "启动",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
        {
          lcname: "载波群组处理流程",
          lctype: "流程类型",
          time: "2021/01/23 12:45:34",
          maxdata: "20",
          state: "启动",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
        {
          lcname: "载波群组处理流程",
          lctype: "流程类型",
          time: "2021/01/23 12:45:34",
          maxdata: "20",
          state: "启动",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
        {
          lcname: "载波群组处理流程",
          lctype: "流程类型",
          time: "2021/01/23 12:45:34",
          maxdata: "20",
          state: "启动",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
        {
          lcname: "载波群组处理流程",
          lctype: "流程类型",
          time: "2021/01/23 12:45:34",
          maxdata: "20",
          state: "启动",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
        {
          lcname: "载波群组处理流程",
          lctype: "流程类型",
          time: "2021/01/23 12:45:34",
          maxdata: "20",
          state: "启动",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
        {
          lcname: "载波群组处理流程",
          lctype: "流程类型",
          time: "2021/01/23 12:45:34",
          maxdata: "20",
          state: "启动",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
        {
          lcname: "载波群组处理流程",
          lctype: "流程类型",
          time: "2021/01/23 12:45:34",
          maxdata: "20",
          state: "启动",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
        {
          lcname: "载波群组处理流程",
          lctype: "流程类型",
          time: "2021/01/23 12:45:34",
          maxdata: "20",
          state: "启动",
          lcms: "对改流程的一些描述说明，对改流程的一些描述说明..",
          isHover: false,
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    addTab(targetName) {
      console.log(11);
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: "新建流程" + this.tabIndex,
        name: newTabName,
        // content: "New Tab content",
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
    },
  },
};
</script>
<style lang="less" scoped>
.processChoreographer {
  height: 100%;
  width: 100%;
  position: relative;
  .left{
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
      .menuImage{
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
    }
  }
  // .addbtn {
  //   z-index: 2;
  //   position: absolute;
  //   top: 5px;
  //   left: 145px;
  // }
  // .btm-box {
  //   padding: 0 20px;
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  // }
  // .el-tabs {
  //   height: 100%;
  //   /deep/.el-tabs__content {
  //     background-color: #fff;
  //     height: calc(100% - 40px);
  //     .el-tab-pane {
  //       height: 100%;
  //     }
  //   }
  // }
}
</style>