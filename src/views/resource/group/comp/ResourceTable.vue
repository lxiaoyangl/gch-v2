<template>
  <div class="table">
    <el-table
      :data="tableData"
      @cell-mouse-enter="enter"
      @cell-mouse-leave="leave"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      height="calc(100vh - 287px)"
    >
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="资源名称"
        width="80"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="rid"
        label="资源ID"
        width="60"
      >
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="type" label="类 型">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="date" label="部署时间">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="ip" label="IP地址">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="port"
        label="端 口"
        width="70"
      >
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="is" label="内 存" width="60">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="cpu" label="CPU" width="60">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="disk"
        label="磁 盘"
        width="60"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="status"
        label="当前状态"
        width="70"
      >
        <template slot-scope="{ row }">
          {{ row.status == 1 ? "在线" : "离线" }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="140">
        <template slot-scope="{ row }">
          <el-button
            :type="row.isHover ? 'primary' : 'text'"
            size="mini"
            @click="handleDetail(row)"
            >查看</el-button
          >
          <el-button
            :type="row.isHover ? 'danger' : 'text'"
            size="mini"
            @click="handleDelete(row)"
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