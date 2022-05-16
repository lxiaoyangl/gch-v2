<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="10"
    layout="total, prev, pager, next,jumper"
    :total="100"
  >
  </el-pagination>
</template>

<script lang="ts" setup>
let currentPage = 5;
const handleSizeChange = (val: number) => {
  console.log(`每页 ${val} 条`);
};
const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`);
};

</script>

<style lang="less" scoped>
:deep(.el-pagination) {
  background-color: #ffffff;
  padding: 10px 20px !important;
}
</style>
