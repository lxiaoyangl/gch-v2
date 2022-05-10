<template>
  <div class="arrange">
    <div class="cont">
      <div class="left">
        <div class="comp-class">
          <div class="title">{{ isFlow ? "编排组件" : "组件分类" }}</div>
          <div class="serch">
            <el-input v-model="search" suffix-icon="Search" placeholder="搜索关键字查找"></el-input>
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
            <template v-for="(item, i) in isFlow ? flowList : compClassList">
              <div class="item" @click="handleChange(item, i)" :class="active == i && 'active'">
                <span v-if="active == i" class="active-i"></span>
                <p>
                  <!-- <img :src="item.icon" alt="" /> -->
                  <img src="../../assets/img/operationHome/审批-应用.png" alt="" />
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
            <el-input v-model="search" suffix-icon="Search" placeholder="搜索关键字查找"> </el-input>
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
        <el-form v-if="isFlow" inline class="flow-top" :model="flowTopForm" label-width="100px" size="small">
          <el-form-item label="流程名称：" prop="name">
            <el-input style="width: 300px" placeholder="请输入流程名称" v-model="flowTopForm.name"></el-input>
          </el-form-item>
          <el-form-item label="流程类型：" prop="type">
            <el-select placeholder="请选择流程名称" v-model="flowTopForm.type">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最大实例数：" prop="num">
            <el-input placeholder="请输入最大实例数" v-model.number="flowTopForm.num"> </el-input>
          </el-form-item>
          <el-form-item label="流程描述：" prop="desc" style="width: 100%; margin-top: 10px">
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
          <el-tooltip v-for="(item, i) in tools" :key="i" :content="item.content" placement="bottom" effect="light">
            <el-icon :size="26">
              <component :is="item.icon" @click="item.method"></component>
            </el-icon>
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
        <NodeDrawer v-if="nodeDrawer" class="drawer" :nodeDrawer="nodeDrawer" :nodeDrawerData="nodeData"></NodeDrawer>

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
        <LineDrawer v-if="lineDrawer" class="drawer" :lineDrawer="lineDrawer"></LineDrawer>
      </div>
    </div>

    <div class="foot">
      <el-button type="danger" size="small" @click="reset">重 置</el-button>
      <el-button type="success" size="small" @click="commplete">保存草稿</el-button>
      <el-button type="info" size="small" @click="goBack">上一步</el-button>
      <el-button type="primary" size="small" @click="reset">下一步</el-button>
    </div>

    <el-dialog
      width="90%"
      center
      title="流程调试"
      v-model="isDebug"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      @close="isDebug = false"
    >
      <DebugDialog :debugData="debugData" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { Graph, Shape, Addon, NodeView } from "@antv/x6";
// import type { Graph } from "@antv/x6-vue-shape";
// import "@antv/x6-vue-shape";
import icon1 from "../../assets/img/operationHome/审批-应用.png";
import FlowDrawer from "./arrangeComp/FlowDrawer.vue";
import NodeDrawer from "./arrangeComp/NodeDrawer.vue";
import LineDrawer from "./arrangeComp/LineDrawer.vue";
import RectNode from "./arrangeComp/RectNode.vue";
import DebugDialog from "./comp/DebugDialog.vue";
import insertCss from "insert-css";
import { onMounted, onUnmounted, computed, ref, reactive, Ref } from "vue";
import { r1, compClassList, flowList } from "./data";
import {} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

let graph;
let search = ref("");
let active = ref(0);
let isFlow = ref(false);
let on = ref(1);
let nodeDrawer = ref(false);
let lineDrawer = ref(false);
let flowDrawer = ref(false);
let isDebug = ref(false);
let flowData = ref(null);
let nodeData = ref(null);
let lineData = ref(null);
let lineColor = ref(null);
let debugData = ref(null);
// let compClassList = reactive([]);
// let flowList = reactive([]);
let activeNames = ref(["1", "2"]);
let childrenActiveNames = ref(["11", "12", "13"]);
let formData = reactive({});
let flowTopForm = reactive({
  name: "",
  type: "",
  num: null,
  desc: "",
});

const router = useRouter();
onMounted(() => {
  // initAntvX6();
});

const compList = computed(() => {
  // 组件
  // if (isFlow) {
  //   let arr = JSON.parse(JSON.stringify(compClassList));
  //   arr.shift();
  //   return arr.find((v, i) => i == active).children || [];
  // }
  // return compClassList.find((v, i) => i == active).children || [];
  return [];
});
const activeName = computed(() => {
  // if (isFlow) {
  //   let arr = JSON.parse(JSON.stringify(compClassList));
  //   arr.shift();
  //   return arr.find((v, i) => i == active).name;
  // }
  // return compClassList.find((v, i) => i == active).name;
  return "";
});

const handleChange = (item: any, i: Ref<number>) => {
  active = i;
};
// 组件关闭按钮
//  const handleDelComp=(index)=> {
//     compList.splice(index, 1);
//   }
/**
 * 完成流程设计
 */
const commplete = () => {
  ElMessage({
    type: "success",
    message: "流程设计完成！",
  });
  router.push("/fidlddata/flow");
};
/**
 * 重置流程设计
 */
const reset = () => {};
/**
 * 回退
 */
const goBack = () => {
  router.push("/fidlddata/flow");
};
const handleCheckNode = (item: any) => {
  console.log(item);
};
//初始化画布
const initAntvX6 = () => {
  let that_ = this;
  // console.log(miniMapContainerRef);
  const containerRef = $refs.containerChart;

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
  graph.value = new Graph({
    container: document.getElementById("containerChart") as HTMLElement,
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
      magnetAvailable: magnetAvailabilityHighlighter,
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
              stroke: lineColor || "#4E4E4E", // stroke: "#45D9BF", stroke: "#FD9F6C",
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
          const usedInPorts = node?.getUsedInPorts(graph);
          if (usedInPorts.find((port: { id: string | null }) => port && port.id === portId)) {
            return false;
          }
        }
        return true;
      },
    },
  });
  graph.centerContent(); //画布居中

  graph.on("edge:connected", ({ previousView, currentView }) => {
    if (previousView) {
      update(previousView);
    }
    if (currentView) {
      update(currentView);
    }
  });

  graph.on("edge:removed", ({ edge, options }) => {
    if (!options.ui) {
      return;
    }

    const target = edge.getTargetCell();
    if (target) target.updateInPorts(graph);
  });

  graph.on("edge:mouseenter", ({ edge }) => {
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

  graph.on("edge:mouseleave", ({ edge }) => {
    edge.removeTools();
  });

  graph.on("edge:dblclick", ({ e, x, y, edge, view }) => {
    // console.log(e);
    // console.log(x, y);
    console.log(edge);
    // console.log(view);
    lineDrawer.value = !0;
    nodeDrawer.value = !1;
    flowDrawer.value = !1;
    // line: {
    //           stroke: lineColor || "#4E4E4E", // stroke: "#45D9BF", stroke: "#FD9F6C",
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

  graph.on("node:dblclick", ({ e, x, y, node, view }) => {
    console.log(node);
    lineDrawer.value = !1;
    if (node.data?.datas?.type == "1") {
      flowData = node.data;
      flowDrawer.value = !0;
      nodeDrawer.value = !1;
    } else {
      nodeData = node.data;
      nodeDrawer.value = !0;
      flowDrawer.value = !1;
    }
    // node.attr({
    //   body:{
    //     stroke:"#1E9AFF"
    //   }
    // });
  });

  graph.on("node:mouseenter", ({ e, x, y, node, view }) => {
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
    showPorts(ports, true);
    // obstacles.forEach((obstacle) =>
    //   obstacle.on("change:position", updateLine())
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

  graph.on("node:mouseleave", ({ e, x, y, node, view }) => {
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
    showPorts(ports, false);
  });

  graph.on("blank:click", ({ e, x, y }) => {
    lineDrawer.value = !1;
    nodeDrawer.value = !1;
    flowDrawer.value = !1;

    // node.attr({
    //   body:{
    //     stroke:"#1E9AFF"
    //   }
    // });
  });
};
const reloadData = () => {
  graph.paste({ useLocalStorage: true });
};
// 查看
const checkNode = (item: any) => {
  console.log(item);
};
/**
 * 拖拽节点，并添加到画布中
 */
const dragNode = (item, e) => {
  lineDrawer.value = !1;
  if (item.datas?.type == "1") {
    flowData.value = item;
    flowDrawer.value = !0;
    nodeDrawer.value = !1;
  } else {
    nodeData.value = item;
    nodeDrawer.value = !0;
    flowDrawer.value = !1;
  }
  let that_ = this;
  let node;
  // if (type == "rect") {
  node = createRectNode(item);
  // obstacles.push(node);
  // }
  // if (type == "circle") {
  //   node = createCircleNode(nodeName);
  // }
  // if (type == "polygon") {
  //   node = createPolygonNode(nodeName);
  // }
  const dnd = new Addon.Dnd({ target: graph });
  dnd.start(node, e);
  // console.log(obstacles);
  // obstacles.forEach((obstacle) =>
  //   obstacle.on("change:position", updateLine())
  // );
};
// 显示连线节点
const showPorts = (ports: string | any[], show: boolean) => {
  for (let i = 0, len = ports.length; i < len; i = i + 1) {
    ports[i].style.visibility = show ? "visible" : "hidden";
  }
};

const updateLine = () => {
  // const edgeView = graph.findViewByCell(edge);
  // edgeView.update();
};
/**
 * 创建画布节点
 * @param nodeType 创建画布节点的类型，rect、ellipse、polygon
 * @returns node 画布节点
 */
const createCircleNode = (nodeName: any) => {
  let that_ = this;
  let node = graph.createNode({
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
};

/**
 * 创建多边形节点
 */
const createPolygonNode = (nodeName: any) => {
  let that_ = this;
  const getUsedInPorts = (graph: { getIncomingEdges: (arg0: undefined) => never[] }) => {
    const incomingEdges = graph.getIncomingEdges(this) || [];
    return incomingEdges.map((edge: { getTargetPortId: () => any }) => {
      const portId = edge.getTargetPortId();
      return getPort(portId);
    });
  };
  let node = graph.addNode({
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

  // let node = graph.addNode({
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
};

/**
 * 创建矩形节点
 */
const createRectNode = (item: { id: any; datas: any; name: any }) => {
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
      return incomingEdges.map((edge: { getTargetPortId: () => any }) => {
        const portId = edge.getTargetPortId();
        return this.getPort(portId);
      });
    }

    getNewInPorts(length: any) {
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

    updateInPorts(graph: any) {
      const minNumberOfPorts = 3;
      const ports = this.getInPorts();
      const usedPorts = this.getUsedInPorts(graph);
      const newPorts = this.getNewInPorts(Math.max(minNumberOfPorts - usedPorts.length, 1));

      if (ports.length === minNumberOfPorts && ports.length - usedPorts.length > 0) {
        // noop
      } else if (ports.length === usedPorts.length) {
        // addPorts(newPorts);
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

  Shape.Rect.prototype.getUsedInPorts = function (graph: { getIncomingEdges: (arg0: Base<any>) => never[] }) {
    const incomingEdges = graph.getIncomingEdges(this) || [];
    return incomingEdges.map((edge: { getTargetPortId: () => any }) => {
      const portId = edge.getTargetPortId();
      return getPort(portId);
    });
  };

  Shape.Rect.prototype.getNewInPorts = function (length: any) {
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

  Shape.Rect.prototype.updateInPorts = function (graph: any) {
    const minNumberOfPorts = 3;
    const ports = getInPorts();
    const usedPorts = getUsedInPorts(graph);
    const newPorts = getNewInPorts(Math.max(minNumberOfPorts - usedPorts.length, 1));

    if (ports.length === minNumberOfPorts && ports.length - usedPorts.length > 0) {
      // noop
    } else if (ports.length === usedPorts.length) {
      addPorts(newPorts);
    } else if (ports.length + 1 > usedPorts.length) {
      prop(["ports", "items"], getOutPorts().concat(usedPorts).concat(newPorts), {
        rewrite: true,
      });
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
};

/**
 * 更新视图层
 */
const update = (view: {
  cell: any;
  findPortElem: (arg0: any, arg1: string) => any;
  unhighlight: (arg0: any, arg1: { highlighter: any }) => void;
}) => {
  const node = view.cell;
  node.getInPorts().forEach((port: { id: any }) => {
    const portNode = view.findPortElem(port.id, "portBody");
    view.unhighlight(portNode, {
      highlighter: magnetAvailabilityHighlighter,
    });
  });
  node.updateInPorts(graph);
};

// 删除节点
const deleteNode = () => {
  const cell = graph.getSelectedCells();
  graph.removeCells(cell);
};

// 修改组件
const handleUpdate = (item: any) => {
  isFlow.value = !0;
  console.log(item);
};
/**
 * 导出数据
 */
const saveData = () => {
  graph.copy(graph.getCells(), {
    useLocalStorage: true,
  });
  ElMessage.success("保存成功！");
};
/**
 * 撤销
 */
const handleRevoke = () => {
  graph.undo();
};
/**
 * 重做
 */
const handleRefrom = () => {
  graph.redo();
};
/**
 * 放大
 */
const handleZoomIn = () => {
  graph.zoom(0.2);
};
/**
 * 缩小
 */
const handleZoomOut = () => {
  graph.zoom(-0.2);
};
/**
 * 全屏
 */
const handleFullSreen = () => {
  let container = document.getElementById("containerChart") as HTMLElement;
  container.requestFullscreen();
};
// 保存
const handleSave = () => {
  // graph.fromJSON(t);
  // console.log(graph.toJSON().cells);
};
// 调试
const handleDebug = () => {
  let data = graph.toJSON({ diff: true }).cells;
  if (data.length <= 0) {
    ElMessage.error("请先编辑流程，再调试！");
    return;
  }
  isDebug.value = true;
  debugData = data;
  // if (isDebug) {
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
};
// 搜索
const handleSearch = () => {};

let tools = reactive([
  // {
  //   content: "缩小",
  //   method: handleZoomOut,
  //   icon: "el-icon-zoom-out",
  // },
  // {
  //   content: "放大",
  //   method: handleZoomIn,
  //   icon: "el-icon-zoom-in",
  // },
  {
    content: "撤销",
    method: handleRevoke,
    icon: "RefreshLeft",
  },
  {
    content: "重做",
    method: handleRefrom,
    icon: "RefreshRight",
  },
  {
    content: "全屏展开",
    method: handleFullSreen,
    icon: "FullScreen",
  },
  // {
  //   content: "保存",
  //   method: handleSave,
  //   icon: "CircleCheck",
  // },
  {
    content: "调试",
    // method: () => {
    //   isDebug = true;
    // },
    method: handleDebug,
    icon: "SetUp", // el-icon-video-play
  },
  {
    content: "搜索",
    method: handleSearch,
    icon: "Search", // el-icon-video-play
  },
]);

onUnmounted(() => {
  // graph.dispose();
});
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
        :deep(.el-collapse-item__header) {
          padding-left: 20px;
        }
        :deep(.el-collapse-item__arrow) {
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
