<template>
  <el-table
    :data="tableData"
    @cell-mouse-enter="enter"
    @cell-mouse-leave="leave"
    height="95%"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    ref="multipleTable"
    tooltip-effect="dark"
  >
    <el-table-column type="selection" width="30"> </el-table-column>
    <el-table-column
      prop="appName"
      label="应用名称"
      width="180"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      prop="dataType"
      label="数据类型"
      width="120"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      prop="targetType"
      label="种类"
      width="100"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column
      prop="protocolType"
      label="协议类型"
      width="100"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column
      prop="IP"
      label="IP"
      width="100"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column
      prop="port"
      label="端口"
      width="100"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column prop="GPS" label="坐标信息" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="state" label="状态" width="80" show-overflow-tooltip>
      <template slot-scope="{ row }">
        <span :class="row.state == '离线' ? 'cff5' : ''"> {{ row.state }}</span>
      </template>
    </el-table-column>
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作"
      width="250"
      show-overflow-tooltip
    >
      <template slot-scope="{ row }">
        <el-button size="mini" :type="row.isHover ? 'primary' : 'text'"
          >查 看</el-button
        >
        <el-button size="mini" :type="row.isHover ? 'danger' : 'text'"
          >删 除</el-button
        >
        <el-button size="mini" :type="row.isHover ? 'success' : 'text'"
          >下 载</el-button
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