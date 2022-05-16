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
      <el-table-column show-overflow-tooltip prop="name" width="90" label="模型名称"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="type" width="90" label="类型"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="date" label="创建时间"></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="80">
        <template #="{ row }">
          <el-button @click="handleDetail(row)" :type="row.isHover ? 'primary' : 'text'">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { TableData } from "../types";
let show = false;
//多选
let multipleSelection = [];
const { tableData } = withDefaults(defineProps<{ tableData: TableData[] }>(), {
  tableData: (): TableData[] => [],
});
let $emit = defineEmits(["handleAllDate", "handleDetail"]);
// 鼠标操作
const enter = (row: TableData) => {
  row.isHover = true;
};
const leave = (row: TableData) => {
  row.isHover = false;
};
//静态筛选
const formatter = (row: TableData) => {
  return row.date;
};
//多选
const handleSelectionChange = (val: number) => {
  // console.log(czselectData);
  $emit("handleAllDate", val);
};
const handleDetail = (row: TableData) => {
  $emit("handleDetail", row);
};
// btndelete(row) {
//   $emit("handleDelete", row);
// },
</script>

<style lang="less" scoped>
.table {
  :deep(.el-table) {
    .el-table__body tr:hover > td {
      .cell {
        color: #0084f2 !important;
      }
    }
  }
}
</style>
