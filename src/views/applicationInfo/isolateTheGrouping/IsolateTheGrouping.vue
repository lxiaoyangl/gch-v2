<template>
  <!-- <div class="isolateTheGrouping">
    <div class="resource">
      <div class="right-box">
        <div class="mad-top">
          <ul>
            <li
              v-for="(item, index) in idata"
              :key="index"
              @click="colblue = index"
              :class="colblue == index ? 'bcol' : ''"
            >
              <div :class="colblue == index ? 'zsj' : 'zsj disnone'"></div>
              <span>{{ item.name }}</span>
              <div :class="colblue == index ? 'ysj' : 'ysj disnone'"></div>
            </li>
          </ul>
        </div>
        <div class="mad">
          <div class="imgtask">
            <ul class="dfc">
              <li>
                <div>
                  <img src="../../../assets/img/新信号 拷贝 5.png" />
                </div>
                <span>接入网一</span>
              </li>
              <li>
                <div>
                  <img src="../../../assets/img/新信号 拷贝 5.png" />
                </div>
                <span>应用</span>
              </li>
              <li>
                <div>
                  <img src="../../../assets/img/新信号 拷贝 5.png" />
                </div>
                <span>主战DVB-S2</span>
              </li>
              <li>
                <div>
                  <img src="../../../assets/img/新信号 拷贝 5.png" />
                </div>
                <span>服务器</span>
              </li>
              <li>
                <div>
                  <img src="../../../assets/img/新信号 拷贝 5.png" />
                </div>
                <span>服务器</span>
              </li>
              <li>
                <div>
                  <img src="../../../assets/img/新信号 拷贝 5.png" />
                </div>
                <span>服务器</span>
              </li>
              <li>
                <div>
                  <img src="../../../assets/img/新信号 拷贝 5.png" />
                </div>
                <span>L-下变频</span>
              </li>
              <li>
                <div>
                  <img src="../../../assets/img/新信号 拷贝 5.png" />
                </div>
                <span>某解调器</span>
              </li>
              <li>
                <div>
                  <img src="../../../assets/img/新信号 拷贝 5.png" />
                </div>
                <span>某解调器</span>
              </li>
            </ul>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%"
            height="calc(100vh - 335px)"
          >
            <el-table-column prop="resource" label="资源名称" width="100">
            </el-table-column>
            <el-table-column prop="id" label="资源ID" width="100">
            </el-table-column>
            <el-table-column prop="type" label="类型"> </el-table-column>
            <el-table-column prop="time" label="部署时间" width="200">
            </el-table-column>
            <el-table-column prop="ip" label="IP地址"> </el-table-column>
            <el-table-column prop="part" label="端口"> </el-table-column>
            <el-table-column prop="memory" label="内容"> </el-table-column>
            <el-table-column prop="cpu" label="CPU"> </el-table-column>
            <el-table-column prop="disk" label="磁盘"> </el-table-column>
            <el-table-column prop="state" label="当前状态" width="80">
              <template slot-scope="{ row }">
                <span :class="row.state == '离线' ? 'cff5' : ''">
                  {{ row.state }}</span
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="footer">
            <el-button type="primary" size="small">保存</el-button>
            <el-button type="info" size="small" class="mtr">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div>应用发布</div>
</template>

<script>
export default {
  data() {
    return {
      colblue: 0,
      idata: [
        {
          name: "资源组一",
        },
        {
          name: "资源组二",
        },
        {
          name: "资源组三",
        },
      ],
      indexof: 0,
      defaultProps: {
        children: "children",
        label: "label",
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
    };
  },
};
</script>
<style lang="less" scoped>
.disnone {
  display: none;
}
.zsj {
  width: 0;
  height: 0;
  border: 10px solid #f00283;
  border-color: transparent transparent transparent #0085f0;
}
.ysj {
  width: 0;
  height: 0;
  border: 10px solid #f00283;
  border-color: transparent #0085f0 transparent transparent;
}
.mad-top {
  background: white;
  ul {
    display: flex;
    align-items: center;
    height: 60px;
    li {
      display: block;
      width: 200px;
      display: flex;
      align-items: center;
      height: 60px;
      justify-content: center;
    }
    li:hover {
      background: #32405a;
      color: white;
    }
  }
}

.mad {
  height: calc(100% - 60px);
  background: white;
}
.bcol {
  color: #0085f0;
}
.isolateTheGrouping {
  height: 100%;
  width: 100%;
  .resource {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    .left-box {
      width: 20%;
      margin: 0 1px;
      height: 100%;
      .title {
        line-height: 36px;
        color: white;
        background: #4d5c71;
        padding-left: 20px;
      }
      .treelist {
        background: white;
        overflow: hidden;
        overflow: scroll;
        height: calc(100% - 36px);
        padding-top: 20px;
        ul {
          li {
            height: 40px;
            padding: 0 20px;
            display: flex;
            align-items: center;
          }
          li:hover {
            background: #d9e3ec;
          }
        }
      }
    }
    .right-box {
      flex: 1;
      height: 100%;
      .title {
        line-height: 36px;
        background: #32405a;
        color: white;
        padding-left: 20px;
      }
      .imgtask {
        padding: 20px;
        background: #f5f5f5;
        border: 1px solid #e2e3e8;
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
      .footer {
        height: 40px;
        // margin-top: 20px;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        padding-right: 10px;
        .mtr {
          margin-right: 10px !important;
        }
      }
    }
  }
}
</style>