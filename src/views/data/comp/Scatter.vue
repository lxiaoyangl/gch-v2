<template>
  <div id="scatter" ref="scatter"></div>
</template>

<script>
export default {
  // props: {
  //   chartsData: "",
  // },
  mounted() {
    const scatter = this.$echarts.init(this.$refs.scatter);
    let options = {
      // title: {
      //   text: "主站名称",
      //   textStyle: {
      //     color: "#fff",
      //     fontSize: 12,
      //   },
      //   left: 18,
      //   top: 5,
      // },
      grid: {
        backgroundColor: "#0D213F",
        borderColor: "#1A365F",
        left: "7%",
        right: "4%",
        top: "5%",
        bottom: "5%",
        // containLabel: true,
      },
      xAxis: {
        axisLabel: {
          // color: "transparent",
        },
        splitLine: {
          lineStyle: {
            color: "#1A365F",
          },
        },
      },
      yAxis: {
        axisLabel: {
          // color: "transparent",
          // color: "#5C7AA6",
        },
        splitLine: {
          lineStyle: {
            color: "#1A365F",
          },
        },
      },
      itemStyle: {
        color: "#006BBC",
      },
      series: [
        {
          symbolSize: 6,
          data: [
            [10.0, 8.04],
            [8.0, 6.95],
            [-9.0, 8.81],
            [11.0, -8.33],
            [14.0, -9.96],
            [6.0, -7.24],
            [4.0, 4.26],
            [12.0, -10.84],
            [-7.0, 4.82],
            [5.0, 2.68],
            [14.0, -3.96],
            [6.0, -4.24],
            [4.0, 6.26],
            [12.0, 1.84],
            [-7.0, -1.82],
            [5.0, -4.68],
            [6.0, -4.24],
            [4.0, 6.26],
            [12.0, 1.84],
            [-7.0, -1.82],
            [6.0, -4.24],
            [-4.0, 6.26],
            [12.0, -1.84],
            [-7.0, -1.82],
            [-5.0, -4.68],
            [6.0, -4.24],
            [-4.0, 6.26],
            [12.0, -1.84],
            [-7.0, -1.82],
            [5.0, -4.68],
            [-6.0, -4.24],
            [-4.0, 6.26],
            [12.0, 1.84],
            [-7.0, -1.82],
            [5.0, -4.68],
          ],
          type: "scatter",
        },
      ],
    };
    scatter.setOption(options);
    window.addEventListener("resize", function () {
      scatter.resize();
    });
  },
};
</script>

<style lang="less" scoped>
#scatter {
  width: 100%;
  height: 100%;
}
</style>