<template>
  <div id="lineCharts" ref="lineCharts"></div>
</template>

<script>
export default {
  props: ["text"],
  methods: {},
  mounted() {
    const lineCharts = this.$echarts.init(this.$refs.lineCharts);
    let options = {
      // backgroundColor:'#0D213F',
      //    title: {
      //     text: '{zimg|'+this.text+'}',
      //     left: 'center',
      //     top:'5px',
      //     align: 'right',
      //     textStyle:{
      //       color: '#fff',
      //       fontSize: 15,
      //       fontWeight:'normal',
      //       rich:{
      //         zimg:{
      //                   height: 16,
      //                   width:14,
      //                   align: 'left',
      //                   backgroundColor: {
      //                       image: '../../assets/img/dz.png'
      //                   }
      //               }
      //       }
      //     }
      // },
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: "3%",
        // right: "4%",
        top: "20%",
        bottom: "10%",
        containLabel: true,
      },
      xAxis: {
        //
        type: "value",
        name: "时间（t）",
        nameTextStyle: {
          color: "#537099",
        },
        min: 1,
        splitNumber: 7,
        minInterval: 1,
        //线
        axisLine: {
          lineStyle: {
            color: "#1A365F",
          },

          // show: false,
        },
        //刻度
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#5C7AA6",
        },
        // splitLine: {
        //   lineStyle: {
        //     color: "#1A365F",
        //   },
        // },
        type: "category",
        boundaryGap: false,
        lineStyle: {
          color: "#537099",
        },
        data: [
          0,
          0.5,
          0.9,
          1.1,
          1.2,
          1.4,
          1.5,
          1.6,
          1.7,
          1.8,
          1.9,
          2.0,
          2.1,
          2.2,
          2.3,
          2.4,
          2.5,
          2.6,
          2.9,
          3,
          3.1,
          3.2,
          3.3,
          3.4,
          3.5,
          3.6,
          3.7,
          3.9,
          44.2,
          4.3,
          4.4,
          4.7,
          5,
          5.1,
          5.2,
          5.5,
          5.6,
          5.7,
          5.9,
          6.1,
          6.2,
          6.4,
          6.5,
        ],
      },
      yAxis: {
        // type: "value",
        name: "百分比（%）",
        nameTextStyle: {
          color: "#537099",
        },
        axisLabel: {
          color: "#5C7AA6",
        },
        //线
        axisLine: {
          lineStyle: {
            color: "#1A365F",
          },

          // show: false,
        },
        splitLine: {
          lineStyle: {
            color: "#1A365F",
          },
        },
      },
      series: [
        {
          type: "line",
          clip: true,
          lineStyle: {
            color: "#73D5DF",
          },
          smooth: true,
          showSymbol: false,
          itemStyle: {
            color: "#73D5DF",
            borderWidth: 0,
          },
          data: [
            2,
            2,
            2.3,
            2,
            1.9,
            1.6,
            1.7,
            2.9,
            1.3,
            1.8,
            1.9,
            2.4,
            1.8,
            2.1,
            1.9,
            1.9,
            2.1,
            1.9,
            1.8,
            1.8,
            2.9,
            1.3,
            1.8,
            1.9,
            2.4,
            1.8,
            2.1,
            1.9,
            1.9,
            2.1,
            1.9,
            1.9,
            2.9,
            1.3,
            1.8,
            1.9,
            2.4,
            1.8,
            2.1,
            1.9,
            1.9,
          ],
        },
      ],
    };
    lineCharts.setOption(options);
    window.addEventListener("resize", function () {
      lineCharts.resize();
    });
  },
};
</script>

<style lang="less" scoped>
#lineCharts {
  width: 100%;
  height: 100%;
}
</style>