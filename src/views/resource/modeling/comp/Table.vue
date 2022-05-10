<template>
  <div class="table">
    <el-table
      :data="tableData"
      @cell-mouse-enter="enter"
      @cell-mouse-leave="leave"
      height="calc(100vh - 135px)"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column show-overflow-tooltip prop="name" width="90" label="模型名称">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="type"
        width="90"
        label="类型"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="date"
        label="创建时间"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="80">
        <template slot-scope="scope">
          <el-button
            @click="handleDetail(scope.row)"
            :type="scope.row.isHover ? 'primary' : 'text'"
            size="mini"
            >查看</el-button
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
    // btndelete(row) {
    //   this.$emit("handleDelete", row);
    // },
  },
};
</script>

<style lang="less" scoped>
.table {
  /deep/.el-table {
    .el-table__body tr:hover > td {
      .cell {
        color: #0084f2 !important;
      }
    }
  }
}
</style>