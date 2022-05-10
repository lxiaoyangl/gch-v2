<template>
  <div class="application-info">
    <div class="top">
      <span class="title">国产化信号处理平台</span>
      <div class="right">
        <div class="msg">
          <el-badge :value="12" :max="99" class="item">
            <i class="el-icon-message"></i>
          </el-badge>
        </div>
        <div class="user">
          <div class="avat">
            <i class="el-icon-user-solid"></i>
          </div>
          <span>管理员xxx</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="menu">
        <div class="top">
          <div class="title">新建应用</div>
          <div class="form">
            <el-input v-model="formData.name" size="mini"></el-input>
            <el-select
              class="mt10 mr10"
              v-model="formData.type"
              size="mini"
              placeholder="【应用类型】"
            >
              <el-option value="1" label="1"></el-option>
              <el-option value="2" label="2"></el-option>
            </el-select>
            <!-- <el-button size="mini" type="primary">查 看</el-button> -->
          </div>
          <!-- <div>
            <div class="mtb10">
              <span class="name">创建人：</span>
              <span class="val">三三三</span>
            </div>
            <div class="">
              <span class="name">创建时间：</span>
              <span class="val">2020-01-01</span>
            </div>
          </div> -->
        </div>
        <ul class="list">
          <li
            @click="changeNav(i)"
            v-for="(item, i) in list"
            :key="i"
            :class="isActive == i ? 'is-active' : ''"
          >
            <router-link :to="item.path">
              <span class="flow">{{ i + 1 }}</span>
              <span>{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
        <div class="bottom">
          <div class="btn">立即启动</div>
          <div class="btn">应用保存</div>
        </div>
      </div>
      <div class="section">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: 0,
      list: [
        {
          name: "基本信息",
          path: "/application/basicInfo",
        },
        {
          name: "流程编排",
          path: "/application/process",
        },
        {
          name: "可视化设计",
          path: "/application/visualDesign",
        },
        {
          name: "应用发布",
          path: "/application/isolateTheGrouping",
        },
      ],
      formData: {
        name: "应用名称",
        type: "",
      },
      errData: [
        {
          name: "名称",
          msg: "异常信息ssssssssssssssssssssssssssssssssssssssssssssss...",
          time: "11-20",
          lv: "lv1",
        },
        {
          name: "名称",
          msg: "异常信息...",
          time: "11-20",
          lv: "lv1",
        },
        {
          name: "名称",
          msg: "异常信息...",
          time: "11-20",
          lv: "lv1",
        },
        {
          name: "名称",
          msg: "异常信息...",
          time: "11-20",
          lv: "lv1",
        },
        {
          name: "名称",
          msg: "异常信息...",
          time: "11-20",
          lv: "lv2",
        },
        {
          name: "名称",
          msg: "异常信息...",
          time: "11-20",
          lv: "lv2",
        },
        {
          name: "名称",
          msg: "异常信息...",
          time: "11-20",
          lv: "lv2",
        },
        {
          name: "名称",
          msg: "异常信息...",
          time: "11-20",
          lv: "lv2",
        },
        {
          name: "名称",
          msg: "异常信息...",
          time: "11-20",
          lv: "lv2",
        },
        {
          name: "名称",
          msg: "异常信息...",
          time: "11-20",
          lv: "lv2",
        },
        {
          name: "名称",
          msg: "异常信息...",
          time: "11-20",
          lv: "lv2",
        },
        {
          name: "名称",
          msg: "异常信息...",
          time: "11-20",
          lv: "lv2",
        },
        {
          name: "名称",
          msg: "异常信息...",
          time: "11-20",
          lv: "lv2",
        },
      ],
    };
  },
  methods: {
    changeNav(num) {
      this.isActive = num;
    },
  },
};
</script>
<style lang="less" scoped>
.application-info {
  // user-select: none;
  height: 100%;
  > .top {
    background-color: #252e3f;
    // border: 1px solid #686e78;
    border-bottom: none;
    flex: 0 0 50px;
    color: #fff;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 16px;
      font-weight: 700;
      line-height: 50px;
      letter-spacing: 1px;
    }
    .right {
      height: 30px;
      display: flex;
      align-items: center;
      .msg {
        font-size: 24px;
        margin: 0 20px;
        margin-right: 30px;
        /deep/.el-badge__content {
          border: none;
          top: 6px;
        }
      }
      .user {
        display: flex;
        align-items: center;
        .avat {
          font-size: 24px;
          background-color: #4079fa;
          height: 25px;
          width: 25px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 8px;
        }
      }
    }
  }
  .content {
    background: url("../../assets/img/bg.png") 0px 0px no-repeat;
    background-size: 100% 100%;
    padding: 20px;
    border: none;
    height: calc(100% - 50px);
    width: 100%;
    // padding: 20px 0;
    display: flex;
    .menu {
      height: 100%;
      width: 240px;
      background-color: #fff;
      .top {
        padding: 0px 5px 5px;
        font-size: 12px;
        .title {
          height: 36px;
          line-height: 36px;
          background-color: #252e3f;
          color: #fff;
          font-size: 15px;
          text-align: center;
          margin-bottom: 10px;
        }
      }
      .list {
        width: 100%;
        height: calc(100% - 245px);
        margin: 0;
        background-color: #f6f7f9;
        li {
          height: 87px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          a {
            text-decoration: none;
            letter-spacing: 2px;
            font-size: 16px;
            font-weight: bold;
            color: #333;
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            padding-left: 40px;
            .flow {
              margin-right: 20px;
              height: 22px;
              width: 22px;
              display: inline-block;
              line-height: 22px;
              text-align: center;
              border-radius: 50%;
              color: #0185f2;
              border: 1px solid #0185f2;
            }
          }
          &::after {
            position: absolute;
            content: " ";
            display: none;
            width: 20px;
            height: 20px;
            top: 36%;
            right: -10px;
            background-color: #fff;
            transform: rotate(45deg);
          }
          &:hover {
            background-color: #fff;
          }
          &.is-active {
            background-color: #0085f1;
            a {
              color: #fff;
              .flow {
                background-color: #fff;
                // border: 1px solid #0185f2;
              }
            }
          }
          &.is-active {
            &::after {
              display: inline-block;
            }
          }
        }
      }
      .bottom {
        .btn {
          cursor: pointer;
          height: 63px;
          width: 100%;
          font-size: 18px;
          line-height: 63px;
          text-align: center;
          background-color: #9fadb8;
          font-weight: bold;
          color: #fff;
          &:nth-child(2) {
            margin-top: 1px;
            background-color: #15ab86;
          }
        }
      }
    }
    .section {
      width: calc(100% - 240px);
    }
  }
}
</style>