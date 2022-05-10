<template>
  <div class="contentChart">
    <div class="contentName">{{ contentName }}</div>
    <div class="contentNum">{{ contentNum }}</div>
    <!-- <div class="errorNum">
      <el-progress
        :text-inside="true"
        :stroke-width="10"
        :percentage="errorNum"
        :format="format"
      ></el-progress>
      <div class="errorNumText">
        {{ errorNum < 10 ? "0" + errorNum : errorNum }}
      </div>
    </div> -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "contentChart",
  props: ["contentName", "contentNum", "errorNum"],
});
</script>
<style lang="less" scoped>
.contentChart {
  width: calc(100%) !important;
  height: calc(100%);
  padding: 20px;
  margin-top: calc(40%);
  .contentName {
    margin-top: calc(55%);
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #5f5f5f;
  }
  .contentNum {
    font-size: 20px;
    font-weight: 600;
    font-family: Alibaba PuHuiTi;
    // font-weight: normal;
    color: #414141;
    margin-top: calc(10%);
  }
  .errorNum {
    width: calc(100%);
    margin-top: calc(55%);
    /deep/.el-progress-bar__outer {
      background: #e3e7eb;
    }
    /deep/.el-progress-bar__inner {
      background: linear-gradient(0deg, #ff6767 0%, #ff8f5d 100%);
      box-shadow: 0px 0px 5px 0px rgba(255, 142, 93, 0.23);
    }
    .errorNumText {
      margin-top: 10px;
      font-size: 10px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #afafaf;
    }
  }
}
</style>
