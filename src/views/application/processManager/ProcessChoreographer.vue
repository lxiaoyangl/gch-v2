<!-- <template>
  <div class="applicationInstance">
    <el-row>
      <el-col :span="5">
        <div class="left">
          <div class="leftTop">
            <div class="applicationTitle">应用实例</div>
            <div>
              <el-menu
                  default-active="1"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleCloseMenu"
                  unique-opened
              >
                <el-menu-item :index="index" v-for="(item, index) in applicationData" :key="index">
                  <span slot="title">{{item.name}}</span>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
          <div class="leftBottom">
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
                  <span :class="{instanceItemOkStatus:item.status==1, instanceItemErrorStatus: item.status!=1}"></span>
                  <span slot="title">{{item.name}}<span style="float: right;">{{item.time}}</span></span>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="right">
          <div class="instanceFlow">
            <div class="flowDagImage">
              <div class="flowTitle">
                <span class="mgL20" style="color: #00aeff">【运行中】</span>
                <span class="mgL20" style="font-size: 18px;font-weight: bold">应用名称-流程实例名称</span>
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
                  <div :class="{flowComponentNameOk:item.status==1,flowComponentNameError:item.status!=1}">【{{item.name}}】</div>
                  <div class="flowComponentContent">{{item.log}}</div>
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
                      <el-form-item label="流程ID:">
                        12345678900
                      </el-form-item>
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
</template>

<script>

import { Graph,   Shape, Addon, NodeView } from "@antv/x6";
export default {
  name: "",
  components: {  },

  data() {
    return{
      searchData: {
        time: "",
        type: "",
        name: "",
      },
      applicationData: [
        {
          name: 'xxx-wx-信号网络处理',
        },
        {
          name: 'xxx-wx-信号网络处理',
        },
        {
          name: 'xxx-wx-信号网络处理',
        },
        {
          name: 'xxx-wx-信号网络处理',
        },
        {
          name: 'xxx-wx-信号网络处理',
        }
      ],
      instanceData: [
        {
          name: '流程实例一',
          time: '08/29 12:32:40',
          status: 2,
          active: false,
        },
        {
          name: '流程实例一',
          time: '08/29 12:32:40',
          status: 2,
          active: false,
        },
        {
          name: '流程实例一',
          time: '08/29 12:32:40',
          status: 1,
          active: false,
        },
        {
          name: '流程实例一',
          time: '08/29 12:32:40',
          status: 1,
          active: false,
        }
      ],
      componentLog: [
        {
          name: '组件名称',
          log: '射点发射点啊手动阀手动阀啊手动阀手动阀点发射点阿斯顿发射点阿斯顿发射点阿斯顿发射点阿阿斯蒂芬',
          status: 1,
        },
        {
          name: '组件名称',
          log: '阀手动阀啊手动阀手动阀点阿斯顿发射点发射点啊手动阀手动阀啊手动阀手动阀点发射点阿斯顿发射点阿斯顿发射点阿斯顿发射点阿阿斯蒂芬',
          status: 2,
        },
        {
          name: '组件名称',
          log: '射点发射点啊手动阀手动阀啊手动阀手动阀点阿斯顿发射点发射点啊手动阀手动阀啊手动阀手动阿斯蒂芬',
          status: 2,
        },
        {
          name: '组件名称',
          log: '动阀点阿斯顿发射点发射点啊手动阀手动阀啊手动阀手动阀点发射点阿斯顿发射点阿斯顿发射点阿斯顿发射点阿阿斯蒂芬',
          status: 1,
        },
        {
          name: '组件名称',
          log: '点发射点啊手动阀手动阀啊手动阀手动阀点发射点阿斯顿发射点阿斯顿发射点阿斯顿发射点阿阿斯蒂芬',
          status: 1,
        }
      ],
      graph: '',
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
      childrenActiveNames: ['1'],
      formInline: {}
    }
  },

  mounted() {
    this.initAntvX6();
    this.reloadData();
  },
  created() {

  },

  methods: {
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
        target.updateInPorts(this.graph);
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
      this.graph.centerContent(); //画布居中
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
  },
};
</script>

<style lang="less" scoped>
  .applicationInstance{
    .left{
      .leftTop{
        height: 50vh;
        box-shadow: 1px 1px 10px #888888;
        background-color: #FFFFFF;
        .applicationTitle{
          height: 40px;
          line-height: 40px;
          background-color: #635d5d;
          color: #fff;
          font-size: 18px;
          padding: 0 20px;
        }
        .el-menu-item.is-active{
          border-left: 5px solid #409EFF;
        }
      }
      .leftBottom{
        height: 50vh;
        box-shadow: 1px 1px 10px #888888;
        background-color: #FFFFFF;
        .instanceTitle{
          height: 40px;
          line-height: 40px;
          background-color: #635d5d;
          color: #fff;
          font-size: 18px;
          padding: 0 20px;
        }
        .instanceItem{
          height: 40px;
          line-height: 40px;
          padding: 0 20px;
          cursor: pointer;
        }
        .instanceItem:hover{
          background-color: #bac7de;
        }
        .el-menu-item.is-active{
          border-left: 5px solid #409EFF;
        }
        .instanceItemOkStatus{
          display: inline-block;
          width: 10px;
          height: 10px;
          background: blue;
          border-radius: 50%;
          margin-right: 8px;
        }
        .instanceItemErrorStatus{
          display: inline-block;
          width: 10px;
          height: 10px;
          background: red;
          border-radius: 50%;
          margin-right: 8px;
        }
      }
    }
    .right{
      height: 100vh;
      .instanceFlow{
        height: 60vh;
        width: 100%;
        display: flex;
        .flowDagImage{
          height: 100%;
          width: 70%;
          .flowTitle{
            height: 40px;
            line-height: 40px;
          }
          .flowContent{
            height: calc(100% - 40px);
            width: 100%;
            background-color: #e5eaef;
          }
        }
        .flowLog{
          width: 30%;
          background-color:#FFFFFF;
          .flowLogTitle{
            height: 40px;
            line-height: 40px;
            background-color: #635d5d;
            color: #fff;
            font-size: 16px;
            padding: 0 20px;
          }
          .flowLogContent{
            .flowLogContentItem{
              height: 80px;
              padding: 10px;
              .flowComponentNameOk{
                font-size: 16px;
                color: #43de73;
                font-weight: bold;
              }
              .flowComponentNameError{
                font-size: 16px;
                color: red;
                font-weight: bold;
              }
              .flowComponentContent{
                margin-top: 5px;
                font-size: 14px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: normal;
              }
            }
            .flowLogContentItem:hover{
              background-color: #c6ced4;
            }
          }
        }
      }
      .instanceItemInfo{
        height: 40vh;
        background-color: #FFFFFF;
        .flowComponentParticularsTitle{
          height: 40px;
          line-height: 40px;
          background-color: #635d5d;
          color: #fff;
          font-size: 18px;
          padding: 0 20px;
        }
        .flowComponentParticularsContent{
          padding: 0 20px;
          .collapseButton{
            border-radius: 15px;
          }
          .el-form-item__content{
            width: 200px;
          }
        }
      }
    }
    .mgL20{
      margin-left: 20px;
    }
  }
</style> -->
