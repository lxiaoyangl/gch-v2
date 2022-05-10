<template>
  <div class="cont">
    <div class="cont-top">
      <div class="cont-assembly">
        <div
          style="
            padding: 0 0 0 15px;
            color: white;
            line-height: 35px;
            height: 35px;
            background: #4d5c71;
          "
        >
          编排组件
        </div>
        <div
          style="
            height: 50%;
            overflow-y: auto;
            border-bottom: 2px solid #cac7c7;
          "
        >
          <el-tabs v-model="activeSelected" :stretch="true">
            <el-tab-pane label="流程模板" name="1">
              <div class="component">
                <div class="component-item is-active">
                  <span>信号网络处理</span>
                </div>
                <div class="component-item">
                  <span>XXX-WX信号网络处理</span>
                </div>
                <div class="component-item">
                  <span>XXX-WX信号网络处理</span>
                </div>
                <div class="component-item">
                  <span>XXX-WX信号网络处理</span>
                </div>
                <div class="component-item">
                  <span>XXX-WX信号网络处理</span>
                </div>
                <div class="component-item">
                  <span>XXX-WX信号网络处理</span>
                </div>
                <div class="component-item">
                  <span>XXX-WX信号网络处理</span>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="组件类型" name="2">
              <div class="component">
                <div class="component-item is-active">
                  <span>信号类型</span>
                </div>
                <div class="component-item"><span>数据接收</span></div>
                <div class="component-item"><span>信号接入</span></div>
                <div class="component-item"><span>信号解析</span></div>
                <div class="component-item"><span>资源规划</span></div>
                <div class="component-item"><span>小型信息管理</span></div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div>
          <div
            style="
              padding: 15px;
              display: flex;
              align-items: center;
              background: #4e5c72;
              color: #fff;
              font-size: 14px;
              font-weight: 400;
            "
          >
            <span style="margin-right: 10px">组件-信号网络处理</span>
          </div>
          <div class="search">
            <el-input
              v-model="formData.xhwlcl"
              suffix-icon="el-icon-search"
              size="small"
              style="flex: 1"
              placeholder="搜索关键词查找"
            ></el-input>
          </div>
          <div
            style="
              height: calc(50vh - 170px);
              overflow-y: auto;
              display: flex;
              flex-wrap: wrap;
              align-items: flex-start;
              justify-content: space-around;
              align-content: flex-start;
              margin-top: 10px;
              background: #f9fafc;
            "
          >
            <div
              v-for="(item, ind) in commonNodes"
              class="nodeItem"
              :key="ind"
              :type="item.type"
              @mousedown="dragNode('rect', $event)"
            >
              <i></i>
              <span>{{ item.nodeName }}</span>
            </div>
          </div>
        </div>
        <!-- <div style="height: calc(100vh - 660px)">
          <div style="padding: 15px">通用组件</div>
          <div
            style="
              overflow-y: auto;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
            "
          >
            <div class="nodeItem" @mousedown="dragNode('circle', $event)">
              圆形组件
            </div>
            <div class="nodeItem" @mousedown="dragNode('polygon', $event)">
              网关组件
            </div>
          </div>
        </div> -->
      </div>
      <div class="cont-layout">
        <div class="containerChartHeader">
          <div style="padding: 10px; background: #fff">
            <div class="dfc" style="margin-bottom: 15px">
              <div style="margin-right: 50px">
                <span class="form-name">流程名称:</span>
                <span>
                  <el-input
                    v-model="formData.lcmc"
                    style="width: 462px"
                    size="small"
                  >
                  </el-input>
                </span>
              </div>
              <div>
                <span class="form-name">定时信息:</span>
                <el-select
                  placeholder="关系名称"
                  v-model="formData.dsxx"
                  size="small"
                >
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                </el-select>
              </div>
            </div>
            <div class="dfc">
              <div style="margin-right: 50px">
                <span class="form-name">流程类型:</span>
                <span>
                  <el-select
                    size="small"
                    v-model="formData.lclx"
                    placeholder="关系名称"
                  >
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                  </el-select>
                </span>
              </div>
              <div class="dfc" style="margin-right: 26px">
                <span class="form-name">最大实例数:</span>
                <span>
                  <el-input v-model="formData.slnum" size="small"></el-input>
                </span>
              </div>
              <div class="dfc">
                <span class="form-name">报警通知人员:</span>
                <el-select
                  v-model="formData.bjtzry"
                  placeholder="选择报警通知人员"
                  size="small"
                >
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                </el-select>
              </div>
            </div>
            <div class="dfc" style="margin-top: 10px">
              <span class="form-name">流程描述:</span>
              <span style="flex: 1">
                <el-input v-model="formData.lcms" size="small"></el-input>
              </span>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="chartTool">
            <div class="btn-group">
              <el-tooltip content="删除" placement="top">
                <div class="btn" @click="deleteNode()" style="margin-top: 5px">
                  <i class="el-icon-delete"></i>
                </div>
              </el-tooltip>
              <el-tooltip content="保存" placement="top">
                <div class="btn" @click="saveData()">
                  <i class="el-icon-collection"></i>
                </div>
              </el-tooltip>
              <el-tooltip content="撤销" placement="top">
                <div class="btn" @click="revoke()">
                  <i class="el-icon-back"></i>
                </div>
              </el-tooltip>
            </div>
          </div>
          <div class="containerChart" id="containerChart"></div>
        </div>
      </div>
      <div class="cont-deploy">
        <div class="right">
          <div class="title">组件部署</div>
        </div>
        <div class="r-main">
          <el-collapse v-model="activeNames">
            <el-collapse-item name="1">
              <template slot="title">
                <button class="btn-class">部署要求</button>
              </template>
              <el-collapse v-model="childrenActiveNames">
                <el-collapse-item name="11">
                  <template slot="title">
                    <span>运行环境</span>
                    <i class="el-icon-minus"></i>
                    <i class="el-icon-minus"></i>
                    <span>收起</span>
                  </template>
                  <div class="systm el-collapse-item-content">
                    <div class="mrnum">
                      <span>操作系统: </span>
                      <span>
                        <el-select
                          v-model="formData.czxt"
                          size="small"
                          placeholder="Windows、M..."
                          style="width: 90px"
                        >
                        </el-select>
                      </span>
                    </div>
                    <div class="dfc mb10">
                      <span>最小磁盘:</span>
                      <span
                        ><el-input
                          v-model="formData.cp"
                          size="small"
                          style="width: 90px"
                        ></el-input
                      ></span>
                    </div>
                    <div class="dfc">
                      <span>最小CPU:</span>
                      <span>
                        <el-input
                          v-model="formData.cpu"
                          size="small"
                          style="width: 90px"
                        ></el-input>
                      </span>
                    </div>
                    <div class="dfc">
                      <span>最小内存:</span>
                      <span
                        ><el-input
                          v-model="formData.internal"
                          size="small"
                          style="width: 90px"
                        ></el-input
                      ></span>
                    </div>
                  </div>
                </el-collapse-item>
                <el-collapse-item name="12">
                  <template slot="title">
                    <span> 运行方式 </span>
                    <i class="el-icon-minus"></i>
                    <i class="el-icon-minus"></i>
                    <span> 展开 </span>
                  </template>
                  <div class="waydiv">
                    <div class="dfc waylist el-collapse-item-content">
                      <span> 实例方式: </span>
                      <span>
                        <el-radio
                          label="单机多实例"
                          v-model="formData.radio"
                        ></el-radio>
                      </span>
                    </div>
                    <div class="dfc waylist">
                      <span>调用方式:</span>
                      <span>
                        <el-select
                          v-model="formData.dyway"
                          placeholder="power job"
                          size="small"
                          style="width: 90px"
                        >
                        </el-select>
                      </span>
                    </div>
                  </div>
                </el-collapse-item>
                <el-collapse-item name="13">
                  <template slot="title">
                    <span> 接口设置 </span>
                    <i class="el-icon-minus"></i>
                    <i class="el-icon-minus"></i>
                    <span> 展开 </span>
                  </template>
                  <div class="mad el-collapse-item-content">
                    <span class="mad-title">接口说明一</span>
                    <div class="pd">
                      <span class="hs">接口名: </span>
                      <span>用户信息接口</span>
                    </div>
                    <div class="pd">
                      <span class="hs">接口: </span>
                      <span>com.sinx.user.manager.UserInfo</span>
                    </div>
                    <div class="pd">
                      <span class="hs">接口说明: </span>
                      <span>接口说明</span>
                    </div>
                    <div class="csbox">
                      <div class="dfc mb10">
                        <span>参数名称: </span>
                        <el-input
                          v-model="formData.cs1"
                          size="small"
                          style="width: 85px"
                        >
                        </el-input>
                      </div>
                      <div class="dfc mb10">
                        <span>参数名称: </span>
                        <el-input
                          v-model="formData.cs2"
                          size="small"
                          style="width: 85px"
                        >
                        </el-input>
                      </div>
                      <div class="dfc">
                        <span>参数名称: </span>
                        <el-input
                          v-model="formData.cs3"
                          size="small"
                          style="width: 85px"
                        ></el-input>
                      </div>
                      <div class="dfc">
                        <span>参数名称: </span>
                        <el-input
                          v-model="formData.cs4"
                          size="small"
                          style="width: 85px"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template slot="title">
                <button class="btn-class">部署方式</button>
              </template>
              <div class="dfc el-collapse-item-content">
                <span>部署:</span>
                <el-radio-group v-model="formData.radio">
                  <el-radio label="1">实例</el-radio>
                  <el-radio label="2">动态潮汐</el-radio>
                  <el-radio label="3">固定指定</el-radio>
                </el-radio-group>
              </div>
            </el-collapse-item>
          </el-collapse>
          <div class="r-bottom">
            <el-button type="primary">确 定</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="cont-bottom">
      <!-- <el-button type="primary" size="small" @click="commplete">完 成</el-button>
      <el-button type="danger" size="small" @click="reset">重 置</el-button>
      <el-button type="info" size="small" @click="goBack">返 回</el-button> -->
      <el-button type="danger" size="small" @click="reset">重 置</el-button>
      <el-button type="success" size="small" @click="commplete"
        >保存草稿</el-button
      >
      <el-button type="info" size="small" @click="goBack">上一步</el-button>
      <el-button type="primary" size="small" @click="reset">下一步</el-button>
    </div>
  </div>
</template>

<script>
import { Graph,   Shape, Addon, NodeView } from "@antv/x6";
export default {
  name: "",

  components: {},

  directives: {},

  data() {
    return {
      activeNames: ["1", "2"],
      childrenActiveNames: ["11", "12", "13"],
      activeSelected: "1",
      //画布数据
      data: {},
      //画布对象
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
      formData: {},
      lcmc: "",
      slnum: "",
      lcmiao: "",
      cp: "",
      cpu: "",
      internal: "",
      dyway: "",

      currentArrow: 1,
      // 网格设置
      // grid: {
      //   size: 20, // 网格大小 10px
      //   visible: true, // 渲染网格背景
      //   type: "mesh",
      //   args: {
      //     color: "#D0D0D0",
      //     thickness: 1, // 网格线宽度/网格点大小
      //     factor: 10,
      //   },
      // },
      //高亮显示
      magnetAvailabilityHighlighter: {
        name: "stroke",
        args: {
          attrs: {
            fill: "#fff",
            stroke: "#47C769",
          },
        },
      },
      commonNodes: [
        {
          type: "start",
          nodeName: "卫星网络",
          icon: "StartIcon",
        },
        {
          type: "start",
          nodeName: "某解调器",
          icon: "StartIcon",
        },
        {
          type: "start",
          nodeName: "数据转换引擎",
          icon: "StartIcon",
        },
        {
          type: "start",
          nodeName: "BBF信号解析",
          icon: "StartIcon",
        },
        {
          type: "start",
          nodeName: "BBF资源规划",
          icon: "StartIcon",
        },
        {
          type: "start",
          nodeName: "BBF信号方案",
          icon: "StartIcon",
        },
        {
          type: "start",
          nodeName: "日志组件",
          icon: "StartIcon",
        },
        {
          type: "start",
          nodeName: "监控组件",
          icon: "StartIcon",
        },
        {
          type: "start",
          nodeName: "设置组件",
          icon: "StartIcon",
        },
        {
          type: "start",
          nodeName: "设备状态组件",
          icon: "StartIcon",
        },
        {
          type: "start",
          nodeName: "标题栏组件",
          icon: "StartIcon",
        },
        {
          type: "start",
          nodeName: "状态栏组件",
          icon: "StartIcon",
        },
        {
          type: "start",
          nodeName: "数据处理组件",
          icon: "StartIcon",
        },
      ],
    };
  },

  mounted() {
    this.initAntvX6();
    this.reloadData();
  },

  methods: {
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

    //初始化画布
    initAntvX6() {
      let that_ = this;
      this.graph = new Graph({
        container: document.getElementById("containerChart"),
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

    // 删除节点
    deleteNode() {
      const cell = this.graph.getSelectedCells();
      this.graph.removeCells(cell);
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
    revoke() {
      this.graph.undo();
    },
  },
};
</script>

<style lang="less" scoped>
.cont {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .cont-top {
    display: flex;
    margin: 0 10px;
    height: calc(100vh - 90px);
    .cont-assembly {
      width: 15%;
      background: #fff;

      /deep/.el-tabs__item {
        padding: 0 20px;
        height: 40px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 15px;
        font-weight: 500;
        color: #898989;
        position: relative;
        background: #ffffff;
      }

      /deep/.is-active {
        color: #409eff;
      }

      /deep/.el-tabs .el-tabs__nav .el-tabs__item::after {
        border: 0px;
      }

      .component {
        height: calc(50vh - 90px);
        overflow-y: auto;

        .component-item {
          height: 40px;

          span {
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #464646;
          }
        }

        .is-active {
          background: #edf5ff;
          border-left: 4px solid #267ef9;

          span {
            color: #277df5;
          }
        }
      }

      .search {
        /deep/.el-input__inner {
          background: #f9fafc !important;
          height: 34px;
          border-radius: 0px;
          border: none !important;
          border-bottom: 1px solid #e8edf2 !important;
        }
      }

      .nodeItem {
        background: #edeef0;
        height: 40px;
        width: calc(50% - 10px);
        line-height: 40px;
        text-align: left;
        padding-left: 10px;
        cursor: move;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        margin-bottom: 10px;
      }
      .nodeItem:hover {
        background: #0185f2;
        color: #ffffff;
      }
    }
    .cont-layout {
      width: 60%;

      .containerChartHeader {
        .form-name {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #848484;
          line-height: 26px;
          margin-right: 10px;
        }
      }

      .container {
        position: relative;
        height: calc(100vh - 235px);
        .containerChart {
          width: 100% !important;
          height: 100%;
        }

        .chartTool {
          position: absolute;
          top: 0;
          z-index: 99;
          background-color: #ffffff;
          padding: 0 10px;
          box-shadow: 1px 1px 4px 0 #0a0a0a2e;
          .btn-group {
            border-right: 1px solid #efefef;
            display: inline-block;
            padding-left: 10px;
            padding-right: 14px;
            position: relative;
            .btn-group_tips {
              text-align: center;
              top: 63px;
              left: 1px;
              position: absolute;
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 120px;
              height: 60px;
              background: #515a6e;
              border-radius: 6px;
              animation: tips 4s;
              transition: all 1s;
              &:after {
                content: "";
                width: 0;
                height: 0;
                position: absolute;
                top: -5px;
                left: 46%;
                border-width: 0 5px 5px;
                border-style: solid;
                border-color: transparent transparent #515a6e;
              }
            }
            &:last-of-type {
              border-right: 0;
            }
            .btn {
              display: inline-block;
              margin: 2px;
              width: 30px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              cursor: pointer;
              transition: all 0.4s;
              border-radius: 6px;
              border: 1px solid rgba(233, 233, 233, 0);
              i {
                font-size: 20px;
              }
            }
            .currentArrow {
              background: #2d8cf0;
              color: #fff;
            }
          }
        }
      }
    }
    .cont-deploy {
      width: 25%;
      .csbox {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        div {
          margin: 4px;
        }
      }
      .hs {
        color: #c1c1c1;
      }
      .pd {
        padding: 0 15px;
      }
      .mad {
        border: 1px solid #e9e9e9;
        padding: 5px;
        margin: 5px;
      }
      .waydiv {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .cont {
        height: 100%;
      }
      .title {
        background: #4d5c71;
        color: white;
        height: 35px;
        line-height: 35px;
        padding-left: 20px;
      }
      .r-main {
        // padding: 15px;
        height: calc(100vh - 135px);
        overflow-y: auto;
        position: relative;
        background: #fff;
        .systm {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
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
      .btn-class {
        background: #267ff6;
        border: none;
        color: white;
        border-radius: 15px;
        line-height: 30px;
        height: 30px;
        width: 100px;
      }
    }
  }
  .cont-bottom {
    background: white;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
  }
}
// @import '../../assets/iconfont.css';
</style>
