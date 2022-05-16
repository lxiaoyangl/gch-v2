<template>
  <div class="appDevMain">
    <el-row>
      <el-col :span="17">
        <div class="right">
          <div class="application devCommon">
            <div class="title">
              <span>应 用</span>
              <span class="t-right">
                应用中心
                <el-icon><arrow-right-bold /></el-icon>
              </span>
            </div>
            <div class="body">
              <div class="appTotal">
                <div class="a-title">应用总数</div>
                <div class="a-num">26</div>
              </div>
              <div class="appRunning">
                <div class="appRunningTop">
                  <div class="applicationBox">
                    <div>
                      <span class="dot dot-ing"></span>
                      <span class="applicationBoxName">正在审批</span>
                    </div>
                    <div class="applicationBoxBottom">
                      <span>07</span>
                      <img width="18px" src="../../assets/img/开发-正在审批.png" />
                    </div>
                  </div>
                  <div class="applicationBox">
                    <div>
                      <span class="dot dot-error"></span>
                      <span class="applicationBoxName">最近失败</span>
                    </div>
                    <div class="applicationBoxBottom">
                      <span>07</span>
                      <img width="18px" src="../../assets/img/开发-最近失败.png" />
                    </div>
                  </div>
                  <div class="applicationBox">
                    <div>
                      <span class="dot dot-success"></span>
                      <span class="applicationBoxName">最近成功</span>
                    </div>
                    <div class="applicationBoxBottom">
                      <span>07</span>
                      <img width="18px" src="../../assets/img/开发-最近成功.png" />
                    </div>
                  </div>
                </div>
                <div class="appRunningBottom">
                  <div class="target">
                    <ContentChart contentName="目 标" :contentNum="12"></ContentChart>
                  </div>
                  <div class="single">
                    <ContentChart contentName="信 号" :contentNum="12"></ContentChart>
                  </div>
                  <div class="resource">
                    <ContentChart contentName="信 源" :contentNum="6"></ContentChart>
                  </div>
                  <div class="demodulation-t">
                    <ContentChart contentName="解 调" :contentNum="5"></ContentChart>
                  </div>
                </div>
              </div>
              <div class="newApp">
                <div class="newAppTop">
                  <div></div>
                  <span>新建应用</span>
                </div>
                <div class="newAppBottom">
                  <div class="target">
                    <ContentChart contentName="目 标" :contentNum="3"></ContentChart>
                  </div>
                  <div class="single">
                    <ContentChart contentName="信 号" :contentNum="12"></ContentChart>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="component devCommon">
            <div class="title">
              组 件
              <span class="t-right">
                组件仓库
                <el-icon><arrow-right-bold /></el-icon>
              </span>
            </div>
            <div class="body">
              <div class="appTotal">
                <div class="a-title">组件总数</div>
                <div class="a-num">40</div>
              </div>
              <div class="appRunning">
                <div class="appRunningTop">
                  <div class="applicationBox">
                    <div>
                      <span class="dot dot-ing"></span>
                      <span class="applicationBoxName">正在审批</span>
                    </div>
                    <div class="applicationBoxBottom">
                      <span>07</span>
                      <img width="18px" src="../../assets/img/开发-正在审批.png" />
                    </div>
                  </div>
                  <div class="applicationBox">
                    <div>
                      <span class="dot dot-error"></span>
                      <span class="applicationBoxName">最近失败</span>
                    </div>
                    <div class="applicationBoxBottom">
                      <span>07</span>
                      <img width="18px" src="../../assets/img/开发-最近失败.png" />
                    </div>
                  </div>
                  <div class="applicationBox">
                    <div>
                      <span class="dot dot-success"></span>
                      <span class="applicationBoxName">最近成功</span>
                    </div>
                    <div class="applicationBoxBottom">
                      <span>07</span>
                      <img width="18px" src="../../assets/img/开发-最近成功.png" />
                    </div>
                  </div>
                </div>
                <div class="appRunningBottom">
                  <div class="targetType">
                    <ContentChart contentName="目标类型" :contentNum="12"></ContentChart>
                  </div>
                  <div class="yima">
                    <ContentChart contentName="译 码" :contentNum="12"></ContentChart>
                  </div>
                  <div class="zhenjiexi">
                    <ContentChart contentName="帧解析" :contentNum="12"></ContentChart>
                  </div>
                  <div class="demodulation">
                    <ContentChart contentName="解调规格" contentNum="--"></ContentChart>
                  </div>
                </div>
              </div>
              <div class="newApp">
                <div class="newAppTop">
                  <div></div>
                  <span>新建组件</span>
                </div>
                <div class="newAppBottom">
                  <div class="yima">
                    <ContentChart contentName="译 码" :contentNum="12"></ContentChart>
                  </div>
                  <div class="zhenjiexi">
                    <ContentChart contentName="帧解析" :contentNum="12"></ContentChart>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="left">
          <div class="applicationRunning">
            <div class="applicationRunningTitle">
              <span>最近开发</span>
              <span class="t-right">
                <span>告警信息 </span>
                <el-icon><arrow-right-bold /></el-icon>
              </span>
            </div>
            <div class="applicationRunningContent">
              <AppCarousel :list="list1" />
              <CompCarousel :list="list2" />
            </div>
            <div class="applicationRunningTitle mt5">
              <span>开发日志</span>
              <span class="t-right">
                <span>开发日志 </span>
                <el-icon><arrow-right-bold /></el-icon>
              </span>
            </div>
            <div class="applicationRunningData">
              <div class="dataContent">
                <div
                  class="dataContentItem"
                  v-for="(item, ind) in applicationData"
                  :key="ind"
                  @mouseleave="appDataMouseleave(ind)"
                  @mouseenter="appDataMouseenter(ind)"
                >
                  <div class="dataContentItemTop">
                    <!-- <component :is="getRunImage(item.runStatus)"></component> -->
                    <el-image :src="getRunImage(item.runStatus)"></el-image>
                    <span style="margin-left: 10px; font-size: 12px; font-family: Microsoft YaHei; font-weight: bold">{{
                      item.appName
                    }}</span>
                    <span>——</span>
                    <span style="font-size: 12px; font-family: MicrosoftYaHei; font-weight: bold">{{
                      item.targetMonitor
                    }}</span>
                    <span>——</span>
                    <span
                      :style="{
                        color: item.runStatus == 3 ? '#E35353' : '#267FF7',
                        fontSize: '12px',
                        fontFamily: 'MicrosoftYaHei',
                        fontWeight: 'bold',
                      }"
                      >{{ item.componentName }}</span
                    >
                    <span
                      v-if="!item.checkInfo"
                      :style="{
                        position: 'absolute',
                        right: '15px',
                        fontSize: '12px',
                        fontFamily: 'Microsoft YaHei',
                        fontWeight: 'bold',
                        color: item.runStatus == 3 ? '#E35353' : '#ABABAB',
                      }"
                    >
                      {{ item.runTime }}
                    </span>
                    <span v-if="item.checkInfo" style="position: absolute; right: 15px"
                      ><el-button size="mini" type="primary">查看详情</el-button></span
                    >
                  </div>
                  <el-divider></el-divider>
                  <div class="dataContentItemBottom">
                    <span style="font-size: 12px; font-family: Microsoft YaHei; font-weight: bold; color: #737373"
                      >详情：<span
                        :style="{
                          color: item.runStatus == 3 ? '#E35353' : '#737373',
                        }"
                        >{{ item.desc }}</span
                      >
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import ContentChart from "./comp/ContentChart.vue";
import AppCarousel from "./comp/AppCarousel.vue";
import CompCarousel from "./comp/CompCarousel.vue";

import yxzImg from "../../assets/img/开发-运行中.png";
import cgImg from "../../assets/img/开发-成功.png";
import sbImg from "../../assets/img/开发-失败.png";

interface ListItem {
  appName: string;
  appType: string;
  desc: string;
  date: string;
  status: 0 | 1; //0未完成 1完成
  developer: string;
  appNum: number | string;
}

const applicationData = reactive([
  {
    appName: "应用名称",
    targetMonitor: "目标监视",
    componentName: "组件名称",
    desc: "运行环境监控",
    runTime: "07 / 08 14：28",
    runStatus: 1,
    checkInfo: false,
  },
  {
    appName: "应用名称",
    targetMonitor: "目标监视",
    componentName: "组件名称",
    desc: "运行环境监控",
    runTime: "07 / 08 14：28",
    runStatus: 3,
    checkInfo: false,
  },
  {
    appName: "应用名称",
    targetMonitor: "目标监视",
    componentName: "组件名称",
    desc: "运行环境监控",
    runTime: "07 / 08 14：28",
    runStatus: 1,
    checkInfo: false,
  },
  {
    appName: "应用名称",
    targetMonitor: "目标监视",
    componentName: "组件名称",
    desc: "运行环境监控",
    runTime: "07 / 08 14：28",
    runStatus: 2,
    checkInfo: false,
  },
]);
const list1: ListItem[] = reactive([
  {
    appName: "应用名称1",
    appType: "应用类型",
    desc: "描述描述描述",
    date: "10-10 10:10",
    status: 1, //0未完成 1完成
    developer: "开发者1",
    appNum: 4,
  },
  {
    appName: "应用名称2",
    appType: "应用类型",
    desc: "描述描述描述",
    date: "10-10 10:10",
    status: 0, //0未完成 1完成
    developer: "开发者2",
    appNum: 4,
  },
  {
    appName: "应用名称3",
    appType: "应用类型",
    desc: "描述描述描述",
    date: "10-10 10:10",
    status: 1, //0未完成 1完成
    developer: "开发者",
    appNum: 4,
  },
  {
    appName: "应用名称4",
    appType: "应用类型",
    desc: "描述描述描述",
    date: "10-10 10:10",
    status: 1, //0未完成 1完成
    developer: "开发者",
    appNum: 4,
  },
]);
const list2: ListItem[] = reactive([
  {
    appName: "组件名称1",
    appType: "组件类型",
    desc: "描述描述描述",
    date: "10-10 10:10",
    status: 1, //0未完成 1完成
    developer: "开发者1",
    appNum: "信号处理",
  },
  {
    appName: "组件名称2",
    appType: "组件类型",
    desc: "描述描述描述",
    date: "10-10 10:10",
    status: 0, //0未完成 1完成
    developer: "开发者2",
    appNum: "信号处理",
  },
  {
    appName: "组件名称3",
    appType: "组件类型",
    desc: "描述描述描述",
    date: "10-10 10:10",
    status: 1, //0未完成 1完成
    developer: "开发者",
    appNum: "信号处理",
  },
  {
    appName: "组件名称4",
    appType: "组件类型",
    desc: "描述描述描述",
    date: "10-10 10:10",
    status: 1, //0未完成 1完成
    developer: "开发者",
    appNum: "信号处理",
  },
]);

const appDataMouseleave = (index: number) => {
  applicationData[index].checkInfo = false;
};
const appDataMouseenter = (index: number) => {
  applicationData[index].checkInfo = true;
};
const getRunImage = (status: number) => {
  if (status == 1) {
    return yxzImg;
  }
  if (status == 2) {
    return cgImg;
  }
  if (status == 3) {
    return sbImg;
  }
};
</script>
<style lang="less" scoped>
.appDevMain {
  width: calc(100vw);
  height: calc(100vh - 50px);
  .right {
    width: calc(100%);
    height: calc(100vh - 60px);
    padding: 20px;
    box-sizing: border-box;
    .devCommon {
      width: calc(100%);
      height: calc(49%);
      border-radius: 8px;
      background: #ffffff;
      border-radius: 8px;
      &.application {
        .body {
          .appTotal {
            background: url("../../assets/img/开发-应用总数.png") no-repeat center;
          }
          .newApp {
            .newAppTop {
              background: url("../../assets/img/开发-应用新建.png") no-repeat center;
            }
          }
        }
      }
      &.component {
        margin-top: 20px;
        .body {
          .appTotal {
            background: url("../../assets/img/开发-组件总数.png") no-repeat center;
          }
          .newApp {
            .newAppTop {
              background: url("../../assets/img/开发-组件新建.png") no-repeat center;
            }
          }
        }
      }
      .title {
        display: flex;
        justify-content: space-between;
        padding-right: 40px;
        height: 50px;
        line-height: 50px;
        width: calc(100%);
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #000000;
        margin-left: 25px;
        .t-right {
          color: #606266;
          font-weight: normal;
          font-size: 12px;
          &:hover {
            color: #66b1ff;
          }
        }
      }
      .body {
        width: calc(100%);
        height: calc(100% - 50px);
        padding: 0px 20px 20px 20px;
        display: flex;
        .appTotal {
          width: calc(20%);
          height: calc(100%);
          background-size: 100% 100%;
          text-align: center;
          color: #ffffff;
          .a-title {
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            margin-top: calc(45%);
          }
          .a-num {
            font-size: 48px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #ffffff;
            margin-top: calc(30%);
          }
        }
        .appRunning {
          width: calc(55%);
          height: calc(100%);
          padding: 0px 20px;
          .appRunningTop {
            width: calc(100%);
            height: calc(25%);
            background: linear-gradient(90deg, #f6f7f8 0%, #f8f9fb 100%);
            border-radius: 3px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .applicationBox {
              display: grid;
              .dot {
                display: inline-block;
                height: 7px;
                width: 7px;
                border-radius: 4px;
                &.dot-ing {
                  background-color: #0075ff;
                  box-shadow: 0px 2px 3px 0px rgba(0, 117, 255, 0.23);
                }
                &.dot-error {
                  background-color: #ffa250;
                  box-shadow: 0px 2px 3px 0px rgba(0, 117, 255, 0.23);
                }
                &.dot-success {
                  background-color: #62daa0;
                  box-shadow: 0px 2px 3px 0px rgba(0, 117, 255, 0.23);
                }
              }
              .applicationBoxName {
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #818181;
                margin-left: 5px;
              }
              .applicationBoxBottom {
                display: flex;
                align-items: center;
                margin-top: 10px;
                justify-content: space-around;
              }
            }
          }
          .appRunningBottom {
            width: calc(100%);
            height: calc(75%);
            display: flex;
            justify-content: space-between;
            div {
              width: calc(23%);
            }
          }
        }
        .newApp {
          width: calc(25%);
          height: calc(100%);
          .newAppTop {
            cursor: pointer;
            width: calc(100%);
            height: calc(25%);
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            div {
              height: 25px;
              width: 25px;
              background: url("../../assets/img/开发-应用新建图标.png") no-repeat center;
            }
            span {
              margin-left: 20px;
            }
          }
          .newAppTop:hover {
            background: url("../../assets/img/开发-应用新建-鼠标.png") no-repeat center;
            color: #ffffff;
            div {
              background: url("../../assets/img/开发-应用新建图标白色.png") no-repeat center;
            }
          }
          .newAppBottom {
            width: calc(100%);
            height: calc(75%);
            display: flex;
            justify-content: space-between;
            div {
              width: calc(48%);
            }
          }
        }

        .targetType {
          background: url("../../assets/img/开发-目标类型.png") no-repeat center;
          background-size: 100% 100%;
        }
        .yima {
          background: url("../../assets/img/开发-译码.png") no-repeat center;
          background-size: 100% 100%;
        }
        .zhenjiexi {
          background: url("../../assets/img/开发-帧解析.png") no-repeat center;
          background-size: 100% 100%;
        }
        .demodulation {
          background: url("../../assets/img/开发-解调规格.png") no-repeat center;
          background-size: 100% 100%;
        }
        .target {
          background: url("../../assets/img/开发-目标.png") no-repeat center;
          background-size: 100% 100%;
        }
        .single {
          background: url("../../assets/img/开发-信号.png") no-repeat center;
          background-size: 100% 100%;
        }
        .resource {
          background: url("../../assets/img/开发-信源.png") no-repeat center;
          background-size: 100% 100%;
        }
        .demodulation-t {
          background: url("../../assets/img/开发-解调.png") no-repeat center;
          background-size: 100% 100%;
        }
      }
    }
  }
  .left {
    width: calc(100%);
    height: calc(100vh - 50px);
    .applicationRunning {
      // background-color: #ffffff;
      height: calc(100% - 50px);
      width: calc(100%);
      .applicationRunningTitle {
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #000000;
        height: 60px;
        align-items: center;
        // line-height: 60px;
        width: calc(100%);
        padding: 0 20px;
        box-sizing: border-box;
        .t-right {
          color: #606266;
          font-weight: normal;
          font-size: 12px;
          &:hover {
            color: #66b1ff;
          }
        }
      }
      .applicationRunningContent {
        padding: 0px 20px;
        height: calc(410px);
        width: calc(100%);
        background-color: #fff;
        :deep(.el-divider--horizontal) {
          margin: 10px 0;
        }
        .shenpi {
          height: calc(47%);
          width: calc(100%);
          display: flex;
          .shenpiName {
            width: calc(10%);
            height: calc(100%);
            background: linear-gradient(
              90deg,
              rgba(34, 109, 231, 0.79) 53%,
              rgba(108, 162, 250, 0.69) 77%,
              rgba(237, 244, 255, 0.6) 100%
            );
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            -webkit-writing-mode: vertical-rl;
            writing-mode: vertical-rl;
          }
          :deep(.el-divider--vertical) {
            height: calc(100%);
            margin: 0px 8px;
          }
          .shenpiNum,
          .shenpiTg,
          .shenpiSb {
            display: grid;
            justify-content: center;
            text-align: center;
            width: calc(30%);
            height: calc(100%);
            .shenpiImage {
              width: 20px;
              height: 20px;
              margin: 10px 25px 0 25px;
            }
            .chakanJd {
              padding: 3px 7px !important;
              margin-top: 10px;
            }
            .shenpiNumText {
              font-size: 24px;
              font-family: Microsoft YaHei;
              font-weight: bold;
              color: #616161;
              margin-top: 5px;
            }
          }
        }
        .yichang {
          height: calc(47%);
          width: calc(100%);
          display: flex;
          :deep(.el-divider--vertical) {
            height: calc(100%);
            margin: 0px 8px;
          }
          .yichangName {
            width: calc(10%);
            height: calc(100%);
            background: linear-gradient(
              90deg,
              #e85151 0%,
              rgba(233, 86, 87, 0.79) 53%,
              rgba(239, 157, 150, 0.69) 77%,
              rgba(253, 239, 236, 0.6) 100%
            );
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            -webkit-writing-mode: vertical-rl;
            writing-mode: vertical-rl;
          }
          .yichangNum,
          .componentYc,
          .noneContent {
            display: grid;
            justify-content: center;
            text-align: center;
            width: calc(30%);
            height: calc(100%);
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #898989;
            .yichangImage {
              width: 20px;
              height: 20px;
              margin: 10px 25px 0 25px;
            }
            .chakanJd {
              padding: 3px 7px;
              margin-top: 10px;
            }
            .yichangNumText {
              font-size: 24px;
              font-family: Microsoft YaHei;
              font-weight: bold;
              color: #616161;
              margin-top: 5px;
            }
          }
        }
      }
      .applicationRunningData {
        background-color: #fff;
        width: calc(100%);
        height: calc(100% - 480px);
        .nearestDataStatus {
          width: calc(100%);
          height: calc(15%);
          padding: 0px 20px 0px 20px;
          // background-color: #f8f9fb;
          .nearestDataStatusTitle {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #3a3a3a;
            .dataManager {
              float: right;
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: bold;
              color: #828282;
              cursor: pointer;
            }
          }
          .nearestDataStatusContent {
            width: calc(100%);
            height: calc(100% - 40px);
            display: flex;
            justify-content: space-between;
            .common {
              width: calc(33%);
              height: calc(100%);
              display: flex;
              align-items: center;
              .commonDataName {
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #656566;
                margin-left: 15px;
              }
              .commonDataNum {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #373737;
                margin-left: 15px;
              }
            }
            .businessData {
            }
            .processData {
            }
            .achievementData {
            }
          }
        }
        .dataContent {
          width: calc(100%);
          height: calc(85%);
          overflow-y: auto;
          .dataContentItem {
            height: calc(18%);
            width: calc(100%);
            background: #ffffff;
            border-radius: 3px;
            padding: 0px 20px;
            cursor: pointer;
            .dataContentItemTop {
              display: flex;
              height: calc(50%);
              align-items: center;
            }
            :deep(.el-divider--horizontal) {
              margin: 0px;
            }
            .dataContentItemBottom {
              display: flex;
              height: calc(50%);
              align-items: center;
            }
          }
          .dataContentItem:hover {
            background: #f2f7fb;
            box-shadow: 0px 4px 5px 0px rgba(175, 188, 198, 0.35);
          }
        }
      }
    }
  }
}
</style>
