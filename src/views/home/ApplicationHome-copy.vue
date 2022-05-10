<template>
  <div class="management">
    <div class="main-header">
      <div class="main-header-left">
        <div class="appliStatusHeader">
          应用状态
        </div>
        <div class="appliStatusBody">
          <div class="appliTotalNum">
            <img src="../../assets/img/应用总数.png" style="width:100%;height:100%;">
            <div style="margin-top: -100px;text-align: center;z-index: 999999;color: #fff;font-size: 30px;">6</div>
          </div>
          <div class="appliCenter">
            <div class="appliCenterTop">
              <img src="../../assets/img/用户-运行中.png" style="width:100%;height:100%;">
              <div style="font-size: 18px;font-weight: bold;margin-top: -65px;text-align: right;padding-right: 20px;">6</div>
            </div>
            <div class="appliCenterBottom">
              <img src="../../assets/img/用户-空闲中.png" style="width:100%;height:100%;">
              <div style="font-size: 18px;font-weight: bold;margin-top: -65px;text-align: right;padding-right: 20px;">6</div>
            </div>
          </div>
          <div class="appliRight">
            <div class="appliRightTop">
              <img src="../../assets/img/用户-异常告警.png" style="width:100%;height:100%;">
              <div style="font-size: 18px;font-weight: bold;margin-top: -65px;text-align: right;padding-right: 20px;">6</div>
            </div>
            <div class="appliRightBottom">
              <img src="../../assets/img/用户-最近下架.png" style="width:100%;height:100%;">
              <div style="font-size: 18px;font-weight: bold;margin-top: -65px;text-align: right;padding-right: 20px;">6</div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div class="main-header-right">
        <div class="unusualType">
          <div class="unusualTypeHeader">异常类型</div>
          <div class="unusualTypeBody">
            <div style="height:40%;position: relative;">
              <img src="../../assets/img/数据存储异常.png"/>
              <div style="position: absolute;bottom: 70px;left: 45px;font-size: 20px;font-weight: bold;">1</div>
            </div>
            <div style="height:40%;position: relative;margin-top:10px;">
              <img src="../../assets/img/处理流程异常.png"/>
              <div style="position: absolute;bottom: 70px;left: 45px;font-size: 20px;font-weight: bold;">0</div>
            </div>
          </div>
        </div>
        <div class="nearestUnusual">
          <div class="nearestUnusualHeader">最近异常</div>
          <div class="nearestUnusualBody">
            <div class="nearestUnusualText">
              <div class="nearestUnusualTextHeader">
                <span><span style="color:#ff5200;">处理流程 - </span>应用名称 - <span style="font-weight: bold;">网络异常</span></span>
                <span><span class="unusualDescTime">刚刚</span><el-button type="primary" size="mini" class="unusualDescButton">查看详情</el-button></span>
              </div>
              <div style="padding-top: 10px;}">
                阿斯顿发射点发射点阿斯顿发射点会发生的基本父元素的部分阿斯顿发射点共发生一顿饭士大夫
              </div>
            </div>
            <div class="nearestUnusualText">
              <div class="nearestUnusualTextHeader">
                <span><span style="color:#ff5200;">服务器 - </span>应用名称 - <span style="font-weight: bold;">网络异常</span></span>
                <span><span class="unusualDescTime">刚刚</span><el-button type="primary" size="mini" class="unusualDescButton">查看详情</el-button></span>
              </div>
              <div style="padding-top: 10px;}">
                阿斯顿发射点发射点阿斯顿发射点会发生的基本父元素的部分阿斯顿发射点共发生一顿饭士大夫
              </div>
            </div>
            <div class="nearestUnusualText">
              <div class="nearestUnusualTextHeader">
                <span><span style="color:#ff5200;">处理流程 - </span>应用名称 - <span style="font-weight: bold;">网络异常</span></span>
                <span><span class="unusualDescTime">刚刚</span><el-button type="primary" size="mini" class="unusualDescButton">查看详情</el-button></span>
              </div>
              <div style="padding-top: 10px;}">
                阿斯顿发射点发射点阿斯顿发射点会发生的基本父元素的部分阿斯顿发射点共发生一顿饭士大夫
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="main-head">
        <i class="el-icon-caret-left"></i>
        最近使用
        <i class="el-icon-caret-right"></i>
      </div>
      <div class="main-body">
        <div class="main-box" v-for="(item, index) in allmain" :key="index">
          <div class="application" :class="applicationBackGorundClass(item)">
            <div class="applicationDesc">
              <img class="applicationImage" :src="getStatusImageUrl(item)">
              <div style="margin-left: 30px;">
                <div style="margin-top:7px;"><span :style="{fontSize: '16px',fontWeight: 'bold',minWidth:'70px',color:item.status=='1-3'?'#d65c5c':'#fff'}">{{item.name}}</span><span style="width: 90px;display: inline-block;">【{{item.type}}】</span></div>
                <div class="applicationDescPadding" style="color:#d6d3d3;">{{item.desc}}</div>
              </div>
            </div>
            <div class="applicationBottom">
              <div class="applicationBottomDesc">
                <div class="header pd">开发时间</div>
                <div class="body pd">{{item.startTime}}</div>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="applicationBottomDesc">
                <div class="header pd">{{item.status == '1-3' ? '异常时间' : '结束时间'}}</div>
                <div class="body pd" :style="{color: item.status == '1-3' ? '#d65c5c' : '#fff'}">{{item.time}}</div>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="applicationBottomDesc">
                <div class="header pd">数据总量</div>
                <div class="body pd">{{item.totalData}}</div>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="applicationBottomDesc">
                <div class="header pd">{{item.status == '1-3' ? '失败流程' : '运行流程'}}</div>
                <div class="body pd" :style="{color: item.status == '1-3' ? '#d65c5c' : '#fff'}">{{item.flowNum}}</div>
              </div>
            </div>
          </div>
          <div class="applicationMaskLayer">
            <el-button size="mini" type="success"><i class="el-icon-coin"></i>应用数据</el-button>
            <el-button size="mini" type="warning" @click="applicationRunController()"><i class="el-icon-guide"></i>运行控制</el-button>
            <el-button size="mini" type="primary"><i class="el-icon-right"></i>打开应用</el-button>
            <el-button size="mini" type="primary"><i class="el-icon-set-up"></i>运行实例</el-button>
          </div>
        </div>
      </div>
    </div>

            <!-- 应用运行控制-->
    <el-dialog
      title="运行控制"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :visible.sync="applicationRunConttl"
      center
      width="40%"
      :before-close="handleClose"
    >
      <div class="applicationRunControllerTitle">
        <span style="color:#5c5cf9;">海南巡航</span>【侦察】
      </div>
      <div class="applicationRunControllerBody">
        <div class="applicationRunControllerItem"> 
          <span class="applicationRunContrllerItemTitle">生产信息 </span> 
          <div class="productionInfo">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="存储路径：">
                <el-input placeholder="请输入内容" class="storePath" v-model="input2">
                  <template slot="append">
                    <el-upload
                      class="fileChoose"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :before-remove="beforeRemove"
                      multiple
                      :limit="3"
                      :on-exceed="handleExceed"
                      :file-list="fileList">
                      <el-button type="primary">浏览路径</el-button>
                    </el-upload>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item  label="存储大小：">
                <el-input placeholder="数据存储数据大小" v-model="input2" class="storeSize"></el-input>
              </el-form-item>
            </el-form>
            
          </div> 
        </div>
        <div class="applicationRunControllerItem applicationRunControllerItemMarginTop"> 
          <span class="applicationRunContrllerItemTitle">调制参数 </span> 
          <div class="modulationParam" style="padding:0 30px 20px 30px;">
            <el-form :inline="true" ref="form" :model="form" label-width="80px">
              <el-form-item label="中频选择：">
                <el-select placeholder="中频选择">
                  <el-option>地方</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="调制方式：">
                <el-select placeholder="中频选择">
                  <el-option>地方</el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="modulationParamMarginTop" label="载波频率：">
                <el-input placeholder="输入载波频率"></el-input>
              </el-form-item>
              <el-form-item class="modulationParamMarginTop" label="符号速率：">
                <el-input placeholder="输入符号速率"></el-input>
              </el-form-item>
            </el-form>
          </div> 
        </div>
        <div class="applicationRunControllerItem applicationRunControllerItemMarginTop"> 
          <span class="applicationRunContrllerItemTitle">译码参数 </span> 
          <div class="decodingParams">
            <el-form :inline="true" ref="form" :model="form" label-width="80px">
              <el-form-item class="decodingParamsMarginTop" label="调制方式：">
                <el-select placeholder="调制方式">
                  <el-option>地方</el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="decodingParamsMarginTop" label="码率：">
                <el-input placeholder="输入码率"></el-input>
              </el-form-item>
              <el-form-item class="decodingParamsMarginTop" label="扰码：">
                <el-input placeholder="输入扰码"></el-input>
              </el-form-item>
              <el-form-item class="decodingParamsMarginTop" label="差分">
                <el-input placeholder="输入差分"></el-input>
              </el-form-item>
              <el-form-item class="decodingParamsMarginTop" label="RS码率：">
                <el-input placeholder="输入RS码率"></el-input>
              </el-form-item>
              <el-form-item class="decodingParamsMarginTop" label="RS扰码：">
                <el-input placeholder="输入RS扰码"></el-input>
              </el-form-item>
              <el-form-item class="decodingParamsMarginTop" label="帧结构：">
                <el-input placeholder="输入帧结构"></el-input>
              </el-form-item>
            </el-form>
          </div> 
        </div>
      </div>
      <div slot="footer">
        <el-button size="mini" @click="closeApplicationRunController()">取消</el-button>
        <el-button size="mini" type="primary" @click="closeApplicationRunController()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      // 搜索框
      search_task: "",
      applicationRunConttl: false,
      form: {},
            // 资源总量
      allList: [
        {
          name: "调器",
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
      ],
      gaugeChartData: [
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
      ],
      // 下拉选项
      ZToptions: [
        {
          value: "选项1",
          label: "上架",
        },
        {
          value: "选项2",
          label: "下架",
        },
        {
          value: "选项2",
          label: "异常",
        },
        {
          value: "选项2",
          label: "未通过",
        },
      ],
      TPoptions: [
        {
          value: "选项1",
          label: "侦察",
        },
        {
          value: "选项2",
          label: "侦守",
        },
        {
          value: "选项2",
          label: "控守",
        },
      ],
      allZT: "",
      allTP: "",
      //内容
      allmain: [
        {
          name: "南海巡航",
          status: '1-1',
          type: "侦察",
          startTime: '2021-03-12',
          time: "2021-01-01",
          desc: "应用的一段描述",
          totalData: '3GB',
          flowNum: 50,
        },
        {
          name: "广西边防",
          status: '2-1',
          type: "侦守",
          startTime: '2021-03-12',
          time: "2021-01-01",
          desc: "应用的一段描述",
          totalData: '3GB',
          flowNum: 50,
        },
        {
          name: "西沙航巡",
          status: '1-2',
          type: "侦察",
          startTime: '2021-03-12',
          time: "",
          desc: "应用的一段描述",
          totalData: '3GB',
          flowNum: 20,
        },
        {
          name: "新疆边防",
          status: '1-3',
          type: "侦守",
          startTime: '2021-03-12',
          time: "2021-01-01",
          desc: "应用的一段描述",
          totalData: '3GB',
          flowNum: 30,
        },
        {
          name: "西藏边防",
          status: '1-4',
          type: "侦守",
          startTime: '2021-03-12',
          time: "2021-01-01",
          desc: "应用的一段描述",
          totalData: '3GB',
          flowNum: 40,
        },
        {
          name: "广西巡航",
          status: '2-1',
          type: "侦察",
          startTime: '2021-03-12',
          time: "2021-01-01",
          desc: "应用的一段描述",
          totalData: '3GB',
          flowNum: 60,
        },
        {
          name: "云南边防",
          status: '1-3',
          type: "控守",
          startTime: '2021-03-12',
          time: "2021-01-01",
          desc: "应用的一段描述",
          totalData: '3GB',
          flowNum: 80,
        },
        {
          name: "黑龙江边防",
          status: '1-4',
          type: "控守",
          startTime: '2021-03-12',
          time: "2021-01-01",
          desc: "应用的一段描述",
          totalData: '3GB',
          flowNum: 90,
        },
        
      ],
      num: 9999,
      applicationClass: {},
    };
  },
  methods: {
    displ(data) {
      this.num = data;
    },
    handleChange(status) {
      console.log(status);
    },
    handleAdd() {
      // let routeData = this.$router.resolve({
      //   path: "/fidlddata",
      // });
      // window.open(routeData.href, "_blank");
      this.$router.push({path: '/fidlddata'})
    },
    handleEdit(item) {
      let routeData = this.$router.resolve({
        path: "/application/management/applicationManagement",
      });
      window.open(routeData.href, "_blank");
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

    //应用背景图片样式
    applicationBackGorundClass(item){
      if(item.status.indexOf('1-') >= 0){
        return{
          applicationUp: true
        }
      }
      if(item.status.indexOf('2-') >= 0){
        return{
          applicationDown: true
        }
      }
    },
    getStatusImageUrl(item){
      //上架
      if(item.status == '1-1'){
        return require('../../assets/img/已上架.png');
      }
      //下架
      if(item.status == '2-1'){
        return require('../../assets/img/下架.png');
      }
      //待审批
      if(item.status == '1-2'){
        return require('../../assets/img/待审批.png');
      }
      //未通过
      if(item.status == '1-3'){
        return require('../../assets/img/未通过.png');
      }
      //已上架异常
      if(item.status == '1-4'){
        return require('../../assets/img/已上架异常.png');
      }
    },
    applicationClassMouseOver($event, item){
      
    },
    applicationClassMouseLeave($event, item){
      
    },
        //运行控制
    applicationRunController(row){
      this.applicationRunConttl = true;
    },
    closeApplicationRunController(){
      this.applicationRunConttl = false;
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
.pagebtn {
  width: 50px;
}
.management {
  height: 100%;
  width: 100%;
  .main-header{
    display: flex;
    height: 330px;
    width: 100%;
    background: #fff;
    margin-bottom: 10px;
    .main-header-left{
      width: 50%;
      .appliStatusHeader{
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-weight: bold;
        padding: 0 20px;
      }
      .appliStatusBody{
        display: flex;
        padding: 0 0 20px 20px;
        height: calc(100% - 40px);
        .appliTotalNum{
          width: 20%;
          position: relative;
        }
        .appliCenter{
          width: 40%;
          padding: 0 10px 0 20px;
          .appliCenterTop{
            width: 100%;
            height: 40%;
            margin-top: 25px;
            position: relative;
          }
          .appliCenterBottom{
            width: 100%;
            height: 40%;
            margin-top: 25px;
            position: relative;
          }
        }
        .appliRight{
          width: 40%;
          padding: 0 20px 0 10px;
          .appliRightTop{
            width: 100%;
            height: 40%;
            margin-top: 25px;
            position: relative;
          }
          .appliRightBottom{
            width: 100%;
            height: 40%;
            margin-top: 25px;
            position: relative;
          }
        }
      }
    }
    .main-header-right{
      width: 50%;
      display: flex;
      .unusualType{
        padding: 0 20px;
        width: 40%;
        background-image: linear-gradient(to right, #c9def1 , white);
        .unusualTypeHeader{
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          font-weight: bold;
        }
        .unusualTypeBody{
          position: relative;
        }
      }
      .nearestUnusual{
        padding: 0 20px 0 0;
        width: 60%;
        .nearestUnusualHeader{
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          font-weight: bold;
        }
        .nearestUnusualBody{
            .nearestUnusualText{
              background-image: linear-gradient(to right, #c9def1 , white);
              height: 80px;
              padding: 10px;
              border-radius: 7px;
              margin-top: 10px;
              .nearestUnusualTextHeader{
                display: flex;
                justify-content: space-between;
                height: 25px;
                line-height: 25px;
                .unusualDescButton{
                  display: none;
                }
              }
            }
            .nearestUnusualText:hover{
                border: 1px solid red;
                background: rgb(250, 248, 248);
                .unusualDescButton{
                  display: block;
                }
                .unusualDescTime{
                  display: none;
                }
            }
          }
      }
    }
  }
  .main-content {
    display: flex;
    flex-wrap: wrap;
    height: calc(100% - 30px);
    background-color: #fff;
    .main-head {
      align-items: center;
      line-height: 50px;
      background-color: #fff;
      padding: 0 15px;
      width: 100%;
      text-align: center;
      font-weight: bold;
      font-size: 18px;
    }
    .main-body{
      display: flex;
      flex-wrap: wrap;
      padding-right: 20px;
      .main-box{
        padding-left: 20px;
        padding-bottom: 10px;
        border-radius: 10px;
        position: relative;
        .application{
          width: 400px;
          height: 152px;
          position: relative;
          color: #fff;
          .applicationDesc{
            display: flex;
            height: 100px;
            padding: 20px;
            .applicationImage{
              width: 60px;
              height: 60px;
            }
            .applicationDescPadding{
              margin-top: 20px;
            }
            .applicationDescButton{
              color:#9d9dff;
              width: 84px;
              height: 30px;
              line-height: 30px;
              text-align: center;
            }
            
            .applicationDevButton{
              color:#26e426;
              width: 84px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              margin-top: 10px;
            }
            .applicationEorrButton{
              color:#ee5195;
              width: 84px;
              height: 30px;
              line-height: 30px;
              text-align: center;
            }
          }
          .applicationBottom{
            height: 50px;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            .applicationBottomDesc{
              text-align: center;
              .header{
                color: #6c83c3;
                padding-bottom: 5px;
                font-weight: bold;
              }
              .body{
                padding-top: 5px;
                font-weight: bold;
              }
              .pd{
                
              }
            }
          }
          
        }
        .applicationMaskLayer{
          position: absolute;
          display: none;
          top: 0px;
          width: 95%;
          height: 94%;
          border-radius: 8px;
          background: rgba(0,0,0,0.4);
          text-align: center;
          padding: 36px 80px;
          /deep/.el-button--mini, .el-button--mini.is-round{
            margin: 8px;
          }
        }
        .application:hover .applicationDescButton{
          color: #fff;
          background: rgb(87, 87, 239);
          border-radius: 10px;
          cursor: pointer;
        }
        .application:hover .applicationDevButton{
          color: #fff;
          background: #26e426;
          border-radius: 10px;
          cursor: pointer;
        }
        .application:hover .applicationEorrButton{
          color: #fff;
          background: #ee5195;
          border-radius: 10px;
          cursor: pointer;
        }
        .applicationUp{
          border-radius: 10px;
          background:url('../../assets/img/上架背景.png') no-repeat center;
        }
        .applicationUpMouse{
          border-radius: 10px;
          background:url('../../assets/img/上架背景鼠标.png') no-repeat center;
          filter:progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);
          -moz-box-shadow: 2px 2px 10px #909090;
          -webkit-box-shadow: 2px 2px 10px #909090;
          box-shadow:2px 2px 10px #909090;
        }
        .applicationDown{
          border-radius: 10px;
          background:url('../../assets/img/下架背景.png') no-repeat center;
        }
        .applicationDownMouse{
          border-radius: 10px;
          background:url('../../assets/img/下架背景鼠标.png') no-repeat center;
          filter:progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);
          -moz-box-shadow: 2px 2px 10px #909090;
          -webkit-box-shadow: 2px 2px 10px #909090;
          box-shadow:2px 2px 10px #909090;
        }
      }
      .main-box:hover .applicationMaskLayer{
        display: block;
      }
    }
  }
    .applicationRunControllerTitle{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    font-weight: bold;
    padding-left: 10px;
  }
  .applicationRunControllerBody{
    width: 100%;
    padding: 0px 10px;
    .applicationRunControllerItem{
      width: 100%;
      border: 1px solid gray;
      border-radius: 7px;
      .applicationRunContrllerItemTitle{
        display: block;
        width: 70px;
        height: 30px;
        line-height: 30px;
        position: relative;
        top: -15px;
        left: 20px;
        text-align: center;
        background: white;
        font-weight: bold;
      }
      .productionInfo{
        padding: 0 30px 20px 30px;
        /deep/.el-form-item:not(:first-child){
          margin-top: 20px;
        }
        /deep/.el-button--primary{
          color: #fff;
          border-bottom-left-radius: 0;
          border-top-left-radius: 0;
        }
        .storePath{
          /deep/.el-input__inner{
            width: 400px;
          }
        }
        .storeSize{
          /deep/.el-input__inner{
            width: 497px;
          }
        }
      }
      .modulationParam{
        padding: 0 30px 20px 30px;
        .modulationParamMarginTop{
          margin-top: 20px;
        }
        /deep/.el-select{
          width: 205px;
        }
      }
      .decodingParams{
        padding: 0 30px 20px 30px;
        .decodingParamsMarginTop{
          margin-top: 20px;
        }
        /deep/.el-select{
          width: 205px;
        }
      }
    }
    .applicationRunControllerItemMarginTop{
      margin-top: 30px;
    }
  }
}
</style>>
</style>