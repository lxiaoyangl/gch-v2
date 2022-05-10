<template>
  <div class="drawer">
    <el-drawer
      :with-header="false"
      size="100%"
      :modal="false"
      :destroy-on-close="true"
      v-model="nodeDrawer"
      direction="rtl"
      modal-class="drawer-modal"
    >
      <div class="cont-deploy">
        <div class="right">
          <div class="title">{{ nodeDrawerData.name }}</div>
        </div>
        <div class="r-main">
          <el-tabs v-model="activeName" stretch>
            <el-tab-pane label="基本信息" name="basicInformation">
              <el-form ref="depForm" label-width="160px">
                <el-form-item label="组件名称：">
                  <div>{{ nodeDrawerData.name }}</div>
                </el-form-item>
                <el-form-item label="组件类型：">
                  <div>{{ bisecData.compType }}</div>
                </el-form-item>
                <el-form-item label="组件应用场景：">
                  <div>
                    {{ bisecData.usageScenario }}
                  </div>
                </el-form-item>
                <el-form-item label="版本信息：">
                  <div>
                    {{ bisecData.versions }}
                  </div>
                </el-form-item>
                <el-form-item label="创建时间：">
                  <div>{{ bisecData.creatTime }}</div>
                </el-form-item>
                <el-form-item label="组件描述：">
                  <div>
                    {{ bisecData.desc }}
                  </div>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="组件部署" name="componentDeployment">
              <el-form ref="formDataRef" :model="formData" label-suffix="：" inline label-width="160px" :rules="rules">
                <el-form-item prop="name" label="名称">
                  <el-input readonly v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item prop="inValue" label="入参">
                  <el-input v-model="formData.inValue" placeholder="请输入读取参数"></el-input>
                </el-form-item>
                <el-form-item prop="modeEdit" label="读取参数">
                  <el-radio-group v-model="formData.modeEdit">
                    <el-radio label="1">读取参数</el-radio>
                    <el-radio label="0">默认参数</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item prop="classNameType" label="类型">
                  <el-select v-model="formData.classNameType" placeholder="请选择类路径类型">
                    <el-option v-for="(item, i) in classNameTypeOpts" :key="i" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="className" label="类路径">
                  <el-select v-model="formData.className" placeholder="请选择javaClass路径">
                    <el-option v-for="(item, i) in classNameOpts" :key="i" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="extention" label="变参集合">
                  <el-input v-model="formData.extention" placeholder="请输入变参key集合"></el-input>
                </el-form-item>
                <el-form-item prop="dtaModel" label="数据模型">
                  <el-select v-model="formData.dtaModel" placeholder="请选择数据模型">
                    <el-option v-for="(item, i) in dtaModelOpts" :key="i" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="outValue" label="出参">
                  <el-input v-model="formData.outValue" placeholder="请输入出参"></el-input>
                </el-form-item>
              </el-form>
              <!-- <el-collapse v-model="activeNames">
              <el-collapse-item name="11">
                <template slot="title">
                  <span>运行环境</span>
                </template>
                <el-form
                  :model="formData"
                  ref="oeForm"
                  inline
                  label-width="100px"
                >
                  <el-form-item label="操作系统：">
                    <el-select
                      v-model="formData.czxt"
                      size="small"
                      style="width: 140px"
                      multiple
                      placeholder="请选择操作系统"
                    >
                      <el-option label="1" value="1"></el-option>
                      <el-option label="2" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="最小磁盘：">
                    <el-input
                      v-model="formData.cp"
                      size="small"
                      style="width: 140px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="最小CPU：">
                    <el-input
                      v-model="formData.cpu"
                      size="small"
                      style="width: 140px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="最小内存：">
                    <el-input
                      v-model="formData.internal"
                      size="small"
                      style="width: 140px"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </el-collapse-item>
              <el-collapse-item name="12">
                <template slot="title">
                  <span> 运行方式 </span>
                </template>
                <el-form
                  :model="formData"
                  ref="mooForm"
                  inline
                  label-width="100px"
                >
                  <el-form-item label="实例方式：">
                    <el-radio
                      label="单机多实例"
                      style="width: 140px"
                      v-model="formData.radio"
                    ></el-radio>
                  </el-form-item>
                  <el-form-item label="调用方式：">
                    <el-select
                      v-model="formData.dyway"
                      placeholder="power job"
                      size="small"
                      style="width: 140px"
                    >
                      <el-option label="1" value="1"></el-option>
                      <el-option label="2" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-collapse-item>
              <el-collapse-item name="13">
                <template slot="title">
                  <span>接口设置</span>
                </template>
                <el-form
                  :model="formData"
                  ref="settingForm"
                  inline
                  label-width="100px"
                >
                  <el-form-item label="接口选择：">
                    <el-select
                      v-model="formData.dyway"
                      placeholder="用户信息接口"
                      size="small"
                      style="width: 140px"
                    >
                      <el-option label="1" value="1"></el-option>
                      <el-option label="2" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-collapse-item>
              <el-collapse-item name="14">
                <template slot="title">
                  <span>接口说明</span>
                </template>
                <el-form
                  :model="formData"
                  ref="expForm"
                  inline
                  label-width="100px"
                >
                  <el-form-item label="接口名：">
                    <p style="width: 300px">用户信息接口</p>
                  </el-form-item>
                  <el-form-item label="接口：">
                    <p style="width: 300px">com.sinx.user.manager.UserInfo</p>
                  </el-form-item>
                  <el-form-item label="接口说明：">
                    <p style="width: 300px">接口说明</p>
                  </el-form-item>
                  <el-form-item label="参数名称：">
                    <el-input
                      v-model="formData.cs1"
                      size="small"
                      style="width: 140px"
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="参数名称：">
                    <el-input
                      v-model="formData.cs2"
                      size="small"
                      style="width: 140px"
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="参数名称：">
                    <el-input
                      v-model="formData.cs3"
                      size="small"
                      style="width: 140px"
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="参数名称：">
                    <el-input
                      v-model="formData.cs4"
                      size="small"
                      style="width: 140px"
                    >
                    </el-input>
                  </el-form-item>
                </el-form>
              </el-collapse-item>
              <el-collapse-item name="2">
                <template slot="title"> 部署方式 </template>
                <el-form
                  :model="formData"
                  ref="depForm"
                  inline
                  label-width="100px"
                >
                  <el-form-item label="部署：">
                    <el-radio-group v-model="formData.radio">
                      <el-radio label="1">实例</el-radio>
                      <el-radio label="2">动态潮汐</el-radio>
                      <el-radio label="3">固定指定</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-collapse-item>
            </el-collapse> -->
            </el-tab-pane>
          </el-tabs>
          <div class="r-bottom">
            <el-button type="primary" @click="handleSave(formDataRef)">确 定</el-button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { getPerformanceList, createPerformanceNode } from "../../../util/request/api";
import { watch, reactive, ref } from "vue";
import type { FormInstance } from "element-plus";

interface BisecData {
  compType: string;
  usageScenario: string;
  versions: string;
  creatTime: string;
  desc: string;
}
interface OptionsData {
  label?: string;
  value?: string;
}
let { nodeDrawer, nodeDrawerData } = defineProps({
  nodeDrawer: {
    type: Boolean,
    default: false,
  },
  nodeDrawerData: {
    type: Object,
    default: () => ({}),
  },
});
let activeName = "basicInformation";
let activeNames: [] = [];
let formDataRef = ref<FormInstance>();
let formData = reactive({
  name: "",
  inValue: "",
  modeEdit: "",
  classNameType: "",
  className: "",
  extention: "",
  dtaModel: "",
  outValue: "",
});
let classNameTypeOpts = reactive([1, 2]);
let classNameOpts = reactive([]);
let dtaModelOpts = reactive([]);

let bisecData: BisecData = reactive({
  compType: "",
  usageScenario: "",
  versions: "",
  creatTime: "",
  desc: "",
});
let rules = {
  inValue: [
    {
      required: true,
      message: "请输入必填项",
      trigger: ["change", "bulr"],
    },
  ],
  modeEdit: [
    {
      required: true,
      message: "请选择",
      trigger: ["change", "bulr"],
    },
  ],
  classNameType: [
    {
      required: true,
      message: "请选择必填项",
      trigger: ["change", "bulr"],
    },
  ],
  outValue: [
    {
      required: true,
      message: "请输入必填项",
      trigger: ["change", "bulr"],
    },
  ],
};
const handleSave = (formEl: FormInstance) => {
  formEl.validate(async (valid) => {
    if (valid) {
      let { code, data } = (await createPerformanceNode(formData)) as any;
      if (code == 200) {
      }
    } else {
      // console.log("error submit!!");
      return false;
    }
  });
};
watch(nodeDrawerData, (val) => {
  bisecData = val.datas || {};
});
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
    }
  }
}

.el-drawer__wrapper {
  right: 0;
  left: auto;
  width: 40%;
  position: absolute;
}
/deep/.el-form-item {
  width: 100%;
  margin-bottom: 20px !important;
  display: flex;
  padding-right: 20px;
  .el-form-item__content {
    margin-left: 20px !important;
    flex: 1;
  }
  .el-select {
    width: 100%;
  }
  .el-input {
    // width: 200px;
  }
}
</style>
<style>
.el-overlay {
  position: absolute;
}
</style>
