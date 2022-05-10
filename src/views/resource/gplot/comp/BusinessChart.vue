<template>
  <div id="chart" ref="chart"></div>
</template>

<script>
export default {
  props: ["chartData"],
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const chart = this.$echarts.init(this.$refs.chart);
      let options = {
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "none",
            symbolSize: 100,
            roam: true,
            itemStyle: {
              color: "#000",
            },
            label: {
              show: true,
              fontSize: "16",
              position: "bottom",
            },
            edgeLabel: {
              fontSize: 20,
            },

            data: this.chartData.data,
            links: this.chartData.links,
            lineStyle: {
              color: "#8FB8F0",
              opacity: 3,
              width: 4,
            },
          },
        ],
      };
      chart.setOption(options);
      window.addEventListener("resize", function () {
        chart.resize();
      });
    },
  },
};
</script>

<style lang="less" scoped>
#chart {
  // width: 260px;
  // height: 200px;
}
</style>