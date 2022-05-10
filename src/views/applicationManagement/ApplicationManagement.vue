<template>
  <div class="application-management">
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
            <el-button size="mini" type="primary">查 看</el-button>
          </div>
          <div class="info">
            <div class="item mtb10">
              <span class="name">创建人：</span>
              <span class="val">三三三</span>
            </div>
            <div class="item">
              <span class="name">创建时间：</span>
              <span class="val">2020-01-01</span>
            </div>
          </div>
        </div>
        <el-menu
          class="title-menu"
          :default-active="activeIndex"
          @select="handleSelect"
        >
          <template v-for="(item, i) in routeList">
            <el-submenu
              :index="'0' + i"
              v-if="item.children && item.children.length > 0"
              :key="i"
            >
              <template slot="title">{{ item.name }}</template>
              <el-menu-item
                class="title-submenu"
                v-for="(childernItem, index) in item.children"
                :key="i + index"
                :index="'0' + i + index"
              >
                <router-link :to="childernItem.path">
                  {{ childernItem.name }}
                </router-link></el-menu-item
              >
            </el-submenu>
            <el-menu-item v-else :index="'0' + i" :key="i">
              <router-link :to="item.path">{{ item.name }}</router-link>
            </el-menu-item>
          </template>
        </el-menu>
        <div class="bottom">
          <div class="btn">停止应用</div>
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
      activeIndex: "",
      isActive: 0,
      routeList: [],
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
  created() {
    this.routeList = this.$router.options.routes[3].children;

    let onNum = localStorage.getItem("activeChildNav");
    if (onNum) {
      this.activeIndex = onNum;
    } else {
      this.activeIndex = "00";
      this.$router.push("/applicationManagement/applicationOfMonitoring");
    }
  },
  methods: {
    changeNav(num) {
      this.isActive = num;
    },
    handleSelect(key) {
      localStorage.setItem("activeChildNav", key);
    },
  },
};
</script>
<style lang="less" scoped>
.application-management {
  background: url("../../assets/img/bg.png") 0px 0px no-repeat;
  background-size: 100% 100%;
  // user-select: none;
  height: 100%;
  > .top {
    background-color: #252e3f;
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
      display: flex;
      flex-direction: column;
      .top {
        flex: 0 0 127px;
        padding: 0px 5px 5px;
        font-size: 12px;
      }
      > .el-menu {
        width: 100%;
        height: calc(100% - 300px);
        flex: 1;
        background-color: #f6f7f9;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        &.title-menu {
          > .el-menu-item {
            height: 87px;
            width: 100%;
            // background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
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
              justify-content: center;
            }
            &:hover,
            &.is-active {
              background-color: #0085f1;
              a {
                color: #fff;
              }
            }
            &.is-active {
              &::after {
                display: inline-block;
              }
            }
          }
        }
        .el-submenu {
          /deep/.el-submenu__title {
            height: 87px;
            justify-content: center;
            position: relative;
            display: flex;
            align-items: center;
            font-weight: bold;
            line-height: 26px;
            font-size: 16px;
            letter-spacing: 2px;
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
          }
          &.is-opened,
          &:hover {
            /deep/.el-submenu__title {
              color: #ffffff;
              background-color: #0085f1;
              i {
                color: #fff;
              }
            }
          }
          &.is-opened::after {
            display: inline-block;
          }
          .el-menu {
            .el-menu-item {
              display: flex;
              justify-content: center;
              position: relative;
              &::after {
                content: " ";
                position: absolute;
                display: none;
                top: 35%;
                left: 50px;
                transform: rotate(45deg);
                border: 7px solid transparent;
                border-right: 7px solid #0085f1;
                border-top: 7px solid #0085f1;
              }
              a {
                font-size: 14px;
                text-decoration: none;
                letter-spacing: 1px;
                color: #333333;
              }
              &.is-active {
                &::after {
                  display: inline-block;
                }
                a {
                  color: #0085f1;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
      .bottom {
        flex: 0 0 62px;
        .btn {
          cursor: pointer;
          height: 63px;
          width: 100%;
          font-size: 16px;
          line-height: 63px;
          text-align: center;
          background-color: #ff6161;
          font-weight: bold;
          color: #fff;
        }
      }
    }
    .section {
      width: calc(100% - 240px);
    }
  }
}
</style>