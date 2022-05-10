<template>
  <div class="table">
    <el-table
      :data="tableData"
      @cell-mouse-enter="enter"
      @cell-mouse-leave="leave"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      height="calc(100vh - 500px)"
    >
      <el-table-column show-overflow-tooltip prop="name" label="组件名称">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="type"
        label="业务类型"
      ></el-table-column>
      <el-table-column show-overflow-tooltip prop="scene" label="应用场景">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="creator" label="创建人">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="date" label="部署时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["tableData"],
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
    handleDelete(row) {
      this.$emit("handleDelete", row);
    },
  },
};
</script>

<style lang="less" scoped>
</style>