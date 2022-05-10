<template>
  <div class="gplot">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="业务拓扑" name="business">
        <div class="chart-container">
          <template v-for="(item, i) in businessChartsDatas">
            <BusinessChart
              v-if="activeName == 'business'"
              :chartData="item"
              :key="i"
              class="chart"
            />
          </template>
          <ul class="bg">
            <li class="item" v-for="i in 4" :key="i"></li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="物理拓扑" name="physics">
        <PhysicsChart
          v-if="activeName == 'physics'"
          :chartData="physicsChartData"
          class="chart"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BusinessChart from "./comp/BusinessChart";
import PhysicsChart from "./comp/PhysicsChart";
import zzImg from "../../../assets/img/zz.png";
import fwqImg from "../../../assets/img/fwq.png";
import xbpImg from "../../../assets/img/xbp.png";
import jtqImg from "../../../assets/img/jtq.png";
export default {
  components: {
    BusinessChart,
    PhysicsChart,
  },
  data() {
    return {
      activeName: "business",
      businessChartsDatas: [
        {
          data: [
            {
              x: "8",
              y: "1",
              name: "接入网一",
              symbol: "image://" + zzImg,
              symbolSize: 60,
            },
            {
              x: "8",
              y: "3",
              name: "主站DVB-S2",
              symbol: "image://" + zzImg,
              symbolSize: 60,
            },
            {
              x: "6",
              y: "5",
              name: "服务器1",
              symbol: "image://" + fwqImg,
              symbolSize: 60,
            },
            {
              x: "8",
              y: "5",
              name: "服务器2",
              symbol: "image://" + fwqImg,
              symbolSize: 60,
            },
            {
              x: "10",
              y: "5",
              name: "服务器3",
              symbol: "image://" + fwqImg,
              symbolSize: 60,
            },
            {
              x: "8",
              y: "7",
              name: "L-下变频",
              symbol: "image://" + xbpImg,
              symbolSize: 60,
            },
            {
              x: "6",
              y: "9",
              name: "解调器1",
              symbol: "image://" + jtqImg,
              symbolSize: 60,
            },
            {
              x: "10",
              y: "9",
              name: "解调器2",
              symbol: "image://" + jtqImg,
              symbolSize: 60,
            },
          ],
          links: [
            {
              source: "接入网一",
              target: "主站DVB-S2",
            },
            {
              source: "主站DVB-S2",
              target: "服务器1",
            },
            {
              source: "主站DVB-S2",
              target: "服务器2",
            },
            {
              source: "主站DVB-S2",
              target: "服务器3",
            },
            {
              source: "服务器1",
              target: "L-下变频",
            },
            {
              source: "服务器2",
              target: "L-下变频",
            },
            {
              source: "服务器3",
              target: "L-下变频",
            },
            {
              source: "L-下变频",
              target: "解调器1",
            },
            {
              source: "L-下变频",
              target: "解调器2",
            },
          ],
        },
        {
          data: [
            {
              x: "8",
              y: "1",
              name: "接入网二",
              symbol: "image://" + zzImg,
              symbolSize: 60,
            },
            {
              x: "8",
              y: "3",
              name: "主站DVB-S2",
              symbol: "image://" + zzImg,
              symbolSize: 60,
            },
            {
              x: "7",
              y: "5",
              name: "服务器1",
              symbol: "image://" + fwqImg,
              symbolSize: 60,
            },
            {
              x: "9",
              y: "5",
              name: "服务器2",
              symbol: "image://" + fwqImg,
              symbolSize: 60,
            },
            {
              x: "8",
              y: "7",
              name: "L-下变频",
              symbol: "image://" + xbpImg,
              symbolSize: 60,
            },
            {
              x: "7",
              y: "9",
              name: "解调器1",
              symbol: "image://" + jtqImg,
              symbolSize: 60,
            },
            {
              x: "9",
              y: "9",
              name: "解调器2",
              symbol: "image://" + jtqImg,
              symbolSize: 60,
            },
          ],
          links: [
            {
              source: "接入网二",
              target: "主站DVB-S2",
            },
            {
              source: "主站DVB-S2",
              target: "服务器1",
            },
            {
              source: "主站DVB-S2",
              target: "服务器2",
            },
            {
              source: "主站DVB-S2",
              target: "服务器3",
            },
            {
              source: "服务器1",
              target: "L-下变频",
            },
            {
              source: "服务器2",
              target: "L-下变频",
            },
            {
              source: "服务器3",
              target: "L-下变频",
            },
            {
              source: "L-下变频",
              target: "解调器1",
            },
            {
              source: "L-下变频",
              target: "解调器2",
            },
          ],
        },
        {
          data: [
            {
              x: "8",
              y: "1",
              name: "接入网三",
              symbol: "image://" + zzImg,
              symbolSize: 60,
            },
            {
              x: "8",
              y: "3",
              name: "主站DVB-S2",
              symbol: "image://" + zzImg,
              symbolSize: 60,
            },
            {
              x: "6",
              y: "4.5",
              name: "服务器1",
              symbol: "image://" + fwqImg,
              symbolSize: 60,
            },
            {
              x: "8",
              y: "4.5",
              name: "服务器2",
              symbol: "image://" + fwqImg,
              symbolSize: 60,
            },
            {
              x: "10",
              y: "4.5",
              name: "服务器3",
              symbol: "image://" + fwqImg,
              symbolSize: 60,
            },
            {
              x: "6",
              y: "5.8",
              name: "服务器4",
              symbol: "image://" + fwqImg,
              symbolSize: 60,
            },
            {
              x: "8",
              y: "5.8",
              name: "服务器5",
              symbol: "image://" + fwqImg,
              symbolSize: 60,
            },
            {
              x: "7",
              y: "9",
              name: "解调器1",
              symbol: "image://" + jtqImg,
              symbolSize: 60,
            },
            {
              x: "9.5",
              y: "9",
              name: "解调器2",
              symbol: "image://" + jtqImg,
              symbolSize: 60,
            },
          ],
          links: [
            {
              source: "接入网三",
              target: "主站DVB-S2",
            },
            {
              source: "主站DVB-S2",
              target: "服务器1",
            },
            {
              source: "主站DVB-S2",
              target: "服务器2",
            },
            {
              source: "主站DVB-S2",
              target: "服务器3",
            },
            {
              source: "服务器1",
              target: "服务器4",
            },
            {
              source: "服务器2",
              target: "服务器5",
              lineStyle: {
                color: "#C2C2C2",
              },
            },
            {
              source: "服务器4",
              target: "解调器1",
            },
            {
              source: "服务器5",
              target: "解调器2",
              lineStyle: {
                color: "#C2C2C2",
              },
            },
          ],
        },
        {
          data: [
            {
              x: "8",
              y: "1",
              name: "接入网一",
              symbol: "image://" + zzImg,
              symbolSize: 60,
            },
            {
              x: "8",
              y: "3",
              name: "主站DVB-S2",
              symbol: "image://" + zzImg,
              symbolSize: 60,
            },
            {
              x: "6",
              y: "5",
              name: "服务器1",
              symbol: "image://" + fwqImg,
              symbolSize: 60,
            },
            {
              x: "8",
              y: "5",
              name: "服务器2",
              symbol: "image://" + fwqImg,
              symbolSize: 60,
            },
            {
              x: "10",
              y: "5",
              name: "服务器3",
              symbol: "image://" + fwqImg,
              symbolSize: 60,
            },
            {
              x: "8",
              y: "7",
              name: "L-下变频",
              symbol: "image://" + xbpImg,
              symbolSize: 60,
            },
            {
              x: "6",
              y: "9",
              name: "解调器1",
              symbol: "image://" + jtqImg,
              symbolSize: 60,
            },
            {
              x: "8",
              y: "9",
              name: "解调器2",
              symbol: "image://" + jtqImg,
              symbolSize: 60,
            },
            {
              x: "10",
              y: "9",
              name: "解调器3",
              symbol: "image://" + jtqImg,
              symbolSize: 60,
            },
          ],
          links: [
            {
              source: "接入网一",
              target: "主站DVB-S2",
            },
            {
              source: "主站DVB-S2",
              target: "服务器1",
            },
            {
              source: "主站DVB-S2",
              target: "服务器2",
            },
            {
              source: "主站DVB-S2",
              target: "服务器3",
            },
            {
              source: "服务器1",
              target: "L-下变频",
            },
            {
              source: "服务器2",
              target: "L-下变频",
            },
            {
              source: "服务器3",
              target: "L-下变频",
            },
            {
              source: "L-下变频",
              target: "解调器1",
            },
            {
              source: "L-下变频",
              target: "解调器2",
            },
            {
              source: "L-下变频",
              target: "解调器3",
            },
          ],
        },
      ],
      physicsChartData: {
        data: [
          {
            x: "4.5",
            y: "3",
            name: "主站DVB-S2",
            symbol: "image://" + zzImg,
            symbolSize: 60,
          },
          {
            x: "1",
            y: "5",
            name: "服务器1",
            symbol: "image://" + fwqImg,
            symbolSize: 60,
          },
          {
            x: "2",
            y: "5",
            name: "服务器2",
            symbol: "image://" + fwqImg,
            symbolSize: 60,
          },
          {
            x: "3",
            y: "5",
            name: "服务器3",
            symbol: "image://" + fwqImg,
            symbolSize: 60,
          },
          {
            x: "4",
            y: "5",
            name: "服务器4",
            symbol: "image://" + fwqImg,
            symbolSize: 60,
          },
          {
            x: "5",
            y: "5",
            name: "服务器5",
            symbol: "image://" + fwqImg,
            symbolSize: 60,
          },
          {
            x: "6",
            y: "5",
            name: "服务器6",
            symbol: "image://" + fwqImg,
            symbolSize: 60,
          },
          {
            x: "7",
            y: "5",
            name: "服务器7",
            symbol: "image://" + fwqImg,
            symbolSize: 60,
          },
          {
            x: "8",
            y: "5",
            name: "服务器8",
            symbol: "image://" + fwqImg,
            symbolSize: 60,
          },
          {
            x: "9",
            y: "5",
            name: "服务器9",
            symbol: "image://" + fwqImg,
            symbolSize: 60,
          },
          {
            x: "4.5",
            y: "7",
            name: "L-下变频",
            symbol: "image://" + xbpImg,
            symbolSize: 60,
          },
          {
            x: "4",
            y: "9",
            name: "解调器1",
            symbol: "image://" + jtqImg,
            symbolSize: 60,
          },
          {
            x: "5",
            y: "9",
            name: "解调器2",
            symbol: "image://" + jtqImg,
            symbolSize: 60,
          },
        ],
        links: [
          {
            source: "主站DVB-S2",
            target: "服务器1",
          },
          {
            source: "主站DVB-S2",
            target: "服务器2",
          },
          {
            source: "主站DVB-S2",
            target: "服务器3",
          },
          {
            source: "主站DVB-S2",
            target: "服务器4",
          },
          {
            source: "主站DVB-S2",
            target: "服务器5",
          },
          {
            source: "主站DVB-S2",
            target: "服务器6",
          },
          {
            source: "主站DVB-S2",
            target: "服务器7",
          },
          {
            source: "主站DVB-S2",
            target: "服务器8",
          },
          {
            source: "主站DVB-S2",
            target: "服务器9",
          },
          {
            source: "服务器1",
            target: "L-下变频",
          },
          {
            source: "服务器2",
            target: "L-下变频",
          },
          {
            source: "服务器3",
            target: "L-下变频",
          },
          {
            source: "服务器4",
            target: "L-下变频",
          },
          {
            source: "服务器5",
            target: "L-下变频",
          },
          {
            source: "服务器6",
            target: "L-下变频",
          },
          {
            source: "服务器7",
            target: "L-下变频",
          },
          {
            source: "服务器8",
            target: "L-下变频",
          },
          {
            source: "服务器9",
            target: "L-下变频",
          },
          {
            source: "L-下变频",
            target: "解调器1",
          },
          {
            source: "L-下变频",
            target: "解调器2",
          },
        ],
      },
    };
  },
};
</script>
<style lang="less" scoped>
.gplot {
  height: 100%;
  width: 100%;
  padding: 20px;
  .el-tabs {
    height: 100%;
    /deep/.el-tabs__content {
      height: calc(100% - 40px);
      .el-tab-pane {
        height: 100%;
        border: 1px solid #e6e9f2;
        background-color: rgba(255, 255, 255, 0.6);
        &#pane-business {
          .chart-container {
            height: 100%;
            display: flex;
            position: relative;
            .chart {
              height: 100%;
              width: 25%;
            }
            .bg {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              z-index: -1;
              display: flex;
              background-color: #eceff4;
              .item {
                flex: 1;
                &:nth-child(2n) {
                  background-color: #fff;
                }
              }
            }
          }
        }
        &#pane-physics {
          height: 100%;
          width: 100%;
          .chart {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>