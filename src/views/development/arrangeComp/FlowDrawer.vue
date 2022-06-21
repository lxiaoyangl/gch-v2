<template>
  <div class="drawer">
    <el-drawer
      :with-header="false"
      size="100%"
      :destroy-on-close="true"
      v-model="flowDrawer"
      direction="rtl"
      modal-class="drawer-modal"
      :modal="false"
    >
      <div class="cont-deploy">
        <div class="right">
          <div class="title">{{ flowDrawerData.name }}</div>
        </div>
        <div class="r-main">
          <el-collapse v-model="activeNames">
            <el-collapse-item name="1">
              <template #title>
                <el-button round type="primary">流程缩略图</el-button>
              </template>
              <div id="containers" style="height: 200px"></div>
              <!-- <div id="container" style="display: none"></div> -->
              <!-- <div id="miniMap" style="height: 200px"></div> -->
            </el-collapse-item>
            <el-collapse-item name="2">
              <template #title>
                <el-button round type="primary">基本信息</el-button>
              </template>
              <el-form :model="flowDrawerData" ref="depForm" label-width="110px">
                <el-form-item label="流程组件名称：">
                  <div>{{ flowDrawerData.name }}</div>
                </el-form-item>
                <el-form-item label="组件数：">
                  <div>
                    {{ compNum.length }}
                  </div>
                </el-form-item>
                <el-form-item label="内部组件名称：">
                  <div>
                    {{ compNum.map((item:any) => item.data.name) }}
                  </div>
                </el-form-item>
                <el-form-item label="创建时间：">
                  <div>{{ flowDrawerData.creatTime }}</div>
                </el-form-item>
                <el-form-item label="流程组件描述：">
                  <div>
                    {{ flowDrawerData.desc }}
                  </div>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
          <div class="r-bottom">
            <el-button type="primary" @click="$emit('handleUpdate', flowDrawerData)">修改组件</el-button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { Graph, Shape, Addon, NodeView } from "@antv/x6";
import { onMounted, ref, computed } from "vue";

// let { nodeDrawer, nodeDrawerData } = defineProps({
//   nodeDrawer: {
//     type: Boolean,
//     default: false,
//   },
const { flowDrawerData, flowDrawer } = defineProps({
  flowDrawer: {
    type: Boolean,
    default: false,
  },
  flowDrawerData: {
    type: Object,
    default: () => ({}),
  },
});
// console.log(flowDrawer);

let activeNames = ref(["1", "2"]);
// let childrenActiveNames = ref(["11", "12", "13"]);
onMounted(() => {
  setTimeout(() => {
    init();
  }, 100);
});
const init = () => {
  const containerRef = document.getElementById("containers");
  // const miniMapContainerRef = document.getElementById("miniMap");
  let graph = new Graph({
    container: containerRef as HTMLElement,
    width: 520,
    height: 200,
    // autoResize: true, //自动画布大小
    // resizing: true,
    panning: true, //支持平移拖拽
    grid: {
      // size: 20, // 网格大小 10px
      visible: false, // 渲染网格背景
      // type: "mesh",
      // args: {
      //   color: "#D0D0D0",
      //   thickness: 1, // 网格线宽度/网格点大小
      //   factor: 4,
      // },
    },
    background: {
      color: "#F5F6FA",
    },
    // minimap: {
    //   enabled: true,
    //   container: miniMapContainerRef,
    //   width: 520,
    //   height: 200,
    //   scalable: false,
    // },
  });
  graph.centerContent(); //画布居中
  graph.fromJSON(flowDrawerData.datas.comp);
};

const compNum = computed(() => {
  let comp = flowDrawerData.datas.comp.filter((item: any) => item.position);
  return comp;
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
      :deep(.el-collapse-item__header) {
        padding-left: 20px;
      }
      :deep(.el-collapse-item__arrow) {
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
// :deep(.el-form-item__content {
//   line-height: 20px;
// }

.el-drawer__wrapper {
  right: 0;
  left: auto;
  width: 40%;
  position: absolute;
}
</style>
