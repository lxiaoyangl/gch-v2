<template>
  <div class="sbyc">
    <div class="top">
      <div class="setting">
        <el-button size="medium" type="primary" @click="fetchData()">
          <i class="el-icon-refresh"></i> 刷新
        </el-button>
        <el-select
          class="ml10"
          size="medium"
          style="width: 150px"
          v-model="searchData.sel"
          placeholder="采集状态"
        >
          <el-option label="1" value="1"> </el-option>
          <el-option label="2" value="2"> </el-option>
        </el-select>
      </div>
      <div class="search">
        <el-form size="medium" :model="searchData" inline>
          <el-form-item>
            <el-date-picker
              v-model="searchData.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="searchData.searchName"
              style="width: 240px"
              placeholder="搜索目标ID"
              suffix-icon="el-icon-search"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <Table
      :tableData="tableData"
      @handleOnEdit="btndetail"
      @handleDelete="btndelete"
      @handlepdelete="pdelete"
    />
    <div class="bottom">
      <el-button type="danger" size="medium" @click="clearPd()"
        >删 除</el-button
      >
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :nowPage="nowPage"
        prev-text="上一页"
        next-text="下一页"
        :page-sizes="[15, 30, 50]"
        :pageSize="pageSize"
        :current-page="1"
        layout="sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
      title="频点偏差校准详情"
      :visible.sync="dialogVisible"
      center
      width="30%"
      :before-close="handleClose"
    >
      <el-form size="medium" label-width="100px" :model="detailForm">
        <el-form-item label="时间：">
          <p>{{ detailForm.date }}</p>
        </el-form-item>
        <el-form-item label="校准类型：">
          <p>{{ detailForm.type }}</p>
        </el-form-item>
        <el-form-item label="操作状态：">
          <p>{{ detailForm.status }}</p>
        </el-form-item>
        <el-form-item label="信号信息">
          <p>{{ detailForm.msg }}</p>
        </el-form-item>
        <el-form-item label="日志内容：">
          <p>{{ detailForm.content }}</p>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Table from "./Table";
export default {
  components: {
    Table,
  },
  data() {
    return {
      searchData: {
        time: null,
        searchName: "",
        sel: "",
      },

      dialogVisible: false,
      nowPage: 1,
      total: 0,
      currentPage: 1,
      pageSize: 15,
      detailForm: {},
      tableData: [],
      selectData: [],
      tables: [
        {
          id: 1,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
        {
          id: 2,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
        {
          id: 3,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "失败",
          isHover: false,
        },
        {
          id: 4,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
        {
          id: 5,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
        {
          id: 6,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "失败",
          isHover: false,
        },
        {
          id: 7,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
        {
          id: 8,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
        {
          id: 9,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
        {
          id: 10,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "失败",
          isHover: false,
        },
        {
          id: 11,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
        {
          id: 12,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
        {
          id: 13,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
        {
          id: 14,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "失败",
          isHover: false,
        },
        {
          id: 15,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
        {
          id: 16,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
        {
          id: 17,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
        {
          id: 18,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "失败",
          isHover: false,
        },
        {
          id: 19,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
        {
          id: 20,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
        {
          id: 21,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
        {
          id: 22,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
        {
          id: 23,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "失败",
          isHover: false,
        },
        {
          id: 24,
          cjsb: "采集设备",
          IP: "192.168.2.144",
          port: "12",
          size: "12.32MB",
          date: "2021/5/10 16:28:42",
          status: "成功",
          isHover: false,
        },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.tableData = [];
      let start = (this.nowPage - 1) * this.pageSize;
      let end =
        this.nowPage * this.pageSize > this.tables.length
          ? this.tables.length
          : this.nowPage * this.pageSize;
      for (let i = start; i < end; i++) {
        this.tableData.push(this.tables[i]);
      }
      this.total = this.tables.length;
      this.currentPage = this.nowPage;
    },
    btndetail(row) {
      this.dialogVisible = true;
      this.detailForm = JSON.parse(JSON.stringify(row));
    },
    btndelete(row) {
      console.log(row);
      let that = this;
      that
        .$confirm("此操作将永久删除该日志, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          let temptt = [];
          for (let i = 0; i < that.tables.length; i++) {
            if (that.tables[i].id != row.id) {
              temptt.push(that.tables[i]);
            }
          }
          that.tables = temptt;
          that.$message({
            type: "success",
            message: "删除成功!",
          });
          that.fetchData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },

    handleCurrentChange(val) {
      this.nowPage = val;
      this.fetchData();
    },

    clearData() {
      this.tables = [];
      this.fetchData();
    },

    clearPd() {
      let that = this;
      that
        .$confirm("此操作将永久删除该日志, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          let temptt = [];
          let selectRow = that.selectData;
          for (let i = 0; i < that.tables.length; i++) {
            let flag = false;
            for (let j = 0; j < selectRow.length; j++) {
              if (that.tables[i].id == selectRow[j].id) {
                // temptt.push(that.cztables[i]);
                flag = true;
              }
            }
            if (!flag) {
              temptt.push(that.tables[i]);
            }
          }
          that.tables = temptt;
          that.$message({
            type: "success",
            message: "删除成功!",
          });
          that.fetchData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handleClose() {
      this.dialogVisible = false;
    },
    pdelete(val) {
      this.selectData = val;
    },
  },
};
</script>
<style lang="less" scoped>
.sbyc {
  background-color: #fff;
  padding-top: 10px;
  .top {
    // flex: 0 0 43px;
    padding: 0 20px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .setting {
      display: flex;
      align-items: center;
      img {
        margin-left: 10px;
        margin-right: 20px;
      }
    }
    .search {
      .el-form-item {
        margin-bottom: 0;
        /deep/.el-form-item__label {
          color: #fff;
        }
      }
    }
  }
  .bottom {
    // flex: 0 0 42px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>