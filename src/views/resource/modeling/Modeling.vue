<template>
  <div class="modeling">
    <div class="list">
      <div class="top">
        <span>资源模型列表</span>
        <el-button type="primary">
          <i class="el-icon-plus"></i>
          <span>新建</span>
        </el-button>
      </div>
      <Table :tableData="tableData"></Table>
    </div>
    <div class="form-container">
      <div class="top">
        <span>
          <span>某解调器</span>
          <span class="c008">【解调器】</span>
          <span class="date">/ 2021-06-02</span>
        </span>
        <div class="btn">
          <el-button type="info">重置</el-button>
          <el-button type="info">取消</el-button>
          <el-button type="primary">保存</el-button>
        </div>
      </div>
      <div class="form">
        <el-form :rules="rules" inline :model="formData" ref="formData">
          <el-form-item prop="name" label="模板名称：">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="模板类型：">
            <el-select v-model="formData.type">
              <el-option label="解调器" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- <AvueFormDesign :aside-left-width="230" :aside-right-width="235" @submit="handleSubmit" storage undoRedo /> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Table from "./comp/Table.vue";
import { ElMessage } from "element-plus";
import { reactive } from "vue";
import { TableData } from "./types";
let tableData: TableData[] = reactive([
  {
    name: "某解调器一",
    type: "解调器",
    date: "2021-06-02 09:46:05",
    isHover: false,
  },
  {
    name: "某解调器",
    type: "解调器",
    date: "2021-06-02 09:46:05",
    isHover: false,
  },
  {
    name: "某解调器",
    type: "解调器",
    date: "2021-06-02 09:46:05",
    isHover: false,
  },
  {
    name: "某解调器",
    type: "解调器",
    date: "2021-06-02 09:46:05",
    isHover: false,
  },
  {
    name: "某解调器",
    type: "解调器",
    date: "2021-06-02 09:46:05",
    isHover: false,
  },
]);
let formData = reactive({
  name: "某解调器一",
  type: "解调器",
});
let rules = {
  name: [{ required: true, message: "请输入模板名称", trigger: "blur" }],
  type: [{ required: true, message: "请选择模板类型", trigger: "change" }],
};
const emptytChange = () => {
  ElMessage.success("清空方法回调");
};
const submit = () => {
  ElMessage.success("当前数据");
};
const tip = () => {
  ElMessage.success("自定义按钮");
};
// const handleSubmit = (data) => {
//   console.log(data);
// };
</script>
<style lang="less" scoped>
.modeling {
  height: 100%;
  width: 100%;
  padding: 20px;
  display: flex;
  .list {
    height: 100%;
    width: 400px;
    margin-right: 10px;
    background-color: #fff;
    .top {
      display: flex;
      justify-content: space-between;
      padding: 5px 10px;
      align-items: center;
      font-weight: bold;
      font-size: 15px;
    }
  }
  .form-container {
    width: calc(100% - 410px);
    // height: 100%;
    background-color: #fff;
    overflow: scroll;
    height: calc(100vh - 90px);
    .top {
      display: flex;
      justify-content: space-between;
      padding: 5px 20px;
      align-items: center;
      font-weight: bold;
      font-size: 15px;
      .date {
        font-weight: normal;
        color: #333;
      }
    }
    .form {
      height: calc(100% - 44px);
      background-color: #f6f7f9;
      .el-form {
        padding: 20px;
      }
    }
  }
}
</style>
