<template>
  <div class="log">
    <el-tabs type="card">
      <el-tab-pane class="container" label="用户管理">
        <UserControl />
      </el-tab-pane>
      <el-tab-pane class="container" label="权限设置">
        <PurviewSetting />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import UserControl from "./comp/userControl/UserControl.vue";
import PurviewSetting from "./comp/purviewSetting/PurviewSetting.vue";
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
