<template>
  <div class="log">
    <el-tabs type="card">
      <el-tab-pane class="container" label="操作日志">
        <Wlb />
      </el-tab-pane>
      <el-tab-pane class="container" label="异常日志">
        <Sbyc />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const Wlb = () => import("./comp/wlb/wlb");
const Sbyc = () => import("./comp/sbyc/sbyc");
export default {
  components: {
    Wlb,
    Sbyc,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.log {
  padding: 0 10px;
  padding-top: 10px;
  .container {
    // padding: 10px 0;
  }
  .d-container {
    .d-item {
      display: flex;
      line-height: 40px;
      padding: 0 20px;
      &:nth-child(2n) {
        background-color: #162947;
      }
      .d-name {
        flex: 0 0 60px;
        text-align: right;
        margin-right: 60px;
      }
      .d-val {
        flex: 1;
      }
    }
  }
}
</style>