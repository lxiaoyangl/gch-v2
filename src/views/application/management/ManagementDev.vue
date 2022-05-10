<template>
  <div class="management">
    <div class="main-statisc">
      <div class="subassStatis">
        <div class="statisLeft">
          <div class="subassTypeImage">
            <img src="../../../assets/img/组件类型统计.png" />
            <span style="position: absolute; top: 30px; left: 66px; color: #fff">组件总量</span>
            <span style="position: absolute; top: 65px; left: 66px; color: #fff; font-size: 28px">215</span>
          </div>
          <div class="subassTypeCharts">
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
        <div class="statisRight">
          <div class="subassStatusImage">
            <img src="../../../assets/img/组件状态统计.png" />
            <span style="position: absolute; top: 30px; left: 66px; color: #fff">审批状态</span>
            <span style="position: absolute; top: 65px; left: 80px; color: #fff; font-size: 28px">6</span>
          </div>
          <div class="subassStatusCharts">
            <div ref="gaugeChart1" id="gaugeChart1" class="gaugeChart"></div>
            <div ref="gaugeChart2" id="gaugeChart2" class="gaugeChart"></div>
            <div ref="gaugeChart3" id="gaugeChart3" class="gaugeChart"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="main-head">
        <div class="main-head-left">
          <span>应用中心</span>
          <el-button type="primary" @click="handleAdd(item)">
            <i class="el-icon"><Plus /></i>应用开发
          </el-button>
        </div>
        <div class="main-head-right">
          <el-select style="width: 160px" v-model="allZT" placeholder="全部状态">
            <el-option v-for="item in ZToptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
          <el-select style="width: 160px" class="mlr10" v-model="allTP" placeholder="全部类型">
            <el-option v-for="item in TPoptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
          <el-input style="width: 250px" placeholder="输入应用名称或创建人" suffix-icon="Search" v-model="search_task">
          </el-input>
        </div>
      </div>
      <!-- <div class="main-box" v-for="(item, index) in allmain" :key="index">
        <div class="discl">
          <div>
            <el-button
              @click="handleChange(item.status)"
             
              class="starbtn"
              type="warning"
              >{{ item.status == 1 ? "停止应用" : "启动应用" }}</el-button
            >
            <div>
              <el-button size="small" type="danger">删 除</el-button>
              <el-button size="small" type="success" @click="handleEdit(item)"
                >管 理</el-button
              >
              <el-button size="small" type="primary">查 看</el-button>
            </div>
          </div>
        </div>
        <div class="box_head">
          <img
            :src="
              item.status == 1
                ? require('../../../assets/img/app-usable.png')
                : require('../../../assets/img/app-disabled.png')
            "
          />
          <div>
            <p>
              <span class="name">{{ item.name }}</span>
              <span>【{{ item.type }}】</span>
            </p>
            <p class="box-time">
              <span>创建人：{{ item.creator }}</span>
              <span>创建时间：{{ item.time }}</span>
            </p>
          </div>
        </div>
        <div class="box_main" :class="item.status == 1 ? 'bgc5e8' : 'bgcbfc'">
          <div>
            <div
              class="box_mainbox"
              :class="item.status == 1 ? 'bgc5e8' : 'bgcbfc'"
            >
              <img src="../../../assets/img/zyzy.png" />
              <span>资源占用</span>
              <span class="num">{{ item.resource }}</span>
            </div>
            <div
              class="box_mainbox"
              :class="item.status == 1 ? 'bgc5e8' : 'bgcbfc'"
            >
              <img src="../../../assets/img/rwsl.png" />
              <span>任务数量</span>
              <span class="num">{{ item.task }}</span>
            </div>
            <div
              class="box_mainbox"
              :class="item.status == 1 ? 'bgc5e8' : 'bgcbfc'"
            >
              <img src="../../../assets/img/slsl.png" />
              <span>实例数量</span>
              <span class="num">{{ item.instance }}</span>
            </div>
            <div
              class="box_mainbox"
              :class="item.status == 1 ? 'bgc5e8' : 'bgcbfc'"
            >
              <img src="../../../assets/img/sjsl.png" />
              <span>失败流程</span>
              <span class="num">{{ item.data }}</span>
            </div>
          </div>
        </div>
      </div> -->
      <div class="main-body">
        <div class="main-box" v-for="(item, index) in allmain" :key="index">
          <div
            class="application"
            :class="applicationBackGorundClass(item)"
            @mouseover="applicationClassMouseOver($event, item)"
            @mouseout="applicationClassMouseLeave($event, item)"
          >
            <div class="applicationDesc">
              <!-- <component :is="getStatusImageUrl(item)"></component> -->
              <img class="applicationImage" :src="getStatusImageUrl(item)" />
              <div style="margin-left: 30px">
                <div style="margin-top: 7px">
                  <span style="font-size: 16px; font-weight: bold; min-width: 70px">{{ item.name }}</span
                  ><span style="width: 90px; display: inline-block">【{{ item.type }}】</span>
                </div>
                <div class="applicationDescPadding" style="color: #d6d3d3">{{ item.desc }}</div>
              </div>
              <div style="position: absolute; right: 20px">
                <div v-if="item.status.indexOf('1-4') != 0" class="applicationDescButton" @click="handleAdd()">
                  查看详情
                </div>
                <div
                  v-if="item.status.indexOf('1-4') != 0 && item.status.indexOf('1-') >= 0"
                  class="applicationDevButton"
                  @click="handleAdd()"
                >
                  开发更新
                </div>
                <div v-if="item.status.indexOf('1-4') >= 0" class="applicationEorrButton" style="">立即处理</div>
              </div>
            </div>
            <div class="applicationBottom">
              <!-- <span><span style="color:#a5c9e8;">发布时间：</span>{{item.time}}</span>
              <span style="position: absolute;right: 30px;"><span style="color:#a5c9e8;">用户数：</span><span style="font-size: 16px;font-weight: bold;">{{item.userNum}}</span></span> -->
              <div class="applicationBottomDesc">
                <div class="header pd">开发者</div>
                <div class="body pd">李家发</div>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="applicationBottomDesc">
                <div class="header pd">部署时间</div>
                <div class="body pd">{{ item.time }}</div>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="applicationBottomDesc">
                <div class="header pd">组件数量</div>
                <div class="body pd">3</div>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="applicationBottomDesc">
                <div class="header pd">处理流程</div>
                <div class="body pd">2</div>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="applicationBottomDesc">
                <div class="header pd">用户数量</div>
                <div class="body pd">{{ item.userNum }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Ref, onMounted } from "vue";
import { ref, reactive } from "vue";
import { AllList, ChartData, ComponentContent } from "./types";

import Pagination from "../../../components/Pagination.vue";
import ysjImg from "../../../assets/img/已上架.png";
import xjImg from "../../../assets/img/下架.png";
import ysjycImg from "../../../assets/img/已上架异常.png";
import dspImg from "../../../assets/img/待审批.png";
import wtgImg from "../../../assets/img/未通过.png";
import { Plus } from "@element-plus/icons-vue";
import * as echarts from "echarts";
// 搜索框
let search_task: Ref<string> = ref("");
// 资源总量
let allList: AllList[] = reactive([
  {
    name: "解调器",
    num: 16,
    all: 20,
    color: "#4898fc",
  },
  {
    name: "译码",
    num: 4,
    all: 20,
    color: "#23d037",
  },
  {
    name: "帧解析",
    num: 12,
    all: 20,
    color: "#00ceeb",
  },
  {
    name: "规格",
    num: 4,
    all: 20,
    color: "#fd9f6c",
  },
  {
    name: "数据转换",
    num: 4,
    all: 20,
    color: "#fd9f6c",
  },
]);
let gaugeChartData: ChartData[] = [
  {
    val: 17,
    sColor: "#54B6FF",
    eColor: "#138FFF",
    title: "待审批",
    all: 20,
  },
  {
    val: 3,
    sColor: "#FF8C8D",
    eColor: "#FF5D5B",
    title: "未审批",
    all: 20,
  },
  {
    val: 8,
    sColor: "#FF8C8D",
    eColor: "#FF5D5B",
    title: "草稿箱",
    all: 20,
  },
];
// 下拉选项
let ZToptions = [
  {
    value: "1",
    label: "上架",
  },
  {
    value: "2",
    label: "下架",
  },
  {
    value: "3",
    label: "异常",
  },
  {
    value: "4",
    label: "未通过",
  },
];
let TPoptions = [
  {
    value: "1",
    label: "侦察",
  },
  {
    value: "2",
    label: "侦守",
  },
  {
    value: "2",
    label: "控守",
  },
];
let allZT: Ref<string> = ref("");
let allTP: Ref<string> = ref("");
//内容
let allmain: ComponentContent[] = [
  {
    name: "南海巡航",
    status: "1-1",
    type: "侦察",
    time: "2021-01-01",
    desc: "应用的一段描述",
    userNum: 50,
  },
  {
    name: "广西边防",
    status: "2-1",
    type: "侦守",
    time: "2021-01-01",
    desc: "应用的一段描述",
    userNum: 50,
  },
  {
    name: "西沙航巡",
    status: "1-2",
    type: "侦察",
    time: "2021-01-01",
    desc: "应用的一段描述",
    userNum: 20,
  },
  {
    name: "新疆边防",
    status: "1-3",
    type: "侦守",
    time: "2021-01-01",
    desc: "应用的一段描述",
    userNum: 30,
  },
  {
    name: "西藏边防",
    status: "1-4",
    type: "侦守",
    time: "2021-01-01",
    desc: "应用的一段描述",
    userNum: 40,
  },
  {
    name: "广西巡航",
    status: "2-1",
    type: "侦察",
    time: "2021-01-01",
    desc: "应用的一段描述",
    userNum: 60,
  },
  {
    name: "云南边防",
    status: "1-3",
    type: "控守",
    time: "2021-01-01",
    desc: "应用的一段描述",
    userNum: 80,
  },
  {
    name: "黑龙江边防",
    status: "1-4",
    type: "控守",
    time: "2021-01-01",
    desc: "应用的一段描述",
    userNum: 90,
  },
];
let num = 9999;
let applicationClass = {};
const router = useRouter();

const displ = (data: number) => {
  num = data;
};
const handleChange = (status: number) => {
  console.log(status);
};
const handleAdd = (item?: AllList) => {
  // let routeData = router.resolve({
  //   path: "/fidlddata",
  // });
  // window.open(routeData.href, "_blank");
  router.push({ path: "/fidlddata" });
};
const handleEdit = (item: AllList) => {
  let routeData = router.resolve({
    path: "/application/management/applicationManagement",
  });
  window.open(routeData.href, "_blank");
};
const gaugeChartFunc = (index: number, chartsData: ChartData) => {
  let val = 17;
  const gaugeChart = echarts.init(document.getElementById("gaugeChart" + index) as HTMLDivElement);
  let options = {
    title: {
      text: chartsData.title,
      bottom: "10",
      x: "center",
      borderColor: "#000",
      textStyle: {
        fontWeight: "normal",
        fontSize: 12,
        color: "#000",
      },
    },

    angleAxis: {
      show: false,
      max: (100 * 360) / 270, //-45度到225度，二者偏移值是270度除360度
      type: "value",
      startAngle: 225, //极坐标初始角度
      splitLine: {
        show: false,
      },
    },
    barMaxWidth: 14, //圆环宽度
    radiusAxis: {
      show: false,
      type: "category",
    },
    //圆环位置和大小
    polar: {
      center: ["50%", "50%"],
      radius: "110",
    },
    series: [
      {
        type: "bar",
        data: [
          {
            //上层圆环，显示数据
            value: (chartsData.val / chartsData.all) * 100,
            itemStyle: {
              color: {
                //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                type: "linear",
                x: 0,
                y: 0,
                x2: 1, //从左到右 0-1
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: chartsData.sColor,
                  },
                  {
                    offset: 1,
                    color: chartsData.eColor,
                  },
                ],
              },
            },
          },
        ],
        barGap: "-100%", //柱间距离,上下两层圆环重合
        coordinateSystem: "polar",
        roundCap: true, //顶端圆角从 v4.5.0 开始支持
        z: 2, //圆环层级，同zindex
      },
      {
        //下层圆环，显示最大值
        type: "bar",
        data: [
          {
            value: 100,
            itemStyle: {
              color: "#E0E3E8",
            },
          },
        ],
        barGap: "-100%",
        coordinateSystem: "polar",
        roundCap: true,
        z: 1,
      },
      //仪表盘
      {
        // name: "AQI",
        type: "gauge",
        startAngle: 225, //起始角度，同极坐标
        endAngle: -45, //终止角度，同极坐标
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLabel: {
          show: false,
        },
        pointer: {
          show: false,
        },
        title: {
          offsetCenter: [0, 0],
          color: "#0080FF",
          fontSize: 35,
          fontWeight: 500,
        },
        detail: {
          formatter: " ",
        },
        data: [
          {
            name: chartsData.val,
          },
        ],
      },
    ],
  };
  gaugeChart.setOption(options);
  window.addEventListener("resize", function () {
    gaugeChart.resize();
  });
};

//应用背景图片样式
const applicationBackGorundClass = (item: ComponentContent) => {
  if (item.status.indexOf("1-") >= 0) {
    return {
      applicationUp: true,
    };
  }
  if (item.status.indexOf("2-") >= 0) {
    return {
      applicationDown: true,
    };
  }
};
const getStatusImageUrl = (item: ComponentContent) => {
  //上架
  if (item.status == "1-1") {
    return ysjImg;
  }
  //下架
  if (item.status == "2-1") {
    return xjImg;
  }
  //待审批
  if (item.status == "1-2") {
    return dspImg;
  }
  //未通过
  if (item.status == "1-3") {
    return wtgImg;
  }
  //已上架异常
  if (item.status == "1-4") {
    return ysjycImg;
  }
};
const applicationClassMouseOver = (e: Event, item: ComponentContent) => {
  if (item.status.indexOf("1-") >= 0) {
    e.currentTarget.className = "application applicationUpMouse";
  }
  if (item.status.indexOf("2-") >= 0) {
    e.currentTarget.className = "application applicationDownMouse";
  }
};
const applicationClassMouseLeave = (e: Event, item: ComponentContent) => {
  if (item.status.indexOf("1-") >= 0) {
    e.currentTarget.className = "application applicationUp";
  }
  if (item.status.indexOf("2-") >= 0) {
    e.currentTarget.className = "application applicationDown";
  }
};
onMounted(() => {
  for (let i = 0; i < gaugeChartData.length; i++) {
    gaugeChartFunc(i + 1, gaugeChartData[i]);
  }
});
</script>

<style lang="less" scoped>
.pagebtn {
  width: 50px;
}
.management {
  // padding: 20px;
  height: 100%;
  width: 100%;
  // margin: 15px;
  // background: white;
  .main-statisc {
    margin-bottom: 20px;
    .subassStatis {
      height: 125px;
      width: 100%;
      display: flex;
      .statisLeft {
        width: 50%;
        position: relative;
        display: flex;
        .subassTypeImage {
          background-color: #fff;
        }
        .subassTypeCharts {
          display: flex;
          flex-wrap: wrap;
          background-color: #fff;
          width: 100%;
          .item {
            display: flex;
            flex-direction: column;
            flex: 0 0 33%;
            height: 50%;
            padding-right: 30px;
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
      .statisRight {
        width: 50%;
        position: relative;
        display: flex;
        .subassStatusImage {
          background-color: #fff;
        }
        .subassStatusCharts {
          background-color: #fff;
          width: 100%;
          display: flex;
          // line-height: 125px;
          .gaugeChart {
            width: 185px;
            height: 125px;
          }
        }
      }
    }
  }
  .main-content {
    display: flex;
    flex-wrap: wrap;
    height: calc(100% - 85px);
    background-color: #fff;
    .main-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 50px;
      background-color: #fff;
      padding: 0 15px;
      border-bottom: 1px solid #f8f9fa;
      width: 100%;
      .main-head-left {
        line-height: 30px;
        height: 30px;
        span {
          margin-right: 10px;
        }
      }
      .main-head-right {
        display: flex;
      }
    }
    .main-body {
      display: flex;
      flex-wrap: wrap;
      padding-right: 20px;
      .main-box {
        margin-left: 20px;
        margin-top: 20px;
        .application {
          width: calc(23vw);
          height: 152px;
          position: relative;
          color: #fff;
          .applicationDesc {
            display: flex;
            height: 100px;
            padding: 20px;
            .applicationImage {
              width: 60px;
              height: 60px;
            }
            .applicationDescPadding {
              margin-top: 20px;
            }
            .applicationDescButton {
              color: #9d9dff;
              width: 84px;
              height: 30px;
              line-height: 30px;
              text-align: center;
            }

            .applicationDevButton {
              color: #26e426;
              width: 84px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              margin-top: 10px;
            }
            .applicationEorrButton {
              color: #ee5195;
              width: 84px;
              height: 30px;
              line-height: 30px;
              text-align: center;
            }
          }
          .applicationBottom {
            height: 50px;
            padding: 20px;
            display: flex;
            align-items: center;
            .applicationBottomDesc {
              text-align: center;
              .header {
                color: #6c83c3;
                padding-bottom: 5px;
                font-weight: bold;
              }
              .body {
                padding-top: 5px;
                font-weight: bold;
              }
              .pd {
              }
            }
          }
        }
        .application:hover .applicationDescButton {
          color: #fff;
          background: rgb(87, 87, 239);
          border-radius: 10px;
          cursor: pointer;
        }
        .application:hover .applicationDevButton {
          color: #fff;
          background: #26e426;
          border-radius: 10px;
          cursor: pointer;
        }
        .application:hover .applicationEorrButton {
          color: #fff;
          background: #ee5195;
          border-radius: 10px;
          cursor: pointer;
        }
        .applicationUp {
          background: url("../../../assets/img/上架背景.png") no-repeat center;
          background-size: 100% 100%;
        }
        .applicationUpMouse {
          background: url("../../../assets/img/上架背景鼠标.png") no-repeat center;
          background-size: 100% 100%;
          //filter:progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);
          //-moz-box-shadow: 1px 1px 10px #909090;
          //-webkit-box-shadow: 1px 1px 10px #909090;
          //box-shadow:1px 1px 10px #909090;
        }
        .applicationDown {
          background: url("../../../assets/img/下架背景.png") no-repeat center;
          background-size: 100% 100%;
        }
        .applicationDownMouse {
          background: url("../../../assets/img/下架背景鼠标.png") no-repeat center;
          background-size: 100% 100%;
          //filter:progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);
          //-moz-box-shadow: 1px 1px 10px #909090;
          //-webkit-box-shadow: 1px 1px 10px #909090;
          //box-shadow:1px 1px 10px #909090;
        }
      }
    }

    // padding: 10px;
    // .main-box {
    //   display: flex;
    //   background-color: #fff;
    //   flex-direction: column;
    //   width: calc(20% - 10px);
    //   height: calc(25% - 10px);
    //   padding: 15px;
    //   border-radius: 4px;
    //   margin: 5px;
    //   position: relative;
    //   &:nth-child(5n) {
    //     margin-right: 0;
    //   }
    //   &:hover {
    //     .discl {
    //       display: flex;
    //     }
    //   }
    //   .discl {
    //     border-radius: 4px;
    //     display: none;
    //     border: 1px solid #8db4fc;
    //     position: absolute;
    //     left: 0;
    //     top: 0;
    //     justify-content: center;
    //     align-items: center;
    //     width: 100%;
    //     height: 100%;
    //     z-index: 9;
    //     background: rgba(26, 29, 33, 80%);
    //     > div {
    //       display: flex;
    //       flex-direction: column;
    //       align-items: center;
    //     }
    //     .starbtn {
    //       width: 120px;
    //       margin-bottom: 15px;
    //     }
    //   }
    //   .box_head {
    //     display: flex;
    //     align-items: center;
    //     margin-bottom: 10px;
    //     font-size: 12px;
    //     img {
    //       margin-right: 20px;
    //     }
    //     > div {
    //       width: 100%;
    //       .name {
    //         margin-right: 10px;
    //         font-size: 14px;
    //         font-weight: bold;
    //       }
    //       .box-time {
    //         display: flex;
    //         width: 100%;
    //         margin-top: 10px;
    //         justify-content: space-between;
    //         color: #b1aeae;
    //       }
    //     }
    //   }
    //   .box_main {
    //     flex: 1;
    //     padding: 10px 15px;
    //     border-radius: 5px;
    //     > div {
    //       display: flex;
    //       flex-wrap: wrap;
    //       // background: #7186a7;
    //       justify-content: space-between;
    //       overflow: hidden;
    //       background-color: #ccd3dd;
    //       height: 100%;
    //       color: #fff;
    //     }
    //     .box_mainbox {
    //       font-size: 12px;
    //       width: calc(50% - 0.5px);
    //       height: calc(50% - 0.5px);
    //       display: flex;
    //       padding: 0 10px;
    //       align-items: center;
    //       justify-content: space-around;
    //       &:nth-child(3),
    //       &:nth-child(4) {
    //         align-self: flex-end;
    //       }
    //       .num {
    //         font-size: 20px;
    //       }
    //     }
    //   }
    // }
  }
  :deep(.el-pagination) {
    background-color: #ffffff;
  }
}
</style>
