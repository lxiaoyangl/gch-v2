<template>
  <div class="table">
    <el-table
      :data="tableData"
      @cell-mouse-enter="enter"
      @cell-mouse-leave="leave"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      height="calc(100vh - 320px)"
    >
      <el-table-column show-overflow-tooltip prop="name" label="流程名称">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="流程ID"
      ></el-table-column>
      <el-table-column show-overflow-tooltip prop="type" label="类型">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="sDate" label="开始时间">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="eDate" label="结束时间">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="status" label="状态">
        <template slot-scope="{ row }">
          <span
            :class="row.status == 1 ? '' : row.status == 2 ? 'cff5' : 'c008'"
            >{{
              row.status == 1 ? "成功" : row.status == 2 ? "失败" : "等待派发"
            }}</span
          >
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180">
        <template slot-scope="{ row }">
          <el-button
            :type="row.isHover ? 'primary' : 'text'"
            size="mini"
            @click="handleDetail(row)"
            >查看</el-button
          >
          <el-button
            v-if="row.status == 2"
            size="mini"
            :type="row.isHover ? 'info' : 'text'"
            @click="handleDelete(row)"
            >重试</el-button
          >
        </template>
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