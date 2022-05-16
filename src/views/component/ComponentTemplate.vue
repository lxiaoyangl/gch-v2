<template>
  <div class="componentTemplate">
    <div class="panel">
      <div class="left">
        <div class="title">
          <span>常用组件开发模板</span>
          <span>
            <el-input placeholder="输入组件名称" style="width: 200px" :suffix-icon="Search"> </el-input>
          </span>
        </div>

        <div class="template-list">
          <el-row class="list-item">
            <el-col :span="7">
              <div class="image-text">
                <img src="../../assets/img/operationHome/审批-组件.png" />
                <span>卫星网络</span>
              </div>
            </el-col>
            <el-col :span="6">信号接入</el-col>
            <el-col :span="7">某场景 </el-col>
            <el-col :span="4"><span class="download">下载模板</span></el-col>
          </el-row>
        </div>
        <div class="template-info">
          <div class="info-row">
            <span class="info-title">组件名称：</span>
            <span class="info-name">某解调器</span>
          </div>
          <div class="info-row">
            <span class="info-title">模板规范：</span>
            <span class="info-content"
              >模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范</span
            >
          </div>

          <div class="info-row">
            <span class="info-title">模板规范：</span>
            <span class="info-content"
              >模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范模板规范</span
            >
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">
          <span>开发步骤</span>
        </div>
        <el-steps style="height: 50%; padding: 10px" direction="vertical">
          <el-step
            title="选择左侧下载模板"
            description="具体描述具体描述具体描述具体描述具体描述具体描述具体描述具体描述具体描述具体描述具体描述具体描述"
            status="process"
          ></el-step>
          <el-step
            title="根据模板组件进行开发"
            description="具体描述具体描述具体描述具体描述具体描述具体描述"
            status="process"
          ></el-step>
          <el-step
            title="开发完成上传注册"
            description="具体描述具体描述具体描述具体描述具体描述具体描述具体描述具体描述具体描述具体描述具体描述具体描述"
            status="process"
          ></el-step>
        </el-steps>

        <div class="reminder">提示：若已经完成开发组件，请直接点击下方按钮，开始注册。</div>
        <div class="register-btn" @click="register">开始注册</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";

const router = useRouter();
const register = () => {
  router.push("/componentFactory/compoentmangement");
};
</script>

<style lang="less" scoped>
.panel {
  background: #ffffff;
  height: calc(100vh - 250px);
  width: 60%;
  margin: 100px auto;
  border-radius: 20px;
  display: flex;

  .left {
    height: 100%;
    width: 65%;
    border-right: 1px solid #f4f6f9;

    .title {
      color: #363636;
      font-size: 16px;
      font-weight: bold;
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      padding-right: 20px;

      display: flex;
      justify-content: space-between;
      flex-direction: row;

      :deep(.el-input__inner) {
        background: #f8f9fb !important;
        border-radius: 20px;
        height: 34px;
        border: 0 !important;
      }
    }

    .template-list {
      margin: 10px;
      height: 65%;
      overflow: auto;
      background: #fff;

      .list-item:hover {
        border: 1px solid #91c4f1;

        .download {
          background: #2276ff;
          color: #fff;
        }
      }

      .list-item {
        height: 40px;
        border-radius: 6px;
        background: linear-gradient(to right, #fefefe, #f8f9fb, #f4f5f7, #eceff3, #ebeff2);
        border: 1px solid transparent;
        color: #191919;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        margin-bottom: 4px;

        .image-text {
          display: flex;
          padding-left: 10px;
          img {
            height: 20px;
            margin: 10px 0px 10px 5px;
          }
          span {
            margin-left: 10px;
          }
        }

        .el-col {
          height: 40px;
          line-height: 40px;
        }

        .download {
          background: #fff;
          border-radius: 13px;
          display: inline-block;
          height: 26px;
          line-height: 26px;
          width: 90px;
          text-align: center;
          font-size: 12px;
          margin: 7px;
          color: #a5a5a5;
          cursor: pointer;
        }
      }
    }

    .template-info {
      height: calc(35% - 70px);
      background: #f5f7f9;
      padding: 10px;

      .info-row {
        display: flex;
        margin-top: 10px;
        margin-bottom: 10px;

        .info-title {
          font-size: 14px;
          color: #444444;
          font-family: MicrosoftYaHei;
          width: 100px;
        }

        .info-name {
          width: calc(100% - 110px);
          font-size: 14px;
          color: #000000;
          font-family: MicrosoftYaHei;
        }

        .info-content {
          width: calc(100% - 110px);
          font-size: 14px;
          color: #888888;
          font-family: MicrosoftYaHei;
          line-height: 18px;
        }
      }
    }
  }

  .right {
    height: 100%;
    width: 34%;

    .title {
      color: #363636;
      font-size: 16px;
      font-weight: bold;
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      padding-right: 20px;
    }

    :deep(.el-step__icon.is-text) {
      background: #e4efff;
      color: #2e84fb;
      border-radius: 4px;
      border: none;
    }
    :deep(.el-step__line) {
      background: #fff;
      border-left: 4px dashed #a9c4db;
    }
    :deep(.el-step__description) {
      color: #6a6a6a;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      margin-top: 10px;
      padding-right: 0px;
    }

    :deep(.el-step__title.is-process) {
      font-size: 14px;
    }

    .reminder {
      margin-top: 80px;
      color: #8ab5f2;
      padding: 10px;
    }

    .register-btn {
      margin: 10px;
      border-radius: 6px;
      background: linear-gradient(to right, #267ef9, #2b81fa, #3386fa, #3e8dfa, #4693fb);
      color: #fff;
      text-align: center;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
    }
  }
}
</style>
