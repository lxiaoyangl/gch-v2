<template>
  <div class="visualDesign">
    <div class="menuSJ">
      <div class="menutitle">菜单设计</div>
      <div class="menutab">
        <el-table
          :data="yth"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            show-overflow-tooltip
            prop="list"
            label="一体化控制面板"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            type="selection"
            width="50"
          ></el-table-column>
        </el-table>
        <el-table
          :data="zzjx"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            show-overflow-tooltip
            prop="list"
            label="主站解析协议"
            class="cols"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            type="selection"
            width="50"
          ></el-table-column>
        </el-table>
        <el-table
          :data="xhcl"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            show-overflow-tooltip
            prop="list"
            label="信号处理姿态"
            class="cols"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            type="selection"
            width="50"
          ></el-table-column>
        </el-table>
        <el-table
          :data="xhjk"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            show-overflow-tooltip
            prop="list"
            label="信号监控"
            class="cols"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            type="selection"
            width="50"
          ></el-table-column>
        </el-table>
        <el-table
          :data="sbgl"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            show-overflow-tooltip
            prop="list"
            label="设备管理"
            class="cols"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            type="selection"
            width="50"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <div></div>
    <div class="could">
      <div class="sjtitle">可视化设计预览</div>
      <div class="could-xz">
        <el-radio-group v-model="tabPosition">
          <el-radio-button label="yth" class="bor"
            >一体化控制面板</el-radio-button
          >
          <el-radio-button label="zj">主战解析协议</el-radio-button>
          <el-radio-button label="xhcl">信号处理姿态</el-radio-button>
          <el-radio-button label="xhjk">信号监控</el-radio-button>
          <el-radio-button label="sbgl">设备管理</el-radio-button>
          <el-radio-button label="zyts">资源态势</el-radio-button>
          <el-radio-button label="rzgl">日志管理</el-radio-button>
        </el-radio-group>
      </div>
      <div class="pgbox">
        <div class="page-t">
          <div class="tbox1">
            <div class="tbox1-top">
              <span>DVB-S2配置</span>
              <el-checkbox checked size="medium"></el-checkbox>
            </div>
            <div class="tbox1-btm">
              <div class="moren" v-for="i in 4" :key="i"></div>
            </div>
          </div>
          <div class="tbox2">
            <div class="tbox2-top">
              <span>黑名单列表</span>
              <el-checkbox checked></el-checkbox>
            </div>
            <div class="tbox2-btm">
              <div class="moren" v-for="i in 10" :key="i"></div>
            </div>
          </div>
        </div>
        <div class="pagebtm">
          <div class="tbox2">
            <div class="tbox2-top">
              <span>黑名单列表</span>
              <el-checkbox checked></el-checkbox>
            </div>
            <div class="tbox2-btm">
              <div class="moren" v-for="i in 45" :key="i"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-button type="primary" size="small">保存</el-button>
        <el-button size="small" type="info" class="mrt">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabPosition: "yth",
      yth: [
        {
          list: "DVB-S2配置",
        },
        {
          list: "DVB-S2配置",
        },
        {
          list: "DVB-S2配置",
        },
        {
          list: "DVB-S2配置",
        },
      ],
      zzjx: [
        {
          list: "载波群组",
        },
        {
          list: "时隙分配",
        },
        {
          list: "目标监控",
        },
        {
          list: "通信流量",
        },
      ],
      xhcl: [
        {
          list: "处理态势",
        },
        {
          list: "处理信息列表",
        },
      ],
      xhjk: [
        {
          list: "信号列表",
        },
        {
          list: "信号详情",
        },
      ],
      sbgl: [
        {
          list: "设备列表",
        },
        {
          list: "设备链路图",
        },
        {
          list: "新建设备",
        },
        {
          list: "设备参数设置",
        },
        {
          list: "设备详情",
        },
      ],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style lang="less" scoped>
.mrt {
  margin-right: 10px !important;
}
.visualDesign {
  height: 100%;
  width: 100%;
  display: flex;
  .menuSJ {
    width: 300px;
    height: 100%;
    margin: 0 1px;
    background-color: #fff;
    .menutitle {
      line-height: 35px;
      background: #4d5c71;
      padding-left: 20px;
      color: white;
      font-size: 14px;
    }
    .menutab {
      height: calc(100% - 35px);
      overflow: scroll;
    }
  }
  .could {
    flex: 1;
    height: 100%;
    .sjtitle {
      line-height: 35px;
      background: #4d5c71;
      padding-left: 20px;
      color: white;
      font-size: 14px;
    }
    .could-xz {
      width: 100%;
      background: white;
      height: 55px;
      /deep/.el-radio-button__inner {
        line-height: 30px;
        height: 55px;
        border: none;
        border-radius: 0;
      }
      /deep/.bor {
        border: none;
      }
    }
    .pgbox {
      padding: 15px;
      background: #fbfbfb;
      height: calc(100% - 135px);
      .page-t {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        .tbox1 {
          width: 30%;
          background: white;
          border: 1px solid #f1f1f1;
          border-radius: 5px;
          padding: 15px;
          margin-right: 20px;
          .tbox1-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
            font-size: 16px;
            font-weight: bold;
          }
          .tbox1-btm {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .moren {
              width: 130px;
              height: 20px;
              background: #f5f5f5;
              border-radius: 5px;
              margin-top: 15px;
            }
          }
        }
        .tbox2 {
          flex: 1;
          background: white;
          border: 1px solid #f1f1f1;
          border-radius: 5px;
          padding: 15px;
          .tbox2-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
            font-size: 16px;
            font-weight: bold;
          }
          .tbox2-btm {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .moren {
              width: 130px;
              height: 20px;
              background: #f5f5f5;
              border-radius: 5px;
              margin-top: 15px;
            }
          }
        }
      }
      .pagebtm {
        background: white;
        border: 1px solid #f1f1f1;
        border-radius: 5px;
        padding: 15px;
        .tbox2-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 30px;
          font-size: 16px;
          font-weight: bold;
        }
        .tbox2-btm {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .moren {
            width: 130px;
            height: 20px;
            background: #f5f5f5;
            border-radius: 5px;
            margin-top: 20px;
          }
        }
      }
    }
    .footer {
      background: white;
      border-top: 1px solid #f2f2f2;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      height: 45px;
      padding-right: 15px;
    }
  }
}
</style>