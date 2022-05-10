<template>
  <div class="management">
    <div class="top">
      <div class="main-statisc">
        <div class="subassStatis">
          <div class="statisLeft">
            <div class="subassTypeImage">
              <img src="../../../assets/img/组件类型统计.png">
              <span style="position: absolute;top: 30px;left: 66px;color: #fff;">组件总量</span>
              <span style="position: absolute;top: 65px;left: 66px;color: #fff;font-size: 28px;">215</span>
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
              <img src="../../../assets/img/组件状态统计.png">
              <span style="position: absolute;top: 30px;left: 66px;color: #fff;">审批状态</span>
              <span style="position: absolute;top: 65px;left: 80px;color: #fff;font-size: 28px;">6</span>
            </div>
            <div class="subassStatusCharts">
              <div ref="gaugeChart1" id="gaugeChart1" class="gaugeChart"></div>
              <div ref="gaugeChart2" id="gaugeChart2" class="gaugeChart"></div>
              <div ref="gaugeChart3" id="gaugeChart3" class="gaugeChart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="t-content">
      <div class="top">
        <div class="name">
          <span class="mr10">资源列表</span>
          <el-button type="primary" size="small">
            <i class="el-icon-plus"></i>
            新增资源
          </el-button>
        </div>
        <div class="search">
          <el-form size="small" :model="searchData" inline>
            <el-form-item>
              <el-date-picker
                v-model="searchData.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select placeholder="类型" v-model="searchData.type">
                <el-option value="1" lable="1"></el-option>
                <el-option value="2" lable="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="searchData.name"
                style="width: 240px"
                placeholder="搜索目标ID"
                suffix-icon="el-icon-search"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <Table
          :table-header="tableHeader"
          :tableData="tableData"
          :pg-total-num="60"
          height="calc(100vh - 330px)"
          @handleDelete="handleDelete"
          @handleDetail="handleDetail"
      >
        <div slot="operation" slot-scope="row">
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <i class="el-icon-delete op" @click=""></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="查看详情" placement="bottom">
            <i class="el-icon-tickets op"></i>
          </el-tooltip>
        </div>
      </Table>
    </div>

    <el-dialog
      title="资源详情"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :visible.sync="dialogVisible"
      center
      width="40%"
      :before-close="handleClose"
    >
      <div class="box basic-information">
        <div class="title">基本信息</div>
        <el-form
          size="medium"
          class="mtb10"
          label-width="100px"
          :model="basicInformation"
        >
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="basicInformation.name"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="资源类型">
            <el-select v-model="basicInformation.type">
              <el-option value="DVB-S2" label="DVB-S2"></el-option>
              <el-option value="服务器" label="服务器"></el-option>
              <el-option value="L-下变频" label="L-下变频"></el-option>
              <el-option value="解调器" label="解调器"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="status" label="状 态">
            <i
              :style="{
                backgroundColor: basicInformation.status == 1 ? '' : '',
              }"
            ></i>
            <span>{{ basicInformation.status == 1 ? "在线" : "离线" }}</span>
          </el-form-item>
          <el-form-item prop="ip" label="IP地址">
            {{ basicInformation.ip }}
          </el-form-item>
          <el-form-item prop="port" label="端口">
            {{ basicInformation.port }}
          </el-form-item>
          <el-form-item prop="cpu" label="CPU">
            {{ basicInformation.cpu }}
          </el-form-item>
          <el-form-item prop="is" label="内存">
            {{ basicInformation.is }}
          </el-form-item>
          <el-form-item prop="disk" label="磁盘">
            {{ basicInformation.disk }}
          </el-form-item>
          <el-form-item label-width="65px">
            <el-button type="primary" @click="saveBasicInformation"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="box parameter-information">
        <div class="title">参数信息</div>
        <el-form
          size="medium"
          class="mtb10"
          label-width="100px"
          :model="parameterInformation"
        >
          <el-form-item prop="xhlx" label="信号类型">
            {{ parameterInformation.xhlx }}</el-form-item
          >
          <el-form-item prop="tzfs" label="调制方式">
            {{ parameterInformation.tzfs }}</el-form-item
          >
          <el-form-item prop="zblx" label="载波类型">
            {{ parameterInformation.zblx }}</el-form-item
          >
          <el-form-item prop="zbpl" label="载波频率">
            {{ parameterInformation.zbpl }}</el-form-item
          >
          <el-form-item prop="jds" label="阶段数">
            {{ parameterInformation.jds }}</el-form-item
          >
          <el-form-item prop="tzsl" label="调制速率">
            {{ parameterInformation.tzsl }}</el-form-item
          >
        </el-form>
      </div>
<!--      <div class="box component">-->
<!--        <div class="title">-->
<!--          包含组件 <span class="num">{{ ComponentTableData.length }}</span>-->
<!--        </div>-->
<!--        <ComponentTable :tableData="ComponentTableData" />-->
<!--      </div>-->
    </el-dialog>
  </div>
</template>

<script>
import ComponentTable from "./comp/componentTable.vue";
import Gauge from "./comp/Gauge.vue";
import Table from "../../../components/Table.vue";
export default {
  components: {
    Table,
    Gauge,
    ComponentTable,
  },
  data() {
    return {
      // 弹窗
      dialogVisible: false,
      // 基本信息表单
      basicInformation: {},
      // 参数信息表单
      parameterInformation: {
        xhlx: "通用服务器一",
        tzfs: "调制方式",
        zblx: "XXX类型",
        zbpl: "XXXMHz",
        jds: "47%",
        tzsl: "10",
      },
      // 弹窗组件表格
      ComponentTableData: [
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
        {
          name: "组件名称",
          type: "解调",
          scene: "目标",
          creator: "创建人",
          date: "2021-06-01 09:36:29",
        },
      ],
      // 资源总量
      allList: [
        {
          name: "某解调器",
          num: 16,
          all: 20,
          color: "#4898fc",
        },
        {
          name: "L下变频",
          num: 4,
          all: 20,
          color: "#23d037",
        },
        {
          name: "主站DVB-S2",
          num: 12,
          all: 20,
          color: "#00ceeb",
        },
        {
          name: "通用服务器",
          num: 4,
          all: 20,
          color: "#fd9f6c",
        },
      ],

      searchData: {
        time: "",
        type: "",
        name: "",
      },
      tableHeader: [
        {
          prop: "name",
          name: "资源名称"
        },{
          prop: "id",
          name: "资源ID"
        },{
          prop: "type",
          name: "类型"
        },{
          prop: "date",
          name: "部署时间"
        },{
          prop: "ip",
          name: "IP地址"
        },{
          prop: "port",
          name: "端口"
        },{
          prop: "is",
          name: "内存"
        },{
          prop: "cpu",
          name: "CPU"
        },{
          prop: "disk",
          name: "磁盘"
        },{
          prop: "num",
          name: "组件数量"
        },{
          prop: "status",
          name: "当前状态",
          formatter: function (row){
            return row.status == 1 ? "<span>在线</span>" : "<span style='color: red'>离线</span>";
          },
          button: true
        }
      ],
      // 资源列表
      tableData: [
        {
          name: "资源名称",
          id: "123",
          type: "DVB-S2",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 2,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "服务器",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "解调器",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "L-下变频",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 2,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "DVB-S2",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "DVB-S2",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "DVB-S2",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 2,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "DVB-S2",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "DVB-S2",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "DVB-S2",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "DVB-S2",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 2,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "DVB-S2",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "DVB-S2",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "DVB-S2",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "DVB-S2",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "DVB-S2",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "DVB-S2",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "DVB-S2",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "DVB-S2",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          id: "123",
          type: "DVB-S2",
          date: "2021-05-31 20:06:41",
          ip: "192.168.3.44",
          port: "8080",
          is: "30%",
          cpu: "45%",
          disk: "45%",
          num: 20,
          status: 1,
          isHover: false,
        },
      ],

      gaugeChartData: [
        {
          val: 17,
          sColor: "#54B6FF",
          eColor: "#138FFF",
          title: "在 线",
          all: 20,
        },
        {
          val: 5,
          sColor: "#FF8C8D",
          eColor: "#FF5D5B",
          title: "异 常",
          all: 20,
        },
        {
          val: 3,
          sColor: "#FF8C8D",
          eColor: "#FF5D5B",
          title: "离 线",
          all: 20,
        },
      ],
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    handleDetail(row) {
      console.log(row);
      this.dialogVisible = true;
      this.basicInformation = row;
    },
    handleDelete(row) {
      console.log(row);
    },
    saveBasicInformation() {
      this.dialogVisible = false;
    },
    gaugeChartFunc(index,chartsData){
      let val = 17;
      const gaugeChart = this.$echarts.init(this.$refs['gaugeChart'+index]);
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
    },
  },
  mounted() {
    for(let i=0;i<this.gaugeChartData.length;i++){
      this.gaugeChartFunc(i+1,this.gaugeChartData[i]);
    }
  },
};
</script>

<style lang="less" scoped>
.management {
  height: 100%;
  width: 100%;
  // padding: 20px;
  > .top {
    height: 150px;
    // margin-bottom: 10px;
    background-color: #fff;
    display: flex;
    // > div {
    //   height: 100%;
    //   display: flex;
    //   &.all {
    //     flex: 2;
    //     .left {
    //       .num {
    //         color: #0084f1;
    //       }
    //     }
    //     .right {
    //       display: flex;
    //       flex-wrap: wrap;
    //       .item {
    //         display: flex;
    //         flex-direction: column;
    //         flex: 0 0 33%;
    //         height: 50%;
    //         padding-right: 100px;
    //         justify-content: center;
    //         .title {
    //           display: flex;
    //           justify-content: space-between;
    //           .name {
    //             i {
    //               display: inline-block;
    //               width: 10px;
    //               border-radius: 50%;
    //               height: 10px;
    //               background-color: #ffffff;
    //               border: solid 2px #23d037;
    //             }
    //           }
    //           .num {
    //           }
    //         }
    //         .bbar {
    //           margin-top: 10px;
    //           width: 100%;
    //           height: 10px;
    //           background-color: #e0e4e9;
    //           border-radius: 5px;
    //           .bar {
    //             border-radius: 5px;
    //             height: 100%;
    //             // background-color: ;
    //           }
    //         }
    //       }
    //     }
    //   }
    //   &.err {
    //     flex: 1;
    //     .left {
    //       .num {
    //         color: #fe5b5e;
    //       }
    //     }
    //     .right {
    //       display: flex;
    //       > * {
    //         flex: 1;
    //         height: 100%;
    //       }
    //     }
    //   }
    // }
    // .left {
    //   height: 100%;
    //   width: 170px;
    //   background-color: #f9f9fb;
    //   font-size: 15px;
    //   text-align: center;
    //   line-height: 60px;
    //   // padding-top: 10px;
    //   .name {
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //   }
    //   .num {
    //     font-size: 50px;
    //   }
    // }
    // .right {
    //   flex: 1;
    // }
    .main-statisc{
      margin-bottom: 20px;
      .subassStatis{
        height: 125px;
        width: 100%;
        display: flex;
        .statisLeft{
          width: 50%;
          position: relative;
          display: flex;
          .subassTypeImage{
            background-color: #fff;
          }
          .subassTypeCharts{
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
        .statisRight{
          width: 50%;
          position: relative;
          display: flex;
          .subassStatusImage{
            background-color: #fff;
          }
          .subassStatusCharts{
            background-color: #fff;
            width: 100%;
            display: flex;
            // line-height: 125px;
            .gaugeChart{
              width: 185px;
              height: 125px;
            }
          }
        }
      }
    }
  }
  .t-content {
    // width: 100%;
    height: calc(100% - 185px);
    background-color: #fff;
    margin: 20px;
    .top {
      width: 100%;
      padding: 5px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name {
        font-size: 16px;
      }
      .search {
      }
    }
    .op{
      cursor: pointer;
    }
    .op:not(:first-child){
      margin-left: 10px;
    }
  }
  .el-dialog {
    .box {
      font-size: 12px;
      .title {
        height: 33px;
        background-color: #dadfe7;
        line-height: 33px;
        padding-left: 20px;
        color: #333;
      }
      &.parameter-information,
      &.basic-information {
        .el-form-item {
          flex: 0 0 33%;
        }
      }
      &.component {
        .num {
          display: inline-block;
          width: 36px;
          height: 33px;
          background-color: #3684e9;
          font-size: 12px;
          font-weight: bold;
          line-height: 33px;
          color: #ffffff;
          text-align: center;
        }
      }
    }
  }
}
</style>
