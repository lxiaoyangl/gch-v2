<template>
  <!-- <div>{{chartsData}}</div> -->
  <div id="gaugeChart" ref="gaugeChart"></div>
</template>

<script>
export default {
  props: ["chartsData"],
  data() {
    return {};
  },
  created() {},
  mounted() {
    let val = 17;
    const gaugeChart = this.$echarts.init(this.$refs.gaugeChart);
    let options = {
      title: {
        text: this.chartsData.title,
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
              value: (this.chartsData.val / this.chartsData.all) * 100,
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
                      color: this.chartsData.sColor,
                    },
                    {
                      offset: 1,
                      color: this.chartsData.eColor,
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
              name: this.chartsData.val,
            },
          ],
        },
      ],
    };
    gaugeChart.setOption(options);
    window.addEventListener("resize", function () {
      gaugeChart.resize();
    });
  },
  methods: {},
};
</script>

<style lang="less" scoped>
#gaugeChart {
  // width: 260px;
  // height: 200px;
}
</style>