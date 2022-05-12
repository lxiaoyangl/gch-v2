<template>
  <div class="mainTable">
    <el-table
      ref="tableRef"
      :data="tableData"
      @cell-mouse-enter="cellMouseEnter"
      @cell-mouse-leave="cellMouseLeave"
      style="width: 100%"
      :height="height"
    >
      <el-table-column v-if="columnType != 'none'" :type="columnType" width="55"> </el-table-column>
      <el-table-column
        v-for="(item, index) in tableHeader"
        :key="index"
        :prop="item.prop"
        :label="item.name"
        :sortable="item.sortable ? item.sortable : false"
        :width="parseString(item.width)"
      >
        <template #="{ row }">
          <span :class="{ show: row.isHover, hidden: !row.isHover }">
            <slot v-if="item.button" :data="row"></slot>
          </span>
          <span
            :class="{ show: !row.isHover, hidden: row.isHover && item.button }"
            v-html="item.formatter ? item.formatter(row, item.prop, row[item.prop], index) : row[item.prop]"
          ></span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="pgVisible"
      :layout="pgType"
      :page-sizes="pgSize"
      :current-page="1"
      :total="pgTotalNum"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { TableData, TableHeader } from "./types";

interface TableProps {
  tableData: TableData[];
  tableHeader: TableHeader[];
  height?: string;
  pgVisible?: boolean;
  pgType?: string;
  pgSize?: number[];
  pgTotalNum?: number;
  columnType?: string;
  width?: number;
  formatter?: (row: any, prop: string, value: any, index: number) => string;
}
const { tableHeader, tableData, columnType, height } = withDefaults(defineProps<TableProps>(), {
  tableHeader: (): TableHeader[] => [],
  tableData: (): TableData[] => [],
  columnType: "selection",
  height: "500",
  pgVisible: true,
  pgType: "total, sizes, prev, pager, next, jumper",
  pgTotalNum: 0,
  pgSize: () => [10, 20, 30, 40],
});
let emit = defineEmits(["handleSizeChange", "handleCurrentChange", "cellMouseEnter", "cellMouseLeave"]);
const parseString = (val: number | undefined) => {
  if (val) {
    return String(val);
  } else {
    return "";
  }
};
const cellMouseEnter = (row: any) => {
  emit("cellMouseEnter", row);
  // row.isHover = true;
  // console.log(row);
};
const cellMouseLeave = (row: any) => {
  emit("cellMouseLeave", row);
  // row.isHover = false;
};
const handleSizeChange = (val: number) => {
  emit("handleSizeChange", val);
};
const handleCurrentChange = (val: number) => {
  emit("handleCurrentChange", val);
};
</script>
<style lang="less" scoped>
.mainTable {
  .el-table {
    position: relative;
    :deep(th) {
      padding: 4px 0 !important;
      background-color: #4e5c72 !important;
    }
  }

  .el-pagination {
    position: relative;
    background-color: #ffffff;
    white-space: nowrap;
    padding: 10px 10px;
    color: #303133;
    font-weight: 700;
  }

  .show {
    display: inline;
  }

  .hidden {
    display: none;
  }
}
</style>
