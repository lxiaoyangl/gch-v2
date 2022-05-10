<template>
  <div class="cont">
    <div class="cont-main">
      <div class="main-l">
        <div class="title">可视化组件</div>
        <div class="main-table">
          <div class="component">
            <div class="component-item is-active">
              <span>XXX-XX信号网络处理</span>
            </div>
            <div class="component-item"><span>XXX-XX信号网络处理</span></div>
            <div class="component-item"><span>XXX-XX信号网络处理</span></div>
            <div class="component-item"><span>XXX-XX信号网络处理</span></div>
            <div class="component-item"><span>XXX-XX信号网络处理</span></div>
            <div class="component-item"><span>XXX-XX信号网络处理</span></div>
          </div>
        </div>
      </div>
      <div class="main-r">
        <div class="right-title">
          <span class="line"></span><span class="text">基本信息</span><span class="dashe"></span>
        </div>

        <div class="info">
          <div>
            <span>
              <span class="title">组件名称：</span>
              <span class="content">XXX-WX信号网络处理</span>
            </span>
            <span style="margin-left: 100px">
              <span class="title">组件类型：</span>
              <span class="content">信号处理</span>
            </span>
            <span style="margin-left: 100px">
              <span class="title">版本信息：</span>
              <span class="content">242355</span>
            </span>
          </div>

          <div>
            <span>
              <span class="title">组件说明：</span>
              <span class="content"
                >接受BBF信号，调用解析算法“特定DLL”处理BBF信号输入，解析输出（载波数据，目标数据，时隙数据）。</span
              >
            </span>
          </div>

          <div>
            <span>
              <span class="title">场景说明：</span>
              <span class="content"
                >应用场景说明应用场景说明应用场景说明应用场景说明应用场景说明应用场景说明应用场景说明应用场景说明应用场景说明应用场景说明应用场景说明应用场景说明应用场景说明应用场景说明</span
              >
            </span>
          </div>
        </div>

        <div class="right-title">
          <span class="line"></span><span class="text">可视化图片</span><span class="dashe"></span>
        </div>

        <div class="visualization-image">
          <img class="img" src="../../assets/img/xgimg.jpg" />
          <img class="img" src="../../assets/img/xgimg.jpg" />
          <img class="img" src="../../assets/img/xgimg.jpg" />
          <img class="img" src="../../assets/img/xgimg.jpg" />
        </div>
      </div>
    </div>
    <div class="cont-bottom">
      <el-button type="primary" @click="finish">完 成</el-button>
      <el-button type="info">上一步</el-button>
      <el-button type="success"><i class="delete el-icon-document-copy"></i> 保存草稿</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",

  components: {},

  directives: {},

  data() {
    return {
      activeNames: ["1", "2"],
      webdata: "",
    };
  },

  mounted() {},

  methods: {
    finish() {
      this.$router.push("/fidlddata/appDevlopFinish");
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
  .cont-bottom {
    background: white;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
  }
  .cont-main {
    height: calc(100vh - 100px);
    margin: 0 15px;
    background: white;
    display: flex;
    .main-l {
      width: 300px;
      .title {
        background: #4d5c71;
        height: 40px;
        line-height: 40px;
        color: white;
        padding-left: 10px;
      }
      .main-table {
        height: calc(100vh - 140px);
        overflow: scroll;
        background: #f9fafc;
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

          .component-item:hover {
            background: #edf6ff;
          }

          .is-active {
            background: #edf5ff;
            border-left: 4px solid #edf6ff;

            span {
              color: #277df5;
            }
          }
        }
      }
    }
    .main-r {
      flex: 1;
      padding: 15px;
      overflow: scroll;

      .right-title {
        height: 40px;
        line-height: 40px;
        display: flex;

        .line {
          display: inline-block;
          height: 16px;
          width: 6px;
          margin: 13px 5px 13px 10px;
          background: #257ff7;
          border-radius: 4px;
        }

        .text {
          font-size: 14px;
          display: inline-block;
          width: 80px;
        }

        .dashe {
          display: inline-block;
          height: 2px;
          width: 100%;
          margin: 19px 0px 19px 0px;
          border-bottom: 1px dashed #afafaf;
        }
      }

      .info {
        margin: 10px;

        div {
          margin: 10px;
        }

        .title {
          color: #9e9e9e;
        }

        .content {
          color: #4c4c4c;
        }
      }

      .visualization-image {
        margin: 10px;

        .img {
          width: 31.3%;
          margin: 1%;
        }
      }
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
  /deep/.el-collapse-item__arrow {
    margin: 0 8px 0 8px;
  }
}
</style>
