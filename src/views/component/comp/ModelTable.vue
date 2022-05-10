<template>
  <div class="table">
    <el-table
      :data="tableData"
      @cell-mouse-enter="enter"
      @cell-mouse-leave="leave"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :height="height"
    >
      <el-table-column show-overflow-tooltip type="selection" width="45">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="id" label="序号" width="50">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="module" label="模板名称" width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="target" label="应用场景" width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="type" label="类型" width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="version" label="版本信息" width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="time" label="创建时间">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="people" label="创建人" width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="deploy" label="下载次数" width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="describe" label="模板描述">
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="150">
        <template slot-scope="{ row }">
          <el-button
            size="mini"
            :type="row.isHover ? 'primary' : 'text'"
            @click="handleDown(row)"
            >下载</el-button
          >
          <!-- <el-button
            size="mini"
            :type="row.isHover ? 'primary' : 'text'"
            @click="handleBs(row)"
            >部署</el-button
          > -->
          <!-- <el-button
            size="mini"
            :type="row.isHover ? 'primary' : 'text'"
            @click="handleDataMX(row)"
            >数据模型</el-button
          > -->
          <el-button
            size="mini"
            :type="row.isHover ? 'danger' : 'text'"
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
  props: ["tableData","height"],
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
    handleDown(row){
      this.$message({
            type: "success",
            message: "下载成功!",
          });
    },
    handleDetail(row) {
      this.$emit("handleDetail", row);
    },
    handleBs(row) {
      this.$emit("handleBs", row);
    },
    handleDataMX(row) {
      this.$emit("handleDataMX", row);
    },
    handleDelete(row) {
      this.$emit("handleDelete", row);
    },
  },
};
</script>

<style lang="less" scoped>
</style>