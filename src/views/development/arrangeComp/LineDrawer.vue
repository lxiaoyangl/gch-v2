<template>
  <div class="drawer">
    <el-drawer
      :with-header="false"
      size="100%"
      :modal="false"
      :destroy-on-close="true"
      v-model="lineDrawer"
      direction="rtl"
      modal-class="drawer-modal"
    >
      <div class="cont-deploy">
        <div class="right">
          <div class="title">xxxx->>-sssss</div>
        </div>
        <div class="r-main">
          <el-tabs v-model="activeName" stretch>
            <el-tab-pane :label="item.tabLabel" :name="item.tabName" v-for="(item, i) in dataLineDatas" :key="i">
              <line-comp :dataLineDatas="item.data"></line-comp>
            </el-tab-pane>
          </el-tabs>
          <!-- <div class="r-bottom">
          <el-button type="primary">确 定</el-button>
        </div> -->
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import LineComp from "./LineComp.vue";
export default {
  components: { LineComp },
  props: ["lineDrawer"],
  data() {
    return {
      activeNames: ["1", "2"],
      childrenActiveNames: ["11", "12", "13"],
      activeName: "dataLine",
      dataLineDatas: [
        {
          tabLabel: "数据线",
          tabName: "dataLine",
          data: { title: "数据线设置", dataMappingList: [] },
        },
        {
          tabLabel: "控制线",
          tabName: "controlLine",
          data: { title: "控制线设置", dataMappingList: [] },
        },
        {
          tabLabel: "状态线",
          tabName: "statusLine",
          data: { title: "状态线设置", dataMappingList: [] },
        },
      ],
      controlLineDatas: {},
      statusLineDatas: {},
      formData: {},
    };
  },
  methods: {
    addDataMapping() {
      let obj = {
        compName: "组件3",
        compIn: "",
        compOut: "",
        children: [
          {
            interfaceName: "接口1",
            interfaceIn: "",
            interfaceOut: "",
            children: [
              {
                argumentName: "参数1",
                argumentIn: "",
                argumentOut: "",
              },
            ],
          },
        ],
      };
      this.dataMappingList.push(obj);
    },
    handleAddItem(type, item) {
      let obj = {};
      for (const v of this.dataMappingList) {
        for (const cv of v.children) {
          if (type == "intf") {
            obj = {
              interfaceIn: "",
              interfaceName: "接口" + (v.children.length + 1),
              interfaceOut: "",
              children: [
                {
                  argumentIn: "",
                  argumentName: "参数1",
                  argumentOut: "",
                },
              ],
            };
            v.children.push(obj);
            break;
          } else if (type == "arg") {
            obj = {
              argumentIn: "",
              argumentName: "参数" + (cv.children.length + 1),
              argumentOut: "",
            };
            cv.children.push(obj);
            break;
          }
        }
      }
    },
    handleDelItem(type, item) {
      for (let i = 0; i < this.dataMappingList.length; i++) {
        const v = this.dataMappingList[i];

        for (let ci = 0; ci < v.children.length; ci++) {
          const cv = v.children[ci];
          if (type == "intf" && cv.argumentName == item.argumentName) {
            v.children.splice(ci, 1);
            // if (v.children.length <= 0) {
            //   v.children.splice(i, 1);
            // }
            break;
          } else if (type == "arg") {
            cv.children.forEach((vv, vi) => {
              if (item.argumentName == vv.argumentName) {
                cv.children.splice(vi, 1);
              }
            });
            // if (cv.children.length <= 0) {
            //   v.children.splice(i, 1);
            // }
            break;
          }
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.drawer {
  :deep(.drawer-modal) {
    position: absolute !important;
  }
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
      .r-title {
        padding: 10px;
        padding-top: 0;
      }
    }
  }
  /deep/.el-form-item {
    // padding: 8px 0;
    // margin: 5px 0;
    border-radius: 2px;
    .el-form-item__label {
      padding-top: 8px;
      width: 60px;
    }
    .cont {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .f-after {
      width: 60px;
      // background-color: #fff;
      // align-self: flex-end;
      text-align: center;
      a {
        font-size: 18px;
        // display: none;
      }
    }
    &:hover {
      .f-after {
        a {
          display: inline-flex;
        }
      }
    }
  }
  .comp {
    background-color: #f6f7fb;
    // padding: 5px;
    // .comp-title {
    //   display: flex;
    //   justify-content: space-around;
    //   .t-out {
    //     width: 50%;
    //     background-color: #dbf9f9;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //   }
    //   .t-in {
    //     width: 50%;
    //     background-color: #e4f2ff;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //   }
    //   img {
    //     margin-right: 10px;
    //   }
    // }
    // display: flex;
  }
}

.el-drawer__wrapper {
  right: 0;
  left: auto;
  width: 40%;
  position: absolute;
}
.el-descriptions {
  /deep/.el-descriptions-item__cell {
    padding: 0 !important;
    .el-select {
      width: 100%;
      margin: 0;
    }
  }
  /deep/.el-descriptions-item__label {
    width: 80px;
    text-align: center;
  }
}
</style>
