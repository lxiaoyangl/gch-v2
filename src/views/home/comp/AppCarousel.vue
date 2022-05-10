<template>
  <el-carousel :interval="4000" indicator-position="outside" arrow="never" :autoplay="false" height="170px">
    <el-carousel-item v-for="item in list" :key="item.appName">
      <div class="top">
        <component :is="img(item)" />
        <!-- <img :src="img(item)" alt="" /> -->
        <div class="cont">
          <p>
            <span class="name">
              {{ item.appName }}
            </span>
            <span class="type"> 【{{ item.appType }}】 </span>
          </p>
          <p class="desc">
            {{ item.desc }}
          </p>
        </div>
        <span class="detil">查看详情</span>
      </div>
      <div class="bottom">
        <div class="item">
          <span class="item-name"> 开发时间 </span>
          <span class="item-val">{{ item.date }}</span>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="item">
          <span class="item-name"> 应用状态 </span>
          <span class="item-val">{{ item.status == 1 ? "开发完成" : "未完成" }}</span>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="item">
          <span class="item-name">开发者 </span>
          <span class="item-val">{{ item.developer }}</span>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="item">
          <span class="item-name"> 组件数量 </span>
          <span class="item-val"> {{ item.appNum }}</span>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="tsx">
import { computed, defineComponent } from "vue";
import ysj from "../../../assets/img/已上架.png";
import ysjyc from "../../../assets/img/已上架异常.png";
export default defineComponent({
  props: ["list"],
  setup(props) {
    let img = (item: any) => {
      if (item.status == 1) {
        return <img src={ysj} />;
      } else {
        return <img src={ysjyc} />;
      }
    };
    return {
      img,
    };
  },
});
</script>

<style lang="less">
.el-carousel {
  .el-carousel__indicator--horizontal {
    padding: 12px 6px;
    &.is-active {
      .el-carousel__button {
        background-color: #267ff5;
      }
    }
    .el-carousel__button {
      background-color: #cacdd2;
      width: 6px;
      height: 6px;
      border-radius: 3px;
    }
  }

  .el-carousel__item {
    // width: 500px;
    background: url("../../../assets/img/上架背景.png") no-repeat 0px 0px;
    background-size: 100% 100%;
    color: #fff;
    .top {
      padding: 16px;
      height: calc(67%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cont {
        flex: 1;
        // text-align: left;
        margin-left: 20px;
        .name {
          font-size: 16px;
        }
        .type {
        }
        .desc {
          color: #96b3d1;
          margin-top: 10px;
        }
      }
      .detil {
        align-self: start;
        color: #cfcfcf;
        margin-top: 20px;
        cursor: pointer;
        &:hover {
          color: #4396fc;
        }
      }
    }
    .bottom {
      height: calc(33%);
      display: flex;
      align-items: center;
      justify-content: space-around;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .item-name {
          font-size: 13px;
          color: #96b3d1;
          margin-bottom: 10px;
        }
      }
    }
  }
  .el-divider--vertical {
    width: 0.1px;
    background-color: #98b1e6;
    height: 24px;
  }
}
</style>
