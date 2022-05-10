<template>
  <div class="table">
    <el-table
      :data="tableData"
      @cell-mouse-enter="enter"
      @cell-mouse-leave="leave"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      height="calc(100vh - 180px)"
    >
      <el-table-column
        show-overflow-tooltip
        type="index"
        width="50"
        label="序号"
      >
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="xhpd" label="信号频点">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="tzsl"
        label="调制速率"
      ></el-table-column>
      <el-table-column show-overflow-tooltip prop="tzfs" label="调制方式">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="wx" label="wx">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="clzt" label="处理状态">
        <template slot-scope="{ row }">
          <span :class="row.clzt == 1 ? '' : 'cff6'">
            {{ row.clzt == 1 ? "在线" : "离线" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="clsj" label="处理时间">
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="120">
        <template slot-scope="{ row }">
          <el-button
            :type="row.isHover ? 'primary' : 'text'"
            size="mini"
            @click="handleDetail(row)"
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
    handleDelete(row) {
      this.$emit("handleDelete", row);
    },
  },
};
</script>

<style lang="less" scoped>
</style>