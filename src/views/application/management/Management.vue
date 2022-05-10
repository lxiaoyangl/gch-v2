<template>
  <div class="management">
    <div class="main-head">
      <div class="main-head-left">
        <span>应用管理</span>
        <el-button type="primary" @click="handleAdd(item)" size="medium">
          <i class="el-icon-plus"></i>新建应用
        </el-button>
      </div>
      <div class="main-head-right">
        <el-select
          style="width: 160px"
          v-model="allZT"
          placeholder="全部状态"
          size="medium"
        >
          <el-option
            v-for="item in ZToptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          style="width: 160px"
          class="mlr10"
          v-model="allTP"
          placeholder="全部类型"
          size="medium"
        >
          <el-option
            v-for="item in TPoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input
          style="width: 250px"
          placeholder="输入应用名称或创建人"
          suffix-icon="el-icon-search"
          size="medium"
          v-model="search_task"
        >
        </el-input>
      </div>
    </div>
    <div class="main-content">
      <div class="main-box" v-for="(item, index) in allmain" :key="index">
        <div class="discl">
          <div>
            <el-button
              @click="handleChange(item.status)"
              size="medium"
              class="starbtn"
              type="warning"
              >{{ item.status == 1 ? "停止应用" : "启动应用" }}</el-button
            >
            <div>
              <el-button size="small" type="danger">删 除</el-button>
              <el-button size="small" type="success" @click="handleEdit(item)"
                >管 理</el-button
              >
              <el-button size="small" type="primary">查 看</el-button>
            </div>
          </div>
        </div>
        <div class="box_head">
          <img
            :src="
              item.status == 1
                ? require('../../../assets/img/app-usable.png')
                : require('../../../assets/img/app-disabled.png')
            "
          />
          <div>
            <p>
              <span class="name">{{ item.name }}</span>
              <span>【{{ item.type }}】</span>
            </p>
            <p class="box-time">
              <span>创建人：{{ item.creator }}</span>
              <span>创建时间：{{ item.time }}</span>
            </p>
          </div>
        </div>
        <div class="box_main" :class="item.status == 1 ? 'bgc5e8' : 'bgcbfc'">
          <div>
            <div
              class="box_mainbox"
              :class="item.status == 1 ? 'bgc5e8' : 'bgcbfc'"
            >
              <img src="../../../assets/img/zyzy.png" />
              <span>资源占用</span>
              <span class="num">{{ item.resource }}</span>
            </div>
            <div
              class="box_mainbox"
              :class="item.status == 1 ? 'bgc5e8' : 'bgcbfc'"
            >
              <img src="../../../assets/img/rwsl.png" />
              <span>任务数量</span>
              <span class="num">{{ item.task }}</span>
            </div>
            <div
              class="box_mainbox"
              :class="item.status == 1 ? 'bgc5e8' : 'bgcbfc'"
            >
              <img src="../../../assets/img/slsl.png" />
              <span>实例数量</span>
              <span class="num">{{ item.instance }}</span>
            </div>
            <div
              class="box_mainbox"
              :class="item.status == 1 ? 'bgc5e8' : 'bgcbfc'"
            >
              <img src="../../../assets/img/sjsl.png" />
              <span>失败流程</span>
              <span class="num">{{ item.data }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination />
  </div>
</template>

<script>
import Pagination from "../../../components/Pagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      // 搜索框
      search_task: "",
      // 下拉选项
      ZToptions: [
        {
          value: "选项1",
          label: "1",
        },
        {
          value: "选项2",
          label: "2",
        },
      ],
      TPoptions: [
        {
          value: "选项1",
          label: "1",
        },
        {
          value: "选项2",
          label: "2",
        },
      ],
      allZT: "",
      allTP: "",
      //内容
      allmain: [
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 2,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 2,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        {
          name: "应用名称",
          status: 1,
          type: "类型",
          time: "2021-01-01",
          creator: "三三三",
          resource: 50,
          task: 50,
          instance: 50,
          data: 50,
        },
        // {
        //   name: "应用名称",
        //   status: 1,
        //   type: "类型",
        //   time: "2021-01-01",
        //   resource: 50,
        //   task: 50,
        //   instance: 50,
        //   data: 50,
        // },
        // {
        //   name: "应用名称",
        //   status: 1,
        //   type: "类型",
        //   time: "2021-01-01",
        //   resource: 50,
        //   task: 50,
        //   instance: 50,
        //   data: 50,
        // },
      ],
      num: 9999,
    };
  },
  methods: {
    displ(data) {
      this.num = data;
    },
    handleChange(status) {
      console.log(status);
    },
    handleAdd() {
      let routeData = this.$router.resolve({
        path: "/application/management/black",
      });
      window.open(routeData.href, "_blank");
    },
    handleEdit(item) {
      let routeData = this.$router.resolve({
        path: "/application/management/applicationManagement",
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>

<style lang="less" scoped>
.pagebtn {
  width: 50px;
}
.management {
  padding: 20px;
  height: 100%;
  width: 100%;
  // margin: 15px;
  // background: white;
  .main-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 50px;
    background-color: #fff;
    padding: 0 15px;
    border-bottom: 1px solid #f8f9fa;
    .main-head-left {
      line-height: 30px;
      height: 30px;
      span {
        margin-right: 10px;
      }
    }
    .main-head-right {
      display: flex;
    }
  }
  .main-content {
    display: flex;
    flex-wrap: wrap;
    height: calc(100% - 85px);
    // padding: 10px;
    .main-box {
      display: flex;
      background-color: #fff;
      flex-direction: column;
      width: calc(20% - 10px);
      height: calc(25% - 10px);
      padding: 15px;
      border-radius: 4px;
      margin: 5px;
      position: relative;
      &:nth-child(5n) {
        margin-right: 0;
      }
      &:hover {
        .discl {
          display: flex;
        }
      }
      .discl {
        border-radius: 4px;
        display: none;
        border: 1px solid #8db4fc;
        position: absolute;
        left: 0;
        top: 0;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        z-index: 9;
        background: rgba(26, 29, 33, 80%);
        > div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .starbtn {
          width: 120px;
          margin-bottom: 15px;
        }
      }
      .box_head {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 12px;
        img {
          margin-right: 20px;
        }
        > div {
          width: 100%;
          .name {
            margin-right: 10px;
            font-size: 14px;
            font-weight: bold;
          }
          .box-time {
            display: flex;
            width: 100%;
            margin-top: 10px;
            justify-content: space-between;
            color: #b1aeae;
          }
        }
      }
      .box_main {
        flex: 1;
        padding: 10px 15px;
        border-radius: 5px;
        > div {
          display: flex;
          flex-wrap: wrap;
          // background: #7186a7;
          justify-content: space-between;
          overflow: hidden;
          background-color: #ccd3dd;
          height: 100%;
          color: #fff;
        }
        .box_mainbox {
          font-size: 12px;
          width: calc(50% - 0.5px);
          height: calc(50% - 0.5px);
          display: flex;
          padding: 0 10px;
          align-items: center;
          justify-content: space-around;
          &:nth-child(3),
          &:nth-child(4) {
            align-self: flex-end;
          }
          .num {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>>
</style>