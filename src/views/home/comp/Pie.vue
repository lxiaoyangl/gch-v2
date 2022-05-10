<template>
  <!-- <div>{{chartsData}}</div> -->
  <div id="pieCharts" ref="pieCharts"></div>
</template>

<script>
export default {
  props: ["chartData"],
  data() {
    return {};
  },
  created() {},
  mounted() {
    const pieCharts = this.$echarts.init(this.$refs.pieCharts);
    let options = {
      title: {
        show: true,
        text: this.chartData.all,
        x: "center",
        y: "34%",
        subtext: "资源总数",
        subtextStyle: {
          color: "#333",
          fontSize: 12,
          // lineHeight: 44,
        },
        textStyle: {
          fontSize: "30",
          color: "#000",
          fontWeight: "normal",
        },
      },
      legend: {
        orient: "vertical",
        top: "5%",
        left: "1%",
      },
      series: {
        name: "",
        type: "pie",
        silent: true,
        radius: ["65%", "80%"],
        avoidLabelOverlap: true,
        legendHoverLink: false,
        label: {
          normal: {
            show: true,
            // position: "inner",
            color: "#000",
          },
        },
        labelLine: {
          show: true,
          length2: 5,
          length: 10,
          lineStyle: {
            width: 2,
          },
        },
        data: this.chartData.data,
      },
    };
    pieCharts.setOption(options);
    window.addEventListener("resize", function () {
      pieCharts.resize();
    });
  },
  methods: {},
};
</script>

<style lang="less" scoped>
#pieCharts {
  // width: 260px;
  // height: 200px;
}
</style>