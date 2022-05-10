<template>
  <div class="cont">
    <div class="cont-main">
      <div class="top">
        <div>
          <span class="mr10">告警日志</span>
          <el-button type="danger">删除</el-button>
        </div>
        <div class="dfc">
          <el-select placeholder="全部状态" style="width: 120px" class="mr10"></el-select>
          <el-select placeholder="全部信息类型" style="width: 120px" class="mr10"></el-select>
          <el-date-picker
            class="mr10"
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 300px"
          >
          </el-date-picker>
          <el-input
            style="width: 200px"
            suffix-icon="Search"
            v-model="topinput"
            placeholder="搜索组件/应用名称"
          ></el-input>
        </div>
      </div>
      <Table
        :tableHeader="tableHeader"
        :tableData="tableData"
        height="calc(100vh - 180px)"
        :pg-total-num="tableData.length"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @cellMouseEnter="cellMouseEnter"
        @cellMouseLeave="cellMouseLeave"
      >
        <template #="{ data }">
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <el-icon class="op">
              <Delete @click="handleDel(data)" />
            </el-icon>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="下载" placement="bottom">
            <el-icon class="op">
              <Download @click="handleDownload(data)" />
            </el-icon>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="查看详情" placement="bottom">
            <el-icon class="op">
              <Tickets @click="handleDetail(data)" />
            </el-icon>
          </el-tooltip>
        </template>
      </Table>
    </div>
    <el-dialog
      title="信息详情"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      v-model="zjxxDialogVisible"
      center
      draggable
      width="25%"
      :before-close="handleClose"
    >
      <div class="title">
        <div class="toptitle">
          <el-icon><Minus /></el-icon>
          <el-icon><Minus /></el-icon>
          <span>组件审批</span>
          <el-icon><Minus /></el-icon>
          <el-icon><Minus /></el-icon>
        </div>
        <div class="titmain">
          <div class="mb10">
            <i></i>
            <span>{{ rows.mc }}</span>
          </div>
          <div class="mb10">
            <span>申请时间: </span>
            <span>{{ rows.sqsj }}</span>
          </div>
          <div class="mb10">
            <span>申请状态: </span>
            <span>{{ rows.zt }}</span>
          </div>
          <div class="mb10">
            <span>审批人: </span>
            <span>{{ rows.spr }}</span>
          </div>
          <div class="mb10">
            <span>审批时间: </span>
            <span>{{ rows.spsj }}</span>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" @click="handleClose">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import Table from "../../components/Table.vue";
import { TableData, Rows, TableHeader } from "./types";
import { reactive, ref } from "vue";
import { Ref } from "vue";
import { ElMessageBox } from "element-plus";
import { Delete, Download, Tickets, Minus } from "@element-plus/icons-vue";

let topinput: Ref<string> = ref("");
let value1: Ref<string> = ref("");
let zjxxDialogVisible: Ref<boolean> = ref(false);
let tableHeader = [
  {
    prop: "id",
    name: "序号",
    width: 60,
  },
  {
    prop: "mc",
    name: "名称",
    width: 150,
  },
  {
    prop: "type",
    name: "信息类型",
    formatter: (row: any, column: any, cellValue: string, index: any) => {
      return '<span style="color:red;">' + cellValue + "</span>";
    },
  },
  {
    prop: "sqsj",
    name: "申请时间",
    sortable: true,
  },
  {
    prop: "zt",
    name: "状态",
    width: 150,
  },
  {
    prop: "spr",
    name: "审批人",
    width: 150,
  },
  {
    prop: "spsj",
    name: "审批时间",
    width: 250,
  },
  {
    prop: "spsj",
    name: "审批时间",
    width: 250,
    button: true,
  },
];
let tableData = reactive([
  {
    id: "1",
    mc: "组件名称[组件类型]",
    type: "组件审批",
    sqsj: "2021-03-12 13:12:12",
    zt: "待审批",
    spr: "",
    spsj: "2021-03-12 13:12:12",
    isHover: false,
  },
  {
    id: "2",
    mc: "组件名称[组件类型]",
    type: "应用审批",
    sqsj: "2021-03-12 13:12:12",
    zt: "已上架",
    spr: "杨主管",
    spsj: "2021-03-12 13:12:12",
    isHover: false,
  },
  {
    id: "3",
    mc: "组件名称[组件类型]",
    type: "资源组申请",
    sqsj: "2021-03-12 13:12:12",
    zt: "待审批",
    spr: "",
    spsj: "2021-03-12 13:12:12",
    isHover: false,
  },
  {
    id: "4",
    mc: "组件名称[组件类型]",
    type: "应用审批",
    sqsj: "2021-03-12 13:12:12",
    zt: "已上架",
    spr: "杨主管",
    spsj: "2021-03-12 13:12:12",
    isHover: false,
  },
  {
    id: "5",
    mc: "组件名称[组件类型]",
    type: "应用审批",
    sqsj: "2021-03-12 13:12:12",
    zt: "已上架",
    spr: "杨主管",
    spsj: "2021-03-12 13:12:12",
    isHover: false,
  },
  {
    id: "6",
    mc: "组件名称[组件类型]",
    type: "应用审批",
    sqsj: "2021-03-12 13:12:12",
    zt: "已上架",
    spr: "杨主管",
    spsj: "2021-03-12 13:12:12",
    isHover: false,
  },
  {
    id: "7",
    mc: "组件名称[组件类型]",
    type: "应用审批",
    sqsj: "2021-03-12 13:12:12",
    zt: "已上架",
    spr: "杨主管",
    spsj: "2021-03-12 13:12:12",
    isHover: false,
  },
  {
    id: "8",
    mc: "组件名称[组件类型]",
    type: "应用审批",
    sqsj: "2021-03-12 13:12:12",
    zt: "已上架",
    spr: "杨主管",
    spsj: "2021-03-12 13:12:12",
    isHover: false,
  },
  {
    id: "9",
    mc: "组件名称[组件类型]",
    type: "应用审批",
    sqsj: "2021-03-12 13:12:12",
    zt: "已上架",
    spr: "杨主管",
    spsj: "2021-03-12 13:12:12",
    isHover: false,
  },
  {
    id: "10",
    mc: "组件名称[组件类型]",
    type: "应用审批",
    sqsj: "2021-03-12 13:12:12",
    zt: "已上架",
    spr: "杨主管",
    spsj: "2021-03-12 13:12:12",
    isHover: false,
  },
  {
    id: "11",
    mc: "组件名称[组件类型]",
    type: "应用审批",
    sqsj: "2021-03-12 13:12:12",
    zt: "已上架",
    spr: "杨主管",
    spsj: "2021-03-12 13:12:12",
    isHover: false,
  },
  {
    id: "12",
    mc: "组件名称[组件类型]",
    type: "应用审批",
    sqsj: "2021-03-12 13:12:12",
    zt: "已上架",
    spr: "杨主管",
    spsj: "2021-03-12 13:12:12",
    isHover: false,
  },
  {
    id: "13",
    mc: "组件名称[组件类型]",
    type: "应用审批",
    sqsj: "2021-03-12 13:12:12",
    zt: "已上架",
    spr: "杨主管",
    spsj: "2021-03-12 13:12:12",
    isHover: false,
  },
  {
    id: "14",
    mc: "组件名称[组件类型]",
    type: "应用审批",
    sqsj: "2021-03-12 13:12:12",
    zt: "已上架",
    spr: "杨主管",
    spsj: "2021-03-12 13:12:12",
    isHover: false,
  },
  {
    id: "15",
    mc: "组件名称[组件类型]",
    type: "应用审批",
    sqsj: "2021-03-12 13:12:12",
    zt: "已上架",
    spr: "杨主管",
    spsj: "2021-03-12 13:12:12",
    isHover: false,
  },
  {
    id: "16",
    mc: "组件名称[组件类型]",
    type: "应用审批",
    sqsj: "2021-03-12 13:12:12",
    zt: "已上架",
    spr: "杨主管",
    spsj: "2021-03-12 13:12:12",
    isHover: false,
  },
  {
    id: "17",
    mc: "组件名称[组件类型]",
    type: "应用审批",
    sqsj: "2021-03-12 13:12:12",
    zt: "已上架",
    spr: "杨主管",
    spsj: "2021-03-12 13:12:12",
    isHover: false,
  },
]);
// let multipleSelection = [];
let rows: TableData = {
  id: "",
  mc: "",
  type: "",
  sqsj: "",
  zt: "",
  spr: "",
  spsj: "",
  isHover: false,
};
let multipleSelection = [];

const handleClose = (done: () => void) => {
  done();
};
const handleSizeChange = () => {};
const handleCurrentChange = () => {};
const cellMouseEnter = (row: TableData) => {
  tableData = tableData.map((item) => {
    if (item.id === row.id) {
      item.isHover = true;
    }
    return item;
  });
  // row.isHover = true;
  // console.log("enter", row);
};
const cellMouseLeave = (row: TableData) => {
  tableData = tableData.map((item) => {
    if (item.id === row.id) {
      item.isHover = false;
    }
    return item;
  });
  // row.isHover = false;
  // console.log("leave", row);
};
const handleDel = (data: TableData) => {
  ElMessageBox.confirm("是否删除当前信息？", "提示", {
    distinguishCancelAndClose: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  })
    .then(() => {
      tableData = tableData.filter((item) => item.id !== data.id);
    })
    .catch(() => {
      // catch error
    });
};
const handleDownload = (data: TableData) => {
  console.log(data);
};
const handleDetail = (data: TableData) => {
  zjxxDialogVisible.value = true;
  rows = data;
  console.log(zjxxDialogVisible);
};
</script>

<style lang="less" scoped>
.cont {
  width: 100%;
  .cont-main {
    margin: 15px;
    background: white;
    height: calc(100vh - 100px);
    .top {
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 15px;
    }
    .op {
      cursor: pointer;
    }
    .op:not(:first-child) {
      margin-left: 10px;
    }
  }
}
</style>
