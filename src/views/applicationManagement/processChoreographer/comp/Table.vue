<template>
  <el-table
    :data="tableData"
    @cell-mouse-enter="enter"
    @cell-mouse-leave="leave"
    height="calc(100% - 35px)"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    ref="multipleTable"
    tooltip-effect="dark"
  >
    <el-table-column type="selection" width="30"> </el-table-column>
    <el-table-column
      prop="lcname"
      label="流程名称"
      width="180"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      prop="lctype"
      label="流程类型"
      width="120"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column prop="time" label="创建时间" show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="maxdata"
      label="最大数据"
      width="120"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column prop="state" label="状态" width="80" show-overflow-tooltip>
      <template slot-scope="{ row }">
        <span :class="row.state == '停止' ? 'cff5' : ''"> {{ row.state }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="lcms" label="流程描述" show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作"
      width="150"
      show-overflow-tooltip
    >
      <template slot-scope="{ row }">
        <el-button size="mini" :type="row.isHover ? 'primary' : 'text'"
          >查 看</el-button
        >
        <el-button
          v-if="row.state == '停止'"
          size="mini"
          :type="row.isHover ? 'success' : 'text'"
          >启 动</el-button
        >
      </template>
    </el-table-column>
  </el-table>
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
    btndetail(row) {
      this.$emit("handleOnEdit", row);
    },
    btndelete(row) {
      this.$emit("handleDelete", row);
    },
  },
};
</script>

<style lang="less" scoped>
</style>