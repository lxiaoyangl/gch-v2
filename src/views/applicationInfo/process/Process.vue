<template>
  <div class="processChoreographer">
    <div
      class="addbtn"
      :style="{ left: editableTabs.length * 115 + 20 + 'px' }"
    >
      <el-button
        size="small"
        type="primary"
        round
        @click="addTab(editableTabsValue)"
      >
        <i class="el-icon-plus"></i>
        新 建
      </el-button>
    </div>
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
    >
      <template v-for="(item, i) in editableTabs">
        <el-tab-pane
          v-if="i == 0"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          <Table :tableData="tableData" />
          <div class="btm-box">
            <el-button size="small" type="danger">删除</el-button>
            <Pagination />
          </div>
        </el-tab-pane>

        <el-tab-pane
          v-else
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          <!-- <Vfd /> -->
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script>
// import Vfd from "vfd";
import Table from "../../applicationManagement/processChoreographer/comp/Table.vue";
import Pagination from "../../applicationManagement/processChoreographer/comp/Pagination.vue";

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
  .addbtn {
    z-index: 2;
    position: absolute;
    top: 5px;
    left: 145px;
  }
  .btm-box {
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-tabs {
    height: 100%;
    /deep/.el-tabs__content {
      background-color: #fff;
      height: calc(100% - 40px);
      .el-tab-pane {
        height: 100%;
      }
    }
  }
}
</style>