<template>
  <div class="cont">
    <div class="left">
      <div class="list-tree">
        <!-- <div class="title">
          <img src="../../../assets/img/全部菜单.png"/>
          <span style="margin-left:10px;color: #3f3fec;font-weight: bold;">全部实列</span>
        </div> -->
        <div>
          <el-menu
            default-active="4-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleCloseMenu"
            unique-opened
          >
            <el-menu-item index="1">
              <template #title>
                <img class="menuImage" src="../../../assets/img/待上架菜单.png" />
                <span>全部数据</span>
              </template>
            </el-menu-item>
            <el-sub-menu index="2">
              <template #title>
                <img class="menuImage" src="../../../assets/img/待上架菜单.png" />
                <span>业务数据</span>
              </template>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <img class="menuImage" src="../../../assets/img/待上架菜单.png" />
                <span>过程数据</span>
              </template>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <img class="menuImage" src="../../../assets/img/待上架菜单.png" />
                <span>成果数据</span>
              </template>
              <!-- <el-menu-item index="4-1">
                <img class="menuImage" src="../../../assets/img/待上架菜单.png" />
                <span slot="title">目标<span style="float: right">2</span></span>
              </el-menu-item>
              <el-menu-item index="4-2">
                <img class="menuImage" src="../../../assets/img/待授权菜单.png" />
                <span slot="title">轨迹<span style="float: right">6</span></span>
              </el-menu-item>
              <el-menu-item index="4-3">
                <img class="menuImage" src="../../../assets/img/应用异常菜单.png" />
                <span slot="title">通联<span style="float: right; color: red">9</span></span>
              </el-menu-item>
              <el-menu-item index="4-4">
                <img class="menuImage" src="../../../assets/img/应用异常菜单.png" />
                <span slot="title">GIS地图<span style="float: right; color: red">9</span></span>
              </el-menu-item> -->
            </el-sub-menu>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="cont-main">
      <div class="top">
        <div>
          <span class="mr10">成果数据</span>
          <el-button type="success" icon="Download">下载</el-button>
          <el-button type="danger" icon="Delete">删除</el-button>
        </div>
        <div class="dfc">
          <span> <el-select placeholder="成果数据" style="width: 100px" class="mr10"></el-select></span>
          <span><el-select placeholder="目标数据" style="width: 100px" class="mr10"></el-select></span>
          <span><el-select placeholder="状态" style="width: 100px" class="mr10"></el-select></span>
          <span class="mr10">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 300px"
            >
            </el-date-picker>
          </span>
          <span><el-input suffix-icon="Search" v-model="topinput" placeholder="输入流程名称"></el-input></span>
        </div>
      </div>
      <Table
        :tableHeader="tableHeader"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @cellMouseEnter="cellMouseEnter"
        @cellMouseLeave="cellMouseLeave"
        :tableData="tableData"
        :pg-total-num="50"
        height="calc(100vh - 180px)"
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
  </div>
</template>

<script lang="ts" setup>
import Table from "../../../components/Table.vue";
import { Search, Delete, Tickets, Download } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import { ElMessageBox } from "element-plus";
interface TableData {
  id: string;
  appName: string;
  dataType: string;
  targetType: string;
  protocolType: string;
  IP: string;
  port: string;
  GPS: string;
  state: string;
  isHover: boolean;
}
let topinput = ref("");
let value1 = ref("");
let tableHeader = reactive([
  {
    prop: "appName",
    name: "应用名称",
  },
  {
    prop: "dataType",
    name: "数据类型",
    width: 150,
  },
  {
    prop: "targetType",
    name: "目标类型",
    width: 150,
  },
  {
    prop: "protocolType",
    name: "协议类型",
    width: 150,
  },
  {
    prop: "IP",
    name: "IP地址",
    width: 150,
  },
  {
    prop: "port",
    name: "访问端口",
    width: 150,
  },
  {
    prop: "GPS",
    name: "GPS",
  },
  {
    prop: "state",
    name: "状态",
    width: 150,
    button: true,
  },
]);
let tableData: TableData[] = reactive([
  {
    id: "1",
    appName: "南海侦察",
    dataType: "目标",
    targetType: "民用",
    protocolType: "HTTP",
    IP: "192.168.3.24",
    port: "8080",
    GPS: "北纬30.64度，东经104.09度",
    state: "在线",
    isHover: false,
  },
  {
    id: "2",
    appName: "南海侦察",
    dataType: "目标",
    targetType: "民用",
    protocolType: "HTTP",
    IP: "192.168.3.24",
    port: "8080",
    GPS: "北纬30.64度，东经104.09度",
    state: "在线",
    isHover: false,
  },
  {
    id: "3",
    appName: "南海侦察",
    dataType: "目标",
    targetType: "民用",
    protocolType: "HTTP",
    IP: "192.168.3.24",
    port: "8080",
    GPS: "北纬30.64度，东经104.09度",
    state: "在线",
    isHover: false,
  },
  {
    id: "4",
    appName: "南海侦察",
    dataType: "目标",
    targetType: "民用",
    protocolType: "HTTP",
    IP: "192.168.3.24",
    port: "8080",
    GPS: "北纬30.64度，东经104.09度",
    state: "在线",
    isHover: false,
  },
  {
    id: "5",
    appName: "南海侦察",
    dataType: "目标",
    targetType: "民用",
    protocolType: "HTTP",
    IP: "192.168.3.24",
    port: "8080",
    GPS: "北纬30.64度，东经104.09度",
    state: "在线",
    isHover: false,
  },
  {
    id: "6",
    appName: "南海侦察",
    dataType: "目标",
    targetType: "民用",
    protocolType: "HTTP",
    IP: "192.168.3.24",
    port: "8080",
    GPS: "北纬30.64度，东经104.09度",
    state: "在线",
    isHover: false,
  },
]);
let multipleSelection = [];

const handleOpen = () => {
  console.log("打开");
};
const handleCloseMenu = () => {
  console.log("关闭");
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
  // zjxxDialogVisible.value = true;
  // rows = data;
  // console.log(rows);
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
    .op {
      cursor: pointer;
    }
    .op:not(:first-child) {
      margin-left: 10px;
    }
  }
}
</style>
