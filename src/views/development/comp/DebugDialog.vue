<template>
  <div>
    <div class="top">
      <div id="container"></div>
      <div class="lines">
        <div :class="['line', 'data-line']">
          <span>数据线：</span>
          <i class="line-icon"> </i>
        </div>
        <div :class="['line', 'status-line']">
          <span>状态线：</span>
          <i class="line-icon"> </i>
        </div>
        <div :class="['line', 'control-line']">
          <span>控制线：</span>
          <i class="line-icon"> </i>
        </div>
      </div>
      <el-form class="right" v-model="formData" label-width="120px" label-suffix="：" size="medium ">
        <el-form-item label="输入源组件">
          <el-select v-model="formData.r">
            <el-option label="通信管理" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="输入源接口">
          <el-select v-model="formData.r">
            <el-option label="输入原接口1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="传输方式"> CAN总线 </el-form-item>
        <el-form-item label="读取数据时间间隔">
          <el-select v-model="formData.r" prefix-icon="S">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自动保存">
          <el-switch v-model="formData.r"> </el-switch>
        </el-form-item>
        <el-form-item label="保存到"> C:kugoo <el-link type="primary" :underline="false">更改</el-link> </el-form-item>
        <el-form-item label="文件名">
          <!-- <el-select v-model="formData.r">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item>
          <el-button round type="primary">导入文件</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="log">
      调试日志
      <div class="content">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi qui officia at aperiam illo dolore in tenetur
        perspiciatis iure nisi modi rem, voluptatem voluptate molestias? Sequi repellendus dolor quo architecto?
        {{ logs }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Graph, Shape, Addon, NodeView } from "@antv/x6";
import { onMounted, onUnmounted } from "vue";
const { debugData } = defineProps(["debugData"]);
let graph = null as unknown as Graph;
let formData = { r: "" };
let logs = "asdfadfafa";
onMounted(() => {
  // initAntvX6();
});
const initAntvX6 = () => {
  graph = new Graph({
    container: document.getElementById("container") as HTMLElement,
    background: {
      color: "#F5F6FA",
    },
    // history: {
    //   enabled: true, //历史记录
    //   ignoreChange: true, //ignoreChange 是否忽略属性变化
    // },
    clipboard: {
      enabled: true,
      useLocalStorage: true,
    },
    // selecting: true,
    // panning: true, //支持平移拖拽
    // snapline: true, //对齐线
    // resizing: {
    //   //调整节点宽高
    //   enabled: true, //历史记录
    //   orthogonal: false,
    // },
    async: true,
    autoResize: true, //自动画布大小
    // mousewheel: true, //鼠标轮滚缩放

    grid: {
      size: 20, // 网格大小 10px
      visible: false, // 渲染网格背景
      type: "mesh",
      args: {
        color: "#D0D0D0",
        thickness: 1, // 网格线宽度/网格点大小
        factor: 10,
      },
    },
    highlighting: {
      // magnetAvailable: magnetAvailabilityHighlighter,
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
  });
  graph.centerContent(); //画布居中
  graph.fromJSON(debugData);
};
onUnmounted(() => {
  graph.dispose();
});
</script>

<style lang="less" scoped>
.top {
  display: flex;
  position: relative;
  #container {
    height: 600px;
    flex: 1;
  }
  .lines {
    position: absolute;
    display: flex;
    transition: all 0.3s;
    right: 18%;
    top: 20px;
    // top: 20px;
    // right: 40%;
    // float: right;
    .line {
      // cursor: pointer;
      margin-right: 16px;
      border-radius: 3px;
      padding: 8px 4px;
      display: flex;
      align-items: center;
      .line-icon {
        display: inline-block;
        height: 10px;
        width: 10px;
        border-radius: 2px;
      }
      &.data-line {
        .line-icon {
          background-color: #267ff7;
        }
      }
      &.status-line {
        .line-icon {
          background-color: #45d9bf;
        }
      }
      &.control-line {
        .line-icon {
          background-color: #fd9f6c;
        }
      }
    }
  }
  .right {
    margin-left: 10px;
    flex: 0 0 18%;
    .el-form-item {
      margin-top: 14px;
      /deep/.el-input {
        width: 160px;
      }
    }
  }
}
.log {
  margin: 20px;
  .content {
    height: 200px;
    overflow-y: scroll;
  }
}
</style>
