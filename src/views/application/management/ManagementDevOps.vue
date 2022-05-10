<template>
  <div class="management">
    <div class="left">
      <div class="list-tree">
        <div class="title">
          <img src="../../../assets/img/全部菜单.png"/>
          <span style="margin-left:10px;color: #3f3fec;font-weight: bold;">全部类型</span>
        </div>
        <div>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleCloseMenu"
            unique-opened
          >
            <el-menu-item>
              <img class="menuImage" src="../../../assets/img/待上架菜单.png"/>
              <span slot="title">待上架<span style="float: right;">2</span></span>
            </el-menu-item>
            <el-menu-item>
              <img class="menuImage" src="../../../assets/img/待授权菜单.png"/>
              <span slot="title">待授权<span style="float: right;">6</span></span>
            </el-menu-item>
            <el-menu-item>
              <img class="menuImage" src="../../../assets/img/应用异常菜单.png"/>
              <span slot="title">应用异常<span style="float: right;color:red;">9</span></span>
            </el-menu-item>
            <el-menu-item>
              <img class="menuImage" src="../../../assets/img/未通过菜单.png"/>
              <span slot="title">未通过</span>
            </el-menu-item>
            <el-menu-item>
              <img class="menuImage" src="../../../assets/img/已完成菜单.png"/>
              <span slot="title">已完成</span>
            </el-menu-item>
            <el-menu-item>
              <img class="menuImage" src="../../../assets/img/已下架菜单.png"/>
              <span slot="title">已下架</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="right">
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
      <div class="main-content">
        <div class="main-head">
          <div class="main-head-left">
            <span>应用中心</span>
            <!-- <el-button type="primary" @click="handleAdd(item)" size="medium">
              <i class="el-icon-plus"></i>应用开发
            </el-button> -->
          </div>
          <div class="main-head-right">
            <el-select
              style="width: 160px"
              v-model="allZT"
              placeholder="全部状态"
              size="medium"
            >
              <el-option
                v-for="item in ZToptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              style="width: 160px"
              class="mlr10"
              v-model="allTP"
              placeholder="全部类型"
              size="medium"
            >
              <el-option
                v-for="item in TPoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input
              style="width: 250px"
              placeholder="输入应用名称或创建人"
              suffix-icon="el-icon-search"
              size="medium"
              v-model="search_task"
            >
            </el-input>
          </div>
        </div>
        
        <div class="main-body">
          <div class="main-box" v-for="(item, index) in allmain" :key="index">
            <div class="application" :class="applicationBackGorundClass(item)" @mouseover="applicationClassMouseOver($event,item)" @mouseout="applicationClassMouseLeave($event,item)">
              <div class="applicationDesc">
                <img class="applicationImage" :src="getStatusImageUrl(item)">
                <div style="margin-left: 30px;">
                  <div style="margin-top:7px;"><span style="font-size: 16px;font-weight: bold;min-width:70px;">{{item.name}}</span><span style="width: 90px;display: inline-block;">【{{item.type}}】</span></div>
                  <div class="applicationDescPadding" style="color:#d6d3d3;">{{item.desc}}</div>
                </div>
                <div style="position: absolute;right: 20px;">
                  <div class="applicationDescButton" @click="checkInfo">查看详情</div>
                  <div v-if="item.status == '1-2'" class="applicationDevButton" style="">审批上架</div>
                  <div v-if="item.status == '1-1'" class="applicationDevButton" @click="applicationAuth">应用授权</div>
                  <div v-if="item.status.indexOf('1-4') >= 0" class="applicationEorrButton" style="">发送提醒</div>
                </div>
              </div>
              <div class="applicationBottom">
                <!-- <span><span style="color:#a5c9e8;">发布时间：</span>{{item.time}}</span>
                <span style="position: absolute;right: 30px;"><span style="color:#a5c9e8;">用户数：</span><span style="font-size: 16px;font-weight: bold;">{{item.userNum}}</span></span> -->
                <div class="applicationBottomDesc">
                  <div class="header pd">开发者</div>
                  <div class="body pd">李家发</div>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="applicationBottomDesc">
                  <div class="header pd">部署时间</div>
                  <div class="body pd">{{item.time}}</div>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="applicationBottomDesc">
                  <div class="header pd">组件数量</div>
                  <div class="body pd">3</div>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="applicationBottomDesc">
                  <div class="header pd">处理流程</div>
                  <div class="body pd">2</div>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="applicationBottomDesc">
                  <div class="header pd">用户数量</div>
                  <div class="body pd">{{item.userNum}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <Pagination /> -->
    </div>

        <!-- 组件授权-->
    <el-dialog
      title="应用授权"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :visible.sync="zjsqDialogVisible"
      center
      width="40%"
      :before-close="handleClose"
    >
      <div style="height: 40px;line-height: 40px;padding-left: 45px;background-color: #f3f0f0;">
        <span style="font-weight: bold;">目标数据解调1</span>
        <span style="color: #2222c7;">【标签名】</span>
      </div>
      <!-- 组件详情 -->
      <div class="zjsqClass">
        <div>
          <span class="zjsqSpanClass">版本：</span>
          <span>20210619</span>
        </div>
        <div>
          <span class="zjsqSpanClass">创建人：</span>
          <span>尼古拉</span>
        </div>
        <div>
          <span class="zjsqSpanClass">申请时间：</span>
          <span>2021-06-19</span>
        </div>
        <div>
          <span class="zjsqSpanClass">类型：</span>
          <span>解调-目标-船</span>
        </div>
        <div>
          <span class="zjsqSpanClass">状态：</span>
          <span>带授权</span>
        </div>
        <div>
          <span class="zjsqSpanClass">上架时间：</span>
          <span>2021-06-19</span>
        </div>
        <div style="width:100%;">
          <span class="zjsqSpanClass">描述：</span>
          <span>组件的一段主要功能描述</span>
        </div>
      </div>
      <!-- 授权表头 -->
      <div style="width:100%;height:40px;background-color: #f3f0f0;position: relative;">
        <span style="width:110px;height:100%;display: inline-block;background-color:blue;"></span>
        <el-button style="position: absolute;right: 10px;top: 5px;" size="small" type="primary" icon="el-icon-upload2" >授权</el-button>
      </div>
      <!-- 授权列表 -->
      <div class="deploy-main">
        <div class="bs">
          <div class="bs-l">
            <div class="bs-l-top">
              <div>
                <span class="he">开发人员</span>
                <span>({{ ip.length }})</span>
              </div>
              <div class="mr5">
                <el-checkbox></el-checkbox>
              </div>
            </div>
            <div class="bs-l-main">
              <el-input
                suffix-icon="el-icon-search"
                size="small"
                placeholder="搜索人员"
                :data="fw"
              ></el-input>
              <div class="list-box">
                <ul>
                  <li v-for="(item, index) in ip" :key="index" class="line-h">
                    <template>
                      <div class="row-l">
                        <div class="dfc">
                          <img
                            class="mr5 ml5"
                            src="../../../assets/img/校准.png"
                          />
                          <span style="display: inline-block;width: 50px;">{{ item.name }}</span>
                          <span>{{ item.desc }}</span>
                        </div>
                        <div>
                          <el-checkbox class="mr5"></el-checkbox>
                        </div>
                      </div>
                    </template>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="bs-r">
            <div class="bs-l-top">
              <div>
                <span class="he">已选人员</span>
                <span>({{ ip.length }})</span>
              </div>
              <div class="mr5">
                <img src="../../../assets/img/异常信息.png" />
              </div>
            </div>
            <div class="bs-l-main">
              <el-input
                suffix-icon="el-icon-search"
                size="small"
                placeholder="搜索已人员"
                :data="fw"
              ></el-input>
              <div class="list-box">
                <ul>
                  <li
                    v-for="(item, index) in ip"
                    :key="index"
                    class="line-h"
                    @mouseenter="xs(index)"
                  >
                    <div class="row-l">
                      <div class="dfc">
                        <img class="mr5 ml5" src="../../../assets/img/完成.png" />
                        <span style="display: inline-block;width: 50px;">{{ item.name }}</span>
                        <span>{{ item.desc }}</span>
                      </div>
                      <div>
                        <img
                          class="del"
                          src="../../../assets/img/关闭，错误 拷贝.png"
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "../../../components/Pagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      // 搜索框
      search_task: "",
      zjsqDialogVisible: false,
      ip: [
        {
          name: "李琦",
          desc: '（组件：8，应用：1）'
        },
        {
          name: "张晓月",
          desc: '（组件：8，应用：1）'
        },
        {
          name: "李琦",
          desc: '（组件：8，应用：1）'
        },
        {
          name: "张晓月",
          desc: '（组件：8，应用：1）'
        },
        {
          name: "李琦",
          desc: '（组件：8，应用：1）'
        },
        {
          name: "张晓月",
          desc: '（组件：8，应用：1）'
        },
        {
          name: "李琦",
          desc: '（组件：8，应用：1）'
        },
        {
          name: "张晓月",
          desc: '（组件：8，应用：1）'
        },
      ],
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
          time: "2021-01-01",
          desc: "应用的一段描述",
          userNum: 50,
        },
        {
          name: "广西边防",
          status: '2-1',
          type: "侦守",
          time: "2021-01-01",
          desc: "应用的一段描述",
          userNum: 50,
        },
        {
          name: "西沙航巡",
          status: '1-2',
          type: "侦察",
          time: "2021-01-01",
          desc: "应用的一段描述",
          userNum: 20,
        },
        {
          name: "新疆边防",
          status: '1-3',
          type: "侦守",
          time: "2021-01-01",
          desc: "应用的一段描述",
          userNum: 30,
        },
        {
          name: "西藏边防",
          status: '1-4',
          type: "侦守",
          time: "2021-01-01",
          desc: "应用的一段描述",
          userNum: 40,
        },
        {
          name: "广西巡航",
          status: '2-1',
          type: "侦察",
          time: "2021-01-01",
          desc: "应用的一段描述",
          userNum: 60,
        },
        {
          name: "云南边防",
          status: '1-3',
          type: "控守",
          time: "2021-01-01",
          desc: "应用的一段描述",
          userNum: 80,
        },
        {
          name: "黑龙江边防",
          status: '1-4',
          type: "控守",
          time: "2021-01-01",
          desc: "应用的一段描述",
          userNum: 90,
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
      let routeData = this.$router.resolve({
        path: "/application/management/black",
      });
      window.open(routeData.href, "_blank");
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
        return require('../../../assets/img/已上架.png');
      }
      //下架
      if(item.status == '2-1'){
        return require('../../../assets/img/下架.png');
      }
      //待审批
      if(item.status == '1-2'){
        return require('../../../assets/img/待审批.png');
      }
      //未通过
      if(item.status == '1-3'){
        return require('../../../assets/img/未通过.png');
      }
      //已上架异常
      if(item.status == '1-4'){
        return require('../../../assets/img/已上架异常.png');
      }
    },
    applicationClassMouseOver($event, item){
      if(item.status.indexOf('1-') >= 0){
        $event.currentTarget.className = 'application applicationUpMouse';
      }
      if(item.status.indexOf('2-') >= 0){
        $event.currentTarget.className = 'application applicationDownMouse';
      }
    },
    applicationClassMouseLeave($event, item){
      if(item.status.indexOf('1-') >= 0){
        $event.currentTarget.className = 'application applicationUp';
      }
      if(item.status.indexOf('2-') >= 0){
        $event.currentTarget.className = 'application applicationDown';
      }
    },
        //授权
    applicationAuth(row){
      this.zjsqDialogVisible = true;
    },
    checkInfo(){
      this.$router.push('/fidlddata')
    }
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
  // padding: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  // margin: 15px;
  // background: white;
  .left{
    .list-tree {
      width: 200px;
      height: 100%;
      line-height: 36px;
      background: #f5f9ff;
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      .menutitle {
        img {
          margin-left: 10px !important;
        }
      }
      .menuImage{
        margin-right: 10px;
      }
      .title {
        padding-left: 20px;
        display: flex;
        align-items: center;
        background: white;

        span {
          color: black;
          font-size: 16px;
          margin-right: 10px;
        }
        div {
          background: white;
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          border-radius: 20px;
        }
      }
    }
  }
  .right{
    overflow-y: auto;
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
    .main-content {
      display: flex;
      flex-wrap: wrap;
      // height: calc(100% - 180px);
      background-color: #fff;
      .main-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 50px;
        height: 50px;
        background-color: #fff;
        padding: 0 15px;
        border-bottom: 1px solid #f8f9fa;
        width: 100%;
        .main-head-left {
          line-height: 30px;
          height: 30px;
          span {
            margin-right: 10px;
          }
        }
        .main-head-right {
          display: flex;
        }
      }
      .main-body{
        display: flex;
        flex-wrap: wrap;
        padding-right: 20px;
        // height: calc(100vh - 230px);
        .main-box{
          padding-left: 30px;
          padding-top: 10px;
          .application{
            width: 455px;
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
                margin-top: 10px;
                text-align: center;
              }
            }
            .applicationBottom{
              height: 50px;
              padding: 20px;
              display: flex;
              align-items: center;
              justify-content: space-between;
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
            background:url('../../../assets/img/上架背景.png') no-repeat center;
            background-size: 100% 100%;
          }
          .applicationUpMouse{
            background:url('../../../assets/img/上架背景鼠标.png') no-repeat center;
            background-size: 100% 100%;
            filter:progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);
            -moz-box-shadow: 2px 2px 10px #909090;
            -webkit-box-shadow: 2px 2px 10px #909090;
            box-shadow:2px 2px 10px #909090;
          }
          .applicationDown{
            background:url('../../../assets/img/下架背景.png') no-repeat center;
            background-size: 100% 100%;
          }
          .applicationDownMouse{
            background:url('../../../assets/img/下架背景鼠标.png') no-repeat center;
            background-size: 100% 100%;
            filter:progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);
            -moz-box-shadow: 2px 2px 10px #909090;
            -webkit-box-shadow: 2px 2px 10px #909090;
            box-shadow:2px 2px 10px #909090;
          }
        }
      }
  
      // padding: 10px;
      // .main-box {
      //   display: flex;
      //   background-color: #fff;
      //   flex-direction: column;
      //   width: calc(20% - 10px);
      //   height: calc(25% - 10px);
      //   padding: 15px;
      //   border-radius: 4px;
      //   margin: 5px;
      //   position: relative;
      //   &:nth-child(5n) {
      //     margin-right: 0;
      //   }
      //   &:hover {
      //     .discl {
      //       display: flex;
      //     }
      //   }
      //   .discl {
      //     border-radius: 4px;
      //     display: none;
      //     border: 1px solid #8db4fc;
      //     position: absolute;
      //     left: 0;
      //     top: 0;
      //     justify-content: center;
      //     align-items: center;
      //     width: 100%;
      //     height: 100%;
      //     z-index: 9;
      //     background: rgba(26, 29, 33, 80%);
      //     > div {
      //       display: flex;
      //       flex-direction: column;
      //       align-items: center;
      //     }
      //     .starbtn {
      //       width: 120px;
      //       margin-bottom: 15px;
      //     }
      //   }
      //   .box_head {
      //     display: flex;
      //     align-items: center;
      //     margin-bottom: 10px;
      //     font-size: 12px;
      //     img {
      //       margin-right: 20px;
      //     }
      //     > div {
      //       width: 100%;
      //       .name {
      //         margin-right: 10px;
      //         font-size: 14px;
      //         font-weight: bold;
      //       }
      //       .box-time {
      //         display: flex;
      //         width: 100%;
      //         margin-top: 10px;
      //         justify-content: space-between;
      //         color: #b1aeae;
      //       }
      //     }
      //   }
      //   .box_main {
      //     flex: 1;
      //     padding: 10px 15px;
      //     border-radius: 5px;
      //     > div {
      //       display: flex;
      //       flex-wrap: wrap;
      //       // background: #7186a7;
      //       justify-content: space-between;
      //       overflow: hidden;
      //       background-color: #ccd3dd;
      //       height: 100%;
      //       color: #fff;
      //     }
      //     .box_mainbox {
      //       font-size: 12px;
      //       width: calc(50% - 0.5px);
      //       height: calc(50% - 0.5px);
      //       display: flex;
      //       padding: 0 10px;
      //       align-items: center;
      //       justify-content: space-around;
      //       &:nth-child(3),
      //       &:nth-child(4) {
      //         align-self: flex-end;
      //       }
      //       .num {
      //         font-size: 20px;
      //       }
      //     }
      //   }
      // }
    }
  }
  .zjsqClass{
    display: flex;
    flex-wrap: wrap;
    div{
      padding: 10px;
      width: 33%;
    }
    .zjsqSpanClass{
      width: 80px;
      display: inline-block;
      text-align: right;
    }
  }
    .deploy-main {
    .bs {
      display: flex;
      padding: 15px;
      justify-content: space-between;
      .bs-l {
        width: 45%;
        border: 1px solid #e3e3e3;
        border-radius: 10px 10px 10px 10px;
        .bs-l-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 40px;
          color: white;
          background: #4e5c72;
          border-radius: 10px 10px 0 0;
          padding: 0 15px;
          .he {
            font-size: 16px;
            margin-right: 10px;
          }
        }
        .bs-l-main {
          padding: 10px;
        }

        .bcol {
          background: #4e5c72;
          line-height: 40px;
          color: white;
          padding-left: 15px;
          border-radius: 5px 5px 0 0;
        }
        .row-l {
          display: flex;
          justify-content: space-between;
        }
        .list-box {
          height: 365px;
          overflow: hidden;
          overflow: scroll;
          padding: 0 5px;
          li{
            margin-top: 10px;
          }
        }
      }
      .bs-r {
        width: 45%;
        border: 1px solid #e3e3e3;
        border-radius: 10px 10px 10px 10px;
        .bs-l-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 40px;
          color: white;
          background: #0084f2;
          border-radius: 10px 10px 0 0;
          padding: 0 15px;
          .he {
            font-size: 16px;
            margin-right: 10px;
          }
        }
        .bs-l-main {
          padding: 10px;
        }
        .bcol {
          background: #4e5c72;
          line-height: 40px;
          color: white;
          padding-left: 15px;
          border-radius: 5px 5px 0 0;
        }
        .row-l {
          display: flex;
          justify-content: space-between;
          .del {
            display: none;
          }
        }
        .list-box {
          height: 365px;
          overflow: hidden;
          overflow: scroll;
          padding: 0 5px;
          li{
            margin-top: 10px;
          }
        }
      }
    }
    // .bs-bt {
    //   display: flex;
    //   justify-content: center;
    // }
  }
}
</style>>
</style>