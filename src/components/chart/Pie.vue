<template>
  <!-- <div>{{chartsData}}</div> -->
  <div id="pieCharts" ref="pieCharts"></div>
</template>

<script>
export default {
  props: {
    chartsData: "",
  },
  data() {
    return {
      // newChartsData:''
    };
  },
  created(){
    
  },
  mounted() {
    let e =this.random(3,6);
    const pieCharts = this.$echarts.init(this.$refs.pieCharts);
    let options = {
      title: {
        show: true,
        text: e,
        x: "center",
        y: "center",
        textStyle: {
          fontSize: "15",
          color: "white",
          fontWeight: "normal",
        },
      },

      // tooltip: {
      //   trigger: "item",
      //   formatter: "{d}%",
      //   show: false,
      // },
      // legend: {
      //   orient: "vertical",
      //   x: "left",
      //   show: false,
      // },
      color: ["#41ACFB", "transparent"],
      series: {
        name: "",
        type: "pie",
        radius: ["70%", "85%"],
        avoidLabelOverlap: true,
        hoverAnimation: false,
        label: {
          normal: {
            show: false,
            position: "center",
          },
          // emphasis: {
          //   show: false,
          // },
        },
        // labelLine: {
        //   normal: {
        //     show: false,
        //   },
        // },
        data: [
          { value: e, name: "" },
          { value: 8 - e, name: "" },
        ],
      },
    };
    pieCharts.setOption(options);
    setInterval(() => {
      let dd = options.series.data;
      dd.shift();
      dd.shift();
      let rl = this.random(3,6);
      dd.push({value:rl, name: ""});
      dd.push({value: (8-rl), name: ""});
      options.title.text=rl;
      pieCharts.setOption(options);
    },1000
    )
  },
  methods:{
    random(min, max) {
        let s = (Math.random() * (max - min)+3).toFixed(2);
        return s ;
        
    },
  }
};
</script>

<style lang="less" scoped>
#pieCharts {
  // width: 260px;
  // height: 200px;
}
</style>