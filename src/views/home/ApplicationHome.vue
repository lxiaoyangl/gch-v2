<template>
  <div class="applicationHome">
    <el-row>
      <el-col :span="18">
        <div class="applicationLeft">
          <div class="applicationStatus applicationStatusAndInfoClass">
            <div class="applicationStatusTitle">应用运行状态</div>
            <div class="applicationStatusContent">
              <div class="applicationStatusContentTotal">
                <div class="applicationStatusContentTotalName">应用总数</div>
                <div class="applicationStatusContentTotalNum">11</div>
              </div>
              <div class="applicationStatusContentStatus">
                <div class="common applicationStatusContentStatusRunning">
                  <div class="statusName">运行中</div>
                  <div class="statusNum">05</div>
                </div>
                <div class="common applicationStatusContentStatusFreeing">
                  <div class="statusName">空闲中</div>
                  <div class="statusNum">03</div>
                </div>
              </div>
              <div class="applicationStatusContentStatus">
                <div class="common applicationStatusContentStatusError">
                  <div class="statusName">异常中</div>
                  <div class="statusNum">03</div>
                </div>
                <div class="common applicationStatusContentStatusDown">
                  <div class="statusName">最近下架</div>
                  <div class="statusNum">07</div>
                </div>
              </div>
            </div>
          </div>
          <div class="applicationInfo">
            <div class="resource">
              <div class="left">
                <div class="title">资源管理</div>
                <div class="chart">
                  <div id="chart-resource"></div>
                  <div class="small-title">资源总数</div>
                </div>
                <div class="chart-info">
                  <div class="info">
                    <span class="icon background1"></span><span class="text color1">在线</span
                    ><span class="num">05</span>
                  </div>
                  <div class="info">
                    <span class="icon background2"></span><span class="text color2">离线</span
                    ><span class="num">30</span>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="look-more">查看更多>></div>
                <div class="menu">
                  <div class="menu-item">
                    <div class="data1">
                      <span class="name">主站</span>
                      <span class="number">02</span>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="data1">
                      <span class="name">主站</span>
                      <span class="number">02</span>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="data1">
                      <span class="name">主站</span>
                      <span class="number">02</span>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="data1">
                      <span class="name">主站</span>
                      <span class="number">02</span>
                    </div>
                  </div>
                </div>
                <div class="operation">
                  <div class="operation-item"><span>新建资源</span></div>
                  <div class="operation-item"><span>资源建模</span></div>
                  <div class="operation-item"><span>字典库</span></div>
                </div>
              </div>
            </div>
            <div class="data">
              <div class="title">数据管理</div>

              <div class="pie-chart">
                <div class="left" id="pie-chart">1</div>
                <div class="right">
                  <div class="data">
                    <span class="circle" style="background: #2276fe">.</span><span class="name">业务数据</span>
                  </div>
                  <div class="data">
                    <span class="circle" style="background: #63f6eb">.</span><span class="name">过程数据</span>
                  </div>
                  <div class="data">
                    <span class="circle" style="background: #fecc62">.</span><span class="name">成果数据</span>
                  </div>
                </div>
              </div>

              <div class="bar-chart">
                <div class="title">
                  <span class="circle" style="background: #fecc62">.</span><span class="name">成果数据</span>
                </div>
                <div id="bar-chart"></div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="applicationRunning">
          <div class="applicationRunningTitle">正在运行</div>
          <div class="applicationRunningContent">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in 4" :key="item">
                <div class="applicationRunningInfo">
                  <div class="applicationRunningInfoTop">
                    <el-image style="margin: 20px" src="../../assets/img/已上架.png"></el-image>
                    <div style="color: #ffffff">
                      <ul>
                        <li>
                          <span style="font-size: 16px; font-family: Microsoft YaHei; font-weight: 400">应用名称</span>
                          <span style="font-size: 14px; font-family: Microsoft YaHei; font-weight: 400"
                            >【应用类型】</span
                          >
                        </li>
                        <li
                          style="
                            font-size: 12px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: #b3d3f1;
                            margin-top: 15px;
                          "
                        >
                          应用的一段描述
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="applicationRunningInfoBottom">
                    <div class="common">
                      <span class="name">开始时间</span>
                      <span class="value">06-06 09：35</span>
                    </div>
                    <el-divider direction="vertical"></el-divider>
                    <div class="common">
                      <span class="name">耗时时长</span>
                      <span class="value">24min</span>
                    </div>
                    <el-divider direction="vertical"></el-divider>
                    <div class="common">
                      <span class="name">数据总量</span>
                      <span class="value">1.2GB</span>
                    </div>
                    <el-divider direction="vertical"></el-divider>
                    <div class="common">
                      <span class="name">运行流程</span>
                      <span class="value">4</span>
                    </div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="applicationRunningData">
            <div class="nearestDataStatus">
              <div class="nearestDataStatusTitle">
                <span
                  style="
                    display: inline-block;
                    width: 5px;
                    height: 10px;
                    background-color: #2d8cf0;
                    border-radius: 5px;
                    margin-right: 5px;
                  "
                ></span>
                <span>最近数据状态</span>
                <span class="dataManager">数据管理 >></span>
              </div>
              <div class="nearestDataStatusContent">
                <div class="businessData common">
                  <el-image src="../../assets/img/用户-业务数据.png"></el-image>
                  <span class="commonDataName">业务数据</span>
                  <span class="commonDataNum">05</span>
                </div>
                <div class="processData common">
                  <el-image src="../../assets/img/用户-过程数据.png"></el-image>
                  <span class="commonDataName">过程数据</span>
                  <span class="commonDataNum">05</span>
                </div>
                <div class="achievementData common">
                  <el-image src="../../assets/img/用户-成果数据.png"></el-image>
                  <span class="commonDataName">成果数据</span>
                  <span class="commonDataNum">05</span>
                </div>
              </div>
            </div>
            <div class="dataContent">
              <div
                class="dataContentItem"
                v-for="(item, ind) in applicationData"
                :key="ind"
                @mouseleave="appDataMouseleave(ind)"
                @mouseenter="appDataMouseenter(ind)"
              >
                <div class="dataContentItemTop">
                  <el-image src="../../assets/img/用户-成果数png"></el-image>
                  <span style="margin-left: 10px; font-size: 12px; font-family: Microsoft YaHei; font-weight: bold">{{
                    item.appName
                  }}</span>
                  <span>——</span>
                  <span style="font-size: 12px; font-family: MicrosoftYaHei; font-weight: bold">{{
                    item.targetType
                  }}</span>
                  <span>——</span>
                  <span style="color: #267ff7; font-size: 12px; font-family: MicrosoftYaHei; font-weight: bold">{{
                    item.protocolType
                  }}</span>
                  <span
                    v-if="!item.checkInfo"
                    style="
                      position: absolute;
                      right: 15px;
                      font-size: 12px;
                      font-family: Microsoft YaHei;
                      font-weight: bold;
                      color: #ababab;
                    "
                    >{{ item.runTime }}</span
                  >
                  <span v-if="item.checkInfo" style="position: absolute; right: 15px"
                    ><el-button size="mini" type="primary">查看详情</el-button></span
                  >
                </div>
                <el-divider></el-divider>
                <div class="dataContentItemBottom">
                  <span style="color: #919191">详情：运行环境检测成功</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as echarts from "echarts";
interface ApplicationData {
  appName: string;
  targetType: string;
  protocolType: string;
  online: string;
  longitude: string;
  latitude: string;
  runTime: string;
  checkInfo: boolean;
}
const applicationData: ApplicationData[] = [
  {
    appName: "应用名称",
    targetType: "飞机",
    protocolType: "HTTP",
    online: "在线",
    longitude: "102",
    latitude: "23",
    runTime: "07 / 08 14：28",
    checkInfo: false,
  },
  {
    appName: "应用名称",
    targetType: "船",
    protocolType: "TCP",
    online: "在线",
    longitude: "122",
    latitude: "56",
    runTime: "07 / 08 14：28",
    checkInfo: false,
  },
  {
    appName: "应用名称",
    targetType: "汽车",
    protocolType: "UDP",
    online: "在线",
    longitude: "112",
    latitude: "43",
    runTime: "07 / 08 14：28",
    checkInfo: false,
  },
  {
    appName: "应用名称",
    targetType: "飞机",
    protocolType: "HTTP",
    online: "离线",
    longitude: "102",
    latitude: "23",
    runTime: "07 / 08 14：28",
    checkInfo: false,
  },
  {
    appName: "应用名称",
    targetType: "飞机",
    protocolType: "HTTP",
    online: "离线",
    longitude: "102",
    latitude: "23",
    runTime: "07 / 08 14：28",
    checkInfo: false,
  },
  {
    appName: "应用名称",
    targetType: "飞机",
    protocolType: "HTTP",
    online: "离线",
    longitude: "102",
    latitude: "23",
    runTime: "07 / 08 14：28",
    checkInfo: false,
  },
];
onMounted(() => {
  initResourceChart();
  initDataPieChart();
  initDataBarChart();
});
// const errorMouseenter = (index: number) => {
//   errorNotices[index].errorHandler = true;
// };
// const errorMouseleave = (index: number) => {
//   errorNotices[index].errorHandler = false;
// };
const appDataMouseleave = (index: number) => {
  applicationData[index].checkInfo = false;
};
const appDataMouseenter = (index: number) => {
  applicationData[index].checkInfo = true;
};
const initResourceChart = () => {
  let chartsResource = echarts.init(document.getElementById("chart-resource") as HTMLDivElement);
  chartsResource.setOption({
    series: [
      {
        radius: "90%",
        type: "gauge",
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            color: "#0072FF",
            borderColor: "#0072FF",
          },
        },
        axisLine: {
          lineStyle: {
            width: 16,
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 10,
        },
        data: [
          {
            value: 50,
            detail: {
              offsetCenter: ["0%", "-5%"],
            },
          },
        ],
        detail: {
          width: 100,
          height: 60,
          fontSize: 40,
          color: "#000000",
          formatter: "{value}",
        },
      },
    ],
  });
};
const initDataPieChart = () => {
  let pieChart = echarts.init(document.getElementById("pie-chart") as HTMLDivElement);
  pieChart.setOption({
    tooltip: {
      show: true,
    },
    xAxis: [
      {
        type: "category",
        show: false,
      },
    ],
    yAxis: [
      {
        type: "value",
        show: false,
      },
    ],
    series: [
      {
        type: "pie",
        radius: ["0%", "60%"],
        startAngle: [90],
        label: {
          normal: {
            position: "center",
            fontSize: 30,
            color: "#000000",
            lineHeight: 30,
            formatter: "{c}",
            show: true,
          },
          emphasis: {
            //中间文字显示
            show: true,
          },
        },
        lableLine: {
          normal: {
            show: true,
          },
          emphasis: {
            show: false,
          },
          tooltip: {
            show: false,
          },
        },
        data: [
          {
            value: 256,
            name: "数据总量",
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  type: "linear",
                  global: false,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#E4E8EB",
                    },
                    {
                      offset: 1,
                      color: "#E4E8EB",
                    },
                  ],
                },
              },
            },
          },
        ],
      },
      {
        type: "pie",
        radius: ["60%", "80%"],
        startAngle: [224],
        label: {
          normal: {
            position: "inner",
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [
          {
            value: 12314,
            name: "业务数据",
            itemStyle: {
              normal: {
                color: "#2377FE",
              },
            },
          },
          {
            value: 6412,
            name: "过程数据",
            itemStyle: {
              normal: {
                color: "#63F6EE",
              },
            },
          },
          {
            value: 6412,
            name: "成果数据",
            itemStyle: {
              normal: {
                color: "#FDCB65",
              },
            },
          },
        ],
      },
    ],
  });
};
const initDataBarChart = () => {
  let barChart = echarts.init(document.getElementById("bar-chart") as HTMLDivElement);
  barChart.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["业务数据", "过程数据", "成果数据"],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "直接访问",
        type: "bar",
        data: [150, 52, 200],
        barWidth: 24,
        itemStyle: {
          emphasis: {
            barBorderRadius: [10, 10, 0, 0],
          },
          normal: {
            barBorderRadius: [10, 10, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "#0177FF" },
              { offset: 1, color: "#00AAFF" },
            ]),
          },
        },
      },
    ],
  });
};
</script>

<style lang="less" scoped>
.applicationHome {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .applicationLeft {
    height: calc(100vh - 50px);
    width: 100%;
    padding: 15px;
    .applicationStatus {
      height: calc(45vh);
      .applicationStatusTitle {
        font-size: 16px;
        font-weight: bold;
        height: 40px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 15px;
      }
      .applicationStatusContent {
        display: flex;
        padding-bottom: 15px;
        height: calc(100% - 40px);
        .applicationStatusContentTotal {
          background: url("../../assets/img/用户-应用总数.png") no-repeat center;
          background-size: 100% 100%;
          height: calc(100%);
          width: calc(19%);
          margin-left: 15px;
          text-align: center;
          .applicationStatusContentTotalName {
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            margin-top: calc(40%);
          }
          .applicationStatusContentTotalNum {
            font-size: 54px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #ffffff;
            margin-top: calc(35%);
          }
        }
        .applicationStatusContentStatus {
          height: calc(100%);
          width: calc(38%);
          margin-left: 16px;
          .common {
            width: calc(100%);
            height: calc(47%);
          }
          .applicationStatusContentStatusRunning {
            background: url("../../assets/img/用户-运行中.png") no-repeat center;
            background-size: 100% 100%;
            position: relative;
          }
          .applicationStatusContentStatusFreeing {
            background: url("../../assets/img/用户-空闲.png") no-repeat center;
            background-size: 100% 100%;
            margin-top: 15px;
            position: relative;
          }
          .applicationStatusContentStatusError {
            background: url("../../assets/img/用户-异常.png") no-repeat center;
            background-size: 100% 100%;
            position: relative;
          }
          .applicationStatusContentStatusDown {
            background: url("../../assets/img/用户-下架.png") no-repeat center;
            background-size: 100% 100%;
            margin-top: 15px;
            position: relative;
          }
        }
        .statusName {
          position: absolute;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #000000;
          margin-top: calc(8%);
          margin-left: calc(10%);
        }
        .statusNum {
          position: absolute;
          font-size: 56px;
          font-family: AlibabaPuHuiTi;
          font-weight: 500;
          color: #000000;
          margin-top: calc(15%);
          margin-left: calc(10%);
        }
      }
    }
    .applicationInfo {
      margin-top: 15px;
      display: flex;
      height: calc(45vh);
      background: #f0f3f8;

      .title {
        font-size: 16px;
        font-weight: bold;
        height: 40px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 15px;
      }

      .resource {
        width: 65%;
        border-radius: 10px;
        background: #ffffff;
        display: flex;

        .left {
          width: 30%;
          height: 100%;

          .chart {
            height: 60%;

            #chart-resource {
              height: calc(100% - 40px);
              width: 80%;
              margin: auto;
            }

            .small-title {
              margin: 10px;
              width: 100%;
              height: 14px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: bold;
              color: #000000;
              line-height: 26px;
              text-align: center;
            }
          }

          .chart-info {
            height: calc(40% - 60px);
            margin-top: 20px;
            text-align: center;

            .info {
              .color1 {
                color: #2276ff;
              }

              .background1 {
                background: linear-gradient(0deg, #00aeff 0%, #0072ff 98%);
                box-shadow: 0px 3px 4px 0px rgba(14, 139, 243, 0.24);
              }

              .color2 {
                color: #ff8161;
              }

              .background2 {
                background: #ff8161;
                box-shadow: 0px 3px 4px 0px rgba(173, 173, 173, 0.24);
              }

              .icon {
                display: inline-block;
                width: 8px;
                height: 8px;

                border-radius: 4px;
              }

              .text {
                width: 25px;
                height: 12px;
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                margin-left: 5px;
                margin-right: 10px;
              }

              .num {
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #333333;
              }
            }
          }
        }

        .right {
          height: 100%;
          margin-left: 10px;
          width: calc(70% - 10px);

          .look-more {
            line-height: 40px;
            height: 40px;
            text-align: right;
            padding-right: 10px;
            color: #828282;
          }

          .menu {
            height: 60%;

            .menu-item {
              display: inline-block;
              width: calc(50% - 20px);
              height: calc(50% - 20px);

              .data1 {
                height: 30px;
                display: flex;
                line-height: 30px;
                position: relative;
                top: calc(50% - 15px);
                width: 95%;
                justify-content: space-between;

                .name {
                  margin-left: 60px;
                  font-size: 14px;
                  color: #444;
                }

                .number {
                  font-weight: bold;
                  color: #090909;
                  font-size: 18px;
                }
              }
            }

            .menu-item:nth-child(1) {
              margin-right: 20px;
              background: url(../../assets/img/userHome/主站.png) no-repeat center center;
              background-size: 100% 100%;
            }

            .menu-item:nth-child(2) {
              background: url(../../assets/img/userHome/L下变频.png) no-repeat center center;
              background-size: 100% 100%;
            }

            .menu-item:nth-child(3) {
              margin-right: 20px;
              margin-top: 20px;
              background: url(../../assets/img/userHome/某解调器.png) no-repeat center center;
              background-size: 100% 100%;
            }

            .menu-item:nth-child(4) {
              background: url(../../assets/img/userHome/服务器.png) no-repeat center center;
              background-size: 100% 100%;
            }
          }

          .operation {
            height: calc(40% - 60px);

            .operation-item {
              width: calc(33.333% - 20px);
              height: 100%;
              display: inline-block;
              text-align: center;
              cursor: pointer;

              span {
                position: relative;
                display: inline-block;
                height: 30px;
                line-height: 30px;
                top: calc(50% - 15px);
                left: 10px;
              }
            }

            .operation-item:nth-child(1) {
              margin-right: 20px;
              background: url(../../assets/img/userHome/新建资源.png) no-repeat center center;
              background-size: 100% 100%;
            }

            .operation-item:nth-child(1):hover {
              background: url(../../assets/img/userHome/新建资源-悬停.png) no-repeat center center;
              background-size: 100% 100%;
              color: #ffffff;
            }

            .operation-item:nth-child(2) {
              margin-right: 20px;
              background: url(../../assets/img/userHome/资源建模.png) no-repeat center center;
              background-size: 100% 100%;
            }

            .operation-item:nth-child(2):hover {
              background: url(../../assets/img/userHome/资源建模-悬停.png) no-repeat center center;
              background-size: 100% 100%;
              color: #ffffff;
            }

            .operation-item:nth-child(3) {
              background: url(../../assets/img/userHome/字典库.png) no-repeat center center;
              background-size: 100% 100%;
            }

            .operation-item:nth-child(3):hover {
              background: url(../../assets/img/userHome/字典库-悬停.png) no-repeat center center;
              background-size: 100% 100%;
              color: #ffffff;
            }
          }
        }
      }

      .data {
        margin-left: 15px;
        width: calc(35% - 15px);
        border-radius: 10px;
        background: #ffffff;

        .pie-chart {
          height: calc(50% - 40px);
          display: flex;
          .left {
            width: 50%;
          }

          .right {
            width: 50%;

            .data {
              width: 100%;
              display: flex;
              margin: 20px;
              height: 30px;

              .circle {
                width: 8px;
                height: 8px;
                margin: 12px;
                border-radius: 50%;
                background: red;
              }

              .name {
                width: 100px;
                height: 30px;
                line-height: 30px;
                color: #444;
              }
            }
          }
        }

        .bar-chart {
          height: calc(50% - 20px);
          margin-top: 20px;

          .title {
            width: 100%;
            display: flex;
            margin: 5px;
            height: 30px;

            .circle {
              width: 8px;
              height: 8px;
              margin: 12px;
              border-radius: 50%;
              background: red;
            }

            .name {
              width: 100px;
              height: 30px;
              line-height: 30px;
              color: #444;
            }
          }

          #bar-chart {
            height: calc(100% - 40px);
          }
        }
      }
    }

    .applicationStatusAndInfoClass {
      background-color: #ffffff;
      border-radius: 5px;
    }
  }
  .applicationRunning {
    background-color: #ffffff;
    height: calc(100vh - 50px);
    width: calc(100%);
    .applicationRunningTitle {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #000000;
      height: 60px;
      line-height: 60px;
      width: calc(100%);
      padding-left: 20px;
    }
    .applicationRunningContent {
      padding: 0px 20px 20px 20px;
      height: calc(25%);
      width: calc(100%);
      /deep/.el-carousel--horizontal {
        width: calc(100%);
        height: calc(100%) !important;
      }
      /deep/.el-carousel__container {
        width: calc(100%);
        height: calc(85%) !important;
      }
      /deep/.el-carousel__indicator--horizontal {
        padding: 25px 4px 0px 4px;
      }
      .applicationRunningInfo {
        height: calc(100%);
        width: calc(100%);
        background: url("../../assets/img/上架背景.png") no-repeat center;
        background-size: 100% 100%;
        .applicationRunningInfoTop {
          height: calc(70%);
          width: calc(100%);
          display: flex;
          align-items: center;
        }
        .applicationRunningInfoBottom {
          height: calc(30%);
          width: calc(100%);
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          /deep/.el-divider--vertical {
            background-color: #7dabff;
            height: 26px;
            width: 1px;
          }
          .common {
            height: calc(100%);
            width: calc(100%);
            display: grid;
            text-align: center;
            padding: 3px 0px;
            .name {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #b1ccff;
            }
            .value {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: bold;
              color: #ffffff;
            }
          }
        }
      }
    }
    .applicationRunningData {
      width: calc(100%);
      height: calc(100% - 25% - 60px);
      .nearestDataStatus {
        width: calc(100%);
        height: calc(15%);
        padding: 0px 20px 0px 20px;
        background-color: #f8f9fb;
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
          .common {
            width: calc(33%);
            height: calc(100%);
            display: flex;
            align-items: center;
            justify-content: left;
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
          /deep/.el-divider--horizontal {
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
</style>
>
