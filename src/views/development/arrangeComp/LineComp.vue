<template>
  <div class="line-comp">
    <div class="r-title">
      {{ dataLineDatas.title }}
      <el-button type="primary" plain @click="handleAddItem('enmp')">
        <el-icon>
          <CirclePlus />
        </el-icon>
        <span>添加</span>
      </el-button>
      <!-- <el-button  type="danger" plain>
        <i class="el-icon-delete"></i>
        删除
      </el-button> -->
    </div>
    <template v-if="dataMappingList.length > 0">
      <div v-for="(enmp, i) in dataMappingList" :key="i" class="enmp">
        <el-descriptions class="margin-top" :column="2" border>
          <el-descriptions-item>
            <template #label> 映射名称 </template>
            <el-select v-model="dataLineDatas.name">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 传输方式 </template>
            <el-select v-model="dataLineDatas.type">
              <el-option label="CAN总线" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="output-label"
            :labelStyle="{
              'background-color': '#E4F2FF',
              color: '#3F88F7',
            }"
          >
            <template #label>
              <el-icon><Download /></el-icon>
              <span>输 出</span>
            </template>
            <el-select v-model="dataLineDatas.out">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item label-class-name="input-label">
            <template #label>
              <el-icon><Upload /></el-icon>
              <span>输 入</span>
            </template>
            <el-select v-model="dataLineDatas.in">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-descriptions-item>
        </el-descriptions>
        <el-form>
          <el-form-item class="comp">
            <el-form-item
              v-for="(intf, ii) in enmp.children"
              :key="i + ii"
              :label="intf.interfaceName"
              style="background-color: #e5e8ef; margin: 10px"
            >
              <div class="intf cont">
                <el-select v-model="intf.interfaceOut" placeholder="输出接口选择">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                </el-select>
                <el-select v-model="intf.interfaceIn" placeholder="输入接口选择">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                </el-select>
                <div class="f-after">
                  <el-link type="primary" :underline="false">
                    <el-icon @click="handleAddItem('intf', enmp)"> <CirclePlus /> </el-icon>
                    <!-- <i class="el-icon-circle-plus-outline" @click="handleAddItem('intf', enmp)"></i> -->
                  </el-link>
                  <el-link type="danger" :underline="false">
                    <el-icon @click="handleDelItem('intf', enmp)"> <CirclePlus /> </el-icon>
                    <!-- <i class="el-icon-remove-outline" @click="handleDelItem('intf', enmp)"></i> -->
                  </el-link>
                </div>
              </div>

              <el-form-item v-for="(arg, ai) in intf.children" :key="i + ii + ai" :label="arg.argumentName">
                <div class="arg cont">
                  <el-select v-model="arg.argumentOut" placeholder="输出参数设置">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                  </el-select>
                  <el-select v-model="arg.argumentIn" placeholder="输入参数设置">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                  </el-select>
                  <div class="f-after">
                    <el-link type="primary" :underline="false">
                      <el-icon @click="handleAddItem('arg', intf)"> <CirclePlus /> </el-icon>
                    </el-link>
                    <el-link type="danger" :underline="false">
                      <el-icon @click="handleDelItem('arg', intf)"> <CirclePlus /> </el-icon>
                      <!-- <i class="el-icon-remove-outline" @click="handleDelItem('arg', intf)"></i> -->
                    </el-link>
                  </div>
                </div>
              </el-form-item>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <el-empty v-else description="暂无数据映射"></el-empty>
  </div>
</template>

<script lang="ts" setup>
import { CirclePlus, Download, Upload } from "@element-plus/icons-vue";
import { reactive } from "vue";

let { dataLineDatas } = withDefaults(defineProps(), {
  dataLineDatas: reactive({}),
});
let dataMappingList = reactive([
  {
    compName: "组件1",
    id: 0,
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
  },
]);
const handleAddItem = (type: string, item?: any) => {
  let arg = {
    argumentName: "参数1",
    argumentIn: "",
    argumentOut: "",
  };
  let intf = {
    interfaceName: "接口2",
    interfaceIn: "",
    interfaceOut: "",
    children: [
      {
        argumentName: "参数1",
        argumentIn: "",
        argumentOut: "",
      },
    ],
  };
  let enmp = {
    // id: ++dataMappingList.length,
    id: 1,
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
  switch (type) {
    case "enmp":
      dataMappingList.push(enmp);
      break;
    case "intf":
      item.children.push(intf);
      break;
    case "arg":
      item.children.push(arg);
      break;

    default:
      break;
  }
};
const handleDelItem = (type: string, item: any) => {};
</script>

<style lang="less" scope>
.line-comp {
  .r-title {
    padding: 10px;
    padding-top: 0;
  }
  .enmp {
    margin-bottom: 10px;
  }
  .comp {
    .el-select {
      margin: 8px 0 !important;
    }
  }
  .el-form-item {
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
}
.el-descriptions {
  :deep(.el-descriptions-item__cell) {
    padding: 0 !important;
    .el-select {
      width: 100%;
      margin: 0;
    }
  }
  .el-descriptions-item__label {
    width: 80px;
    text-align: center;
    &.input-label {
      background-color: "#DBF9F9";
      color: "#57D2D7";
    }
    &.output-label {
      background-color: "#DBF9F9";
      color: "#57D2D7";
    }
  }
}
</style>
