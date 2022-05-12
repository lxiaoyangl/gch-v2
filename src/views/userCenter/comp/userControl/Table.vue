<template>
  <div class="table">
    <el-table
      :data="tableData"
      @cell-mouse-enter="enter"
      @cell-mouse-leave="leave"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: 'date' }"
      height="calc(100vh - 210px)"
    >
      <el-table-column show-overflow-tooltip type="selection" width="50"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="targetID" label="目标ID"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="date" sortable label="通联时间"></el-table-column>
      <el-table-column show-overflow-tooltip prop="IP" label="IP地址"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="port" label="端口号"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="protocol" label="协议"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="flow" label="流量"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="status" label="还原状态">
        <template #="{ row }">
          <div :class="row.status == '失败' ? 'cff4' : ''">
            {{ row.status }}
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="address" label="储存地址"> </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180">
        <template #="{ row }">
          <el-button @click="btndetail(row)" :type="row.isHover ? 'primary' : 'text'">详情</el-button>
          <el-button :type="row.isHover ? 'danger' : 'text'" @click="btndelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
const { tableData, tableHeader } = defineProps({
  tableData: Array,
  tableHeader: Array,
});
let show = false;

//多选
let multipleSelection = [];

let $emit = defineEmits(["handlepdelete", "handleOnEdit", "handleDelete"]);
// 鼠标操作
const enter = (row: any) => {
  row.isHover = true;
};
const leave = (row: any) => {
  row.isHover = false;
};
//静态筛选
const formatter = (row: any, column: any) => {
  return row.date;
};
//多选
const handleSelectionChange = (val: any) => {
  $emit("handlepdelete", val);
};
const btndetail = (row: any) => {
  $emit("handleOnEdit", row);
};
const btndelete = (row: any) => {
  $emit("handleDelete", row);
};
</script>

<style lang="less" scoped></style>
