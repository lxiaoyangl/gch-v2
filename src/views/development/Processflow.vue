<template>
  <div class="cont">
    <div class="cont-main">
      <!-- <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <button class="btn-class">流程列表</button>
            <span>展开</span>
          </template>
        </el-collapse-item>
      </el-collapse> -->
      <!-- 流程列表 -->
      <div class="back">
        <div class="liuc">
            <el-button type="primary" size="small" @click="tohash">新增流程</el-button>
          <div class="liuc-m">
            <el-select
              size="small"
              v-model="type"
              placeholder="全部类型"
              style="width: 130px"
              class="mr10"
            ></el-select>
            <el-select
              size="small"
              v-model="sum"
              placeholder="组件数量"
              style="width: 130px"
              class="mr10"
            ></el-select>
            <el-input
              size="small"
              suffix-icon="el-icon-search"
              placeholder="输入流程名称"
              style="width: 200px"
            ></el-input>
          </div>
        </div>
        <div>
          <el-table
            :data="tableData"
            style="width: 100%"
            height="calc(100vh - 170px)"
          >
            <el-table-column prop="mc" label="流程名称" width="180">
            </el-table-column>
            <el-table-column prop="type" label="流程类型" width="120">
            </el-table-column>
            <el-table-column prop="date" label="创建时间" width="180">
            </el-table-column>
            <el-table-column prop="num" label="组件数量" width="120">
            </el-table-column>
            <el-table-column prop="address" label="最大实例数" width="120">
            </el-table-column>
            <el-table-column prop="ms" label="流程描述" width="400">
            </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="primary" size="small">查看</el-button>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="cont-bottom">
      <el-button type="primary" size="small" @click="next"> 下一步</el-button>
      <el-button type="info" size="small" @click="up">上一步</el-button>
      <el-button type="success" size="small">
        <i class="delete el-icon-document-copy"></i> 保存草稿</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",

  components: {},

  directives: {},

  data() {
    return {
      activeNames: ["1"],
      tableData: [
        {
          mc: "载波群组处理流程",
          type: "载波群组",
          date: "2021/01/23 12:45:34",
          num: "20",
          address: "20",
          ms: "对该流程的一些描述说明，对流程的一些描述说明...",
        },
        {
          mc: "载波群组处理流程",
          type: "载波群组",
          date: "2021/01/23 12:45:34",
          num: "13",
          address: "15",
          ms: "对该流程的一些描述说明，对流程的一些描述说明...",
        },
        {
          mc: "载波群组处理流程",
          type: "载波群组",
          date: "2021/01/23 12:45:34",
          num: "13",
          address: "15",
          ms: "对该流程的一些描述说明，对流程的一些描述说明...",
        },
        {
          mc: "载波群组处理流程",
          type: "载波群组",
          date: "2021/01/23 12:45:34",
          num: "13",
          address: "15",
          ms: "对该流程的一些描述说明，对流程的一些描述说明...",
        },
        {
          mc: "载波群组处理流程",
          type: "载波群组",
          date: "2021/01/23 12:45:34",
          num: "13",
          address: "15",
          ms: "对该流程的一些描述说明，对流程的一些描述说明...",
        },
        {
          mc: "载波群组处理流程",
          type: "载波群组",
          date: "2021/01/23 12:45:34",
          num: "13",
          address: "15",
          ms: "对该流程的一些描述说明，对流程的一些描述说明...",
        },
        {
          mc: "载波群组处理流程",
          type: "载波群组",
          date: "2021/01/23 12:45:34",
          num: "13",
          address: "15",
          ms: "对该流程的一些描述说明，对流程的一些描述说明...",
        },
        {
          mc: "载波群组处理流程",
          type: "载波群组",
          date: "2021/01/23 12:45:34",
          num: "13",
          address: "15",
          ms: "对该流程的一些描述说明，对流程的一些描述说明...",
        },
        {
          mc: "载波群组处理流程",
          type: "载波群组",
          date: "2021/01/23 12:45:34",
          num: "13",
          address: "15",
          ms: "对该流程的一些描述说明，对流程的一些描述说明...",
        },
        {
          mc: "载波群组处理流程",
          type: "载波群组",
          date: "2021/01/23 12:45:34",
          num: "13",
          address: "15",
          ms: "对该流程的一些描述说明，对流程的一些描述说明...",
        },
        {
          mc: "载波群组处理流程",
          type: "载波群组",
          date: "2021/01/23 12:45:34",
          num: "13",
          address: "15",
          ms: "对该流程的一些描述说明，对流程的一些描述说明...",
        },
        {
          mc: "载波群组处理流程",
          type: "载波群组",
          date: "2021/01/23 12:45:34",
          num: "13",
          address: "15",
          ms: "对该流程的一些描述说明，对流程的一些描述说明...",
        },
      ],
    };
  },

  mounted() {},

  methods: {
    tohash(){
      this.$router.push("/fidlddata/arrange")
    },
    next(){
      this.$router.push("/fidlddata/vis")
    },
    up(){
      this.$router.push("/fidlddata/fldata")
    }
  },
};
</script>

<style lang="less" scoped>
.cont {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .cont-main {
    margin: 0 15px;
    background: white;
    height: calc(100vh - 100px);
    padding: 15px;
    .liuc {
      display: flex;
      justify-content: space-between;
      // margin-top: 15px;
      padding: 10px 0;
      .liuc-m {
        display: flex;
      }
    }
    .btn-class {
      background: #267ff6;
      border: none;
      color: white;
      border-radius: 15px;
      line-height: 30px;
      height: 30px;
      width: 100px;
    }
  }
  .cont-bottom {
    background: white;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
  }
}
</style>
