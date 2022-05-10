<template>
  <div class="table">
    <el-table
      :data="tableData"
      @cell-mouse-enter="enter"
      @cell-mouse-leave="leave"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      height="calc(100vh - 131px)"
    >
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="组名称"
        width="110"
      >
        <template slot-scope="{ row }">
          <span :class="row.isHover ? 'c008' : ''">{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip prop="date" label="创建时间">
        <template slot-scope="{ row }">
          <span :class="row.isHover ? 'c008' : ''">{{ row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="status" label="状态">
        <template slot-scope="{ row }">
          <span :style="{color:row.status!=1?'red':'#000'}">{{ row.status==1 ? '正常' : '异常' }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="num" label="资源数" width="70">
        <template slot-scope="{ row }">
          <span :class="row.isHover ? 'c008' : ''">{{ row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="appliNum" label="已分配应用">
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="160">
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