<template>
  <div class="management">
    <div class="left">
      <div class="list-tree">
        <div class="title">
          <img src="../../../assets/img/全部菜单.png" />
          <span style="margin-left: 10px; color: #3f3fec; font-weight: bold">全部应用</span>
        </div>
        <div>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleCloseMenu"
            unique-opened
          >
            <el-menu-item index="1">
              <img class="menuImage" src="../../../assets/img/待上架菜单.png" />
              <span slot="title">运行中<span style="float: right">2</span></span>
            </el-menu-item>
            <el-menu-item index="2">
              <img class="menuImage" src="../../../assets/img/待授权菜单.png" />
              <span slot="title">空闲中<span style="float: right">6</span></span>
            </el-menu-item>
            <el-menu-item index="3">
              <img class="menuImage" src="../../../assets/img/应用异常菜单.png" />
              <span slot="title">异常应用<span style="float: right; color: red">9</span></span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="main-content">
        <div class="main-head">
          <div class="main-head-left">
            <span>全部应用</span>
          </div>
          <div class="main-head-right">
            <el-select style="width: 160px" v-model="allZT" placeholder="全部状态" size="medium">
              <el-option v-for="item in ZToptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select style="width: 160px" class="mlr10" v-model="allTP" placeholder="全部类型" size="medium">
              <el-option v-for="item in TPoptions" :key="item.value" :label="item.label" :value="item.value">
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
            <div class="application" :class="applicationBackGorundClass(item)">
              <div class="applicationDesc">
                <img class="applicationImage" :src="getStatusImageUrl(item)" />
                <div style="margin-left: 30px">
                  <div style="margin-top: 7px">
                    <span
                      :style="{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        minWidth: '70px',
                        color: item.status == '1-3' ? '#d65c5c' : '#fff',
                      }"
                      >{{ item.name }}</span
                    ><span style="width: 90px; display: inline-block">【{{ item.type }}】</span>
                  </div>
                  <div class="applicationDescPadding" style="color: #d6d3d3">{{ item.desc }}</div>
                </div>
              </div>
              <div class="applicationBottom">
                <div class="applicationBottomDesc">
                  <div class="header pd">开发时间</div>
                  <div class="body pd">{{ item.startTime }}</div>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="applicationBottomDesc">
                  <div class="header pd">{{ item.status == "1-3" ? "异常时间" : "结束时间" }}</div>
                  <div class="body pd" :style="{ color: item.status == '1-3' ? '#d65c5c' : '#fff' }">
                    {{ item.time }}
                  </div>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="applicationBottomDesc">
                  <div class="header pd">数据总量</div>
                  <div class="body pd">{{ item.totalData }}</div>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="applicationBottomDesc">
                  <div class="header pd">{{ item.status == "1-3" ? "失败流程" : "运行流程" }}</div>
                  <div class="body pd" :style="{ color: item.status == '1-3' ? '#d65c5c' : '#fff' }">
                    {{ item.flowNum }}
                  </div>
                </div>
              </div>
            </div>
            <div class="applicationMaskLayer">
              <el-button size="mini" type="success" @click="openApplicationData()"
                ><i class="el-icon-coin"></i>应用数据</el-button
              >
              <el-button size="mini" type="warning" @click="applicationRunController()"
                ><i class="el-icon-guide"></i>运行控制</el-button
              >
              <el-button size="mini" type="primary"><i class="el-icon-right"></i>打开应用</el-button>
              <el-button size="mini" type="primary" @click="openApplicationInstance()"
                ><i class="el-icon-set-up"></i>运行实例</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <!-- <Pagination /> -->
    </div>
    <!-- 运行实例 -->
    <el-dialog
      title="实例详情"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :visible.sync="applicationInstance"
      center
      width="80%"
      :before-close="handleClose"
    >
      <div class="applicationInstanceClass">
        <el-row>
          <el-col :span="6">
            <div class="left">
              <div class="instanceTitle">流程实例-xxx-wx信号网路处理</div>
              <div>
                <el-input placeholder="请输入内容" v-model="searchData.name" class="input-with-select">
                  <el-select v-model="searchData.type" slot="prepend" placeholder="请选择">
                    <el-option label="成功" value="1"></el-option>
                    <el-option label="失败" value="2"></el-option>
                    <el-option label="异常" value="3"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <div>
                <el-menu
                  default-active="1"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleCloseMenu"
                  unique-opened
                >
                  <el-menu-item :index="index" v-for="(item, index) in instanceData" :key="index">
                    <span
                      :class="{ instanceItemOkStatus: item.status == 1, instanceItemErrorStatus: item.status != 1 }"
                    ></span>
                    <span slot="title"
                      >{{ item.name }}<span style="float: right">{{ item.time }}</span></span
                    >
                  </el-menu-item>
                </el-menu>
              </div>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="right">
              <div class="instanceFlow">
                <div class="flowDagImage">
                  <div class="flowTitle">
                    <span class="mgL20" style="color: #00aeff">【运行中】</span>
                    <span class="mgL20" style="font-size: 18px; font-weight: bold">应用名称-流程实例名称</span>
                    <span class="mgL20">开始时间 06-12 14:20</span>
                  </div>
                  <div class="flowContent" id="containerChart"></div>
                </div>
                <div class="flowLog">
                  <div class="flowLogTitle">
                    <span>流程日志</span><span style="float: right"><i class="el-icon-view"></i>隐藏</span>
                  </div>
                  <div class="flowLogContent">
                    <div class="flowLogContentItem" v-for="(item, index) in componentLog" :key="index">
                      <div :class="{ flowComponentNameOk: item.status == 1, flowComponentNameError: item.status != 1 }">
                        【{{ item.name }}】
                      </div>
                      <div class="flowComponentContent">{{ item.log }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="instanceItemInfo">
                <div class="flowComponentParticularsTitle">组件详情</div>
                <div class="flowComponentParticularsContent">
                  <el-collapse v-model="childrenActiveNames">
                    <el-collapse-item name="1">
                      <template slot="title">
                        <el-button class="collapseButton" type="primary" size="mini">基本信息</el-button>
                        <i class="el-icon-minus"></i>
                        <i class="el-icon-minus"></i>
                        <span>收起</span>
                      </template>
                      <div>
                        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px">
                          <el-form-item label="流程ID:"> 12345678900 </el-form-item>
                          <el-form-item label="组件运行地址：">192.168.3.59</el-form-item>
                          <el-form-item label="预计执行时间：">2021-3-10 12:32:34</el-form-item>
                          <el-form-item label="状态：">成功</el-form-item>
                          <el-form-item label="开始时间：">2021-3-10 12:32:34</el-form-item>
                          <el-form-item label="结束时间：">2021-3-10 12:35:34</el-form-item>
                        </el-form>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="2">
                      <template slot="title">
                        <el-button class="collapseButton" type="primary" size="mini">运行参数</el-button>
                        <i class="el-icon-minus"></i>
                        <i class="el-icon-minus"></i>
                        <span>收起</span>
                      </template>
                      <div>
                        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px">
                          <el-form-item label="节点参数:">{xxx:xxx,yyyy:yyyy}</el-form-item>
                          <el-form-item label="流程参数：">{xxx:xxx,yyy:yyyy}</el-form-item>
                          <el-form-item label="流程结果：">信号解调成功，已将业务数据保存到指定位置</el-form-item>
                          <el-form-item label="是否启用：">启用</el-form-item>
                          <el-form-item label="失败跳过：">禁用</el-form-item>
                        </el-form>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="3">
                      <template slot="title">
                        <span><el-button class="collapseButton" type="primary" size="mini">接口说明</el-button> </span>
                        <i class="el-icon-minus"></i>
                        <i class="el-icon-minus"></i>
                        <span> 收起 </span>
                      </template>
                      <div>
                        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px">
                          <el-form-item label="接口名:">用户信息接口</el-form-item>
                          <el-form-item label="接口：">com.sinx.user.manager.UserInfo</el-form-item>
                        </el-form>
                        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px">
                          <el-form-item label="参数1：">用户名称</el-form-item>
                          <el-form-item label="参数2：">用户年龄</el-form-item>
                          <el-form-item label="参数3：">用户性别</el-form-item>
                          <el-form-item label="参数4：">家庭地址</el-form-item>
                          <el-form-item label="参数5：">手机号码</el-form-item>
                          <el-form-item label="参数6：">电子邮箱</el-form-item>
                        </el-form>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- 应用数据 -->
    <el-dialog
      title="xxx-wx信号网路处理 - 应用数据"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :visible.sync="applicationData"
      center
      width="70%"
      :before-close="handleClose"
    >
      <div class="applicationDataClass">
        <div class="operationToolbar operationToolbarTextClass">
          <span class="mgL20">数据列表</span>
          <el-button
            class="mgL20 operationToolbarTextClass"
            @mouseleave="downloadButtonType = 'text'"
            @mouseover="downloadButtonType = 'success'"
            :type="downloadButtonType"
            icon="el-icon-download"
            >下载</el-button
          >
          <el-button
            class="mgL20 operationToolbarTextClass"
            @mouseleave="deleteButtonType = 'text'"
            @mouseover="deleteButtonType = 'danger'"
            :type="deleteButtonType"
            icon="el-icon-delete"
            >删除</el-button
          >
          <span style="float: right; margin-right: 20px">应用数据总量：123（GB）</span>
        </div>
        <div class="searchToolbar">
          <el-row>
            <el-col :span="8">
              <i class="el-icon-arrow-left mgL20"></i>
              <i class="el-icon-arrow-right mgL20"></i>
              <i class="el-icon-refresh-right mgL20"></i>
              <el-divider class="mgL20" direction="vertical"></el-divider>
              <span class="mgL20">全部数据</span>
              <i class="el-icon-arrow-right mgL20"></i>
            </el-col>
            <el-col :span="16">
              <el-select style="width: 160px" v-model="allZT" placeholder="全部类型" size="medium">
                <el-option v-for="item in ZToptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-divider direction="vertical"></el-divider>
              <el-date-picker
                v-model="searchData.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
              <el-divider direction="vertical"></el-divider>
              <el-input
                style="width: 250px"
                placeholder="输入关键词搜索"
                suffix-icon="el-icon-search"
                size="medium"
                v-model="search_task"
              >
              </el-input>
            </el-col>
          </el-row>
        </div>
        <div class="applicationDataTable">
          <Table :tableData="tableData"></Table>
          <Pagination></Pagination>
        </div>
      </div>
    </el-dialog>
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
      <div class="applicationRunControllerTitle"><span style="color: #5c5cf9">海南巡航</span>【侦察】</div>
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
                      :file-list="fileList"
                    >
                      <el-button type="primary">浏览路径</el-button>
                    </el-upload>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="存储大小：">
                <el-input placeholder="数据存储数据大小" v-model="input2" class="storeSize"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="applicationRunControllerItem applicationRunControllerItemMarginTop">
          <span class="applicationRunContrllerItemTitle">调制参数 </span>
          <div class="modulationParam" style="padding: 0 30px 20px 30px">
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
import Table from "./comp/Table";
import Pagination from "../../../components/Pagination.vue";
import { Graph, Shape, Addon, NodeView } from "@antv/x6";
export default {
  components: {
    Table,
    Pagination,
  },
  data() {
    return {
      // 搜索框
      search_task: "",
      applicationRunConttl: false,
      applicationData: false,
      applicationInstance: false,
      downloadButtonType: "text",
      deleteButtonType: "text",
      searchData: {
        time: "",
        type: "",
        name: "",
      },
      ip: [
        {
          name: "李琦",
          desc: "（组件：8，应用：1）",
        },
        {
          name: "张晓月",
          desc: "（组件：8，应用：1）",
        },
        {
          name: "李琦",
          desc: "（组件：8，应用：1）",
        },
        {
          name: "张晓月",
          desc: "（组件：8，应用：1）",
        },
        {
          name: "李琦",
          desc: "（组件：8，应用：1）",
        },
        {
          name: "张晓月",
          desc: "（组件：8，应用：1）",
        },
        {
          name: "李琦",
          desc: "（组件：8，应用：1）",
        },
        {
          name: "张晓月",
          desc: "（组件：8，应用：1）",
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
          status: "1-1",
          type: "侦察",
          startTime: "2021-03-12",
          time: "2021-01-01",
          desc: "应用的一段描述",
          totalData: "3GB",
          flowNum: 50,
        },
        {
          name: "广西边防",
          status: "2-1",
          type: "侦守",
          startTime: "2021-03-12",
          time: "2021-01-01",
          desc: "应用的一段描述",
          totalData: "3GB",
          flowNum: 50,
        },
        {
          name: "西沙航巡",
          status: "1-2",
          type: "侦察",
          startTime: "2021-03-12",
          time: "",
          desc: "应用的一段描述",
          totalData: "3GB",
          flowNum: 20,
        },
        {
          name: "新疆边防",
          status: "1-3",
          type: "侦守",
          startTime: "2021-03-12",
          time: "2021-01-01",
          desc: "应用的一段描述",
          totalData: "3GB",
          flowNum: 30,
        },
        {
          name: "西藏边防",
          status: "1-4",
          type: "侦守",
          startTime: "2021-03-12",
          time: "2021-01-01",
          desc: "应用的一段描述",
          totalData: "3GB",
          flowNum: 40,
        },
        {
          name: "广西巡航",
          status: "2-1",
          type: "侦察",
          startTime: "2021-03-12",
          time: "2021-01-01",
          desc: "应用的一段描述",
          totalData: "3GB",
          flowNum: 60,
        },
        {
          name: "云南边防",
          status: "1-3",
          type: "控守",
          startTime: "2021-03-12",
          time: "2021-01-01",
          desc: "应用的一段描述",
          totalData: "3GB",
          flowNum: 80,
        },
        {
          name: "黑龙江边防",
          status: "1-4",
          type: "控守",
          startTime: "2021-03-12",
          time: "2021-01-01",
          desc: "应用的一段描述",
          totalData: "3GB",
          flowNum: 90,
        },
      ],
      num: 9999,
      applicationClass: {},
      tableData: [
        {
          instance: "实例名称一",
          dataType: "成果数据",
          specificType: "目标数据",
          kind: "民用",
          ip: "192.168.3.59",
          port: "8080",
          coordinate: "北纬30.56，东经120.03",
        },
        {
          instance: "实例名称一",
          dataType: "成果数据",
          specificType: "目标数据",
          kind: "民用",
          ip: "192.168.3.59",
          port: "8080",
          coordinate: "北纬30.56，东经120.03",
        },
        {
          instance: "实例名称一",
          dataType: "成果数据",
          specificType: "目标数据",
          kind: "民用",
          ip: "192.168.3.59",
          port: "8080",
          coordinate: "北纬30.56，东经120.03",
        },
        {
          instance: "实例名称一",
          dataType: "成果数据",
          specificType: "目标数据",
          kind: "民用",
          ip: "192.168.3.59",
          port: "8080",
          coordinate: "北纬30.56，东经120.03",
        },
        {
          instance: "实例名称一",
          dataType: "成果数据",
          specificType: "目标数据",
          kind: "民用",
          ip: "192.168.3.59",
          port: "8080",
          coordinate: "北纬30.56，东经120.03",
        },
      ],
      instanceData: [
        {
          name: "流程实例一",
          time: "08/29 12:32:40",
          status: 2,
          active: false,
        },
        {
          name: "流程实例一",
          time: "08/29 12:32:40",
          status: 2,
          active: false,
        },
        {
          name: "流程实例一",
          time: "08/29 12:32:40",
          status: 1,
          active: false,
        },
        {
          name: "流程实例一",
          time: "08/29 12:32:40",
          status: 1,
          active: false,
        },
      ],
      componentLog: [
        {
          name: "组件名称",
          log: "射点发射点啊手动阀手动阀啊手动阀手动阀点发射点阿斯顿发射点阿斯顿发射点阿斯顿发射点阿阿斯蒂芬",
          status: 1,
        },
        {
          name: "组件名称",
          log: "阀手动阀啊手动阀手动阀点阿斯顿发射点发射点啊手动阀手动阀啊手动阀手动阀点发射点阿斯顿发射点阿斯顿发射点阿斯顿发射点阿阿斯蒂芬",
          status: 2,
        },
        {
          name: "组件名称",
          log: "射点发射点啊手动阀手动阀啊手动阀手动阀点阿斯顿发射点发射点啊手动阀手动阀啊手动阀手动阿斯蒂芬",
          status: 2,
        },
        {
          name: "组件名称",
          log: "动阀点阿斯顿发射点发射点啊手动阀手动阀啊手动阀手动阀点发射点阿斯顿发射点阿斯顿发射点阿斯顿发射点阿阿斯蒂芬",
          status: 1,
        },
        {
          name: "组件名称",
          log: "点发射点啊手动阀手动阀啊手动阀手动阀点发射点阿斯顿发射点阿斯顿发射点阿斯顿发射点阿阿斯蒂芬",
          status: 1,
        },
      ],
      graph: "",
      //节点配置
      nodeConfig: {
        portMarkup: [
          {
            tagName: "circle",
            selector: "portBody",
          },
        ],
      },
      connectEdgeType: {
        //连线方式
        connector: "normal",
        router: {
          name: "",
        },
      },
      magnetAvailabilityHighlighter: {
        name: "stroke",
        args: {
          attrs: {
            fill: "#fff",
            stroke: "#47C769",
          },
        },
      },
      childrenActiveNames: ["1"],
      formInline: {},
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
    gaugeChartFunc(index, chartsData) {
      let val = 17;
      const gaugeChart = this.$echarts.init(this.$refs["gaugeChart" + index]);
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
    applicationBackGorundClass(item) {
      if (item.status.indexOf("1-") >= 0) {
        return {
          applicationUp: true,
        };
      }
      if (item.status.indexOf("2-") >= 0) {
        return {
          applicationDown: true,
        };
      }
    },
    getStatusImageUrl(item) {
      //上架
      if (item.status == "1-1") {
        return require("../../../assets/img/已上架.png");
      }
      //下架
      if (item.status == "2-1") {
        return require("../../../assets/img/下架.png");
      }
      //待审批
      if (item.status == "1-2") {
        return require("../../../assets/img/待审批.png");
      }
      //未通过
      if (item.status == "1-3") {
        return require("../../../assets/img/未通过.png");
      }
      //已上架异常
      if (item.status == "1-4") {
        return require("../../../assets/img/已上架异常.png");
      }
    },
    applicationClassMouseOver($event, item) {
      if (item.status.indexOf("1-") >= 0) {
        $event.currentTarget.className = "application applicationUpMouse";
      }
      if (item.status.indexOf("2-") >= 0) {
        $event.currentTarget.className = "application applicationDownMouse";
      }
    },
    applicationClassMouseLeave($event, item) {
      if (item.status.indexOf("1-") >= 0) {
        $event.currentTarget.className = "application applicationUp";
      }
      if (item.status.indexOf("2-") >= 0) {
        $event.currentTarget.className = "application applicationDown";
      }
    },
    //运行控制
    applicationRunController(row) {
      this.applicationRunConttl = true;
    },
    closeApplicationRunController() {
      this.applicationRunConttl = false;
    },
    openApplicationData() {
      this.applicationData = true;
    },
    openApplicationInstance() {
      this.applicationInstance = true;
      this.$nextTick(() => {
        if (!this.graph) {
          this.initAntvX6();
        }
        this.reloadData();
      });
    },
    checkInfo() {
      this.$router.push("/fidlddata");
    },
    //初始化画布
    initAntvX6() {
      let that_ = this;
      this.graph = new Graph({
        history: {
          enabled: true, //历史记录
          ignoreChange: true, //ignoreChange 是否忽略属性变化
        },
        clipboard: {
          enabled: true,
          useLocalStorage: true,
        },
        selecting: true,
        panning: true, //支持平移拖拽
        snapline: true, //对齐线
        resizing: {
          //调整节点宽高
          enabled: true, //历史记录
          orthogonal: false,
        },
        autoResize: true, //自动画布大小
        mousewheel: true, //鼠标轮滚缩放
        grid: that_.grid,
        container: document.getElementById("containerChart"),
        highlighting: {
          magnetAvailable: that_.magnetAvailabilityHighlighter,
          magnetAdsorbed: {
            name: "stroke",
            args: {
              attrs: {
                fill: "#fff",
                stroke: "#31d0c6",
              },
            },
          },
        },
        connecting: {
          snap: true, //自动吸附
          allowBlank: false,
          allowLoop: false,
          highlight: true,
          connector: "rounded",
          connectionPoint: "boundary",
          router: {
            name: "er",
            args: {
              direction: "V",
            },
          },
          createEdge() {
            return new Shape.Edge({
              router: {
                name: "manhattan",
                args: {
                  startDirections: ["bottom"],
                  endDirections: ["top"],
                },
              },
              attrs: {
                line: {
                  stroke: "#267FF7",
                  strokeWidth: 4,
                  targetMarker: {
                    name: "classic",
                    size: 12,
                  },
                },
              },
            });
          },
          validateConnection({ sourceView, targetView, targetMagnet }) {
            if (!targetMagnet) {
              return false;
            }
            if (targetMagnet.getAttribute("port-group") !== "in") {
              return false;
            }

            if (targetView) {
              const node = targetView.cell;
              const portId = targetMagnet.getAttribute("port");
              const usedInPorts = node.getUsedInPorts(that_.graph);
              if (usedInPorts.find((port) => port && port.id === portId)) {
                return false;
              }
            }
            return true;
          },
        },
      });

      this.graph.centerContent(); //画布居中
      this.graph.on("edge:connected", ({ previousView, currentView }) => {
        if (previousView) {
          that_.update(previousView);
        }
        if (currentView) {
          that_.update(currentView);
        }
      });

      this.graph.on("edge:removed", ({ edge, options }) => {
        if (!options.ui) {
          return;
        }

        const target = edge.getTargetCell();
        target.updateInPorts(graph);
      });

      this.graph.on("edge:mouseenter", ({ edge }) => {
        edge.addTools([
          "source-arrowhead",
          "target-arrowhead",
          {
            name: "button-remove",
            args: {
              distance: -30,
            },
          },
        ]);
      });

      this.graph.on("edge:mouseleave", ({ edge }) => {
        edge.removeTools();
      });

      // this.graph.on('node:click', ({ e, x, y, node, view }) => {
      //   node.attr({
      //     body:{
      //       stroke:"#1E9AFF"
      //     }
      //   });
      //  });

      this.graph.on("node:mouseenter", ({ e, x, y, node, view }) => {
        node.attr({
          body: {
            fill: "#9ECDF3",
            stroke: "#267FF7",
            strokeWidth: 2,
          },
        });
      });

      this.graph.on("node:mouseleave", ({ e, x, y, node, view }) => {
        node.attr({
          body: {
            fill: "#ECF4FB",
            stroke: "#ABD0FB",
            strokeWidth: 2,
          },
        });
      });
    },
    reloadData() {
      this.graph.paste({ useLocalStorage: true });
    },
    /**
     * 拖拽节点，并添加到画布中
     */
    dragNode(type, e) {
      let that_ = this;
      let nodeName = e.target.innerText;
      let node;
      if (type == "rect") {
        node = this.createRectNode(nodeName).updateInPorts(this.graph);
      }
      if (type == "circle") {
        node = this.createCircleNode(nodeName);
      }
      if (type == "polygon") {
        node = this.createPolygonNode(nodeName);
      }
      const dnd = new Addon.Dnd({ target: that_.graph });
      dnd.start(node, e);
    },

    /**
     * 创建画布节点
     * @param nodeType 创建画布节点的类型，rect、ellipse、polygon
     * @returns node 画布节点
     */
    createCircleNode(nodeName) {
      let that_ = this;
      let node = this.graph.createNode({
        shape: "circle",
        width: 100,
        height: 100,
        attrs: {
          label: {
            text: nodeName,
            fill: "#000000",
            fontSize: 14,
            textWrap: {
              width: -20,
              height: -10,
              ellipsis: true,
            },
          },
          body: {
            fill: "#ffffff",
            stroke: "#d9d9d9",
            strokeWidth: 1,
          },
        },
        ports: {
          items: [
            {
              group: "out",
            },
          ],
          groups: {
            in: {
              position: {
                name: "top",
              },
              attrs: {
                portBody: {
                  magnet: "passive",
                  r: 6,
                  stroke: "#ffa940",
                  fill: "#fff",
                  strokeWidth: 2,
                },
              },
            },
            out: {
              position: {
                name: "bottom",
              },
              attrs: {
                portBody: {
                  magnet: true,
                  r: 6,
                  fill: "#fff",
                  stroke: "#3199FF",
                  strokeWidth: 2,
                },
              },
            },
          },
        },
        portMarkup: that_.nodeConfig.portMarkup,
      });
      return node;
    },

    /**
     * 创建多边形节点
     */
    createPolygonNode(nodeName) {
      let that_ = this;
      let node = this.graph.createNode({
        shape: "polygon",
        x: 40,
        y: 40,
        width: 120,
        height: 120,
        attrs: {
          label: {
            text: nodeName,
            fill: "#000000",
            fontSize: 14,
            textWrap: {
              width: -10,
              height: -10,
              ellipsis: true,
            },
          },
          body: {
            fill: "#ffffff",
            stroke: "#000000",
            refPoints: "0,10 10,0 20,10 10,20",
            strokeWidth: 1,
          },
        },
        ports: {
          items: [
            {
              id: "out1",
              group: "out1",
            },
            {
              id: "out2",
              group: "out2",
            },
            {
              id: "out3",
              group: "out3",
            },
            {
              id: "out4",
              group: "out4",
            },
          ],
          groups: {
            in: {
              position: {
                name: "top",
              },
              attrs: {
                portBody: {
                  magnet: "passive",
                  r: 6,
                  stroke: "#ffa940",
                  fill: "#fff",
                  strokeWidth: 2,
                },
              },
            },
            out1: {
              position: {
                name: "top",
              },
              attrs: {
                portBody: {
                  magnet: true,
                  r: 6,
                  fill: "#fff",
                  stroke: "#3199FF",
                  strokeWidth: 2,
                },
              },
            },
            out2: {
              position: {
                name: "right",
              },
              attrs: {
                portBody: {
                  magnet: true,
                  r: 6,
                  fill: "#fff",
                  stroke: "#3199FF",
                  strokeWidth: 2,
                },
              },
            },
            out3: {
              position: {
                name: "left",
              },
              attrs: {
                portBody: {
                  magnet: true,
                  r: 6,
                  fill: "#fff",
                  stroke: "#3199FF",
                  strokeWidth: 2,
                },
              },
            },
            out4: {
              position: {
                name: "bottom",
              },
              attrs: {
                portBody: {
                  magnet: true,
                  r: 6,
                  fill: "#fff",
                  stroke: "#3199FF",
                  strokeWidth: 2,
                },
              },
            },
          },
        },
        portMarkup: that_.nodeConfig.portMarkup,
      });
      return node;
    },

    /**
     * 创建矩形节点
     */
    createRectNode(nodeName) {
      // 定义节点
      class MyShape extends Shape.Rect {
        getInPorts() {
          return this.getPortsByGroup("in");
        }

        getOutPorts() {
          return this.getPortsByGroup("out");
        }

        getUsedInPorts(graph) {
          const incomingEdges = graph.getIncomingEdges(this) || [];
          return incomingEdges.map((edge) => {
            const portId = edge.getTargetPortId();
            return this.getPort(portId);
          });
        }

        getNewInPorts(length) {
          return Array.from(
            {
              length,
            },
            () => {
              return {
                group: "in",
              };
            }
          );
        }

        updateInPorts(graph) {
          const minNumberOfPorts = 2;
          const ports = this.getInPorts();
          const usedPorts = this.getUsedInPorts(graph);
          const newPorts = this.getNewInPorts(Math.max(minNumberOfPorts - usedPorts.length, 1));

          if (ports.length === minNumberOfPorts && ports.length - usedPorts.length > 0) {
            // noop
          } else if (ports.length === usedPorts.length) {
            this.addPorts(newPorts);
          } else if (ports.length + 1 > usedPorts.length) {
            this.prop(["ports", "items"], this.getOutPorts().concat(usedPorts).concat(newPorts), {
              rewrite: true,
            });
          }
          return this;
        }
      }

      Shape.Rect.prototype.getInPorts = function () {
        return this.getPortsByGroup("in");
      };

      Shape.Rect.prototype.getOutPorts = function () {
        return this.getPortsByGroup("out");
      };

      Shape.Rect.prototype.getUsedInPorts = function (graph) {
        const incomingEdges = graph.getIncomingEdges(this) || [];
        return incomingEdges.map((edge) => {
          const portId = edge.getTargetPortId();
          return this.getPort(portId);
        });
      };

      Shape.Rect.prototype.getNewInPorts = function (length) {
        return Array.from(
          {
            length,
          },
          () => {
            return {
              group: "in",
            };
          }
        );
      };

      Shape.Rect.prototype.updateInPorts = function (graph) {
        const minNumberOfPorts = 2;
        const ports = this.getInPorts();
        const usedPorts = this.getUsedInPorts(graph);
        const newPorts = this.getNewInPorts(Math.max(minNumberOfPorts - usedPorts.length, 1));

        if (ports.length === minNumberOfPorts && ports.length - usedPorts.length > 0) {
          // noop
        } else if (ports.length === usedPorts.length) {
          this.addPorts(newPorts);
        } else if (ports.length + 1 > usedPorts.length) {
          this.prop(["ports", "items"], this.getOutPorts().concat(usedPorts).concat(newPorts), {
            rewrite: true,
          });
        }
        return this;
      };

      let type = {
        attrs: {
          label: {
            text: nodeName,
            fill: "#333333",
            fontSize: 14,
            textWrap: {
              width: -10,
              height: -10,
              ellipsis: true,
            },
          },
          root: {
            magnet: false,
          },
          body: {
            fill: "#ECF4FB",
            stroke: "#ABD0FB",
            strokeWidth: 2,
            rx: 4,
            ry: 4,
          },
        },
        ports: {
          items: [
            {
              group: "out",
            },
          ],
          groups: {
            in: {
              position: {
                name: "top",
              },
              attrs: {
                portBody: {
                  magnet: "passive",
                  r: 6,
                  stroke: "#ffa940",
                  fill: "#fff",
                  strokeWidth: 4,
                },
              },
            },
            out: {
              position: {
                name: "bottom",
              },
              attrs: {
                portBody: {
                  magnet: true,
                  r: 6,
                  fill: "#fff",
                  stroke: "#3199FF",
                  strokeWidth: 4,
                },
              },
            },
          },
        },
        portMarkup: [
          {
            tagName: "circle",
            selector: "portBody",
          },
        ],
      };
      return new MyShape(type).resize(200, 80);
    },

    /**
     * 更新视图层
     */
    update(view) {
      const node = view.cell;
      node.getInPorts().forEach((port) => {
        const portNode = view.findPortElem(port.id, "portBody");
        view.unhighlight(portNode, {
          highlighter: this.magnetAvailabilityHighlighter,
        });
      });
      node.updateInPorts(this.graph);
    },
  },
  created() {},
  mounted() {
    for (let i = 0; i < this.gaugeChartData.length; i++) {
      this.gaugeChartFunc(i + 1, this.gaugeChartData[i]);
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
  .left {
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
      .menuImage {
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
      :deep(.el-menu-item.is-active) {
        border-left: 5px solid #409eff;
      }
    }
  }
  .right {
    overflow-y: auto;
    .main-content {
      display: flex;
      flex-wrap: wrap;
      // height: calc(100% - 180px);
      // background-color: #fff;
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
          font-size: 16px;
          font-weight: bold;
          margin-left: 15px;
        }
        .main-head-right {
          display: flex;
        }
      }
      .main-body {
        display: flex;
        flex-wrap: wrap;
        padding-right: 20px;
        .main-box {
          margin-left: 20px;
          margin-bottom: 10px;
          margin-top: 10px;
          border-radius: 10px;
          position: relative;
          .application {
            width: calc(23vw);
            height: 152px;
            position: relative;
            color: #fff;
            .applicationDesc {
              display: flex;
              height: 100px;
              padding: 20px;
              .applicationImage {
                width: 60px;
                height: 60px;
              }
              .applicationDescPadding {
                margin-top: 20px;
              }
              .applicationDescButton {
                color: #9d9dff;
                width: 84px;
                height: 30px;
                line-height: 30px;
                text-align: center;
              }

              .applicationDevButton {
                color: #26e426;
                width: 84px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                margin-top: 10px;
              }
              .applicationEorrButton {
                color: #ee5195;
                width: 84px;
                height: 30px;
                line-height: 30px;
                text-align: center;
              }
            }
            .applicationBottom {
              height: 50px;
              padding: 20px;
              display: flex;
              align-items: center;
              justify-content: space-around;
              .applicationBottomDesc {
                text-align: center;
                .header {
                  color: #6c83c3;
                  padding-bottom: 5px;
                  font-weight: bold;
                }
                .body {
                  padding-top: 5px;
                  font-weight: bold;
                }
                .pd {
                }
              }
            }
          }
          .applicationMaskLayer {
            position: absolute;
            display: none;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.4);
            text-align: center;
            padding: 36px 80px;
            :deep(.el-button--mini),
            .el-button--mini.is-round {
              margin: 8px;
            }
          }
          .application:hover .applicationDescButton {
            color: #fff;
            background: rgb(87, 87, 239);
            border-radius: 10px;
            cursor: pointer;
          }
          .application:hover .applicationDevButton {
            color: #fff;
            background: #26e426;
            border-radius: 10px;
            cursor: pointer;
          }
          .application:hover .applicationEorrButton {
            color: #fff;
            background: #ee5195;
            border-radius: 10px;
            cursor: pointer;
          }
          .applicationUp {
            border-radius: 10px;
            background: url("../../../assets/img/上架背景.png") no-repeat center;
            background-size: 100% 100%;
          }
          .applicationUpMouse {
            border-radius: 10px;
            background: url("../../../assets/img/上架背景鼠标.png") no-repeat center;
            background-size: 100% 100%;
            filter: progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);
            -moz-box-shadow: 2px 2px 10px #909090;
            -webkit-box-shadow: 2px 2px 10px #909090;
            box-shadow: 2px 2px 10px #909090;
          }
          .applicationDown {
            border-radius: 10px;
            background: url("../../../assets/img/下架背景.png") no-repeat center;
            background-size: 100% 100%;
          }
          .applicationDownMouse {
            border-radius: 10px;
            background: url("../../../assets/img/下架背景鼠标.png") no-repeat center;
            background-size: 100% 100%;
            filter: progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);
            -moz-box-shadow: 2px 2px 10px #909090;
            -webkit-box-shadow: 2px 2px 10px #909090;
            box-shadow: 2px 2px 10px #909090;
          }
        }
        .main-box:hover .applicationMaskLayer {
          display: block;
        }
      }
    }
  }
  .zjsqClass {
    display: flex;
    flex-wrap: wrap;
    div {
      padding: 10px;
      width: 33%;
    }
    .zjsqSpanClass {
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
          li {
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
          li {
            margin-top: 10px;
          }
        }
      }
    }
  }

  .applicationRunControllerTitle {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    font-weight: bold;
    padding-left: 10px;
  }
  .applicationRunControllerBody {
    width: 100%;
    padding: 0px 10px;
    .applicationRunControllerItem {
      width: 100%;
      border: 1px solid gray;
      border-radius: 7px;
      .applicationRunContrllerItemTitle {
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
      .productionInfo {
        padding: 0 30px 20px 30px;
        :deep(.el-form-item:not(:first-child)) {
          margin-top: 20px;
        }
        :deep(.el-button--primary) {
          color: #fff;
          border-bottom-left-radius: 0;
          border-top-left-radius: 0;
        }
        .storePath {
          :deep(.el-input__inner) {
            width: 400px;
          }
        }
        .storeSize {
          :deep(.el-input__inner) {
            width: 497px;
          }
        }
      }
      .modulationParam {
        padding: 0 30px 20px 30px;
        .modulationParamMarginTop {
          margin-top: 20px;
        }
        :deep(.el-select) {
          width: 205px;
        }
      }
      .decodingParams {
        padding: 0 30px 20px 30px;
        .decodingParamsMarginTop {
          margin-top: 20px;
        }
        :deep(.el-select) {
          width: 205px;
        }
      }
    }
    .applicationRunControllerItemMarginTop {
      margin-top: 30px;
    }
  }

  .applicationDataClass {
    .operationToolbar {
      height: 80px;
      line-height: 80px;
      background-color: #eae7e7;
    }
    .operationToolbarTextClass {
      font-size: 18px;
      font-weight: bold;
    }
    .searchToolbar {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
    }
  }
  .applicationInstanceClass {
    .left {
      height: 100vh;
      box-shadow: 1px 1px 10px #888888;
      .instanceTitle {
        height: 40px;
        line-height: 40px;
        background-color: #635d5d;
        color: #fff;
        font-size: 18px;
        padding: 0 20px;
      }
      .instanceItem {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        cursor: pointer;
      }
      .instanceItem:hover {
        background-color: #bac7de;
      }
      .el-menu-item.is-active {
        border-left: 5px solid #409eff;
      }
      .instanceItemOkStatus {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: blue;
        border-radius: 50%;
        margin-right: 8px;
      }
      .instanceItemErrorStatus {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: red;
        border-radius: 50%;
        margin-right: 8px;
      }
    }
    .right {
      height: 100vh;
      .instanceFlow {
        height: 60vh;
        width: 100%;
        display: flex;
        .flowDagImage {
          height: 100%;
          width: 70%;
          .flowTitle {
            height: 40px;
            line-height: 40px;
          }
          .flowContent {
            height: calc(100% - 40px);
            background-color: #e5eaef;
          }
        }
        .flowLog {
          width: 30%;
          .flowLogTitle {
            height: 40px;
            line-height: 40px;
            background-color: #635d5d;
            color: #fff;
            font-size: 16px;
            padding: 0 20px;
          }
          .flowLogContent {
            .flowLogContentItem {
              height: 80px;
              padding: 10px;
              .flowComponentNameOk {
                font-size: 16px;
                color: #43de73;
                font-weight: bold;
              }
              .flowComponentNameError {
                font-size: 16px;
                color: red;
                font-weight: bold;
              }
              .flowComponentContent {
                margin-top: 5px;
                font-size: 14px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: normal;
              }
            }
            .flowLogContentItem:hover {
              background-color: #c6ced4;
            }
          }
        }
      }
      .instanceItemInfo {
        height: 40vh;
        .flowComponentParticularsTitle {
          height: 40px;
          line-height: 40px;
          background-color: #635d5d;
          color: #fff;
          font-size: 18px;
          padding: 0 20px;
        }
        .flowComponentParticularsContent {
          padding: 0 20px;
          .collapseButton {
            border-radius: 15px;
          }
          .el-form-item__content {
            width: 200px;
          }
        }
      }
    }
  }
  .mgL20 {
    margin-left: 20px;
  }
}
</style>
