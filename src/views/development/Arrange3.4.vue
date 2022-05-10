<template>
  <div class="arrange">
    <div class="cont">
      <div class="left">
        <div class="comp-class">
          <div class="title">{{ isFlow ? "编排组件" : "组件分类" }}</div>
          <div class="serch">
            <el-input
              v-model="search"
              suffix-icon="el-icon-search"
              placeholder="搜索关键字查找"
            ></el-input>
          </div>
          <div class="tabs" v-if="isFlow">
            <span class="custom">自定义编排 <i></i> </span>
            <el-link :underline="false" type="primary ">
              <span class="pl30">流程模板 </span>
              <i class="el-icon-d-arrow-right"></i>
            </el-link>
          </div>
          <div
            class="list"
            :style="{
              height: !isFlow ? 'calc(100% - 80px)' : 'calc(100% - 130px)',
            }"
          >
            <!-- {{compClassList}} -->
            <template v-for="(item, i) in isFlow ? flowList : compClassList">
              <div
                class="item"
                @click="handleChange(item, i)"
                :key="i"
                :class="active == i && 'active'"
              >
                <span v-if="active == i" class="active-i"></span>
                <p>
                  <!-- <img :src="item.icon" alt="" /> -->
                  <img
                    src="../../assets/img/operationHome/审批-应用.png"
                    alt=""
                  />
                  <span>{{ item.name }}</span>
                </p>
              </div>
            </template>
          </div>
        </div>
        <div class="flow">
          <div
            class="title"
            :style="{
              backgroundColor: activeName == '流程组件' ? '#5080be' : '#06B3BA',
            }"
          >
            {{ activeName }}
          </div>
          <div class="serch">
            <el-input
              v-model="search"
              suffix-icon="el-icon-search"
              placeholder="搜索关键字查找"
            >
            </el-input>
          </div>
          <div class="list" v-if="compList.length > 0">
            <div
              class="item"
              :class="activeName == '流程组件' ? 'flo' : 'other'"
              v-for="(item, i) in compList"
              :key="i"
            >
              <!-- <el-tooltip
                effect="light"
                :content="item.desc"
                placement="bottom-start"
              > -->
              <div @mousedown="dragNode(item, $event)">
                <span>{{ item.name }}</span>
              </div>
              <i @click="handleDelComp(i)" class="el-icon-circle-close"></i>
              <!-- </el-tooltip> -->
            </div>
          </div>
          <div v-else class="empty">
            <el-empty description="暂无组件" :image-size="100"> </el-empty>
          </div>
          <div class="add">
            <el-button type="primary" v-if="!isFlow" @click="isFlow = !0">
              <i class="el-icon-circle-plus-outline"></i>
              <span>新建流程组件</span>
            </el-button>
          </div>
        </div>
      </div>
      <div class="right">
        <el-form
          v-if="isFlow"
          inline
          class="flow-top"
          :model="flowTopForm"
          label-width="100px"
          size="small"
        >
          <el-form-item label="流程名称：" prop="name">
            <el-input
              style="width: 300px"
              placeholder="请输入流程名称"
              v-model="flowTopForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="流程类型：" prop="type">
            <el-select placeholder="请选择流程名称" v-model="flowTopForm.type">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最大实例数：" prop="num">
            <el-input
              placeholder="请输入最大实例数"
              v-model.number="flowTopForm.num"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="流程描述："
            prop="desc"
            style="width: 100%; margin-top: 10px"
          >
            <el-input
              style="width: 600px"
              type="textarea"
              placeholder="请输入流程名称"
              v-model="flowTopForm.desc"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          id="containerChart"
          ref="containerChart"
          :style="{
            height: isFlow ? 'calc(100% - 112px)' : 'calc(100%)',
          }"
        ></div>
        <div
          class="tools"
          :style="{
            top: isFlow ? '132px' : '20px',
          }"
        >
          <el-tooltip
            v-for="(item, i) in tools"
            :key="i"
            :content="item.content"
            placement="bottom"
            effect="light"
          >
            <i :class="item.icon" @click="item.method"></i>
          </el-tooltip>
        </div>
        <div
          class="lines"
          :style="{
            top: isFlow ? '132px' : '20px',
            right: lineDrawer || nodeDrawer || flowDrawer ? '34%' : 0,
          }"
        >
          <div :class="['line', 'data-line']">
            <span>数据线：</span>
            <i class="line-icon"> </i>
          </div>
          <div :class="['line', 'status-line']">
            <span>状态线：</span>
            <i class="line-icon"> </i>
          </div>
          <div :class="['line', 'control-line']">
            <span>控制线：</span>
            <i class="line-icon"> </i>
          </div>
        </div>

        <!-- <div class="mini-map-container" ref="miniMapContainerRef"></div> -->
        <!-- 节点 -->
        <NodeDrawer
          v-if="nodeDrawer"
          class="drawer"
          :nodeDrawer="nodeDrawer"
          :nodeDrawerData="nodeData"
        ></NodeDrawer>

        <!-- 流程组件 -->
        <FlowDrawer
          class="drawer"
          v-if="flowDrawer"
          :flowDrawer="flowDrawer"
          :flowDrawerData="flowData"
          @handleUpdate="handleUpdate"
        ></FlowDrawer>

        <!-- <div class="flow-drawer" :style="{ right: flowDrawer ? '0' : '-34%' }">
          <div class="cont-deploy">
            <div class="right">
              <div class="title">xxx信号处理-基本信息</div>
            </div>
            <div class="r-main">
              <el-collapse v-model="activeNames">
                <el-collapse-item name="1">
                  <template slot="title">
                    <el-button round type="primary" size="small"
                      >流程缩略图</el-button
                    >
                  </template>
                  <div class="minimap" ref="minimap"></div>
                </el-collapse-item>
                <el-collapse-item name="2">
                  <template slot="title">
                    <el-button round type="primary" size="small"
                      >基本信息</el-button
                    >
                  </template>
                  <el-form :model="formData" ref="depForm" label-width="100px">
                    <el-form-item label="流程组件名称：">
                      <div>xxx信号处理</div>
                    </el-form-item>
                    <el-form-item label="组件数：">
                      <div>08</div>
                    </el-form-item>
                    <el-form-item label="内部组件名称：">
                      <div>
                        卫星网络、某解调器、数据转换引擎、BBF资源规划、信号解析、
                        BBF信号监控、BBF信号方案。
                      </div>
                    </el-form-item>
                    <el-form-item label="创建时间：">
                      <div>2021/04/25 12:56:45</div>
                    </el-form-item>
                    <el-form-item label="流程组件描述：">
                      <div>
                        XXX信号处理流程组件描述XXX信号处理流程组件描述XXX信号处
                        理流程组件描述XXX信号处理流程组件描述XXX信号处理流程组件
                        描述XXX信号处理流程组件描述
                      </div>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
              </el-collapse>
              <div class="r-bottom">
                <el-button type="primary">修改组件</el-button>
              </div>
            </div>
          </div>
        </div> -->

        <!-- 连线 -->
        <LineDrawer
          v-if="lineDrawer"
          class="drawer"
          :lineDrawer="lineDrawer"
        ></LineDrawer>
      </div>
    </div>

    <div class="foot">
      <el-button type="danger" size="small" @click="reset">重 置</el-button>
      <el-button type="success" size="small" @click="commplete"
        >保存草稿</el-button
      >
      <el-button type="info" size="small" @click="goBack">上一步</el-button>
      <el-button type="primary" size="small" @click="reset">下一步</el-button>
    </div>

    <el-dialog
      width="90%"
      center
      title="流程调试"
      :visible.sync="isDebug"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      @close="isDebug = false"
    >
      <DebugDialog :debugData="debugData" />
    </el-dialog>
  </div>
</template>

<script>
import { Graph,   Shape, Addon, NodeView } from "@antv/x6";
import "@antv/x6-vue-shape";
import icon1 from "../../assets/img/operationHome/审批-应用.png";
import FlowDrawer from "./arrangeComp/FlowDrawer.vue";
import NodeDrawer from "./arrangeComp/NodeDrawer.vue";
import LineDrawer from "./arrangeComp/LineDrawer.vue";
import RectNode from "./arrangeComp/RectNode";
import DebugDialog from "./comp/DebugDialog.vue";
import insertCss from "insert-css";
let r1 = [
  {
    position: {
      x: -420,
      y: 100,
    },
    size: {
      width: 200,
      height: 80,
    },
    attrs: {
      body: {
        fill: "#E9F7F7",
        stroke: "#84DBD5",
        strokeWidth: 2,
        rx: 8,
        ry: 8,
      },
      label: {
        text: "XXX-信号处理2",
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
    },
    shape: "rect",
    id: "854f74df-fca6-4562-8442-656a1c2287bd",
    data: {
      id: "2-1",
      name: "XXX-信号处理2",
      desc: "组件描述",
      type: "rect",
      datas: {
        compType: "信号类型",
        usageScenario: "BBF资源规划应用场景",
        versions: "V2.13",
        creatTime: "2022-2-22 10:16:27",
        type: "2",
        compNum: 8,
        desc: "BBF资源规划应用场景",
        czxt: [],
      },
    },
    portMarkup: [
      {
        tagName: "circle",
        selector: "portBody",
      },
    ],
    ports: {
      items: [
        {
          group: "port1",
          id: "2800c5e0-3a04-49bb-b7de-2d2175efdc60",
        },
        {
          group: "port2",
          id: "f30d48fa-0182-4d07-8cbe-250e109ad53b",
        },
        {
          group: "port3",
          id: "7ac21c97-3799-4643-beec-3043b918d34b",
        },
        {
          group: "port4",
          id: "9d8609fd-effc-43cd-8273-4235238065c1",
        },
      ],
      groups: {
        port1: {
          position: {
            name: "top",
          },
          attrs: {
            portBody: {
              magnet: true,
              r: 6,
              stroke: "#3199FF",
              fill: "#fff",
              strokeWidth: 2,
            },
          },
        },
        port2: {
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
        port3: {
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
        port4: {
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
      },
    },
    zIndex: 1,
  },
  {
    position: {
      x: -680,
      y: -60,
    },
    size: {
      width: 200,
      height: 80,
    },
    attrs: {
      body: {
        fill: "#E9F7F7",
        stroke: "#84DBD5",
        strokeWidth: 2,
        rx: 8,
        ry: 8,
      },
      label: {
        text: "XXX-信号处理3",
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
    },
    shape: "rect",
    id: "e67506e4-7f04-4e38-b8fe-b771d777ecc2",
    data: {
      id: "2-2",
      name: "XXX-信号处理3",
      desc: "组件描述",
      type: "rect",
    },
    portMarkup: [
      {
        tagName: "circle",
        selector: "portBody",
      },
    ],
    ports: {
      items: [
        {
          group: "port1",
          id: "4f070368-ed18-47ec-8e4b-d662fa34b38f",
        },
        {
          group: "port2",
          id: "f08b4b4c-95bb-4907-a5de-ecfa079c5663",
        },
        {
          group: "port3",
          id: "4cd42e21-67ab-445d-80db-a33ef3808fdc",
        },
        {
          group: "port4",
          id: "95b3cdb5-ecc5-4849-9a89-3449323fa670",
        },
      ],
      groups: {
        port1: {
          position: {
            name: "top",
          },
          attrs: {
            portBody: {
              magnet: true,
              r: 6,
              stroke: "#3199FF",
              fill: "#fff",
              strokeWidth: 2,
            },
          },
        },
        port2: {
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
        port3: {
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
        port4: {
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
      },
    },
    zIndex: 2,
  },
  {
    position: {
      x: -340,
      y: -40,
    },
    size: {
      width: 200,
      height: 80,
    },
    attrs: {
      body: {
        fill: "#E9F7F7",
        stroke: "#84DBD5",
        strokeWidth: 2,
        rx: 8,
        ry: 8,
      },
      label: {
        text: "数据接收1",
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
    },
    shape: "rect",
    id: "8e486ce9-b4dd-4a30-8647-6d5d4faca7b5",
    data: {
      id: "3-1",
      name: "数据接收1",
      desc: "组件描述",
      type: "rect",
    },
    portMarkup: [
      {
        tagName: "circle",
        selector: "portBody",
      },
    ],
    ports: {
      items: [
        {
          group: "port1",
          id: "facb162e-57b7-459c-bf70-80d2da6d2b06",
        },
        {
          group: "port2",
          id: "bb4df113-8c4d-4308-ae83-ff43d26f13b7",
        },
        {
          group: "port3",
          id: "c0adb97c-2ca6-493f-8f26-9ee67d36f1d4",
        },
        {
          group: "port4",
          id: "3f471ab4-64f6-45ae-8cb3-da2852143a61",
        },
      ],
      groups: {
        port1: {
          position: {
            name: "top",
          },
          attrs: {
            portBody: {
              magnet: true,
              r: 6,
              stroke: "#3199FF",
              fill: "#fff",
              strokeWidth: 2,
            },
          },
        },
        port2: {
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
        port3: {
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
        port4: {
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
      },
    },
    zIndex: 3,
  },
  {
    shape: "edge",
    attrs: {
      line: {
        stroke: "#4E4E4E",
        strokeDasharray: 5,
        style: {
          animation: "ant-line 30s infinite linear",
        },
      },
    },
    id: "9b7342f8-4101-4a58-9594-a2459ed85abf",
    datas: {},
    router: {
      name: "manhattan",
      args: {
        offset: "center",
      },
    },
    labels: [
      {
        markup: [
          {
            tagName: "rect",
            selector: "labelBody",
          },
          {
            tagName: "text",
            selector: "labelText",
          },
        ],
        attrs: {
          labelText: {
            text: " ",
          },
          labelBody: {
            ref: "labelText",
            refY: 3,
            refWidth: 4,
            refHeight: -6,
            fill: "#45D9BF",
          },
        },
        position: 0.48,
      },
      {
        markup: [
          {
            tagName: "rect",
            selector: "labelBody",
          },
          {
            tagName: "text",
            selector: "labelText",
          },
        ],
        attrs: {
          labelText: {
            text: " ",
          },
          labelBody: {
            ref: "labelText",
            refY: 3,
            refWidth: 4,
            refHeight: -6,
            fill: "#267FF7",
          },
        },
        position: 0.5,
      },
      {
        markup: [
          {
            tagName: "rect",
            selector: "labelBody",
          },
          {
            tagName: "text",
            selector: "labelText",
          },
        ],
        attrs: {
          labelText: {
            text: " ",
          },
          labelBody: {
            ref: "labelText",
            refY: 3,
            refWidth: 4,
            refHeight: -6,
            fill: "#FD9F6C",
          },
        },
        position: 0.52,
      },
    ],
    source: {
      cell: "854f74df-fca6-4562-8442-656a1c2287bd",
      port: "7ac21c97-3799-4643-beec-3043b918d34b",
    },
    target: {
      cell: "8e486ce9-b4dd-4a30-8647-6d5d4faca7b5",
      port: "c0adb97c-2ca6-493f-8f26-9ee67d36f1d4",
    },
    zIndex: 4,
  },
  {
    shape: "edge",
    attrs: {
      line: {
        stroke: "#4E4E4E",
        strokeDasharray: 5,
        style: {
          animation: "ant-line 30s infinite linear",
        },
      },
    },
    id: "0f44b584-f0eb-4d12-a1ad-7a0030db1f48",
    datas: {},
    router: {
      name: "manhattan",
      args: {
        offset: "center",
      },
    },
    labels: [
      {
        markup: [
          {
            tagName: "rect",
            selector: "labelBody",
          },
          {
            tagName: "text",
            selector: "labelText",
          },
        ],
        attrs: {
          labelText: {
            text: " ",
          },
          labelBody: {
            ref: "labelText",
            refY: 3,
            refWidth: 4,
            refHeight: -6,
            fill: "#45D9BF",
          },
        },
        position: 0.48,
      },
      {
        markup: [
          {
            tagName: "rect",
            selector: "labelBody",
          },
          {
            tagName: "text",
            selector: "labelText",
          },
        ],
        attrs: {
          labelText: {
            text: " ",
          },
          labelBody: {
            ref: "labelText",
            refY: 3,
            refWidth: 4,
            refHeight: -6,
            fill: "#267FF7",
          },
        },
        position: 0.5,
      },
      {
        markup: [
          {
            tagName: "rect",
            selector: "labelBody",
          },
          {
            tagName: "text",
            selector: "labelText",
          },
        ],
        attrs: {
          labelText: {
            text: " ",
          },
          labelBody: {
            ref: "labelText",
            refY: 3,
            refWidth: 4,
            refHeight: -6,
            fill: "#FD9F6C",
          },
        },
        position: 0.52,
      },
    ],
    source: {
      cell: "8e486ce9-b4dd-4a30-8647-6d5d4faca7b5",
      port: "facb162e-57b7-459c-bf70-80d2da6d2b06",
    },
    target: {
      cell: "e67506e4-7f04-4e38-b8fe-b771d777ecc2",
      port: "4f070368-ed18-47ec-8e4b-d662fa34b38f",
    },
    zIndex: 5,
  },
];

export default {
  components: { FlowDrawer, LineDrawer, NodeDrawer, DebugDialog },
  data() {
    return {
      search: "",
      active: 0,
      isFlow: !1,
      on: 1,
      nodeDrawer: !1,
      lineDrawer: !1,
      flowDrawer: !1,
      flowData: null,
      nodeData: null,
      lineData: null,
      compClassList: [
        {
          name: "流程组件",
          icon: icon1,
          children: [
            {
              id: "1-1",
              datas: {
                compType: "信号类型",
                usageScenario: "BBF资源规划应用场景",
                versions: "V2.13",
                creatTime: "2022-2-22 10:16:27",
                type: "1",
                desc: "BBF资源规划应用场景",
                comp: r1,
              },
              name: "XXX-流程1",
              desc: "组件描述",
              type: "rect",
            },
            {
              id: "1-2",
              datas: {
                compType: "信号类型",
                usageScenario: "BBF资源规划应用场景",
                versions: "V2.13",
                creatTime: "2022-2-22 10:16:27",
                type: "1",
                desc: "BBF资源规划应用场景",
                comp: r1,
              },
              name: "XXX-流程2",
              desc: "组件描述",
              type: "rect",
            },
            {
              id: "1-3",
              datas: {
                compType: "信号类型",
                usageScenario: "BBF资源规划应用场景",
                versions: "V2.13",
                creatTime: "2022-2-22 10:16:27",
                type: "1",
                desc: "BBF资源规划应用场景",
                comp: r1,
              },
              name: "XXX-流程3",
              desc: "组件描述",
              type: "rect",
            },
            {
              id: "1-4",
              datas: {
                compType: "信号类型",
                usageScenario: "BBF资源规划应用场景",
                versions: "V2.13",
                creatTime: "2022-2-22 10:16:27",
                type: "1",
                desc: "BBF资源规划应用场景",
                comp: r1,
              },
              name: "XXX-流程4",
              desc: "组件描述",
              type: "rect",
            },
            {
              id: "1-5",
              datas: {
                compType: "信号类型",
                usageScenario: "BBF资源规划应用场景",
                versions: "V2.13",
                creatTime: "2022-2-22 10:16:27",
                type: "1",
                desc: "BBF资源规划应用场景",
                comp: r1,
              },
              name: "XXX-流程5",
              desc: "组件描述",
              type: "rect",
            },
            {
              id: "1-6",
              datas: {
                compType: "信号类型",
                usageScenario: "BBF资源规划应用场景",
                versions: "V2.13",
                creatTime: "2022-2-22 10:16:27",
                type: "1",
                desc: "BBF资源规划应用场景",
                comp: r1,
              },
              name: "XXX-流程6",
              desc: "组件描述",
              type: "rect",
            },
          ],
        },
        {
          name: "信号类型",
          icon: "",
          children: [
            {
              id: "2-1",
              name: "XXX-信号处理2",
              type: "rect",
              datas: {
                compType: "信号类型",
                usageScenario: "BBF资源规划应用场景",
                versions: "V2.13",
                creatTime: "2022-2-22 10:16:27",
                type: "2",
                desc: "组件描述",
              },
            },
            {
              id: "2-2",
              name: "XXX-信号处理3",
              desc: "组件描述",
              type: "rect",
            },
            {
              id: "2-3",
              name: "XXX-信号处理1",
              desc: "组件描述",
              type: "rect",
            },
          ],
        },
        {
          name: "数据接收",
          icon: "",
          children: [
            {
              id: "3-1",
              name: "数据接收1",
              desc: "组件描述",
              type: "rect",
            },
            {
              id: "3-2",
              name: "数据接收2",
              desc: "组件描述",
              type: "rect",
            },
          ],
        },
        {
          name: "信号接入",
          icon: "",
        },
        {
          name: "信号解析",
          icon: "",
          children: [
            {
              id: "4-1",
              name: "信号解析",
              desc: "组件描述",
              type: "rect",
            },
          ],
        },
        {
          name: "资源规划",
          icon: "",
        },
        {
          name: "信号监控",
          icon: "",
        },
      ],
      flowList: [
        {
          name: "信号类型",
          icon: "",
          children: [
            {
              id: "5-1",
              datas: {
                compType: "信号类型",
                usageScenario: "BBF资源规划应用场景",
                versions: "V2.13",
                creatTime: "2022-2-22 10:16:27",
                desc: "BBF资源规划应用场景",
                type: "2",
              },
              name: "XXX-信号处理1",
              type: "rect",
            },
            {
              id: "5-2",
              datas: "",
              name: "XXX-信号处理2",
              type: "rect",
            },
            {
              id: "5-3",
              datas: "",
              name: "XXX-信号处理3",
              type: "rect",
            },
          ],
        },
        {
          name: "数据接收",
          icon: "",
        },
        {
          name: "信号接入",
          icon: "",
        },
        {
          name: "信号解析",
          icon: "",
        },
        {
          name: "资源规划",
          icon: "",
        },
        {
          name: "信号监控",
          icon: "",
        },
      ],
      isDebug: false,
      debugData: null,
      activeNames: ["1", "2"],
      childrenActiveNames: ["11", "12", "13"],
      formData: {},
      graph: null,
      lineColor: null,
      tools: [
        // {
        //   content: "缩小",
        //   method: this.handleZoomOut,
        //   icon: "el-icon-zoom-out",
        // },
        // {
        //   content: "放大",
        //   method: this.handleZoomIn,
        //   icon: "el-icon-zoom-in",
        // },
        {
          content: "撤销",
          method: this.handleRevoke,
          icon: "el-icon-refresh-left",
        },
        {
          content: "重做",
          method: this.handleRefrom,
          icon: "el-icon-refresh-right",
        },
        {
          content: "全屏展开",
          method: this.handleFullSreen,
          icon: "el-icon-full-screen",
        },
        // {
        //   content: "保存",
        //   method: this.handleSave,
        //   icon: "el-icon-circle-check",
        // },
        {
          content: "调试",
          // method: () => {
          //   this.isDebug = true;
          // },
          method: this.handleDebug,
          icon: "el-icon-set-up", // el-icon-video-play
        },
        {
          content: "搜索",
          method: this.handleSearch,
          icon: "el-icon-search", // el-icon-video-play
        },
      ],
      flowTopForm: {
        name: "",
        type: "",
        num: null,
        desc: "",
      },

      obstacles: [],
    };
  },
  mounted() {
    this.initAntvX6();
  },
  computed: {
    activeName() {
      if (this.isFlow) {
        let arr = JSON.parse(JSON.stringify(this.compClassList));
        arr.shift();
        return arr.find((v, i) => i == this.active).name;
      }
      return this.compClassList.find((v, i) => i == this.active).name;
    },
    // 组件
    compList() {
      if (this.isFlow) {
        let arr = JSON.parse(JSON.stringify(this.compClassList));
        arr.shift();
        return arr.find((v, i) => i == this.active).children || [];
      }
      return this.compClassList.find((v, i) => i == this.active).children || [];
    },
  },
  methods: {
    handleChange(item, i) {
      this.active = i;
    },
    // 组件关闭按钮
    handleDelComp(index) {
      this.compList.splice(index, 1);
    },
    /**
     * 完成流程设计
     */
    commplete() {
      this.$message({
        type: "success",
        message: "流程设计完成！",
      });
      this.$router.push("/fidlddata/flow");
    },
    /**
     * 重置流程设计
     */
    reset() {},
    /**
     * 回退
     */
    goBack() {
      this.$router.push("/fidlddata/flow");
    },
    handleCheckNode(item) {
      console.log(item);
    },
    //初始化画布
    initAntvX6() {
      let that_ = this;
      // console.log(miniMapContainerRef);
      const containerRef = this.$refs.containerChart;

      Graph.registerVueComponent(
        "RectNode",
        {
          template: `<RectNode />`,
          components: {
            RectNode,
          },
        },
        true
      );
      this.graph = new Graph({
        container: document.getElementById("containerChart"),
        background: {
          color: "#F5F6FA",
        },
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
        // resizing: {
        //   //调整节点宽高
        //   enabled: true, //历史记录
        //   orthogonal: false,
        // },
        async: true,
        autoResize: true, //自动画布大小
        mousewheel: true, //鼠标轮滚缩放

        grid: {
          size: 20, // 网格大小 10px
          visible: false, // 渲染网格背景
          type: "mesh",
          args: {
            color: "#D0D0D0",
            thickness: 1, // 网格线宽度/网格点大小
            factor: 10,
          },
        },
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

        // minimap: {
        //   enabled: true,
        //   container: miniMapContainerRef,
        //   width: 520,
        //   height: 180,
        //   scalable: false,
        // },
        connecting: {
          snap: true, //自动吸附
          allowBlank: false,
          allowLoop: false,
          highlight: true,

          connector: {
            name: "rounded",
            // args: {
            //   radius: 50,
            // },
          },
          connectionPoint: "boundary",
          // router: {
          //   name: "manhattan",
          //   args: {
          //     direction: "V",
          //   },
          // },
          createEdge() {
            return new Shape.Edge({
              datas: {},
              router: {
                name: "manhattan",
                args: {
                  offset: "center",
                  //   startDirections: ["bottom"],
                  //   endDirections: ["top"],
                },
              },
              labels: [
                {
                  markup: [
                    {
                      tagName: "rect",
                      selector: "labelBody",
                    },
                    {
                      tagName: "text",
                      selector: "labelText",
                    },
                  ],
                  attrs: {
                    labelText: {
                      text: " ",
                    },
                    labelBody: {
                      ref: "labelText",
                      refY: 3,
                      refWidth: 4,
                      refHeight: -6,
                      fill: "#45D9BF",
                    },
                  },
                  position: 0.48,
                },
                {
                  markup: [
                    {
                      tagName: "rect",
                      selector: "labelBody",
                    },
                    {
                      tagName: "text",
                      selector: "labelText",
                    },
                  ],
                  attrs: {
                    labelText: {
                      text: " ",
                    },
                    labelBody: {
                      ref: "labelText",
                      refY: 3,
                      refWidth: 4,
                      refHeight: -6,
                      fill: "#267FF7",
                    },
                  },

                  position: 0.5,
                },
                {
                  markup: [
                    {
                      tagName: "rect",
                      selector: "labelBody",
                    },
                    {
                      tagName: "text",
                      selector: "labelText",
                    },
                  ],
                  attrs: {
                    labelText: {
                      text: " ",
                    },
                    labelBody: {
                      ref: "labelText",
                      refY: 3,
                      refWidth: 4,
                      refHeight: -6,
                      fill: "#FD9F6C",
                    },
                  },
                  position: 0.52,
                },
              ],
              attrs: {
                line: {
                  stroke: that_.lineColor || "#4E4E4E", // stroke: "#45D9BF", stroke: "#FD9F6C",
                  strokeWidth: 2,
                  // targetMarker: {
                  //   name: "classic",
                  //   size: 12,
                  // },
                  strokeDasharray: 5,
                  targetMarker: "classic",
                  style: {
                    animation: "ant-line 30s infinite linear",
                  },
                },
              },
            });
          },
          validateConnection({ sourceView, targetView, targetMagnet }) {
            if (!targetMagnet) {
              return false;
            }
            // if (targetMagnet.getAttribute("port-group") !== "in") {
            //   return false;
            // }

            if (targetView) {
              const node = targetView.cell;
              const portId = targetMagnet.getAttribute("port");
              const usedInPorts = node?.getUsedInPorts(that_.graph);
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
        if (target) target.updateInPorts(graph);
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

      this.graph.on("edge:dblclick", ({ e, x, y, edge, view }) => {
        // console.log(e);
        // console.log(x, y);
        console.log(edge);
        // console.log(view);
        this.lineDrawer = !0;
        this.nodeDrawer = !1;
        this.flowDrawer = !1;
        // line: {
        //           stroke: that_.lineColor || "#4E4E4E", // stroke: "#45D9BF", stroke: "#FD9F6C",
        //           strokeWidth: 2,
        //           targetMarker: {
        //             name: "classic",
        //             size: 12,
        //           },
        //         },
        view.setStyle({
          // body: {
          color: "#6078A8",
          width: 4,
          // #6078A8
          // },
        });
      });

      this.graph.on("node:dblclick", ({ e, x, y, node, view }) => {
        console.log(node);
        this.lineDrawer = !1;
        if (node.data?.datas?.type == "1") {
          this.flowData = node.data;
          this.flowDrawer = !0;
          this.nodeDrawer = !1;
        } else {
          this.nodeData = node.data;
          this.nodeDrawer = !0;
          this.flowDrawer = !1;
        }
        // node.attr({
        //   body:{
        //     stroke:"#1E9AFF"
        //   }
        // });
      });

      this.graph.on("node:mouseenter", ({ e, x, y, node, view }) => {
        let flag = node.data?.datas?.type == "1";
        node.attr({
          label: {
            fill: "#fff",
          },
          body: {
            fill: flag ? "#9ECDF3" : "#37CCD2",
            stroke: flag ? "#1E99FF" : "#14AEB0",
            strokeWidth: flag ? 4 : 2,
          },
        });

        // 添加连接点;
        const ports = containerRef.querySelectorAll(".x6-port-body");
        this.showPorts(ports, true);
        // this.obstacles.forEach((obstacle) =>
        //   obstacle.on("change:position", this.updateLine())
        // );
        // 添加删除
        // const type = node.store.data.type;
        // const x = 300;

        node.addTools(
          {
            name: "button-remove",
            args: {
              x: 160,
              y: 4,
              // offset: { x: 200, y: 4 },
              // onClick(d) {
              //   console.log(d);
              //   d.cell.listeners.removed();
              // },
            },
          },
          "onhover" // 工具集名称，可省略);
        );
      });

      this.graph.on("node:mouseleave", ({ e, x, y, node, view }) => {
        let flag = node.data?.datas?.type == "1";
        node.attr({
          label: {
            fill: "#333333",
          },
          body: {
            fill: flag ? "#EBF4FB" : "#E9F7F7",
            stroke: flag ? "#1E99FF" : "#84DBD5",
            strokeWidth: flag ? 4 : 2,
          },
        });
        if (node.hasTools("onhover")) {
          node.removeTools();
        }
        // 添加连接点
        const ports = containerRef.querySelectorAll(".x6-port-body");
        this.showPorts(ports, false);
      });

      this.graph.on("blank:click", ({ e, x, y }) => {
        this.lineDrawer = !1;
        this.nodeDrawer = !1;
        this.flowDrawer = !1;

        // node.attr({
        //   body:{
        //     stroke:"#1E9AFF"
        //   }
        // });
      });
    },
    reloadData() {
      this.graph.paste({ useLocalStorage: true });
    },
    // 查看
    checkNode(item) {
      console.log(item);
    },
    /**
     * 拖拽节点，并添加到画布中
     */
    dragNode(item, e) {
      this.lineDrawer = !1;
      if (item.datas?.type == "1") {
        this.flowData = item;
        this.flowDrawer = !0;
        this.nodeDrawer = !1;
      } else {
        this.nodeData = item;
        this.nodeDrawer = !0;
        this.flowDrawer = !1;
      }
      let that_ = this;
      let node;
      // if (type == "rect") {
      node = this.createRectNode(item);
      // this.obstacles.push(node);
      // }
      // if (type == "circle") {
      //   node = this.createCircleNode(nodeName);
      // }
      // if (type == "polygon") {
      //   node = this.createPolygonNode(nodeName);
      // }
      const dnd = new Addon.Dnd({ target: that_.graph });
      dnd.start(node, e);
      // console.log(this.obstacles);
      // this.obstacles.forEach((obstacle) =>
      //   obstacle.on("change:position", this.updateLine())
      // );
    },
    // 显示连线节点
    showPorts(ports, show) {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? "visible" : "hidden";
      }
    },

    updateLine() {
      // const edgeView = this.graph.findViewByCell(edge);
      // edgeView.update();
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
        width: 60,
        height: 60,
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
              id: "port1",
              group: "top",
            },
            {
              id: "port2",
              group: "bottom",
            },
            {
              id: "port3",
              group: "left",
            },
            {
              id: "port4",
              group: "right",
            },
          ],
          groups: {
            top: {
              position: {
                name: "top",
              },
              attrs: {
                portBody: {
                  magnet: true,
                  r: 4,
                  stroke: "#3199FF",
                  fill: "#fff",
                  strokeWidth: 2,
                },
              },
            },
            bottom: {
              position: {
                name: "bottom",
              },
              attrs: {
                portBody: {
                  magnet: true,
                  r: 4,
                  fill: "#fff",
                  stroke: "#3199FF",
                  strokeWidth: 2,
                },
              },
            },
            left: {
              position: {
                name: "left",
              },
              attrs: {
                portBody: {
                  magnet: true,
                  r: 4,
                  fill: "#fff",
                  stroke: "#3199FF",
                  strokeWidth: 2,
                },
              },
            },
            right: {
              position: {
                name: "right",
              },
              attrs: {
                portBody: {
                  magnet: true,
                  r: 4,
                  fill: "#fff",
                  stroke: "#3199FF",
                  strokeWidth: 2,
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
      });
      return node;
    },

    /**
     * 创建多边形节点
     */
    createPolygonNode(nodeName) {
      let that_ = this;
      const getUsedInPorts = (graph) => {
        const incomingEdges = graph.getIncomingEdges(this) || [];
        return incomingEdges.map((edge) => {
          const portId = edge.getTargetPortId();
          return this.getPort(portId);
        });
      };
      let node = this.graph.addNode({
        shape: "vue-shape",
        x: 40,
        y: 40,
        width: 200,
        height: 80,
        // attrs: {
        //   label: {
        //     text: nodeName,
        //     fill: "#000000",
        //     fontSize: 14,
        //     textWrap: {
        //       width: -10,
        //       height: -10,
        //       ellipsis: true,
        //     },
        //   },
        //   body: {
        //     fill: "#ffffff",
        //     stroke: "#000000",
        //     refPoints: "0,10 10,0 20,10 10,20",
        //     strokeWidth: 1,
        //   },
        // },
        ports: {
          items: [
            {
              group: "port1",
            },
            {
              group: "port2",
            },
            {
              group: "port3",
            },
            {
              group: "port4",
            },
          ],
          groups: {
            port1: {
              position: {
                name: "top",
              },
              attrs: {
                portBody: {
                  magnet: true,
                  r: 6,
                  // stroke: "#ffa940",
                  stroke: "#3199FF",
                  fill: "#fff",
                  strokeWidth: 2,
                },
              },
            },
            port2: {
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
            port3: {
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
            port4: {
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
          },
        },
        portMarkup: [
          {
            tagName: "circle",
            selector: "portBody",
          },
        ],

        component: "RectNode",
        data: {
          nodeName,
        },
      });

      // let node = this.graph.addNode({
      //   shape: "polygon",
      //   x: 40,
      //   y: 40,
      //   width: 120,
      //   height: 120,
      //   attrs: {
      //     label: {
      //       text: nodeName,
      //       fill: "#000000",
      //       fontSize: 14,
      //       textWrap: {
      //         width: -10,
      //         height: -10,
      //         ellipsis: true,
      //       },
      //     },
      //     body: {
      //       fill: "#ffffff",
      //       stroke: "#000000",
      //       refPoints: "0,10 10,0 20,10 10,20",
      //       strokeWidth: 1,
      //     },
      //   },
      //   ports: {
      //     items: [
      //       {
      //         id: "port1",
      //         group: "top",
      //       },
      //       {
      //         id: "port2",
      //         group: "bottom",
      //       },
      //       {
      //         id: "port3",
      //         group: "left",
      //       },
      //       {
      //         id: "port4",
      //         group: "right",
      //       },
      //     ],
      //     groups: {
      //       top: {
      //         position: {
      //           name: "top",
      //         },
      //         attrs: {
      //           portBody: {
      //             magnet: true,
      //             r: 6,
      //             stroke: "#3199FF",
      //             fill: "#fff",
      //             strokeWidth: 2,
      //           },
      //         },
      //       },
      //       bottom: {
      //         position: {
      //           name: "bottom",
      //         },
      //         attrs: {
      //           portBody: {
      //             magnet: true,
      //             r: 6,
      //             fill: "#fff",
      //             stroke: "#3199FF",
      //             strokeWidth: 2,
      //           },
      //         },
      //       },
      //       left: {
      //         position: {
      //           name: "left",
      //         },
      //         attrs: {
      //           portBody: {
      //             magnet: true,
      //             r: 6,
      //             fill: "#fff",
      //             stroke: "#3199FF",
      //             strokeWidth: 2,
      //           },
      //         },
      //       },
      //       right: {
      //         position: {
      //           name: "right",
      //         },
      //         attrs: {
      //           portBody: {
      //             magnet: true,
      //             r: 6,
      //             fill: "#fff",
      //             stroke: "#3199FF",
      //             strokeWidth: 2,
      //           },
      //         },
      //       },
      //     },
      //   },
      //   portMarkup: [
      //     {
      //       tagName: "circle",
      //       selector: "portBody",
      //     },
      //   ],
      // });

      return node;
    },

    /**
     * 创建矩形节点
     */
    createRectNode(item) {
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
          const minNumberOfPorts = 3;
          const ports = this.getInPorts();
          const usedPorts = this.getUsedInPorts(graph);
          const newPorts = this.getNewInPorts(
            Math.max(minNumberOfPorts - usedPorts.length, 1)
          );

          if (
            ports.length === minNumberOfPorts &&
            ports.length - usedPorts.length > 0
          ) {
            // noop
          } else if (ports.length === usedPorts.length) {
            // this.addPorts(newPorts);
          } else if (ports.length + 1 > usedPorts.length) {
            this.prop(
              ["ports", "items"],
              this.getOutPorts().concat(usedPorts).concat(newPorts),
              {
                rewrite: true,
              }
            );
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
        const minNumberOfPorts = 3;
        const ports = this.getInPorts();
        const usedPorts = this.getUsedInPorts(graph);
        const newPorts = this.getNewInPorts(
          Math.max(minNumberOfPorts - usedPorts.length, 1)
        );

        if (
          ports.length === minNumberOfPorts &&
          ports.length - usedPorts.length > 0
        ) {
          // noop
        } else if (ports.length === usedPorts.length) {
          this.addPorts(newPorts);
        } else if (ports.length + 1 > usedPorts.length) {
          this.prop(
            ["ports", "items"],
            this.getOutPorts().concat(usedPorts).concat(newPorts),
            {
              rewrite: true,
            }
          );
        }
        return this;
      };
      let { id, datas, name: text } = item;
      let flag = datas?.type == "1";
      let comp = {
        data: item,
        id,
        attrs: {
          label: {
            text,
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
            fill: flag ? "#C1DBFF" : "#E9F7F7", //#E9F7F7  EBF4FB
            stroke: flag ? "#277DF4" : "#84DBD5", //#84DBD5  # #2478EC
            strokeWidth: flag ? 4 : 2,
            rx: flag ? 0 : 8,
            ry: flag ? 0 : 8,
          },
        },
        ports: {
          items: [
            {
              group: "port1",
            },
            {
              group: "port2",
            },
            {
              group: "port3",
            },
            {
              group: "port4",
            },
          ],
          groups: {
            port1: {
              position: {
                name: "top",
              },
              attrs: {
                portBody: {
                  magnet: true,
                  r: 6,
                  // stroke: "#ffa940",
                  stroke: "#3199FF",
                  fill: "#fff",
                  strokeWidth: 2,
                },
              },
            },
            port2: {
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
            port3: {
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
            port4: {
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
          },
        },
        // ports: {
        //   items: [
        //     {
        //       id: "T-1",
        //       group: "top",
        //     },

        //     {
        //       id: "B-1",
        //       group: "bottom",
        //     },
        //     {
        //       id: "B-2",
        //       group: "bottom",
        //     },
        //     {
        //       id: "B-3",
        //       group: "bottom",
        //     },
        //   ],
        //   groups: {
        //     out: {
        //       position: {
        //         name: "top",
        //       },
        //       attrs: {
        //         portBody: {
        //           magnet: true,
        //           r: 4,
        //           stroke: "#3199FF",
        //           fill: "#fff",
        //           strokeWidth: 2,
        //         },
        //       },
        //     },
        //     in: {
        //       position: {
        //         name: "bottom",
        //       },
        //       attrs: {
        //         portBody: {
        //           magnet: true,
        //           r: 4,
        //           fill: "#fff",
        //           stroke: "#3199FF",
        //           strokeWidth: 2,
        //         },
        //       },
        //     },
        //   },
        // },
        portMarkup: [
          {
            tagName: "circle",
            selector: "portBody",
          },
        ],
      };
      return new MyShape(comp).resize(200, 80);
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

    // 删除节点
    deleteNode() {
      const cell = this.graph.getSelectedCells();
      this.graph.removeCells(cell);
    },

    // 修改组件
    handleUpdate(item) {
      this.isFlow = !0;
      console.log(item);
    },
    /**
     * 导出数据
     */
    saveData() {
      this.graph.copy(this.graph.getCells(), {
        useLocalStorage: true,
      });
      this.$message.success("保存成功！");
    },
    /**
     * 撤销
     */
    handleRevoke() {
      this.graph.undo();
    },
    /**
     * 重做
     */
    handleRefrom() {
      this.graph.redo();
    },
    /**
     * 放大
     */
    handleZoomIn() {
      this.graph.zoom(0.2);
    },
    /**
     * 缩小
     */
    handleZoomOut() {
      this.graph.zoom(-0.2);
    },
    /**
     * 全屏
     */
    handleFullSreen() {
      let container = document.getElementById("containerChart");
      container.requestFullscreen();
    },
    // 保存
    handleSave() {
      // this.graph.fromJSON(t);

      // console.log(this.graph.toJSON().cells);
    },
    // 调试
    handleDebug() {
      let data = this.graph.toJSON({ diff: true }).cells;
      if (data.length <= 0) {
        this.$message.error("请先编辑流程，再调试！");
        return;
      }
      this.isDebug = true;
      this.debugData = data;
      // if (this.isDebug) {
      //   insertCss(`
      //     @keyframes ant-line {
      //       to {
      //           stroke-dashoffset: -1000
      //       }
      //     }
      //   `);
      // } else {
      //   insertCss(`
      //     @keyframes ant-line {
      //       to {
      //           stroke-dashoffset: 0
      //       }
      //     }
      //   `);
      // }
    },
    // 搜索
    handleSearch() {},
  },
  beforeDestroy() {
    this.graph.dispose();
  },
};
</script>

<style lang="less" scoped>
.arrange {
  height: calc(100vh - 50px);
  margin: 0 15px;
  // width: 100%;
  display: flex;
  flex-direction: column;
  .cont {
    height: calc(100% - 40px);
    display: flex;
    .left {
      background-color: #f9fafc;
      height: 100%;
      width: 16%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-left: 1px solid #f1f2f6;
      // border-right: 1px solid #f1f2f6;
      .title {
        color: #fff;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
      }
      .comp-class {
        height: calc(100% - 45%);
        // height: 100%;
        .title {
          background-color: #4d5c71;
        }
        .tabs {
          height: 50px;
          line-height: 50px;
          // color: #1b7aff;
          // font-size: 13px;
          // font-weight: bold;
          .custom {
            padding-left: 18px;
            font-weight: normal;
            display: inline-block;
            width: 150px;
            color: #fff;
            font-size: 15px;
            background-color: #37ccd2;
            position: relative;
            i {
              position: absolute;
              top: 0;
              right: -24px;
              z-index: 2;
              border: 25px solid #37ccd2;
              border-width: 50px 24px 0 0;
              // border-right-width: 20px;
              border-right-color: transparent;
              border-bottom-color: transparent;
              // box-shadow: 0 0 10px 0 transparent, 0 0 10px 0 transparent,
              //   0 0 10px 0 transparent, 0 0 10px 0 #ccc;
            }
          }
        }
        .list {
          width: 100%;
          overflow-y: auto;
          .item {
            height: 40px;
            width: 100%;
            line-height: 40px;
            position: relative;
            padding-left: 20px;
            cursor: pointer;
            &.active {
              background-color: #edf6ff;
              color: #277cf2;
            }
            .active-i {
              position: absolute;
              top: 0;
              left: 0;
              width: 4px;
              height: 100%;
              background-color: #277cf2;
            }
            p {
              display: flex;
              align-items: center;
              span {
                padding-left: 8px;
              }
            }
          }
        }
      }
      .flow {
        height: 45%;
        position: relative;
        display: flex;
        flex-direction: column;
        .title {
          background-color: #5080be;
        }
        .list {
          // height: calc(100% - 120px);
          flex: 1;
          width: 100%;
          overflow-y: auto;
          .item {
            cursor: move;
            display: inline-block;
            align-self: flex-start;
            width: 130px;
            height: 40px;
            border-radius: 2px;
            padding: 0 10px;
            margin-left: 10px;
            line-height: 40px;
            margin-top: 10px;
            position: relative;
            &.flo {
              background-color: #e5ecf4;
              &:hover {
                background-color: #267ef9;
              }
            }
            &.other {
              background-color: #dfeded;
              &:hover {
                background-color: #0ec6ce;
              }
            }
            &:hover {
              color: #fff;
              i {
                display: inline-block;
              }
            }
            div {
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;
              span {
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            i {
              position: absolute;
              right: 5px;
              top: 25%;
              cursor: pointer;
              padding-left: 10px;
              font-size: 20px;
              color: #fefffd;
              display: none;
            }
          }
        }
        .empty {
          flex: 1;
          // height: calc(100% - 120px);
        }
        .add {
          width: 100%;
          .el-button {
            width: 100%;
          }
          // position: absolute;
          // bottom: 0;
          // left: 25%;
        }
      }
    }
    > .right {
      height: 100%;
      width: 84%;
      border-left: 1px solid #66a3f3;
      position: relative;
      #containerChart {
        position: relative;
        width: 100% !important;
        // height: 100% !important;
      }
      .tools {
        transition: all 0.3s;
        position: absolute;
        left: 10px;
        z-index: 200;
        // background-color: #fff;
        // top: 20px;
        // padding: 10px;
        // padding-top: 20px;
        i {
          padding: 4px;
          border-radius: 3px;
          color: #fff;
          background-color: #80aaff;
          font-size: 18px;
          margin-left: 10px;
          &:hover {
            background-color: #3584e9;
          }
        }
      }
      .lines {
        position: absolute;
        display: flex;
        transition: all 0.3s;
        // top: 20px;
        // right: 40%;
        // float: right;
        .line {
          // cursor: pointer;
          margin-right: 16px;
          border-radius: 3px;
          padding: 8px 4px;
          display: flex;
          align-items: center;
          .line-icon {
            display: inline-block;
            height: 10px;
            width: 10px;
            border-radius: 2px;
          }
          &.data-line {
            .line-icon {
              background-color: #267ff7;
            }
          }
          &.status-line {
            .line-icon {
              background-color: #45d9bf;
            }
          }
          &.control-line {
            .line-icon {
              background-color: #fd9f6c;
            }
          }
        }
      }
      .flow-top {
        padding: 10px 0;
        background-color: #fff;
        transition: all 0.3s;
      }
      .drawer {
        right: 0;
        left: auto;
        width: 34%;
        position: absolute;
      }
    }
  }
  .foot {
    background: white;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
  }
  .flow-drawer {
    background-color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    transition: all 0.3s;
    height: 100%;
    width: 34%;
    overflow-y: auto;
  }
  .drawer,
  .flow-drawer {
    .cont-deploy {
      .title {
        background: #4d5c71;
        color: white;
        height: 35px;
        line-height: 35px;
        padding-left: 20px;
      }
      .r-main {
        // padding: 15px;
        height: calc(100%);
        overflow-y: auto;
        position: relative;
        background: #fff;
        /deep/.el-collapse-item__header {
          padding-left: 20px;
        }
        /deep/.el-collapse-item__arrow {
          margin-left: 30px;
        }
        .r-bottom {
          // position: fixed;
          text-align: center;
          margin: 10px 0;
          // bottom: 60px;
          // right: 200px;
        }
        .el-collapse-item-content {
          padding: 0px 20px;
        }
      }
    }
  }
  .el-empty {
    padding: 10px;
  }
}
</style>
