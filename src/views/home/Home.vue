<template>
  <div class="home">
    <div class="date">欢迎回来，今日 {{ date }}。</div>
    <div class="card-container">
      <div class="card" v-for="(card, i) in cardList" :key="i">
        <div class="title">{{ card.title }}</div>
        <div class="b-content circle" v-if="card.id == 3 || card.id == 6">
          <div class="left">
            <div class="num">
              {{ card.data.num }}
              <div class="name">{{ card.data.name }}</div>
            </div>
          </div>
          <div class="right">
            <div class="item" v-for="(item, i) in card.data.msgData" :key="i">
              <div class="name">{{ item.name }}</div>
              <div class="num">
                {{ item.num }} <span class="c999">{{ item.unit }} </span>
              </div>
            </div>
          </div>
        </div>
        <div class="b-content components" v-if="card.id == 4">
          <div class="left">
            <div class="num">
              <span>{{ card.data.num }}</span>
              <div class="name">{{ card.data.name }}</div>
            </div>
          </div>
          <div class="right">
            <div class="item" v-for="(item, i) in card.data.msgData" :key="i">
              <div class="name dfc">
                <img width="34" class="mr5" :src="item.img" alt="" />
                <span>{{ item.name }}</span>
              </div>
              <div class="num">
                {{ item.num }} <span class="c999">{{ item.unit }} </span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="b-content chart"
          v-if="card.id == 1 || card.id == 2 || card.id == 5"
        >
          <Chart class="left" :chartData="card.data.chartData" />
          <div
            class="right"
            :class="card.id == 1 ? 'resource' : card.id == 2 ? 'err' : ''"
          >
            <div class="item" v-for="(item, i) in card.data.msgData" :key="i">
              <div class="name dfc">
                <img width="34" class="mr5" :src="item.img" alt="" />
                <span>{{ item.name }}</span>
              </div>
              <div class="num">
                {{ item.num }} <span class="c999">{{ item.unit }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "./comp/Pie";
export default {
  components: {
    Chart,
  },
  data() {
    return {
      date: null,
      cardList: [
        {
          id: 1,
          title: "资 源",
          data: {
            chartData: {
              name: "资源总数",
              all: 10,
              data: [
                {
                  value: 5,
                  name: "在线",
                  itemStyle: {
                    borderCap: "round",
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#0072FF",
                        },
                        {
                          offset: 1,
                          color: "#00ACFE",
                        },
                      ],
                    },
                  },
                },
                {
                  value: 5,
                  name: "离线",
                  itemStyle: {
                    color: "#F1F6F6",
                  },
                },
              ],
            },
            msgData: [
              {
                state: 1,
                name: "主站",
                num: 1,
                img: require("../../assets/img/1.png"),
              },
              {
                state: 1,
                name: "L下变频器",
                num: 2,
                img: require("../../assets/img/2.png"),
              },
              {
                state: 2,
                name: "解调器",
                num: 4,
                img: require("../../assets/img/3.png"),
              },
              {
                state: 2,
                name: "通用服务器",
                num: 3,
                img: require("../../assets/img/4.png"),
              },
            ],
          },
        },
        {
          id: 2,
          title: "异 常",
          data: {
            chartData: {
              name: "异常总数",
              all: 100,
              data: [
                {
                  value: 10,
                  name: "在线",
                  lable: {
                    show: true,
                  },
                  itemStyle: {
                    color: "#FF6E61",
                  },
                },
                {
                  value: 100 - 10,
                  name: "",
                  itemStyle: {
                    color: "#F1F6F6",
                  },
                  // lable: {
                  //   show: true,
                  // },
                  // lableLine: {
                  //   lineStyle: {
                  //     color: "#fff",
                  //     // color: "transparent",
                  //   },
                  // },
                },
              ],
            },
            msgData: [
              {
                state: 0,
                name: "最近服务器离线数",
                num: 5,
                img: require("../../assets/img/5.png"),
              },
              {
                state: 0,
                name: "最近失败任务数",
                num: 4,
                img: require("../../assets/img/6.png"),
              },
            ],
          },
        },
        {
          id: 3,
          title: "应 用",
          data: {
            num: 50,
            name: "应用总数",
            msgData: [
              {
                name: "目 标",
                num: 6,
                unit: "个",
              },
              {
                name: "信 号",
                num: 7,
                unit: "个",
              },
              {
                name: "解 调",
                num: 23,
                unit: "个",
              },
              {
                name: "信 源",
                num: 12,
                unit: "个",
              },
            ],
          },
        },
        {
          id: 4,
          title: "组 件",
          data: {
            name: "组件总数",
            num: 100,
            msgData: [
              {
                state: 0,
                name: "目标类型",
                num: 4,
                img: require("../../assets/img/7.png"),
              },
              {
                state: 0,
                name: "译 码",
                num: 4,
                img: require("../../assets/img/8.png"),
              },
              {
                state: 0,
                name: "帧解析",
                num: 4,
                img: require("../../assets/img/9.png"),
              },
              {
                state: 0,
                name: "解调规格",
                num: 4,
                img: require("../../assets/img/10.png"),
              },
              {
                state: 0,
                name: "数据转化",
                num: 4,
                img: require("../../assets/img/11.png"),
              },
            ],
          },
        },
        {
          id: 5,
          title: "应用状态",
          data: {
            chartData: {
              name: "应用状态",
              all: 50,
              data: [
                {
                  value: 5,
                  name: "启动",
                  itemStyle: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#0073FE",
                        },
                        {
                          offset: 1,
                          color: "#00ADFE",
                        },
                      ],
                    },
                  },
                },
                {
                  value: 3,
                  name: "停止",
                  itemStyle: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#F7B447",
                        },
                        {
                          offset: 1,
                          color: "#FDA52F",
                        },
                      ],
                    },
                  },
                },
                {
                  value: 5,
                  name: "运行中",
                  itemStyle: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#11D571",
                        },
                        {
                          offset: 1,
                          color: "#19DE97",
                        },
                      ],
                    },
                  },
                },
                {
                  value: 3,
                  name: "失败",
                  itemStyle: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#FF6867",
                        },
                        {
                          offset: 1,
                          color: "#F87363",
                        },
                      ],
                    },
                  },
                },
              ],
            },
            msgData: [
              {
                state: 0,
                name: "启 动",
                num: 4,
                img: require("../../assets/img/12.png"),
              },
              {
                state: 0,
                name: "停 止",
                num: 1,
                img: require("../../assets/img/13.png"),
              },
              {
                state: 0,
                name: "失 败",
                num: 1,
                img: require("../../assets/img/14.png"),
              },
              {
                state: 0,
                name: "运行中",
                num: 1,
                img: require("../../assets/img/15.png"),
              },
            ],
          },
        },
        {
          id: 6,
          title: "接入网",
          data: {
            name: "接入网数量",
            num: 4,
            msgData: [
              {
                name: "话务类型",
                num: 1,
                unit: "个",
              },
              {
                name: "视频类型",
                num: 1,
                unit: "个",
              },
              {
                name: "数据传输类型",
                num: 1,
                unit: "个",
              },
              {},
            ],
          },
        },
      ],
    };
  },
  created() {
    let time = new Date();

    let week = time.getDay();
    switch (week) {
      case 1:
        week = "一";
        break;
      case 2:
        week = "二";
        break;
      case 3:
        week = "三";
        break;
      case 4:
        week = "四";
        break;
      case 5:
        week = "五";
        break;
      case 6:
        week = "六";
        break;
      default:
        week = "日";
        break;
    }
    this.date = `${time.getFullYear()}年${time.getMonth()}月${time.getDate()}日 周${week}`;
  },
};
</script>
<style lang="less" scoped>
.home {
  padding: 20px;
  height: 100%;
  width: 100%;
  .date {
  }
  .card-container {
    display: flex;
    flex-wrap: wrap;
    height: calc(100% - 15px);
    .card {
      background-color: #fff;
      margin-top: 20px;
      padding: 20px;
      width: calc(50% - 10px);
      height: 30%;
      box-shadow: 0 0 3px #a1a1a1;
      &:nth-child(2n) {
        margin-left: 20px;
      }
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      .b-content {
        height: calc(100% - 16px);
        display: flex;
        .left {
          flex: 0 0 40%;
          height: 100%;
        }
        .right {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 16px;
            border-radius: 4px;
            width: calc(50% - 6px);
            height: calc(30% - 4px);
            background-color: #f1f2f7;
            padding: 0 20px 0 10px;
            .name {
              font-size: 16px;
              font-weight: 600;
            }
            .num {
              font-size: 18px;
              font-weight: 600;
            }
          }
        }
        &.circle {
          .left {
            display: flex;
            flex-direction: column;
            align-items: center;
            .num {
              // flex: 0 0 150px;
              // width: 150px;

              height: 18vh;
              width: 18vh;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #e6eaf5;
              font-size: 26px;
              font-weight: bold;
              // margin-bottom: 10px;
              flex-direction: column;
            }
            .name {
              font-size: 14px;
              margin-top: 10px;
              font-weight: normal;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
          .right {
            background-color: #e6eaf3;
            .item {
              width: calc(50% - 1px);
              height: calc(50% - 1px);
              background-color: #fff;
              padding: 0 30px 0 20px;
              &:nth-child(3),
              &:nth-child(4) {
                align-self: flex-end;
              }
            }
          }
        }
        &.components {
          .left {
            display: flex;
            flex-direction: column;
            align-items: center;
            .num {
              height: 18vh;
              width: 18vh;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #e6eaf5;
              font-size: 26px;
              font-weight: bold;
              // margin-bottom: 10px;
              flex-direction: column;
            }
            .name {
              font-size: 14px;
              margin-top: 10px;
              font-weight: normal;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
          .right {
            .item {
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 16px;
              border-radius: 4px;
              width: calc(50% - 6px);
              height: calc(30% - 4px);
              background-color: #f1f2f7;
              padding: 0 20px 0 10px;
              .num {
                font-size: 20px;
              }
            }
          }
        }
        &.chart {
          .left {
          }
          .right {
            .item {
              height: calc(50% - 20px);
            }
            &.resource {
              .item {
                height: calc(50% - 20px);
                &:nth-child(1),
                &:nth-child(2) {
                  background-color: #ebf4fb;
                  border: 1px solid #abc6fb;
                }
                &:nth-child(3),
                &:nth-child(4) {
                  background-color: #ebfede;
                  border: 1px solid #b1e495;
                }
                .num {
                  color: #0383f1;
                }
              }
            }
            &.err {
              .item {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>