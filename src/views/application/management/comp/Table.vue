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
      <el-table-column show-overflow-tooltip type="selection" width="50">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="instance" label="处理实例">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="dataType" label="数据类型">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="specificType" label="具体分类">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="kind" label="种类">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="ip" label="IP地址">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="port" label="端口">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="coordinate" label="坐标信息">
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180">
        <template slot-scope="{ row }">
<!--          <el-button-->
<!--            :type="row.isHover ? 'primary' : 'text'"-->
<!--            size="mini"-->
<!--            @click="handleDetail(row)"-->
<!--            >查看</el-button-->
<!--          >-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            :type="row.isHover ? 'danger' : 'text'"-->
<!--            @click="handleDelete(row)"-->
<!--            >删除</el-button-->
<!--          >-->
          <el-popover class="item" placement="bottom" width="400" trigger="click">
            <div class="dataInfoClass">
              <div class="dataTitle">数据详情</div>
              <el-divider></el-divider>
              <div class="dataContent">
                <div>
                  <span class="dataKeyName">应用名称：</span><span>{{row.instance}}</span>
                </div>
                <div>
                  <span class="dataKeyName">应用类型：</span><span>信号处理</span>
                </div>
                <div>
                  <span class="dataKeyName">数据类型：</span><span>{{row.dataType}}</span>
                </div>
                <div>
                  <span class="dataKeyName">数据来源：</span><span>xxx流程实例</span>
                </div>
                <div>
                  <span class="dataKeyName">产生时间：</span><span>2021/27/07 18:45:27</span>
                </div>
                <div>
                  <span class="dataKeyName">数据类型：</span><span>{{row.kind}}</span>
                </div>
                <div>
                  <span class="dataKeyName">协议类型：</span><span>HTTP</span>
                </div>
                <div>
                  <span class="dataKeyName">IP地址：</span><span>{{row.ip}}</span>
                </div>
                <div>
                  <span class="dataKeyName">端口：</span><span>{{row.port}}</span>
                </div>
                <div>
                  <span class="dataKeyName">坐标信息：</span><span>{{row.coordinate}}</span>
                </div>
              </div>
            </div>
            <i class="el-icon-tickets" slot="reference" @click="handleDetail(row)"></i>
          </el-popover>
          <el-tooltip class="item" effect="dark" content="下载" placement="bottom">
            <i class="el-icon-download" style="margin-left: 20px"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <i class="el-icon-delete" style="margin-left: 20px" @click="handleDelete(row)"></i>
          </el-tooltip>

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
.dataInfoClass{
  .dataTitle{
    font-size: 18px;
    font-weight: bold;
  }
  .el-divider--horizontal{
    margin: 5px 0;
  }
  .dataContent{
    font-size: 16px;
    .dataKeyName{
      display: inline-block;
      width: 100px;
    }
  }
}

</style>
