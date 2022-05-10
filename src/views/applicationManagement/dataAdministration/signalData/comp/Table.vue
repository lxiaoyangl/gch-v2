<template>
  <div class="table">
    <el-table
      :data="tableData"
      @cell-mouse-enter="enter"
      @cell-mouse-leave="leave"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      height="calc(100vh - 175px)"
    >
      <el-table-column show-overflow-tooltip type="selection" width="50">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        type="index"
        label="序号"
        width="50"
      >
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="zbzp" label="载波中频">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="kd" label="宽带">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="xhdp" label="信号电平">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="xzb" label="信噪比">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="zblx" label="载波类型">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="sbd" label="识别度">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="tzfs" label="调制方式">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="tzsl" label="调制速率">
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180">
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