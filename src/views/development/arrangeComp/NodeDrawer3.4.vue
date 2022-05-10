<template>
  <el-drawer
    :with-header="false"
    :modal="false"
    :show-close="false"
    size="100%"
    :modal-append-to-body="false"
    :destroy-on-close="true"
    :visible.sync="nodeDrawer"
    direction="rtl"
    custom-class="drawer"
  >
    <div class="cont-deploy">
      <div class="right">
        <div class="title">{{ nodeDrawerData.name }}</div>
      </div>
      <div class="r-main">
        <el-tabs v-model="activeName" stretch>
          <el-tab-pane label="基本信息" name="basicInformation">
            <el-form ref="depForm" label-width="100px">
              <el-form-item label="组件名称：">
                <div>{{ nodeDrawerData.name }}</div>
              </el-form-item>
              <el-form-item label="组件类型：">
                <div>{{ formData.compType }}</div>
              </el-form-item>
              <el-form-item label="组件应用场景：">
                <div>
                  {{ formData.usageScenario }}
                </div>
              </el-form-item>
              <el-form-item label="版本信息：">
                <div>
                  {{ formData.versions }}
                </div>
              </el-form-item>
              <el-form-item label="创建时间：">
                <div>{{ formData.creatTime }}</div>
              </el-form-item>
              <el-form-item label="组件描述：">
                <div>
                  {{ formData.desc }}
                </div>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="组件部署" name="componentDeployment">
            <el-collapse v-model="activeNames">
              <!-- <el-collapse-item name="1">
                <template slot="title">
                  <el-button round type="primary" size="small"
                    >部署要求</el-button
                  >
                </template> -->
              <!-- <el-collapse v-model="childrenActiveNames"> -->
              <el-collapse-item name="11">
                <template slot="title">
                  <span>运行环境</span>
                  <!-- <i class="el-icon-minus"></i>
                        <i class="el-icon-minus"></i>
                        <span>收起</span> -->
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
                  <!-- <el-button round type="primary" size="mini"></el-button> -->
                  <span> 运行方式 </span>
                  <!-- <i class="el-icon-minus"></i>
                        <i class="el-icon-minus"></i>
                        <span> 展开 </span> -->
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
                  <!-- <el-button round type="primary" size="mini"></el-button> -->
                  <span>接口设置</span>
                  <!-- <i class="el-icon-minus"></i>
                        <i class="el-icon-minus"></i>
                        <span> 展开 </span> -->
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
                  <!-- <el-button round type="primary" size="mini"></el-button> -->
                  <span>接口说明</span>
                  <!-- <i class="el-icon-minus"></i>
                        <i class="el-icon-minus"></i>
                        <span> 展开 </span> -->
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
              <!-- </el-collapse> -->
              <!-- </el-collapse-item> -->
              <el-collapse-item name="2">
                <template slot="title">
                  <!-- <el-button round type="primary" size="small"
                    >部署方式</el-button
                  > -->
                  部署方式
                </template>
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
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
        <div class="r-bottom">
          <el-button type="primary">确 定</el-button>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  props: ["nodeDrawer", "nodeDrawerData"],
  data() {
    return {
      activeName: "basicInformation",
      activeNames: [],
      formData: {},
    };
  },
  mounted() {},
  watch: {
    nodeDrawerData: {
      handler(val) {
        this.formData = val.datas || {};
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.drawer {
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
</style>
