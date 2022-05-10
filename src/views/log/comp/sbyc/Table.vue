<template>
  <div class="table">
    <el-table
      :data="tableData"
      @cell-mouse-enter="enter"
      @cell-mouse-leave="leave"
      height="calc(100vh - 210px)"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: 'date' }"
    >
      <el-table-column show-overflow-tooltip type="selection" width="45">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="cjsb" label="采集设备">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="IP" label="IP地址">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="port" label="端口号">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="size" label="数据包大小">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="date"
        sortable
        label="接收时间"
      ></el-table-column>
      <el-table-column show-overflow-tooltip prop="status" label="接收状态">
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click="btndetail(scope.row)"
            :type="scope.row.isHover ? 'primary' : 'text'"
            size="mini"
            >详情</el-button
          >
          <el-button
            size="mini"
            :type="scope.row.isHover ? 'danger' : 'text'"
            @click="btndelete(scope.row)"
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