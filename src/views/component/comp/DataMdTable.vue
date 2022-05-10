<template>
  <div class="table">
    <el-table
      :data="tableData"
      @cell-mouse-enter="enter"
      @cell-mouse-leave="leave"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      height="calc(100vh - 400px)"
    >
      <el-table-column show-overflow-tooltip type="selection" width="55">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="id" label="序号" width="80">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="servers" label="服务器">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="time"
        label="上次时间"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="80">
        <template slot-scope="{ row }">
          <el-button
            size="mini"
            :type="row.isHover ? 'danger' : 'text'"
            @click="del(scope.row.id)"
            >删除</el-button
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