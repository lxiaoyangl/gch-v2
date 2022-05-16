<template>
  <div class="table">
    <el-table
      :data="tableData"
      @cell-mouse-enter="enter"
      @cell-mouse-leave="leave"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      height="calc(100vh - 340px)"
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="instance" label="处理实例"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="dataType" label="数据类型"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="specificType" label="具体分类"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="kind" label="种类"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="ip" label="IP地址"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="port" label="端口"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="coordinate" label="坐标信息"> </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180">
        <template #="{ row }">
          <slot :row="row"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { TableData } from "../types";

//多选
const { tableData } = withDefaults(defineProps<{ tableData: TableData[] }>(), {
  tableData: (): TableData[] => [],
});

const emit = defineEmits(["handleAllDate"]);

// 鼠标操作
const enter = (row: TableData) => {
  row.isHover = true;
};
const leave = (row: TableData) => {
  row.isHover = false;
};
//静态筛选
const formatter = (row: TableData, column: number) => {
  return row.date;
};
//多选
const handleSelectionChange = (val: number) => {
  emit("handleAllDate", val);
};
</script>

<style lang="less" scoped>
.dataInfoClass {
  .dataTitle {
    font-size: 18px;
    font-weight: bold;
  }
  .el-divider--horizontal {
    margin: 5px 0;
  }
  .dataContent {
    font-size: 16px;
    .dataKeyName {
      display: inline-block;
      width: 100px;
    }
  }
}
</style>
