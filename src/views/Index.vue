<template>
  <div class="index">
    <el-container>
      <el-header>
        <Head />
      </el-header>
      <el-main>
        <Main />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import Head from "./layout/Head.vue";
import Main from "./layout/Main.vue";
export default {
  components: {
    Main,
    Head,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.index {
  background: url(../assets/img/content-bg.png) 0px 0px no-repeat;
  // background: #e9ecf1;
  overflow: hidden;
  background-size: 100% 100%;
  // user-select: none;
  font-size: 14px;
  height: 100%;
  // width: 100%;
  display: flex;
  flex-direction: column;
  .el-container {
    // height: 100%;
    :deep(.el-header) {
      padding: 0px;
      height: auto !important;
    }
    :deep(.slassAside) {
      background: #fff;
    }
    :deep(.el-main) {
      // height: 100%;
      padding: 0px;
    }
  }
}
</style>
