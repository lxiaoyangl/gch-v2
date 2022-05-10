<template>
  <div class="home">
    <div class="box">
      <div class="box-item">
        <el-row>
          <el-col :span="8">
            <div class="common-title">应用</div>
            <div class="image-data">
              <div class="application-total-title">应用总数</div>
              <div class="application-total-total">26</div>
            </div>
          </el-col>
          <el-col :span="16">
            <el-row class="right-top">
              <el-col :span="8">
                <div>
                  <span class="circle circle-color1">.</span
                  ><span class="info-text">最近上架</span>
                </div>
                <div class="right-top-num">
                  <span class="num">34</span>
                  <img
                    class="img"
                    src="../../assets/img/operationHome/上架.png"
                  />
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <span class="circle circle-color2">.</span
                  ><span class="info-text">最近下架</span>
                </div>
                <div>
                  <span class="num">34</span
                  ><img
                    class="img"
                    src="../../assets/img/operationHome/下架.png"
                  />
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <span class="circle circle-color3">.</span
                  ><span class="info-text">最近授权</span>
                </div>
                <div>
                  <span class="num">16</span
                  ><img
                    class="img"
                    src="../../assets/img/operationHome/授权.png"
                  />
                </div>
              </el-col>
            </el-row>

            <div class="service">
              <div class="service-item app">
                <div class="title">目 标</div>
                <div class="num">03</div>
                <el-progress
                  class="progress"
                  :percentage="50"
                  :stroke-width="5"
                  :show-text="false"
                  color="#FF6767"
                ></el-progress>
                <div class="exception">
                  <span class="left">01</span>
                  <span class="right">异常应用</span>
                </div>
              </div>
              <div class="service-item app">
                <div class="title">信 号</div>
                <div class="num">12</div>
                <el-progress
                  class="progress"
                  :percentage="50"
                  :stroke-width="5"
                  :show-text="false"
                  color="#FF6767"
                ></el-progress>
                <div class="exception">
                  <span class="left">--</span>
                  <span class="right"></span>
                </div>
              </div>
              <div class="service-item app">
                <div class="title">信 源</div>
                <div class="num">06</div>
                <el-progress
                  class="progress"
                  :percentage="50"
                  :stroke-width="5"
                  :show-text="false"
                  color="#FF6767"
                ></el-progress>
                <div class="exception">
                  <span class="left">02</span>
                  <span class="right"></span>
                </div>
              </div>
              <div class="service-item app">
                <div class="title">解 调</div>
                <div class="num">05</div>
                <el-progress
                  class="progress"
                  :percentage="50"
                  :stroke-width="5"
                  :show-text="false"
                  color="#FF6767"
                ></el-progress>
                <div class="exception">
                  <span class="left">02</span>
                  <span class="right"></span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="box-item user">
        <div class="left">
          <el-row>
            <el-col class="common-title" :span="24">用户</el-col>
            <el-col :span="24">
              <div class="charts-user" id="chart-user">图表</div>
              <div class="small-title">用户总数</div>
            </el-col>
            <el-col :span="24" class="userinfo">
              <div class="info">
                <span class="icon-ordinary"></span
                ><span class="info-text">普通用户：164人</span>
              </div>
              <div class="info">
                <span class="icon-dev"></span
                ><span class="info-text"
                  >开发用户：164人 （应用36 / 组件36）</span
                >
              </div>
              <div class="info">
                <span class="icon-online"></span
                ><span class="info-text">在线用户：120人</span>
                <span class="icon-outline"></span
                ><span class="info-text">离线用户：120人</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="right">
          <el-row>
            <el-col :span="24" class="common-title">通知消息</el-col>
            <el-col :span="24" class="content">
              <el-row :gutter="0">
                <el-col :span="3" class="left-title left-title-color1">
                  <div class="text">审<br />批</div>
                </el-col>
                <el-col :span="6">
                  <div class="item">
                    <img
                      class="icon"
                      src="../../assets/img/operationHome/审批-应用.png"
                    />
                    <div class="button">去审批</div>
                    <div class="num color1">12</div>
                  </div>
                </el-col>
                <el-col :span="1"><div class="line"></div></el-col>
                <el-col :span="6">
                  <div class="item">
                    <img
                      class="icon"
                      src="../../assets/img/operationHome/审批-组件.png"
                    />
                    <div class="button">组件</div>
                    <div class="num color1">08</div>
                  </div>
                </el-col>
                <el-col :span="1"><div class="line"></div></el-col>
                <el-col :span="6">
                  <div class="item">
                    <img
                      class="icon"
                      src="../../assets/img/operationHome/审批-资源.png"
                    />
                    <div class="button">资源图</div>
                    <div class="num color1">54</div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="24" class="split-line"></el-col>
            <el-col :span="24" class="content">
              <el-row :gutter="0">
                <el-col :span="3" class="left-title left-title-color2"
                  ><div class="text">异<br />常</div></el-col
                >
                <el-col :span="6">
                  <div class="item">
                    <img
                      class="icon"
                      src="../../assets/img/operationHome/资源异常.png"
                    />
                    <div class="button">资源异常</div>
                    <div class="num color2">12</div>
                  </div>
                </el-col>
                <el-col :span="1"><div class="line"></div></el-col>
                <el-col :span="6">
                  <div class="item">
                    <img
                      class="icon"
                      src="../../assets/img/operationHome/应用异常1.png"
                    />
                    <div class="button">应用异常</div>
                    <div class="num color3">08</div>
                  </div>
                </el-col>
                <el-col :span="1"><div class="line"></div></el-col>
                <el-col :span="6">
                  <div class="item">
                    <img
                      class="icon"
                      src="../../assets/img/operationHome/组件异常.png"
                    />
                    <div class="button">组件异常</div>
                    <div class="num color4">--</div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="box-item">
        <el-row>
          <el-col :span="8">
            <div class="common-title">组件</div>
            <div class="image-data3">
              <div class="application-total-title">组件总数</div>
              <div class="application-total-total">15</div>
            </div>
          </el-col>
          <el-col :span="16">
            <el-row class="right-top">
              <el-col :span="8">
                <div>
                  <span class="circle circle-color1">.</span
                  ><span class="info-text">最近上架</span>
                </div>
                <div>
                  <span class="num">34</span
                  ><img
                    class="img"
                    src="../../assets/img/operationHome/上架.png"
                  />
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <span class="circle circle-color2">.</span
                  ><span class="info-text">最近下架</span>
                </div>
                <div>
                  <span class="num">34</span
                  ><img
                    class="img"
                    src="../../assets/img/operationHome/下架.png"
                  />
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <span class="circle circle-color3">.</span
                  ><span class="info-text">最近授权</span>
                </div>
                <div>
                  <span class="num">16</span
                  ><img
                    class="img"
                    src="../../assets/img/operationHome/授权.png"
                  />
                </div>
              </el-col>
            </el-row>

            <div class="service">
              <div class="service-item component">
                <div class="title">目标类型</div>
                <div class="num">03</div>
                <el-progress
                  class="progress"
                  :percentage="50"
                  :stroke-width="5"
                  :show-text="false"
                  color="#FF6767"
                ></el-progress>
                <div class="exception">
                  <span class="left">01</span>
                  <span class="right">异常应用</span>
                </div>
              </div>
              <div class="service-item component">
                <div class="title">译 码</div>
                <div class="num">12</div>
                <el-progress
                  class="progress"
                  :percentage="50"
                  :stroke-width="5"
                  :show-text="false"
                  color="#FF6767"
                ></el-progress>
                <div class="exception">
                  <span class="left">--</span>
                  <span class="right"></span>
                </div>
              </div>
              <div class="service-item component">
                <div class="title">帧解析</div>
                <div class="num">06</div>
                <el-progress
                  class="progress"
                  :percentage="50"
                  :stroke-width="5"
                  :show-text="false"
                  color="#FF6767"
                ></el-progress>
                <div class="exception">
                  <span class="left">02</span>
                  <span class="right"></span>
                </div>
              </div>
              <div class="service-item component">
                <div class="title">解调规格</div>
                <div class="num">05</div>
                <el-progress
                  class="progress"
                  :percentage="50"
                  :stroke-width="5"
                  :show-text="false"
                  color="#FF6767"
                ></el-progress>
                <div class="exception">
                  <span class="left">02</span>
                  <span class="right"></span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="box-item resource">
        <el-row class="title-box">
          <el-col :span="22" class="title">资源</el-col>
          <el-col :span="2" class="resource-admin-link">资源管理>></el-col>
        </el-row>

        <el-row>
          <el-col :span="7">
            <div class="charts-resource" id="chart-resource"></div>
            <div class="small-title">资源总数</div>
            <div class="chart-info">
              <div class="info">
                <span class="icon background1"></span
                ><span class="text color1">在线</span
                ><span class="num">05</span>
              </div>
              <div class="info">
                <span class="icon background2"></span
                ><span class="text color2">离线</span
                ><span class="num">05</span>
              </div>
            </div>
          </el-col>
          <el-col :span="17" class="resource-content">
            <el-row>
              <el-col :span="12" class="resource-content-item">
                <div class="text">主站</div>
                <div class="num">02</div>
              </el-col>
              <el-col :span="12" class="resource-content-item">
                <div class="text">L-下变频</div>
                <div class="num">03</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="resource-content-item">
                <div class="text">某解调器</div>
                <div class="num">03</div>
              </el-col>
              <el-col :span="12" class="resource-content-item">
                <div class="text">服务器</div>
                <div class="num">03</div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.initUserChart();
    this.initResourceChart();
  },
  methods: {
    initUserChart: function () {
      let chartsUser = this.$echarts.init(
        document.getElementById("chart-user")
      );
      chartsUser.setOption({
        //backgroundColor: '#ffffff',
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
            radius: ["0%", "50%"],
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
                name: "用户总数",
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
            radius: ["30%", "50%"],
            startAngle: [90],
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
                value: 7213,
                name: "在线用户",
                itemStyle: {
                  normal: {
                    color: "#45E3DD",
                  },
                },
              },
              {
                value: 6412,
                name: "离线用户",
                itemStyle: {
                  normal: {
                    color: "#19E09C",
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
                name: "普通用户",
                itemStyle: {
                  normal: {
                    color: "#0072FF",
                  },
                },
              },
              {
                value: 6412,
                name: "开发用户",
                itemStyle: {
                  normal: {
                    color: "#F9C75C",
                  },
                },
              },
            ],
          },
        ],
      });
    },
    initResourceChart: function () {
      let chartsResource = this.$echarts.init(
        document.getElementById("chart-resource")
      );
      chartsResource.setOption({
        series: [
          {
            radius: "100%",
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
    },
  },
};
</script>
<style lang="less" scoped>
.common-title {
  height: 26px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #000000;
  line-height: 26px;
  margin: 20px;
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

.box {
  height: calc(100vh - 50px);
  width: aclc(100vh);

  .box-item {
    display: inline-block;
    height: calc(50% - 32px);
    width: calc(50% - 32px);
    background: #ffffff;
    border-radius: 8px;
    margin-left: 20px;

    &:nth-child(1) {
      margin-top: 20px;
    }
    &:nth-child(3) {
      margin-top: 20px;
    }

    .image-data {
      height: 35vh;
      margin: 20px;
      background: url(../../assets/img/operationHome/应用总数.png) no-repeat top
        center;
      background-size: 100% auto;
      border-radius: 15px;
    }

    .image-data3 {
      height: 35vh;
      margin: 20px;
      background: url(../../assets/img/operationHome/组件总数.png) no-repeat top
        center;
      background-size: 100% auto;
      border-radius: 15px;
    }

    .application-total-title {
      display: block;
      width: 100%;
      height: 40px;
      text-align: center;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
      line-height: 22px;
      position: relative;
      top: 30%;
    }

    .application-total-total {
      position: relative;
      top: 52%;
      text-align: center;
      display: block;
      width: 100%;
      height: 40px;

      font-size: 48px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
      line-height: 48px;
    }

    .right-top {
      background: linear-gradient(90deg, #f6f7f8 0%, #f8f9fb 100%);
      border-radius: 3px;
      margin-top: 50px;
      margin-right: 10px;
      display: flex;
      height: 10vh;
      padding: 10px;

      .right-top-num {
        height: 26px;
        line-height: 26px;
      }

      .circle {
        display: inline-block;
        width: 8px;
        height: 8px;

        box-shadow: 0px 2px 3px 0px rgba(34, 118, 255, 0.23);
        border-radius: 4px;
      }

      .circle-color1 {
        color: #0078ff;
        background: #0078ff;
      }
      .circle-color2 {
        color: #919191;
        background: #919191;
      }
      .circle-color3 {
        color: #62daa0;
        background: #62daa0;
      }

      .info-text {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #818181;
        line-height: 26px;
        margin-left: 10px;
      }

      .num {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #2f3135;
        line-height: 26px;
        height: 26px;
        display: inline-block;
        vertical-align: middle;
        margin-top: 10px;
      }

      .img {
        margin-left: 10px;
        height: 26px;
        width: 26px;
        vertical-align: middle;
        margin-top: 10px;
      }

      .el-col {
        text-align: center;
        justify-content: center;
        align-items: center;
      }
    }

    .service {
      height: 25vh;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      .app {
        &:nth-child(1) {
          background: url(../../assets/img/operationHome/目标.png) no-repeat
            center center;
        }
        &:nth-child(2) {
          background: url(../../assets/img/operationHome/信号.png) no-repeat
            center center;
        }
        &:nth-child(3) {
          background: url(../../assets/img/operationHome/信源.png) no-repeat
            center center;
        }
        &:nth-child(4) {
          background: url(../../assets/img/operationHome/解调.png) no-repeat
            center center;
        }
      }

      .component {
        &:nth-child(1) {
          background: url(../../assets/img/operationHome/目标类型.png) no-repeat
            center center;
        }
        &:nth-child(2) {
          background: url(../../assets/img/operationHome/译码.png) no-repeat
            center center;
        }
        &:nth-child(3) {
          background: url(../../assets/img/operationHome/帧解析.png) no-repeat
            center center;
        }
        &:nth-child(4) {
          background: url(../../assets/img/operationHome/解调规格.png) no-repeat
            center center;
        }
      }

      .service-item {
        height: 100%;
        margin: 5px;
        width: calc(25% - 10px);

        .title {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #5f5f5f;
          line-height: 22px;
          position: relative;
          top: 30%;
          margin-left: 10px;
        }

        .num {
          height: 18px;
          font-size: 24px;
          font-family: Alibaba PuHuiTi 2;
          font-weight: normal;
          color: #414141;
          line-height: 74px;
          position: relative;
          top: 25%;
          margin-left: 10px;
        }

        .progress {
          position: relative;
          top: 60%;
          margin: 0px 10px 0px 10px;
        }
        .exception {
          display: flex;
          justify-content: space-between;
          position: relative;
          top: 63%;

          .left {
            font-size: 10px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ff8061;
            line-height: 22px;
            margin-left: 10px;
          }

          .right {
            font-size: 10px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #7e7e7e;
            line-height: 22px;
            margin-right: 10px;
          }
        }
      }
    }
  }

  .user {
    background: #f0f3f8;

    .left {
      width: 35%;
      height: 100%;
      margin-right: 20px;
      background: linear-gradient(0deg, #ffffff 0%, #f4f8fc 99%);
      border-radius: 8px;
      display: inline-block;

      .charts-user {
        width: 100%;
        height: 22vh;
      }

      .userinfo {
        margin: 10px;

        .info {
          margin-bottom: 5px;
          height: 22px;
          display: flex;
          justify-content: flex-start;

          .icon-ordinary {
            width: 22px;
            height: 12px;
            margin: 5px;
            background: linear-gradient(45deg, #00aeff 0%, #0072ff 98%);
            border-radius: 2px;
          }

          .icon-dev {
            width: 22px;
            height: 12px;
            margin: 5px;
            background: linear-gradient(45deg, #ffa42e 0%, #f9c75c 100%);
            border-radius: 2px;
          }

          .icon-online {
            width: 22px;
            height: 12px;
            margin: 5px;
            background: linear-gradient(90deg, #29cfe0, #45e3dd);
          }

          .icon-outline {
            width: 22px;
            height: 12px;
            margin: 5px;
            background: linear-gradient(45deg, #59d49f 0%, #19e09c 100%);
          }

          .info-text {
            height: 22px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #434343;
            line-height: 22px;
          }
        }
      }
    }

    .right {
      width: calc(65% - 20px);
      height: 100%;
      background: #ffffff;
      border-radius: 8px;
      display: inline-block;

      .split-line {
        height: 2px;
        width: 100%;
        background: #e3e7ee;
      }

      .content {
        height: calc(25vh - 70px);
        padding: 10px;

        .left-title {
          width: 10%;
          height: calc(25vh - 90px);
          border-radius: 3px;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;

          .text {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #ffffff;
            line-height: 30px;
          }
        }

        .left-title-color1 {
          background: linear-gradient(
            90deg,
            rgba(34, 109, 231, 0.79) 53%,
            rgba(108, 162, 250, 0.69) 77%,
            rgba(237, 244, 255, 0.6) 100%
          );
        }
        .left-title-color2 {
          background: linear-gradient(
            90deg,
            #e85151 0%,
            rgba(233, 86, 87, 0.79) 53%,
            rgba(239, 157, 150, 0.69) 77%,
            rgba(253, 239, 236, 0.6) 100%
          );
        }

        .line {
          height: calc(25vh - 130px);
          width: 1px;
          background: #e3e7ee;
          margin: 10px;
        }

        .item-active {
          height: calc(25vh - 110px);
          background: #f2f8fb;
          border-radius: 5px;
          margin: 10px;
          text-align: center;

          .icon {
            height: 20px;
            width: 20px;
            margin-top: 10%;
          }

          .button {
            width: 50%;
            height: 26px;
            background: #2276ff;
            box-shadow: 0px 2px 6px 0px rgba(34, 118, 255, 0.24);
            border-radius: 13px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            line-height: 26px;
            margin: 10% auto;
          }

          .num {
            font-size: 24px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #616161;
            line-height: 26px;
          }
        }

        .item {
          height: calc(25vh - 110px);
          background: #f2f8fb;
          border-radius: 5px;
          margin: 10px;
          text-align: center;

          .icon {
            height: 20px;
            width: 20px;
            margin-top: 10%;
          }

          .button {
            width: 50%;
            height: 26px;
            line-height: 26px;
            margin: 10% auto;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #898989;
            line-height: 26px;
          }

          .num {
            font-size: 24px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            line-height: 26px;
          }
          .color1 {
            color: #616161;
          }

          .color2 {
            color: #fd7c7c;
          }
          .color3 {
            color: #fc6868;
          }
          .color4 {
            color: #cbcbcb;
          }
        }
      }
    }
  }

  .resource {
    .title-box {
      margin: 20px;
      height: 26px;

      .title {
        height: 26px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #000000;
        line-height: 26px;
      }

      .resource-admin-link {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #3c85fe;
        line-height: 26px;
        height: 26px;
      }
    }

    .resource-content {
      .resource-content-item {
        height: calc(25vh - 90px);
        width: 46%;
        background: red;
        margin: 2%;

        &:nth-child(1) {
          background: url(../../assets/img/operationHome/主站.png) no-repeat
            center center;
        }

        &:nth-child(2) {
          background: url(../../assets/img/operationHome/L下变频.png) no-repeat
            center center;
        }

        &:nth-child(3) {
          background: url(../../assets/img/operationHome/某解调器.png) no-repeat
            center center;
        }
        &:nth-child(4) {
          background: url(../../assets/img/operationHome/服务器.png) no-repeat
            center center;
        }

        .text {
          height: 12px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #000000;
          line-height: 22px;
          margin-left: 10%;
          margin-top: 15%;
        }
        .num {
          height: 27px;
          font-size: 36px;
          font-family: Alibaba PuHuiTi 2;
          font-weight: normal;
          color: #000000;
          line-height: 74px;
          margin-left: 10%;
        }
      }
    }

    .charts-resource {
      width: 100%;
      height: 22vh;
    }

    #chart-resource {
      width: 100%;
      height: 22vh;
    }

    .chart-info {
      width: 100%;
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
          color: #333333;
        }

        .background2 {
          background: linear-gradient(-74deg, #eef2f3 0%, #8e9eab 100%);
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
}
</style>