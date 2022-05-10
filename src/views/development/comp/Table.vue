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
      <el-table-column show-overflow-tooltip prop="resource" label="资源名称" width="100"></el-table-column>
      <el-table-column show-overflow-tooltip prop="id" label="资源ID" width="100"></el-table-column>
      <el-table-column show-overflow-tooltip prop="type" label="类型" width="100"></el-table-column>
      <el-table-column show-overflow-tooltip prop="time" label="部署时间"></el-table-column>
      <el-table-column show-overflow-tooltip prop="ip" label="IP地址" width="100"></el-table-column>
      <el-table-column show-overflow-tooltip prop="port" label="端口" width="100"></el-table-column>
      <el-table-column show-overflow-tooltip prop="memory" label="内存" width="100"></el-table-column>
      <el-table-column show-overflow-tooltip prop="cpu" label="CPU" width="100"></el-table-column>
      <el-table-column show-overflow-tooltip prop="disk" label="磁盘" width="100"></el-table-column>
      <el-table-column show-overflow-tooltip prop="state" label="当前状态" width="100"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["tableData","height"],
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
      console.log(this.czselectData);
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
  },
};
</script>

<style lang="less" scoped>
</style>