<template>
  <div class="group">
    <div class="header">
      <div class="title">
        <span>资源组</span>
        <el-button
          class="addBtton"
          size="small"
          @click="addResourceGroup()"
          type="primary"
        >
          <i class="el-icon-plus"></i> 新 建
        </el-button>
      </div>
    </div>
    <div class="body">
      <div class="list">
        <GroupTable
          class="groupTable"
          :tableData="groupTableData"
          @handleDetail="handleGroupDetail"
          @handleDelete="handleGroupDelete"
        />
      </div>
      <div class="r-content">
        <div class="top">
          <div class="title">{{resourceInfo}}</div>
        </div>
        <div class="r-content-body">
          <div class="top" style="padding:10px;display: flex;">
            <div style="display:flex;line-height: 40px;width:53%;">
              <span style="width:90px">资源组名称：</span><el-input size="mini" v-model="formInline.user" placeholder="目标解析资源组"></el-input>
            </div>
            <div style="display:flex;line-height: 40px;width:40%;margin-left:10px;">
              <span style="width:90px">可分配应用：</span><el-input size="mini" v-model="formInline.user" placeholder="输入可分配应用数"></el-input>
            </div>
          </div>
          <!-- <el-divider content-position="right">阿里云</el-divider> -->
          <el-divider style="margin: 15px 0;"></el-divider>
          <div class="serch" style="padding:10px 10px 0 10px;display:block;">
            <div class="serchHeader" style="height: 15px;display: flex;justify-content: space-between;">
              <span style="margin-left:1%;">筛选条件</span>
              <span style="cursor: pointer;margin-right:5%;">收起&nbsp;&nbsp;&nbsp;<i class="el-icon-arrow-up"></i></span>
            </div>
            <div class="body" style="display: block;">
              <div>
                <el-select size="mini" v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select size="mini" v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select size="mini" v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div style="margin-left: 1%;">
                <el-checkbox v-model="checked">运算优先</el-checkbox>
                <el-checkbox v-model="checked">存储优先</el-checkbox>
                <el-checkbox v-model="checked">网络优先</el-checkbox>
                <el-checkbox v-model="checked">未分配</el-checkbox>
              </div>
              <div style="display:flex;">
                <el-slider label='CPU' v-model="value1"></el-slider>
                <el-slider label='磁盘' v-model="value1"></el-slider>\
              </div>
            </div>
          </div>
          <el-divider style="margin: 15px 0;"></el-divider>
          <div class="resources">
            <div class="deploy-main">
              <div class="bs">
                <div class="bs-l">
                  <div class="bs-l-top">
                    <div>
                      <span class="he">资源列表</span>
                      <span>({{ ip.length }})</span>
                    </div>
                    <div class="mr5">
                      <el-checkbox></el-checkbox>
                    </div>
                  </div>
                  <div class="bs-l-main">
                    <div class="dfc">
                      <el-select
                        style="width: 200px; margin-right: 10px"
                        size="small"
                        placeholder="全部类型"
                        v-model="dialogSearch.type"
                      >
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                      </el-select>
                      <el-input
                        suffix-icon="el-icon-search"
                        size="small"
                        placeholder="搜索服务器"
                        :data="dialogSearch.name1"
                      ></el-input>
                    </div>
                    <div class="list-box">
                      <ul>
                        <li
                          v-for="(item, index) in ip"
                          :key="index"
                          class="line-h"
                        >
                          <template>
                            <div class="row-l">
                              <div class="dfc">
                                <img
                                  class="mr5 ml5"
                                  src="../../../assets/img/校准.png"
                                />
                                <span>
                                  <span>【{{ item.type }}】</span>
                                  <span>{{ item.name }}</span>
                                </span>
                              </div>
                              <div>
                                <el-checkbox class="mr5"></el-checkbox>
                              </div>
                            </div>
                          </template>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="bs-r">
                  <div class="bs-l-top">
                    <div>
                      <span class="he">已选资源</span>
                      <span>({{ ip.length }})</span>
                    </div>
                    <div class="mr5">
                      <img src="../../../assets/img/异常信息.png" />
                    </div>
                  </div>
                  <div class="bs-l-main">
                    <el-input
                      suffix-icon="el-icon-search"
                      size="small"
                      placeholder="搜索服务器"
                      :data="dialogSearch.name2"
                    ></el-input>
                    <div class="list-box">
                      <ul>
                        <li
                          v-for="(item, index) in ip"
                          :key="index"
                          class="line-h"
                          @mouseenter="xs(index)"
                        >
                          <div class="row-l">
                            <div class="dfc">
                              <img
                                class="mr5 ml5"
                                src="../../../assets/img/完成.png"
                              />
                              <span>
                                <span>【{{ item.type }}】</span>
                                <span>{{ item.name }}</span>
                              </span>
                            </div>
                            <div>
                              <img
                                class="del"
                                src="../../../assets/img/关闭，错误 拷贝.png"
                              />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div style="text-align: center;margin-top: 1%;">
                <el-button size="mini" type="info" @click="saveBasicInformation()">取消</el-button>
                <el-button size="mini" type="primary" @click="saveBasicInformation()">确定</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增资源组 -->
    <el-dialog
      custom-class="group-dialog"
      title="新建资源组"
      :visible.sync="addGroupDialogVisible"
      :close-on-click-modal="false"
      center
      width="40%"
      :before-close="handleClose"
    >
      <div class="d-content">
        <div class="top">
          <span>资源组名称：</span>
          <el-input
            style="width: 400px"
            size="medium"
            v-model="addName"
            placeholder="资源组名称"
          ></el-input>
        </div>
        <div class="list">
          <div class="deploy-main">
            <div class="bs">
              <div class="bs-l">
                <div class="bs-l-top">
                  <div>
                    <span class="he">资源列表</span>
                    <span>({{ ip.length }})</span>
                  </div>
                  <div class="mr5">
                    <el-checkbox></el-checkbox>
                  </div>
                </div>
                <div class="bs-l-main">
                  <div class="dfc">
                    <el-select
                      style="width: 200px; margin-right: 10px"
                      size="small"
                      placeholder="全部类型"
                      v-model="dialogSearch.type"
                    >
                      <el-option label="1" value="1"></el-option>
                      <el-option label="2" value="2"></el-option>
                    </el-select>
                    <el-input
                      suffix-icon="el-icon-search"
                      size="small"
                      placeholder="搜索服务器"
                      :data="dialogSearch.name1"
                    ></el-input>
                  </div>
                  <div class="list-box">
                    <ul>
                      <li
                        v-for="(item, index) in ip"
                        :key="index"
                        class="line-h"
                      >
                        <template>
                          <div class="row-l">
                            <div class="dfc">
                              <img
                                class="mr5 ml5"
                                src="../../../assets/img/校准.png"
                              />
                              <span>
                                <span>【{{ item.type }}】</span>
                                <span>{{ item.name }}</span>
                              </span>
                            </div>
                            <div>
                              <el-checkbox class="mr5"></el-checkbox>
                            </div>
                          </div>
                        </template>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="bs-r">
                <div class="bs-l-top">
                  <div>
                    <span class="he">已选资源</span>
                    <span>({{ ip.length }})</span>
                  </div>
                  <div class="mr5">
                    <img src="../../../assets/img/异常信息.png" />
                  </div>
                </div>
                <div class="bs-l-main">
                  <el-input
                    suffix-icon="el-icon-search"
                    size="small"
                    placeholder="搜索服务器"
                    :data="dialogSearch.name2"
                  ></el-input>
                  <div class="list-box">
                    <ul>
                      <li
                        v-for="(item, index) in ip"
                        :key="index"
                        class="line-h"
                        @mouseenter="xs(index)"
                      >
                        <div class="row-l">
                          <div class="dfc">
                            <img
                              class="mr5 ml5"
                              src="../../../assets/img/完成.png"
                            />
                            <span>
                              <span>【{{ item.type }}】</span>
                              <span>{{ item.name }}</span>
                            </span>
                          </div>
                          <div>
                            <img
                              class="del"
                              src="../../../assets/img/关闭，错误 拷贝.png"
                            />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer">
        <el-button type="primary" size="medium">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 资源详情 -->
    <el-dialog
      title="资源详情"
      custom-class="resource-dialog"
      :visible.sync="resourceDialogVisible"
      :close-on-click-modal="false"
      center
      width="30%"
      :before-close="handleClose"
    >
      <div class="box basic-information">
        <div class="title">基本信息</div>
        <el-form
          size="medium"
          class="mtb10"
          label-width="100px"
          :model="basicInformation"
        >
          <el-form-item prop="name" label="资源名称"> </el-form-item>
          <el-form-item prop="type" label="资源类型"> </el-form-item>
          <el-form-item prop="status" label="状 态">
            <i
              class="dot mr5"
              :style="{
                backgroundColor:
                  basicInformation.status == 1 ? '#2aef8a' : '#8b8989',
              }"
            ></i>
            <span>{{ basicInformation.status == 1 ? "在线" : "离线" }}</span>
          </el-form-item>
          <el-form-item prop="ip" label="IP地址">
            {{ basicInformation.ip }}
          </el-form-item>
          <el-form-item prop="port" label="端口">
            {{ basicInformation.port }}
          </el-form-item>
          <el-form-item prop="cpu" label="CPU">
            {{ basicInformation.cpu }}
          </el-form-item>
          <el-form-item prop="is" label="内存">
            {{ basicInformation.is }}
          </el-form-item>
          <el-form-item prop="disk" label="磁盘">
            {{ basicInformation.disk }}
          </el-form-item>
        </el-form>
      </div>
      <div class="box parameter-information">
        <div class="title">参数信息</div>
        <el-form
          size="medium"
          class="mtb10"
          label-width="100px"
          :model="parameterInformation"
        >
          <el-form-item prop="xhlx" label="信号类型">
            {{ parameterInformation.xhlx }}</el-form-item
          >
          <el-form-item prop="tzfs" label="调制方式">
            {{ parameterInformation.tzfs }}</el-form-item
          >
          <el-form-item prop="zblx" label="载波类型">
            {{ parameterInformation.zblx }}</el-form-item
          >
          <el-form-item prop="zbpl" label="载波频率">
            {{ parameterInformation.zbpl }}</el-form-item
          >
          <el-form-item prop="jds" label="阶段数">
            {{ parameterInformation.jds }}</el-form-item
          >
          <el-form-item prop="tzsl" label="调制速率">
            {{ parameterInformation.tzsl }}</el-form-item
          >
        </el-form>
      </div>
      <span slot="footer">
        <el-button type="danger" size="medium">移 除</el-button>
        <el-button type="primary" size="medium">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GroupTable from "./comp/GroupTable.vue";
import ResourceTable from "./comp/ResourceTable.vue";
export default {
  components: { GroupTable, ResourceTable },
  data() {
    return {
      resourceDialogVisible: false,
      addGroupDialogVisible: false,
      addName: "",
      formInline: {},
      resourceInfo: '查看详情',
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      // 基本信息表单
      basicInformation: {},
      dialogSearch: {
        name1: "",
        name2: "",
        type: "",
      },

      // 参数信息表单
      parameterInformation: {
        xhlx: "通用服务器一",
        tzfs: "调制方式",
        zblx: "XXX类型",
        zbpl: "XXXMHz",
        jds: "47%",
        tzsl: "10",
      },

      ip: [
        {
          name: "服务器名称",
          type: "主站",
        },
        {
          name: "服务器名称",
          type: "主站",
        },
        {
          name: "服务器名称",
          type: "L-下变频",
        },
        {
          name: "服务器名称",
          type: "某解调器",
        },
        {
          name: "服务器名称",
          type: "主站",
        },
        {
          name: "服务器名称",
          type: "通用",
        },
        {
          name: "服务器名称",
          type: "主站",
        },
        {
          name: "服务器名称",
          type: "主站",
        },
        {
          name: "服务器名称",
          type: "主站",
        },
        {
          name: "服务器名称",
          type: "主站",
        },
        {
          name: "服务器名称",
          type: "主站",
        },
        {
          name: "服务器名称",
          type: "主站",
        },
        {
          name: "服务器名称",
          type: "主站",
        },
        {
          name: "服务器名称",
          type: "主站",
        },
        {
          name: "服务器名称",
          type: "主站",
        },
        {
          name: "服务器名称",
          type: "主站",
        },
        {
          name: "服务器名称",
          type: "主站",
        },
        {
          name: "服务器名称",
          type: "主站",
        },
        {
          name: "服务器名称",
          type: "主站",
        },
      ],
      list: [
        {
          imgUrl: require("../../../assets/img/zz.png"),

          name: "主站DVB-S2",
        },
        {
          imgUrl: require("../../../assets/img/fwq.png"),
          name: "服务器",
        },
        {
          imgUrl: require("../../../assets/img/fwq.png"),
          name: "服务器",
        },
        {
          imgUrl: require("../../../assets/img/fwq.png"),
          name: "服务器",
        },
        {
          imgUrl: require("../../../assets/img/xbp.png"),
          name: "L-下变频",
        },
        {
          imgUrl: require("../../../assets/img/jtq.png"),
          name: "某解调器",
        },
        {
          imgUrl: require("../../../assets/img/jtq.png"),
          name: "某解调器",
        },
      ],
      groupTableData: [
        {
          name: "目标解析资源组",
          num: 6,
          date: "2021-06-04 09:51:27",
          isHover: false,
          status: '1',
          appliNum: '4'
        },
        {
          name: "目标解析资源组",
          num: 6,
          date: "2021-06-04 09:51:27",
          isHover: false,
          status: '1',
          appliNum: '4'
        },
        {
          name: "目标解析资源组",
          num: 6,
          date: "2021-06-04 09:51:27",
          isHover: false,
          status: '1',
          appliNum: '4'
        },
        {
          name: "目标解析资源组",
          num: 6,
          date: "2021-06-04 09:51:27",
          isHover: false,
          status: '2',
          appliNum: '4'
        },
        {
          name: "目标解析资源组",
          num: 6,
          date: "2021-06-04 09:51:27",
          isHover: false,
          status: '2',
          appliNum: '4'
        },
        {
          name: "目标解析资源组",
          num: 6,
          date: "2021-06-04 09:51:27",
          isHover: false,
          status: '1',
          appliNum: '4'
        },
        {
          name: "目标解析资源组",
          num: 6,
          date: "2021-06-04 09:51:27",
          isHover: false,
          status: '1',
          appliNum: '4'
        },
      ],
      resourceTableData: [
        {
          name: "资源名称",
          rid: "123",
          type: "通用服务器",
          date: "2021-06-04 10:05:57",
          ip: "192.168.4.45",
          port: "8080",
          is: "45%",
          cpu: "45%",
          disk: "45%",
          status: 2,
          isHover: false,
        },
        {
          name: "资源名称",
          rid: "123",
          type: "通用服务器",
          date: "2021-06-04 10:05:57",
          ip: "192.168.4.45",
          port: "8080",
          is: "45%",
          cpu: "45%",
          disk: "45%",
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          rid: "123",
          type: "通用服务器",
          date: "2021-06-04 10:05:57",
          ip: "192.168.4.45",
          port: "8080",
          is: "45%",
          cpu: "45%",
          disk: "45%",
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          rid: "123",
          type: "通用服务器",
          date: "2021-06-04 10:05:57",
          ip: "192.168.4.45",
          port: "8080",
          is: "45%",
          cpu: "45%",
          disk: "45%",
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          rid: "123",
          type: "通用服务器",
          date: "2021-06-04 10:05:57",
          ip: "192.168.4.45",
          port: "8080",
          is: "45%",
          cpu: "45%",
          disk: "45%",
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          rid: "123",
          type: "通用服务器",
          date: "2021-06-04 10:05:57",
          ip: "192.168.4.45",
          port: "8080",
          is: "45%",
          cpu: "45%",
          disk: "45%",
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          rid: "123",
          type: "通用服务器",
          date: "2021-06-04 10:05:57",
          ip: "192.168.4.45",
          port: "8080",
          is: "45%",
          cpu: "45%",
          disk: "45%",
          status: 1,
          isHover: false,
        },
        {
          name: "资源名称",
          rid: "123",
          type: "通用服务器",
          date: "2021-06-04 10:05:57",
          ip: "192.168.4.45",
          port: "8080",
          is: "45%",
          cpu: "45%",
          disk: "45%",
          status: 1,
          isHover: false,
        },
      ],
    };
  },
  methods: {
    handleAddGroup() {
      this.resourceDialogVisible = true;
      // this.basicInformation = row;
    },
    handleGroupDetail(row) {
      console.log(row);
    },
    handleGroupDelete(row) {
      console.log(row);
    },
    handleResourceDetail(row) {
      this.resourceDialogVisible = true;
      this.basicInformation = row;
      console.log(row);
    },
    handleResourceDelete(row) {
      console.log(row);
    },
    handleClose() {
      this.addGroupDialogVisible = false;
      this.resourceDialogVisible = false;
    },
    saveBasicInformation() {
      // this.resourceDialogVisible = false;
      this.resourceInfo = '资源分组详情';
    },
    addResourceGroup(){
      this.resourceInfo = '新建资源分组';
    }
  },
};
</script>
<style lang="less" scoped>
.group {
  padding: 0 0 20px 20px;
  height: 100%;
  width: 100%;
  .header{
    height: 50px;
    line-height: 50px;
    .addBtton{
      margin-left: 10px;
    }
  }
  .body{
    display: flex;
    .list {
      height: 100%;
      width: 60%;
      background-color: #fff;
      border-right: 1px solid #f3f4f6;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      .top {
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        font-size: 15px;
        font-weight: 700;
      }
      .groupTable{
        /deep/.el-table{
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
      }
    }
    .r-content {
      width: calc(100% - 60%);
      background-color: #fff;
      .top {
        .title {
          height: 30px;
          line-height: 30px;
          font-size: 15px;
          font-weight: 700;
          background-color: #32405a;
          color: #fff;
          text-align: center;
        }
        ul {
          display: flex;
          align-items: center;
          li {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin-left: 30px;
            margin-right: 20px;
            height: 160px;
            font-size: 15px;
            font-weight: 700;
            img {
              margin-bottom: 10px;
            }
          }
        }
      }
      .r-content-body {
        height: 100%;
        .top {
          padding: 10px;
          display: flex;
          background-color: #fff;
          padding: 20px;
          display: flex;
          align-items: center;
          color: #868686;
          /deep/.el-input{
            width: 65%;
          }
        }
        /deep/.el-divider--horizontal{
          margin: 5px 0;
        }
        .serch{
          padding: 0 10px 10px 10px;
          .serchHeader{
            height: 30px;
            display: flex;
            justify-content: space-between;
          }
          .body{
            /deep/.el-select{
              margin: 1%;
              width: 30%;
            }
            /deep/.el-checkbox:not(:first-child){
              margin-left: 5%;
            }
            /deep/.el-slider{
              width: 50%;
              margin: 0 5%;
            }
          }
        }
        .resources {
          background-color: #fff;
          .deploy-main {
            .line-h {
              line-height: 25px;
              &:hover {
                background-color: #f1f1f1;
                .del {
                  display: inline-block !important;
                }
              }
            }
            .bs {
              display: flex;
              padding: 10px;
              justify-content: space-between;
              .bs-l,
              .bs-r {
                width: 48.5%;
                border: 1px solid #e3e3e3;
                border-radius: 6px;
                overflow: hidden;
                .bs-l-top {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  line-height: 40px;
                  color: white;
                  background: #4e5c72;
                  padding: 0 15px;
                  .he {
                    font-size: 16px;
                    margin-right: 10px;
                  }
                }
                .bs-l-main {
                  padding: 10px;
                }
                .row-l {
                  display: flex;
                  justify-content: space-between;
                }
                .list-box {
                  height: 250px;
                  overflow: hidden;
                  overflow: scroll;
                  padding: 0 5px;
                  font-size: 15px;
                  color: #000;
                }
              }
              .bs-r {
                .bs-l-top {
                  background: #0084f2;
                }
                .row-l {
                  display: flex;
                  justify-content: space-between;
                  .del {
                    display: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // /deep/.el-select{
  //   margin: 1%;
  // }

  .el-dialog {
    &.resource-dialog {
      .box {
        font-size: 12px;
        .title {
          height: 33px;
          background-color: #dadfe7;
          line-height: 33px;
          padding-left: 20px;
          color: #333;
        }
        &.parameter-information,
        &.basic-information {
          .el-form-item {
            flex: 0 0 50%;
          }
        }
        &.component {
          .num {
            display: inline-block;
            width: 36px;
            height: 33px;
            background-color: #3684e9;
            font-size: 12px;
            font-weight: bold;
            line-height: 33px;
            color: #ffffff;
            text-align: center;
          }
        }
      }
    }
    &.group-dialog {
      // .d-content {
      //   height: 100%;
      //   .top {
      //     background-color: #fff;
      //     padding: 20px;
      //     display: flex;
      //     align-items: center;
      //     color: #868686;
      //   }
      //   .list {
      //     background-color: #f5f5f5;
      //     .deploy-main {
      //       .line-h {
      //         line-height: 25px;
      //         &:hover {
      //           background-color: #f1f1f1;
      //           .del {
      //             display: inline-block !important;
      //           }
      //         }
      //       }
      //       .bs {
      //         display: flex;
      //         padding: 15px;
      //         justify-content: space-between;
      //         .bs-l,
      //         .bs-r {
      //           width: 48.5%;
      //           border: 1px solid #e3e3e3;
      //           border-radius: 6px;
      //           overflow: hidden;
      //           .bs-l-top {
      //             display: flex;
      //             justify-content: space-between;
      //             align-items: center;
      //             line-height: 40px;
      //             color: white;
      //             background: #4e5c72;
      //             padding: 0 15px;
      //             .he {
      //               font-size: 16px;
      //               margin-right: 10px;
      //             }
      //           }
      //           .bs-l-main {
      //             padding: 10px;
      //           }
      //           .row-l {
      //             display: flex;
      //             justify-content: space-between;
      //           }
      //           .list-box {
      //             height: 365px;
      //             overflow: hidden;
      //             overflow: scroll;
      //             padding: 0 5px;
      //             font-size: 15px;
      //             color: #000;
      //           }
      //         }
      //         .bs-r {
      //           .bs-l-top {
      //             background: #0084f2;
      //           }
      //           .row-l {
      //             display: flex;
      //             justify-content: space-between;
      //             .del {
      //               display: none;
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
    }
  }
}
</style>