<template>
  <div class="app-dev">
    <div class="main">
      <img class="icon" src="../../assets/img/应用完成.png" />
      <div class="title">开发完成</div>

      <div class="info">
        <div class="right-title"><span class="line"></span><span class="text">应用信息</span></div>
        <div>
          <span>
            <span class="info-title">应用名称：</span>
            <span class="content">XXX-WX信号网络处理</span>
          </span>
          <span style="margin-left: 100px">
            <span class="info-title">应用类型：</span>
            <span class="content">信号处理</span>
          </span>
          <span style="margin-left: 100px">
            <span class="info-title">版本信息：</span>
            <span class="content">242355</span>
          </span>
        </div>

        <div>
          <span>
            <span class="info-title">应用说明：</span>
            <span class="content"
              >接受BBF信号，调用解析算法“特定DLL”处理BBF信号输入，解析输出（载波数据，目标数据，时隙数据）。</span
            >
          </span>
        </div>
      </div>

      <div class="btn-group">
        <el-popover placement="top" width="480" trigger="click">
          <template #reference>
            <el-button>立即打包</el-button>
          </template>
          <el-form
            class="form"
            ref="formRef"
            :rules="rules"
            :model="form"
            label-width="100px"
            style="width: 100%"
            :show-message="false"
          >
            <el-form-item label="打包方式" prop="packageType">
              <el-select style="width: 100%" v-model="form.packageType" placeholder="请选择打包方式">
                <el-option label="打包到服务区" value="1"></el-option>
                <el-option label="保存本地" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item v-if="form.packageType == 2" label="存储地址" prop="savePath">
              <el-input type="file" v-model="form.savePath"></el-input>
            </el-form-item>

            <el-form-item v-if="form.packageType == 1" label="服务器名称" prop="serverName">
              <el-input v-model="form.serverName"></el-input>
            </el-form-item>

            <el-form-item v-if="form.packageType == 1" label="服务器" prop="serverAddress">
              <el-input v-model="form.serverAddress"></el-input>
            </el-form-item>

            <el-form-item v-if="form.packageType == 1" label="服务器端口" prop="serverPort">
              <el-input type="number" v-model="form.serverPort"></el-input>
            </el-form-item>

            <div class="submit-btn">
              <el-button type="default">取 消</el-button>
              <el-button type="primary" @click="submitPackage(formRef)">确 定</el-button>
            </div>
          </el-form>
        </el-popover>
        <el-button type="primary" @click="confirmFinish">确认完成</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FormInstance } from "element-plus";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";

const formRef = ref<FormInstance>();
const router = useRouter();
let form = reactive({
  serverName: "",
  packageType: 1,
  serverAddress: "",
  serverPort: "",
  savePath: "",
});
let rules = {
  serverName: [{ required: true, message: "请输入服务器名称", trigger: "blur" }],
  packageType: [{ required: true, message: "请选择打包方式", trigger: "change" }],
  serverAddress: [{ required: true, message: "请输入服务器地址", trigger: "blur" }],
  serverPort: [{ required: true, message: "请输入服务器端口", trigger: "blur" }],
};

const submitPackage = (formRef: FormInstance | undefined) => {
  if (!formRef) return;
  formRef.validate((valid) => {
    if (valid) {
      router.push("/fidlddata/release");
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
const confirmFinish = () => {
  router.push("/application/management");
};
</script>

<style lang="less" scoped>
.el-form {
  .el-form-item {
    margin: 20px;

    :deep(.el-input__inner) {
      width: 270px !important;
      background: #f4f5f7;
    }
  }

  .submit-btn {
    width: 460px;
    display: flex;
    justify-content: center;
    margin: 15px;
    :deep(.el-button--default) {
      background: #17b9c8;
      border: 1px solid #c2c2c2;
      color: #ffffff;
    }
  }
}

.main {
  width: 800px;
  height: calc(100vh - 50px);
  margin: 0px auto;

  .icon {
    width: 150px;
    margin: 75px 325px 30px 325px;
  }

  .title {
    width: 100%;
    text-align: center;
    font-size: 30px;
    color: #414141;
    font-weight: bold;
  }

  .btn-group {
    display: flex;
    margin: 30px;
    justify-content: center;

    .el-button {
      width: 120px;
      margin: 5px;
    }

    :deep(.el-button--default) {
      background: #17b9c8;
      border: 1px solid #c2c2c2;
      color: #ffffff;
    }
  }

  .info {
    background: #f8f9fb;
    border-radius: 4px;
    padding: 20px;
    margin-top: 20px;

    .right-title {
      height: 40px;
      line-height: 40px;
      display: flex;

      .line {
        display: inline-block;
        height: 16px;
        width: 6px;
        margin: 13px 5px 13px 0px;
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

    div {
      margin: 10px;
    }

    .info-title {
      color: #9e9e9e;
    }

    .content {
      color: #4c4c4c;
    }
  }
}
</style>
