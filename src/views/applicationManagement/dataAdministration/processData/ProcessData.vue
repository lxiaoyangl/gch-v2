<template>
  <div class="process">
    <div class="top">
      <div class="all">
        <div class="left">
          <div class="name">
            <img
              width="24"
              class="mr5"
              src="../../../../assets/img/avt.png"
              alt=""
            />
            <span>资源总量</span>
          </div>
          <div class="num">20</div>
        </div>
        <div class="right">
          <div class="item" v-for="(item, i) in allList" :key="i">
            <div class="title">
              <span class="name">
                <i class="mr5" :style="{ borderColor: item.color }"></i>
                <span>{{ item.name }}</span>
              </span>
              <span class="num">
                <span :style="{ color: item.color }">{{ item.num }}</span>
                /{{ item.all }}
              </span>
            </div>
            <div class="bbar">
              <div
                class="bar"
                :style="{
                  width: (item.num / item.all) * 100 + '%',
                  backgroundColor: item.color,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-content">
      <div class="top">
        <div class="name">流程数据</div>
        <div class="search">
          <el-form size="small" :model="searchData" inline>
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
              <el-select placeholder="类型" v-model="searchData.type">
                <el-option value="1" lable="1"></el-option>
                <el-option value="2" lable="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select placeholder="状态" v-model="searchData.status">
                <el-option value="1" lable="1"></el-option>
                <el-option value="2" lable="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="searchData.name"
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
        @handleDelete="handleDelete"
        @handleDetail="handleDetail"
      />
      <div class="bottom">
        <el-button size="small" type="danger">删除</el-button>
        <Pagination />
      </div>
    </div>

    <el-dialog
      title="资源详情"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :visible.sync="dialogVisible"
      center
      width="40%"
      :before-close="handleClose"
    >
      <div class="box basic-information">
        <div class="title">基本信息</div>
        <el-form
          size="medium"
          class="mtb10"
          label-width="100px"
          :model="basicInformation"
        >
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="basicInformation.name"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="资源类型">
            <el-select v-model="basicInformation.type">
              <el-option value="目标" label="目标"></el-option>
              <el-option value="服务器" label="服务器"></el-option>
              <el-option value="L-下变频" label="L-下变频"></el-option>
              <el-option value="解调器" label="解调器"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="status" label="状 态">
            <i
              :style="{
                backgroundColor: basicInformation.status == 1 ? '' : '',
              }"
            ></i>
            <span>{{ basicInformation.status == 1 ? "在线" : "离线" }}</span>
          </el-form-item>
          <el-form-item prop="ip" label="IP地址">
            {{ basicInformation.ip }}
          </el-form-item>
          <el-form-item prop="port" label="端口">
            {{ basicInformation.port }}
          </el-form-item>
          <el-form-item prop="cpu" label="CPU">
            {{ basicInformation.cpu }}
          </el-form-item>
          <el-form-item prop="is" label="内存">
            {{ basicInformation.is }}
          </el-form-item>
          <el-form-item prop="disk" label="磁盘">
            {{ basicInformation.disk }}
          </el-form-item>
          <el-form-item label-width="65px">
            <el-button type="primary" @click="saveBasicInformation"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="box parameter-information">
        <div class="title">参数信息</div>
        <el-form
          size="medium"
          class="mtb10"
          label-width="100px"
          :model="parameterInformation"
        >
          <el-form-item prop="xhlx" label="信号类型">
            {{ parameterInformation.xhlx }}</el-form-item
          >
          <el-form-item prop="tzfs" label="调制方式">
            {{ parameterInformation.tzfs }}</el-form-item
          >
          <el-form-item prop="zblx" label="载波类型">
            {{ parameterInformation.zblx }}</el-form-item
          >
          <el-form-item prop="zbpl" label="载波频率">
            {{ parameterInformation.zbpl }}</el-form-item
          >
          <el-form-item prop="jds" label="阶段数">
            {{ parameterInformation.jds }}</el-form-item
          >
          <el-form-item prop="tzsl" label="调制速率">
            {{ parameterInformation.tzsl }}</el-form-item
          >
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "./comp/Pagination.vue";
import Table from "./comp/Table.vue";
export default {
  components: {
    Table,
    Pagination,
  },
  data() {
    return {
      // 弹窗
      dialogVisible: false,
      // 基本信息表单
      basicInformation: {},
      // 参数信息表单
      parameterInformation: {
        xhlx: "通用服务器一",
        tzfs: "调制方式",
        zblx: "XXX类型",
        zbpl: "XXXMHz",
        jds: "47%",
        tzsl: "10",
      },
      // 资源总量
      allList: [
        {
          name: "成功",
          num: 16,
          all: 20,
          color: "#4898fc",
        },
        {
          name: "失败",
          num: 4,
          all: 20,
          color: "#ff5353",
        },
        {
          name: "运行中",
          num: 12,
          all: 20,
          color: "#00ceeb",
        },
        {
          name: "等待派发",
          num: 4,
          all: 20,
          color: "#fd9f6c",
        },
      ],

      searchData: {
        time: "",
        type: "",
        name: "",
        status: "",
      },
      // 资源列表
      tableData: [
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 2,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 3,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "信号",
          sdate: "2021-05-31 20:06:41",
          edate: "",

          status: 0,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "",

          status: 1,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 1,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 1,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 1,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 1,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 1,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 1,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 1,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 1,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 1,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 1,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 1,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 1,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 1,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 1,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 1,
          isHover: false,
        },
        {
          zname: "资源名称",

          rid: "123",
          rname: "目标名称",
          type: "目标",
          sdate: "2021-05-31 20:06:41",
          edate: "2021-05-31 20:06:41",

          status: 1,
          isHover: false,
        },
      ],

      gaugeChartData: [
        {
          val: 17,
          sColor: "#54B6FF",
          eColor: "#138FFF",
          title: "在 线",
          all: 20,
        },
        {
          val: 3,
          sColor: "#FF8C8D",
          eColor: "#FF5D5B",
          title: "离 线",
          all: 20,
        },
      ],
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    handleDetail(row) {
      console.log(row);
      this.dialogVisible = true;
      this.basicInformation = row;
    },
    handleDelete(row) {
      console.log(row);
    },
    saveBasicInformation() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.process {
  height: 100%;
  width: 100%;
  > .top {
    // margin-bottom: 10px;
    height: 72px;
    background-color: #ffffff;
    box-shadow: 0px 0px 5px 0px #f4f5f7 inset;
    display: flex;
    > div {
      height: 100%;
      display: flex;
      &.all {
        flex: 1;
        .left {
          width: 214px;
          background-color: #f0f2f7;
          justify-content: center;
          display: flex;
          align-items: center;
          position: relative;
          .num {
            margin-left: 10px;
            color: #0084f1;
            font-size: 30px;
            font-weight: bold;
          }
          &::after {
            content: " ";
            position: absolute;
            top: 35%;
            right: -8px;
            border: 8px solid transparent;
            border-right: 8px solid #f0f2f7;
            border-top: 8px solid #f0f2f7;
            transform: rotate(45deg);
          }
        }
        .right {
          display: flex;
          align-items: center;
          padding-left: 70px;
          // flex-wrap: wrap;
          .item {
            display: flex;
            flex-direction: column;
            flex: 0 0 25%;
            height: 50%;
            padding-right: 100px;
            justify-content: center;
            .title {
              display: flex;
              justify-content: space-between;
              .name {
                i {
                  display: inline-block;
                  width: 10px;
                  border-radius: 50%;
                  height: 10px;
                  background-color: #ffffff;
                  border: solid 2px #23d037;
                }
              }
            }
            .bbar {
              margin-top: 10px;
              width: 100%;
              height: 10px;
              background-color: #e0e4e9;
              border-radius: 5px;
              .bar {
                border-radius: 5px;
                height: 100%;
                // background-color: ;
              }
            }
          }
        }
      }
    }
    .left {
      height: 100%;
      width: 170px;
      background-color: #f9f9fb;
      font-size: 15px;
      text-align: center;
      line-height: 60px;
      // padding-top: 10px;
      .name {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .num {
        font-size: 50px;
      }
    }
    .right {
      flex: 1;
    }
  }
  .p-content {
    width: 100%;
    height: calc(100% - 160px);
    background-color: #fff;
    .top {
      width: 100%;
      padding: 5px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      padding: 5px 10px;
    }
  }
  .el-dialog {
    .box {
      font-size: 12px;
      .title {
        height: 33px;
        background-color: #dadfe7;
        line-height: 33px;
        padding-left: 20px;
        color: #333;
      }
      &.parameter-information,
      &.basic-information {
        .el-form-item {
          flex: 0 0 33%;
        }
      }
      &.component {
        .num {
          display: inline-block;
          width: 36px;
          height: 33px;
          background-color: #3684e9;
          font-size: 12px;
          font-weight: bold;
          line-height: 33px;
          color: #ffffff;
          text-align: center;
        }
      }
    }
  }
}
</style>