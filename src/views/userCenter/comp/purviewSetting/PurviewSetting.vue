<template>
  <div class="purviewSetting">
    <div class="top">
      <div class="setting">
        <el-button type="primary" @click="fetchData()"> <i class="el-icon-refresh"></i> 刷新 </el-button>
        <el-select class="ml10" style="width: 150px" v-model="searchData.status" placeholder="还原状态">
          <el-option label="1" value="1"> </el-option>
          <el-option label="2" value="2"> </el-option>
        </el-select>
        <el-select class="ml10" style="width: 150px" v-model="searchData.protocol" placeholder="协议">
          <el-option label="1" value="1"> </el-option>
          <el-option label="2" value="2"> </el-option>
        </el-select>
      </div>
      <div class="search">
        <el-form :model="searchData" inline>
          <el-form-item>
            <el-date-picker
              v-model="searchData.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="searchData.searchName"
              style="width: 240px"
              placeholder="搜索目标ID"
              suffix-icon="el-icon-search"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <Table
      :tableData="tableData"
      height="calc(100vh - 220px)"
      @handleOnEdit="btndetail"
      @handleDelete="btndelete"
      @handlepdelete="pdelete"
    >
      <div slot="operation" slot-scope="row">
        <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
          <i class="el-icon-delete op" @click=""></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="查看详情" placement="bottom">
          <i class="el-icon-tickets op"></i>
        </el-tooltip>
      </div>
    </Table>
    <div class="bottom">
      <el-button type="danger" @click="clearPd()">删 除</el-button>
    </div>
    <el-dialog title="频点偏差校准详情" v-model="dialogVisible" center width="30%" :before-close="handleClose">
      <el-form label-width="100px" :model="detailForm">
        <el-form-item label="时间：">
          <p>{{ detailForm.date }}</p>
        </el-form-item>
        <el-form-item label="校准类型：">
          <p>{{ detailForm.type }}</p>
        </el-form-item>
        <el-form-item label="操作状态：">
          <p>{{ detailForm.status }}</p>
        </el-form-item>
        <el-form-item label="信号信息">
          <p>{{ detailForm.msg }}</p>
        </el-form-item>
        <el-form-item label="日志内容：">
          <p>{{ detailForm.content }}</p>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import Table from "./Table.vue";
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

let searchData = {
  time: null,
  searchName: "",
  status: "",
  protocol: "",
};

let dialogVisible = ref(false);
let nowPage = ref(1);
let total = ref(0);
let currentPage = ref(1);
let pageSize = ref(15);
let detailForm = reactive({
  date: "",
  type: "",
  status: "",
  msg: "",
  content: "",
});
// let tableData = reactive([]);
let selectData = reactive([]);
let tableHeader = reactive([
  {
    prop: "id",
    name: "序号",
    width: 50,
  },
  {
    prop: "targetID",
    name: "目标ID",
    width: 150,
  },
  {
    prop: "IP",
    name: "目标IP",
    width: 150,
  },
  {
    prop: "port",
    name: "目标端口",
    width: 150,
  },
  {
    prop: "protocol",
    name: "通联协议",
    width: 150,
  },
  {
    prop: "flow",
    name: "通联流量",
    width: 150,
  },
  {
    prop: "size",
    name: "文件大小",
    width: 150,
  },
  {
    prop: "status",
    name: "通联状态",
    width: 150,
  },
  {
    prop: "address",
    name: "访问地址",
  },
  {
    prop: "date",
    name: "通联时间",
    button: true,
  },
]);
let tableData = [
  {
    id: 1,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "成功",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 2,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "失败",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 3,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "失败",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 4,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "成功",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 5,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "成功",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 6,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "失败",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 7,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "成功",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 8,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "成功",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 9,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "成功",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 10,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "失败",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 11,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "成功",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 12,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "成功",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 13,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "成功",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 14,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "失败",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 15,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "成功",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 16,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "成功",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 17,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "成功",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 18,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "失败",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 19,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "成功",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 20,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "成功",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 21,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "成功",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 22,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "成功",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 23,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "失败",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
  {
    id: 24,
    targetID: "目标ID",
    date: "2021/5/10 16:28:42",
    IP: "192.168.2.144",
    port: "12",
    protocol: "http",
    flow: "12KB",
    size: "12.32MB",
    status: "成功",
    address: "D/sdfds/sdfsd/sdfs.txt",
    isHover: false,
  },
];
const fetchData = () => {
  // tableData = [];
  // let start = (nowPage - 1) * pageSize;
  // let end = nowPage * pageSize > tables.length ? tables.length : nowPage * pageSize;
  // for (let i = start; i < end; i++) {
  //   tableData.push(tables[i]);
  // }
  // total = tables.length;
  // currentPage = nowPage;
};
const btndetail = (row: any) => {
  dialogVisible.value = true;
  detailForm = JSON.parse(JSON.stringify(row));
};
const btndelete = (row: any) => {
  ElMessageBox.confirm("此操作将永久删除该日志, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      // let temptt = [];
      // for (let i = 0; i < tables.length; i++) {
      //   if (tables[i].id != row.id) {
      //     temptt.push(tables[i]);
      //   }
      // }
      // tables = temptt;
      ElMessage({
        type: "success",
        message: "删除成功!",
      });
      fetchData();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
};

const handleSizeChange = (val: any) => {
  pageSize = val;
  fetchData();
};

const handleCurrentChange = (val: any) => {
  nowPage = val;
  fetchData();
};

const clearData = () => {
  // tables = [];
  fetchData();
};

const clearPd = () => {
  ElMessageBox.confirm("此操作将永久删除该日志, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      let temptt = [];
      let selectRow = selectData as any;
      // for (let i = 0; i < tables.length; i++) {
      //   let flag = false;
      //   for (let j = 0; j < selectRow.length; j++) {
      //     if (tables[i].id == selectRow[j].id) {
      //       // temptt.push(cztables[i]);
      //       flag = true;
      //     }
      //   }
      //   if (!flag) {
      //     temptt.push(tables[i]);
      //   }
      // }
      // tables = temptt;
      ElMessage({
        type: "success",
        message: "删除成功!",
      });
      fetchData();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
};

const handleClose = () => {
  dialogVisible.value = false;
};
const pdelete = (val: any) => {
  selectData = val;
};
</script>
<style lang="less" scoped>
.purviewSetting {
  background-color: #fff;
  padding-top: 10px;
  .top {
    // flex: 0 0 43px;
    padding: 0 20px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .setting {
      display: flex;
      align-items: center;
      img {
        margin-left: 10px;
        margin-right: 20px;
      }
    }
    .search {
      .el-form-item {
        margin-bottom: 0;
        :deep(.el-form-item__label) {
          color: #fff;
        }
      }
    }
  }
  .op {
    cursor: pointer;
  }
  .op:not(:first-child) {
    margin-left: 10px;
  }
  .bottom {
    // position: absolute;
    // padding: 10px 10px;
    // padding: 10px 10px;
    // position: absolute;
    // bottom: 0px;
  }
}
</style>
