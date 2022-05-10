<template>
  <div class="signal">
    <div class="top">
      <div class="name">信号数据</div>
      <div class="search">
        <el-form size="small" :model="searchData" inline>
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
            <el-select placeholder="类型" v-model="searchData.type">
              <el-option value="1" lable="1"></el-option>
              <el-option value="2" lable="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="状态" v-model="searchData.status">
              <el-option value="1" lable="1"></el-option>
              <el-option value="2" lable="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="searchData.name"
              style="width: 240px"
              placeholder="输入实例名称"
              suffix-icon="el-icon-search"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <Table
      :tableData="tableData"
      @handleDelete="handleDelete"
      @handleDetail="handleDetail"
    />
    <div class="bottom">
      <el-button size="small" type="danger">删除</el-button>
      <Pagination />
    </div>
  </div>
</template>

<script>
import Pagination from "./comp/Pagination.vue";
import Table from "./comp/Table.vue";
export default {
  components: {
    Table,
    Pagination,
  },
  data() {
    return {
      searchData: {
        time: "",
        type: "",
        name: "",
        status: "",
      },
      tableData: [
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
        {
          zbzp: "载波中频",
          zbpl: "载波频率",
          kd: "宽带",
          xhdp: "信号电平",
          xzb: "信噪比",
          zblx: "载波类型",
          sbd: "识别度",
          tzfs: "调制方式",
          tzsl: "调制速率",
          isHover: false,
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.signal {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .top {
    width: 100%;
    padding: 5px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
  }
}
</style>