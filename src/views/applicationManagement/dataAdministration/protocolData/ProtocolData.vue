<template>
  <div class="protocol">
    <el-tabs type="card">
      <el-tab-pane class="container" label="载波群组">
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
        <Table :tableData="tableData" />
        <Pagination />
      </el-tab-pane>
      <el-tab-pane class="container" label="时隙">时隙 </el-tab-pane>
      <el-tab-pane class="container" label="目标">目标 </el-tab-pane>
      <el-tab-pane class="container" label="流量">流量 </el-tab-pane>
    </el-tabs>
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
          qzid: "群组ID",
          qzxpd: "群中心频点",
          qbhzbs: "群包含载波数",
          zbid: "载波ID",
          zbsxpl: "载波上行频率",
          tzsl: "调制速率",
          tzfs: "调制方式",
          xxcd: "信息长度",
          dtmcrfs: "独特码插入方式",
          ml: "码率",
          isHover: false,
        },
        {
          qzid: "群组ID",
          qzxpd: "群中心频点",
          qbhzbs: "群包含载波数",
          zbid: "载波ID",
          zbsxpl: "载波上行频率",
          tzsl: "调制速率",
          tzfs: "调制方式",
          xxcd: "信息长度",
          dtmcrfs: "独特码插入方式",
          ml: "码率",
          isHover: false,
        },
        {
          qzid: "群组ID",
          qzxpd: "群中心频点",
          qbhzbs: "群包含载波数",
          zbid: "载波ID",
          zbsxpl: "载波上行频率",
          tzsl: "调制速率",
          tzfs: "调制方式",
          xxcd: "信息长度",
          dtmcrfs: "独特码插入方式",
          ml: "码率",
          isHover: false,
        },
        {
          qzid: "群组ID",
          qzxpd: "群中心频点",
          qbhzbs: "群包含载波数",
          zbid: "载波ID",
          zbsxpl: "载波上行频率",
          tzsl: "调制速率",
          tzfs: "调制方式",
          xxcd: "信息长度",
          dtmcrfs: "独特码插入方式",
          ml: "码率",
          isHover: false,
        },
        {
          qzid: "群组ID",
          qzxpd: "群中心频点",
          qbhzbs: "群包含载波数",
          zbid: "载波ID",
          zbsxpl: "载波上行频率",
          tzsl: "调制速率",
          tzfs: "调制方式",
          xxcd: "信息长度",
          dtmcrfs: "独特码插入方式",
          ml: "码率",
          isHover: false,
        },
        {
          qzid: "群组ID",
          qzxpd: "群中心频点",
          qbhzbs: "群包含载波数",
          zbid: "载波ID",
          zbsxpl: "载波上行频率",
          tzsl: "调制速率",
          tzfs: "调制方式",
          xxcd: "信息长度",
          dtmcrfs: "独特码插入方式",
          ml: "码率",
          isHover: false,
        },
        {
          qzid: "群组ID",
          qzxpd: "群中心频点",
          qbhzbs: "群包含载波数",
          zbid: "载波ID",
          zbsxpl: "载波上行频率",
          tzsl: "调制速率",
          tzfs: "调制方式",
          xxcd: "信息长度",
          dtmcrfs: "独特码插入方式",
          ml: "码率",
          isHover: false,
        },
        {
          qzid: "群组ID",
          qzxpd: "群中心频点",
          qbhzbs: "群包含载波数",
          zbid: "载波ID",
          zbsxpl: "载波上行频率",
          tzsl: "调制速率",
          tzfs: "调制方式",
          xxcd: "信息长度",
          dtmcrfs: "独特码插入方式",
          ml: "码率",
          isHover: false,
        },
        {
          qzid: "群组ID",
          qzxpd: "群中心频点",
          qbhzbs: "群包含载波数",
          zbid: "载波ID",
          zbsxpl: "载波上行频率",
          tzsl: "调制速率",
          tzfs: "调制方式",
          xxcd: "信息长度",
          dtmcrfs: "独特码插入方式",
          ml: "码率",
          isHover: false,
        },
        {
          qzid: "群组ID",
          qzxpd: "群中心频点",
          qbhzbs: "群包含载波数",
          zbid: "载波ID",
          zbsxpl: "载波上行频率",
          tzsl: "调制速率",
          tzfs: "调制方式",
          xxcd: "信息长度",
          dtmcrfs: "独特码插入方式",
          ml: "码率",
          isHover: false,
        },
        {
          qzid: "群组ID",
          qzxpd: "群中心频点",
          qbhzbs: "群包含载波数",
          zbid: "载波ID",
          zbsxpl: "载波上行频率",
          tzsl: "调制速率",
          tzfs: "调制方式",
          xxcd: "信息长度",
          dtmcrfs: "独特码插入方式",
          ml: "码率",
          isHover: false,
        },
        {
          qzid: "群组ID",
          qzxpd: "群中心频点",
          qbhzbs: "群包含载波数",
          zbid: "载波ID",
          zbsxpl: "载波上行频率",
          tzsl: "调制速率",
          tzfs: "调制方式",
          xxcd: "信息长度",
          dtmcrfs: "独特码插入方式",
          ml: "码率",
          isHover: false,
        },
        {
          qzid: "群组ID",
          qzxpd: "群中心频点",
          qbhzbs: "群包含载波数",
          zbid: "载波ID",
          zbsxpl: "载波上行频率",
          tzsl: "调制速率",
          tzfs: "调制方式",
          xxcd: "信息长度",
          dtmcrfs: "独特码插入方式",
          ml: "码率",
          isHover: false,
        },
        {
          qzid: "群组ID",
          qzxpd: "群中心频点",
          qbhzbs: "群包含载波数",
          zbid: "载波ID",
          zbsxpl: "载波上行频率",
          tzsl: "调制速率",
          tzfs: "调制方式",
          xxcd: "信息长度",
          dtmcrfs: "独特码插入方式",
          ml: "码率",
          isHover: false,
        },
        {
          qzid: "群组ID",
          qzxpd: "群中心频点",
          qbhzbs: "群包含载波数",
          zbid: "载波ID",
          zbsxpl: "载波上行频率",
          tzsl: "调制速率",
          tzfs: "调制方式",
          xxcd: "信息长度",
          dtmcrfs: "独特码插入方式",
          ml: "码率",
          isHover: false,
        },
        {
          qzid: "群组ID",
          qzxpd: "群中心频点",
          qbhzbs: "群包含载波数",
          zbid: "载波ID",
          zbsxpl: "载波上行频率",
          tzsl: "调制速率",
          tzfs: "调制方式",
          xxcd: "信息长度",
          dtmcrfs: "独特码插入方式",
          ml: "码率",
          isHover: false,
        },
        {
          qzid: "群组ID",
          qzxpd: "群中心频点",
          qbhzbs: "群包含载波数",
          zbid: "载波ID",
          zbsxpl: "载波上行频率",
          tzsl: "调制速率",
          tzfs: "调制方式",
          xxcd: "信息长度",
          dtmcrfs: "独特码插入方式",
          ml: "码率",
          isHover: false,
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.protocol {
  height: 100%;
  height: 100%;
  .container {
    padding: 0 10px;
    height: 100%;
    width: 100%;
    background-color: #fff;
    .search {
      padding: 5px 0;
    }
  }
}
</style>