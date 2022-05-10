<template>
  <div class="data">
    <div class="table-container">
      <div class="top">
        <div class="name">信号列表</div>
        <div class="search">
          <el-form size="medium" :model="searchData" inline>
            <el-form-item>
              <el-select placeholder="执行状态" v-model="searchData.status">
                <el-option value="1" lable="1"></el-option>
                <el-option value="2" lable="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select placeholder="载波类型" v-model="searchData.type">
                <el-option value="1" lable="1"></el-option>
                <el-option value="2" lable="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="searchData.name"
                style="width: 240px"
                placeholder="输入信号名称"
                suffix-icon="el-icon-search"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <Table :tableData="tableData" />
      <Pagination />
    </div>
    <div class="info">
      <div class="title">信号详情</div>
      <div class="content">
        <div class="box basic-information">
          <div class="name">
            <i></i>
            <span>基本信息</span>
          </div>
          <el-form label-width="100" :model="basicInformation">
            <el-form-item prop="clsj" class="f50" label="处理时间：">
              {{ basicInformation.clsj }}
            </el-form-item>
            <el-form-item prop="xhzt" class="f50" label="信号状态：">
              {{ basicInformation.xhzt == 1 ? "成功" : "失败" }}
            </el-form-item>
            <el-form-item prop="zbzp" class="f50" label="载波中频：">
              {{ basicInformation.zbzp }}
            </el-form-item>
          </el-form>
        </div>
        <div class="box signal-parameters">
          <div class="name">
            <i></i>
            <span>信号参数</span>
          </div>
          <el-form label-width="100" :model="signalParameters">
            <el-form-item class="f33" prop="tzfs" label="调制方式：">
              {{ signalParameters.tzfs }}
            </el-form-item>
            <el-form-item class="f33" prop="zbpl" label="载波频率：">
              {{ signalParameters.zbpl }}
            </el-form-item>
            <el-form-item class="f33" prop="zblx" label="载波类型：">
              {{ signalParameters.zblx }}
            </el-form-item>
            <el-form-item class="f33" prop="tzsl" label="调制速率：">
              {{ signalParameters.tzsl }}
            </el-form-item>
            <el-form-item class="f50" prop="xzb" label="信噪比：">
              {{ signalParameters.xzb }}
            </el-form-item>
            <el-form-item class="f33" prop="xzt" label="星座图：">
              <span class="c008">
                {{ signalParameters.xzt }}
              </span>
            </el-form-item>
            <el-form-item class="f33" prop="jtsd" label="解调锁定：">
              <span
                class="dot"
                :style="{
                  backgroundColor:
                    signalParameters.jtsd == 1 ? '#2aef8a' : '#ff5757',
                }"
              >
              </span>
            </el-form-item>
            <el-form-item prop="ymsd" class="f33" label="译码锁定：">
              <span
                class="dot"
                :style="{
                  backgroundColor:
                    signalParameters.ymsd == 1 ? '#2aef8a' : '#ff5757',
                }"
              >
              </span>
            </el-form-item>
          </el-form>
        </div>
        <div class="box processing-applications">
          <div class="name">
            <i></i>
            <span>处理应用</span>
          </div>
          <el-form label-width="100" :model="processingApplications">
            <el-form-item class="f33" prop="yyid" label="应用ID：">
              {{ processingApplications.yyid }}
            </el-form-item>
            <el-form-item class="f33" prop="yymc" label="应用名称：">
              {{ processingApplications.yymc }}
            </el-form-item>
            <el-form-item class="f33" prop="yylx" label="应用类型：">
              {{ processingApplications.yylx }}
            </el-form-item>
            <el-form-item class="f33" prop="zjsl" label="组件数量：">
              {{ processingApplications.zjsl }}
            </el-form-item>
            <el-form-item class="f50" prop="kssj" label="开始时间：">
              {{ processingApplications.kssj }}
            </el-form-item>
          </el-form>
        </div>
        <div class="planisphere">
          <div class="top">
            <div class="name">
              <i></i>
              <span>星座图</span>
            </div>
            <div class="right">
              <div class="item">
                <span class="name">星座图：</span>
                <span class="val c008">ON</span>
              </div>
              <div class="item">
                <span class="name">解调锁定：</span>
                <span class="val dot"></span>
              </div>
              <div class="item">
                <span class="name">译码锁定：</span>
                <span class="val dot"></span>
              </div>
            </div>
          </div>
          <div class="scatterChart">
            <Scatter />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "./comp/Pagination";
import Scatter from "./comp/Scatter";
import Table from "./comp/Table";
export default {
  components: {
    Table,
    Pagination,
    Scatter,
  },
  data() {
    return {
      searchData: {
        status: "",
        type: "",
        name: "",
      },
      tableData: [
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 2,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
        {
          xhpd: "123.34Hz",
          tzsl: "123bps",
          tzfs: "调制方式",
          wx: "xxx",
          clzt: 1,
          clsj: "2021-06-01 11:28:56",
          isHover: false,
        },
      ],
      // 右边表单
      basicInformation: {
        clsj: "2021-06-01 13:53:01",
        xhzt: 1,
        zbzp: "载波中频",
      },
      signalParameters: {
        tzfs: "qpsk",
        zbpl: "2000Hz",
        zblx: "载波类型",
        tzsl: "调制速率",
        xzb: "2.3YBT",
        xzt: "ON",
        jtsd: 1,
        ymsd: 1,
      },
      processingApplications: {
        yyid: "212",
        yymc: "XXX应用",
        yylx: "外置",
        zjsl: "6",
        kssj: "2021-06-01 14:30:49",
      },
    };
  },
};
</script>
<style lang="less" scoped>
.data {
  margin: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  display: flex;
  .table-container {
    background-color: #fff;
    padding: 0px 10px;
    flex: 2;
    .top {
      padding: 5px 0 5px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        font-size: 14px;
      }
    }
  }
  .info {
    background-color: #f4f4f4;
    flex: 1;
    height: 100%;
    > .title {
      height: 36px;
      line-height: 36px;
      font-size: 16px;
      background-color: #324159;
      color: #fff;
      padding-left: 15px;
    }
    .content {
      height: calc(100% - 36px);
      .box {
        border-bottom: 1px solid #e9ecef;
        margin-top: 15px;
        padding-left: 20px;
        &.processing-applications {
          border-bottom: none;
        }
        > .name {
          display: flex;
          align-items: center;
          font-weight: bold;
          i {
            display: inline-block;
            width: 6px;
            height: 15px;
            margin-right: 5px;
            background-color: #48acff;
          }
        }
        .el-form {
          margin-left: 20px;
        }
      }
      .planisphere {
        height: calc(100% - 388px);
        background-color: #fff;
        margin-top: 15px;
        padding: 20px 10px 0 20px;
        .top {
          display: flex;
          justify-content: space-between;
          > .name {
            display: flex;
            align-items: center;
            font-weight: bold;
            i {
              display: inline-block;
              width: 6px;
              height: 15px;
              margin-right: 5px;
              background-color: #48acff;
            }
          }
          .right {
            display: flex;
            font-size: 12px;
            .item {
              display: flex;
              margin-left: 20px;
              align-items: center;
              .name {
                color: #333;
              }
            }
          }
        }
        .scatterChart {
          width: 100%;
          height: calc(100% - 35px);
        }
      }
    }
  }
}
</style>