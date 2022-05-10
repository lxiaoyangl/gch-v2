<template>
  <div class="table">
    <el-table
      :data="tableData"
      @cell-mouse-enter="enter"
      @cell-mouse-leave="leave"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :height="height"
    >
      <el-table-column show-overflow-tooltip type="selection" width="45"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="id" label="序号" width="50"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="module" label="组件名称" width="100"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="target" label="应用场景" width="100"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="type" label="类型" width="100"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="time" label="创建时间"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="people" label="创建人" width="100"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="deploy" label="部署量" width="100"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="describe" label="组件描述"> </el-table-column>
      <el-table-column show-overflow-tooltip label="操作">
        <template slot-scope="{ row }">
          <el-button :type="row.isHover ? 'primary' : 'text'" @click="handleDetail(row)">查看</el-button>
          <!-- <el-button
           
            :type="row.isHover ? 'primary' : 'text'"
            @click="handleBs(row)"
            >部署</el-button
          > -->
          <!-- <el-button
           
            :type="row.isHover ? 'primary' : 'text'"
            @click="handleDataMX(row)"
            >数据模型</el-button
          > -->
          <el-button
            v-if="checkUser(1) || checkUser(4)"
            :type="row.isHover ? 'danger' : 'text'"
            @click="handleDelete(row)"
            >删除</el-button
          >
          <el-button v-if="checkUser(4)" :type="row.isHover ? 'danger' : 'text'" @click="appliactionUp(row)"
            >上架</el-button
          >
          <el-button v-if="checkUser(4)" :type="row.isHover ? 'danger' : 'text'" @click="appliReacject(row)"
            >拒绝</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["tableData", "height", "isDevOps"],
  data() {
    return {
      show: false,
      //多选
      multipleSelection: [],
    };
  },
  methods: {
    // 鼠标操作
    enter(row) {
      row.isHover = true;
    },
    leave(row) {
      row.isHover = false;
    },
    //静态筛选
    formatter(row, column) {
      return row.date;
    },
    //多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("handleAllDate", val);
    },
    handleDetail(row) {
      this.$emit("handleDetail", row);
    },
    handleBs(row) {
      this.$emit("handleBs", row);
    },
    handleDataMX(row) {
      this.$emit("handleDataMX", row);
    },
    handleDelete(row) {
      this.$emit("handleDelete", row);
    },
    //应用拒绝
    appliReacject(row) {
      this.$emit("applicationReacject", row);
    },
    //应用上架
    appliactionUp(row) {
      this.$emit("appliactionUp", row);
    },
    checkUser(userId) {
      return window.userId == userId;
    },
  },
};
</script>

<style lang="less" scoped></style>
