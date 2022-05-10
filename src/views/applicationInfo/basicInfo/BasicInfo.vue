<template>
  <div class="basic-info">
    <div class="title">
      <span>基本信息</span>
      <div class="btns">
        <el-button size="small" type="info">关闭</el-button>
        <el-button size="small" type="primary">保存</el-button>
      </div>
    </div>
    <div class="container">
      <div class="box">
        <div class="title">基本配置</div>
        <el-form label-width="100px" inline :model="bFormData" size="small">
          <el-form-item class="f50" prop="name" label="应用名称：">
            <el-input v-model="bFormData.name"></el-input>
          </el-form-item>
          <el-form-item class="f50" prop="type" label="应用类型：">
            <el-input v-model="bFormData.type"></el-input>
          </el-form-item>
          <el-form-item class="f50" prop="group" label="选择资源组：">
            <el-select v-model="bFormData.group">
              <el-option label="资源组一" value="1"></el-option>
              <el-option label="资源组二" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="f50" prop="desc" label="任务描述：">
            <el-input type="textarea" v-model="bFormData.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="group" v-if="bFormData.group">
        <div class="imgtask">
          <ul class="dfc">
            <li v-for="(item, i) in groupList" :key="i">
              <img :src="item.img" />
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="calc(100vh - 423px)"
        >
          <el-table-column
            show-overflow-tooltip
            prop="resource"
            label="资源名称"
            width="100"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="id"
            label="资源ID"
            width="100"
          >
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="type" label="类型">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="time"
            label="部署时间"
            width="200"
          >
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="ip" label="IP地址">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="part" label="端口">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="memory" label="内容">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="cpu" label="CPU">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="disk" label="磁盘">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="state"
            label="当前状态"
            width="80"
          >
            <template slot-scope="{ row }">
              <span :class="row.state == '离线' ? 'cff5' : ''">
                {{ row.state }}</span
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bFormData: {
        name: "",
        type: "",
        desc: "",
        group: "",
      },
      tableData: [
        {
          resource: "资源名称",
          id: "123",
          type: "通用服务器",
          time: "2021/03/12 13:12:12",
          ip: "123.123.123.12",
          part: "12",
          memory: "v1-2",
          cpu: "45%",
          disk: "45%",
          state: "在线",
        },
        {
          resource: "资源名称",
          id: "123",
          type: "某解调器",
          time: "2021/03/12 13:12:12",
          ip: "123.123.123.12",
          part: "12",
          memory: "v1-2",
          cpu: "45%",
          disk: "45%",
          state: "离线",
        },
        {
          resource: "资源名称",
          id: "123",
          type: "某解调器",
          time: "2021/03/12 13:12:12",
          ip: "123.123.123.12",
          part: "12",
          memory: "v1-2",
          cpu: "45%",
          disk: "45%",
          state: "离线",
        },
        {
          resource: "资源名称",
          id: "123",
          type: "某解调器",
          time: "2021/03/12 13:12:12",
          ip: "123.123.123.12",
          part: "12",
          memory: "v1-2",
          cpu: "45%",
          disk: "45%",
          state: "离线",
        },
        {
          resource: "资源名称",
          id: "123",
          type: "某解调器",
          time: "2021/03/12 13:12:12",
          ip: "123.123.123.12",
          part: "12",
          memory: "v1-2",
          cpu: "45%",
          disk: "45%",
          state: "在线",
        },
        {
          resource: "资源名称",
          id: "123",
          type: "某解调器",
          time: "2021/03/12 13:12:12",
          ip: "123.123.123.12",
          part: "12",
          memory: "v1-2",
          cpu: "45%",
          disk: "45%",
          state: "在线",
        },
        {
          resource: "资源名称",
          id: "123",
          type: "某解调器",
          time: "2021/03/12 13:12:12",
          ip: "123.123.123.12",
          part: "12",
          memory: "v1-2",
          cpu: "45%",
          disk: "45%",
          state: "在线",
        },
        {
          resource: "资源名称",
          id: "123",
          type: "某解调器",
          time: "2021/03/12 13:12:12",
          ip: "123.123.123.12",
          part: "12",
          memory: "v1-2",
          cpu: "45%",
          disk: "45%",
          state: "在线",
        },
        {
          resource: "资源名称",
          id: "123",
          type: "某解调器",
          time: "2021/03/12 13:12:12",
          ip: "123.123.123.12",
          part: "12",
          memory: "v1-2",
          cpu: "45%",
          disk: "45%",
          state: "在线",
        },
        {
          resource: "资源名称",
          id: "123",
          type: "某解调器",
          time: "2021/03/12 13:12:12",
          ip: "123.123.123.12",
          part: "12",
          memory: "v1-2",
          cpu: "45%",
          disk: "45%",
          state: "在线",
        },
        {
          resource: "资源名称",
          id: "123",
          type: "某解调器",
          time: "2021/03/12 13:12:12",
          ip: "123.123.123.12",
          part: "12",
          memory: "v1-2",
          cpu: "45%",
          disk: "45%",
          state: "在线",
        },
        {
          resource: "资源名称",
          id: "123",
          type: "某解调器",
          time: "2021/03/12 13:12:12",
          ip: "123.123.123.12",
          part: "12",
          memory: "v1-2",
          cpu: "45%",
          disk: "45%",
          state: "在线",
        },
        {
          resource: "资源名称",
          id: "123",
          type: "某解调器",
          time: "2021/03/12 13:12:12",
          ip: "123.123.123.12",
          part: "12",
          memory: "v1-2",
          cpu: "45%",
          disk: "45%",
          state: "在线",
        },
        {
          resource: "资源名称",
          id: "123",
          type: "某解调器",
          time: "2021/03/12 13:12:12",
          ip: "123.123.123.12",
          part: "12",
          memory: "v1-2",
          cpu: "45%",
          disk: "45%",
          state: "在线",
        },
      ],
      groupList: [
        {
          img: require("../../../assets/img/zz.png"),
          name: "主站DVB-S2",
        },
        {
          img: require("../../../assets/img/fwq.png"),
          name: "服务器",
        },
        {
          img: require("../../../assets/img/fwq.png"),
          name: "服务器",
        },
        {
          img: require("../../../assets/img/fwq.png"),
          name: "服务器",
        },
        {
          img: require("../../../assets/img/xbp.png"),
          name: "L-下变频",
        },
        {
          img: require("../../../assets/img/jtq.png"),
          name: "某解调器",
        },
        {
          img: require("../../../assets/img/jtq.png"),
          name: "某解调器",
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.basic-info {
  height: 100%;
  width: 100%;
  background-color: #fff;
  > .title {
    padding: 0 10px;
    display: flex;
    font-size: 16px;
    font-weight: 700;
    color: #000;
    height: 40px;
    line-height: 40px;
    justify-content: space-between;
  }
  .container {
    height: calc(100% - 40px);
    .box {
      .title {
        padding: 0 10px;
        font-size: 14px;
        height: 26px;
        line-height: 26px;
        background-color: #cbced5;
      }
      .el-form {
        // width: 50%;
        margin-top: 20px;
        padding-left: 60px;
        .el-form-item {
          margin-bottom: 20px !important;
          margin-right: 0 !important;
          /deep/ .el-form-item__content {
            width: calc(80% - 130px) !important;
          }
        }
      }
    }
    .group {
      border-top: 1px solid #f0f0f0;
      // height: calc(100% - 60px);
      background: white;
      .imgtask {
        padding: 10px 20px;
        ul {
          li {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100px;
            height: 100px;
            padding: 15px;
            img {
              width: 50px;
              margin-bottom: 10px;
            }
            span {
              font-weight: bold;
              font-size: 12px;
            }
          }
          li:hover {
            background: #f5f6f8;
          }
        }
      }
    }
  }
}
</style>