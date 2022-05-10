<template>
  <div class="management">
    <div class="top">
      <div class="all">
        <div class="left">
          <div class="name">
            <img
              width="24"
              class="mr5"
              src="../../../assets/img/avt.png"
              alt=""
            />
            <span>资源组一</span>
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
      <div class="err">
        <div class="left">
          <div class="name">
            <img
              width="24"
              class="mr5"
              src="../../../assets/img/avt.png"
              alt=""
            />
            <span>最近异常</span>
          </div>
          <div class="num">8</div>
        </div>
        <div class="right">
          <Gauge
            v-for="(item, i) in gaugeChartData"
            :key="i"
            :chartsData="item"
          />
        </div>
      </div>
    </div>
    <div class="m-content">
      <div class="top">
        <div class="name">
          <span class="mr10">处理流程列表</span>
          <el-select placeholder="类型" size="small" v-model="searchData.type">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
          <el-select
            class="ml10"
            placeholder="状态"
            size="small"
            v-model="searchData.status"
          >
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </div>
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
              <el-input
                v-model="searchData.name"
                style="width: 240px"
                placeholder="搜索流程名称"
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
      <Pagination />
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
              <el-option value="DVB-S2" label="DVB-S2"></el-option>
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
      <div class="box component">
        <div class="title">
          包含组件 <span class="num">{{ ComponentTableData.length }}</span>
        </div>
        <ComponentTable :tableData="ComponentTableData" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "../applicationOfMonitoring/comp/Pagination.vue";
import ComponentTable from "./comp/componentTable.vue";
import Gauge from "./comp/Gauge.vue";
import Table from "./comp/Table";
export default {
  components: {
    Table,
    Gauge,
    ComponentTable,
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
      // 弹窗组件表格
      ComponentTableData: [
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
      ],
      // 资源总量
      allList: [
        {
          name: "某解调器",
          num: 16,
          all: 20,
          color: "#4898fc",
        },
        {
          name: "L下变频",
          num: 4,
          all: 20,
          color: "#23d037",
        },
        {
          name: "主站DVB-S2",
          num: 12,
          all: 20,
          color: "#00ceeb",
        },
        {
          name: "通用服务器",
          num: 4,
          all: 20,
          color: "#fd9f6c",
        },
      ],

      searchData: {
        status: "",
        time: "",
        type: "",
        name: "",
      },
      // 资源列表
      tableData: [
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 2,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 3,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 1,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 2,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "",
          status: 1,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 1,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "",
          status: 1,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 1,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 1,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 1,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 1,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 1,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 1,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 1,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 1,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 1,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 1,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 1,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 1,
          isHover: false,
        },
        {
          name: "流程处理名称",
          id: "123",
          type: "目标监控",
          sDate: "2021-05-31 20:06:41",
          eDate: "2021-06-03 19:40:03",
          status: 1,
          isHover: false,
        },
      ],

      gaugeChartData: [
        {
          val: 17,
          sColor: "#54B6FF",
          eColor: "#138FFF",
          title: "等待派发",
          all: 20,
        },
        {
          val: 3,
          sColor: "#FF8C8D",
          eColor: "#FF5D5B",
          title: "失 败",
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
.management {
  height: 100%;
  width: 100%;
  // padding: 20px;
  > .top {
    border: 1px solid #e5e6e8;
    height: 150px;
    // margin-bottom: 10px;
    background-color: #fff;
    display: flex;
    > div {
      height: 100%;
      display: flex;
      &.all {
        flex: 2;
        .left {
          .num {
            color: #0084f1;
          }
        }
        .right {
          display: flex;
          flex-wrap: wrap;
          .item {
            display: flex;
            flex-direction: column;
            flex: 0 0 33%;
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
              .num {
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
      &.err {
        flex: 1;
        .left {
          .num {
            color: #fe5b5e;
          }
        }
        .right {
          display: flex;
          > * {
            flex: 1;
            height: 100%;
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
  .m-content {
    width: 100%;
    height: calc(100% - 150px);
    background-color: #fff;
    .top {
      width: 100%;
      padding: 5px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name {
        font-size: 16px;
      }
      .search {
      }
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