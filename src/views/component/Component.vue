<template>
  <div class="component">
    <div class="right" style="width: 100%">
      <el-row>
        <el-col :span="24">
          <!-- 组件统计板块 -->
          <div class="subassStatis">
            <div class="statisLeft">
              <div class="subassTypeImage">
                <img src="../../assets/img/组件类型统计.png" />
                <span style="position: absolute; top: 30px; left: 66px; color: #fff">组件总量</span>
                <span style="position: absolute; top: 65px; left: 66px; color: #fff; font-size: 28px">215</span>
              </div>
              <div class="subassTypeCharts">
                <div class="item" v-for="(item, i) in allList" :key="i">
                  <div class="title">
                    <span class="name">
                      <i class="mr5" :style="{ borderColor: item.color }"></i>
                      <span>{{ item.name }}</span>
                    </span>
                    <span class="num">
                      <span :style="{ color: item.color }">{{ item.num }}</span>
                      /{{ item.all }}
                    </span>
                  </div>
                  <div class="bbar">
                    <div
                      class="bar"
                      :style="{
                        width: (item.num / item.all) * 100 + '%',
                        backgroundColor: item.color,
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="statisRight">
              <div class="subassStatusImage">
                <img src="../../assets/img/组件状态统计.png" />
                <span style="position: absolute; top: 30px; left: 66px; color: #fff">审批状态</span>
                <span style="position: absolute; top: 65px; left: 80px; color: #fff; font-size: 28px">6</span>
              </div>
              <div class="subassStatusCharts">
                <div ref="gaugeChart1" id="gaugeChart1" class="gaugeChart"></div>
                <div ref="gaugeChart2" id="gaugeChart2" class="gaugeChart"></div>
                <div ref="gaugeChart3" id="gaugeChart3" class="gaugeChart"></div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <!-- 组件表格板块 -->
          <div class="maintable">
            <div class="top">
              <div class="toplf">
                <span>组件列表</span>

                <!-- 运维人员使用的按钮，操作。 -->
                <!--                <el-button v-if="userId == 4" class="addZJ" type="primary" icon="el-icon-upload2" @click="appliactionUp">上架</el-button>-->
                <!--                <el-button v-if="userId == 4" class="addJM" type="primary" icon="el-icon-key" @click="applicationAuth">授权</el-button>-->
                <!--                <el-button v-if="userId == 4" class="addJM" type="primary" icon="el-icon-download" @click="applicationDown">下架</el-button>-->
              </div>
              <div class="toprg">
                <el-select class="sel" v-model="value" placeholder="组件状态">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <el-select class="sel" v-model="value" placeholder="组件类别">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <el-date-picker
                  class="time"
                  v-model="value1"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
                <el-input class="serchinp" placeholder="搜索内容" suffix-icon="Search" v-model="input2"> </el-input>
              </div>
            </div>
            <div class="tablelist">
              <Table
                ref="zjTable"
                :table-header="tableHeader"
                :tableData="tableData"
                :pg-total-num="100"
                height="calc(100vh - 300px)"
                @handleDetail="handleDetail"
                @handleBs="handleBs"
                @handleDataMX="handleDataMX"
                @handleDelete="handleDelete"
                @applicationReacject="applicationReacject"
                @appliactionUp="appliactionUp"
              >
                <template #="{ data }">
                  <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                    <el-icon class="op">
                      <Delete />
                    </el-icon>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="查看详情" placement="bottom">
                    <el-icon class="op">
                      <Tickets />
                    </el-icon>
                  </el-tooltip>
                </template>
              </Table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 新增组件 -->
    <el-dialog
      title="新增组件"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      v-model="addDialogVisible"
      center
      width="30%"
      :before-close="handleClose"
    >
      <div class="stform">
        <el-form ref="form" :model="addForm" label-width="80px">
          <el-form-item class="f100" label="组件名称：">
            <el-input v-model="addForm.name" placeholder="组件名称"></el-input>
          </el-form-item>
          <el-form-item class="f100" label="业务类型：">
            <el-select style="width: 100%" v-model="addForm.region" placeholder="业务类型" class="wid">
              <el-option label="1" value="shanghai"></el-option>
              <el-option label="2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="f100" label="应用场景：">
            <el-select style="width: 100%" v-model="addForm.region" placeholder="应用场景" class="wid">
              <el-option label="1" value="shanghai"></el-option>
              <el-option label="2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="f100" label="类型：">
            <el-select style="width: 100%" v-model="addForm.type" placeholder="类型" class="wid">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="f100" label="组件描述：">
            <el-input style="width: 100%" type="textarea" v-model="addForm.desc"></el-input>
          </el-form-item>
          <el-form-item class="f100" label="文件上传：">
            <el-upload
              style="width: 100%"
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text wid">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip bc" slot="tip">拖拽或点击选择文件上传</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="onSubmit" size="medium">确定</el-button>
        <el-button size="medium" plain @click="addDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 组件信息 -->
    <el-dialog
      title="组件信息"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      v-model="zjxxDialogVisible"
      center
      width="40%"
      :before-close="handleClose"
    >
      <div class="zjxx">
        <div class="basic">
          <div class="basic-head">基本信息</div>
          <div class="basic-main">
            <p>
              <span class="mrm"> <span class="font-col">组件名称:</span> 组件名称</span>
              <span class="mrm"> <span class="font-col">上传时间:</span> 2021年3月1日 14:14:12</span>
              <span><span class="font-col">创建人:</span> 创建人</span>
            </p>
            <p>
              <span class="mrm2"> <span class="font-col">业务类型:</span> 解调</span>
              <span class="mrm2"> <span class="font-col">应用场景:</span> 目标类型</span>
              <span><span class="font-col">类型:</span> 船</span>
            </p>
            <p>
              <span> <span class="font-col">组件描述:</span>此组件只可为流程发起时使用</span>
            </p>
          </div>
        </div>
        <div class="moder">
          <div>
            部署列表
            <span> (3 6) </span>
          </div>
          <div>
            <el-select style="width: 130px; margin-right: 10px" placeholder="服务器状态" v-model="zjSeachData.status">
            </el-select>
            <el-input
              style="width: 200px"
              placeholder="输入服务器"
              suffix-icon="el-icon-search"
              v-model="zjSeachData.name"
            >
            </el-input>
          </div>
        </div>
        <div class="tab">
          <DataMdTable :tableData="zjdata" />
        </div>
      </div>
    </el-dialog>

    <!-- 部署服务器 -->
    <!-- <el-dialog
      title="部署服务器"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      v-model="bsDialogVisible"
      center
      width="40%"
      :before-close="handleClose"
    >
      <div class="deploy-main">
        <div class="bs">
          <div class="bs-l">
            <div class="bs-l-top">
              <div>
                <span class="he">服务器列表</span>
                <span>({{ ip.length }})</span>
              </div>
              <div class="mr5">
                <el-checkbox></el-checkbox>
              </div>
            </div>
            <div class="bs-l-main">
              <el-input suffix-icon="el-icon-search" placeholder="搜索服务器" :data="fw"></el-input>
              <div class="list-box">
                <ul>
                  <li v-for="(item, index) in ip" :key="index" class="line-h">
                    <template>
                      <div class="row-l">
                        <div class="dfc">
                          <img class="mr5 ml5" src="../../assets/img/校准.png" />
                          <span>{{ item.num }}</span>
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
                <span class="he">服务器列表</span>
                <span>({{ ip.length }})</span>
              </div>
              <div class="mr5">
                <img src="../../assets/img/异常信息.png" />
              </div>
            </div>
            <div class="bs-l-main">
              <el-input suffix-icon="el-icon-search" placeholder="搜索服务器" :data="fw"></el-input>
              <div class="list-box">
                <ul>
                  <li v-for="(item, index) in ip" :key="index" class="line-h" @mouseenter="xs(index)">
                    <div class="row-l">
                      <div class="dfc">
                        <img class="mr5 ml5" src="../../assets/img/完成.png" />
                        <span>{{ item.num }}</span>
                      </div>
                      <div>
                        <img class="del" src="../../assets/img/关闭，错误 拷贝.png" />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary">确定</el-button>
        <el-button plain>取消</el-button>
      </div>
    </el-dialog> -->

    <!-- 数据模型-->
    <el-dialog
      title="数据模型"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      v-model="sjmxDialogVisible"
      center
      width="40%"
      :before-close="handleClose"
    >
      <div class="sjmx">
        <div class="moder">
          <el-select style="width: 130px; margin-right: 10px" placeholder="类型" v-model="sjmxSearchData.type">
          </el-select>
          <el-input
            style="width: 200px"
            placeholder="搜索内容"
            suffix-icon="el-icon-search"
            v-model="sjmxSearchData.name"
          >
          </el-input>
        </div>
        <div class="tab">
          <el-table :data="test" style="width: 100%" height="calc(100vh - 305px)">
            <el-table-column show-overflow-tooltip prop="id" label="序号"> </el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="显示名"> </el-table-column>
            <el-table-column show-overflow-tooltip prop="sxname" label="属性名"> </el-table-column>
            <el-table-column show-overflow-tooltip prop="sxtype" label="属性类型"> </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>

    <!-- 组件授权-->
    <el-dialog
      title="组件授权"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      v-model="zjsqDialogVisible"
      center
      width="40%"
      :before-close="handleClose"
    >
      <div style="height: 40px; line-height: 40px; padding-left: 45px; background-color: #f3f0f0">
        <span style="font-weight: bold">目标数据解调1</span>
        <span style="color: #2222c7">【标签名】</span>
      </div>
      <!-- 组件详情 -->
      <div class="zjsqClass">
        <div>
          <span class="zjsqSpanClass">版本：</span>
          <span>20210619</span>
        </div>
        <div>
          <span class="zjsqSpanClass">创建人：</span>
          <span>尼古拉</span>
        </div>
        <div>
          <span class="zjsqSpanClass">申请时间：</span>
          <span>2021-06-19</span>
        </div>
        <div>
          <span class="zjsqSpanClass">类型：</span>
          <span>解调-目标-船</span>
        </div>
        <div>
          <span class="zjsqSpanClass">状态：</span>
          <span>带授权</span>
        </div>
        <div>
          <span class="zjsqSpanClass">上架时间：</span>
          <span>2021-06-19</span>
        </div>
        <div style="width: 100%">
          <span class="zjsqSpanClass">描述：</span>
          <span>组件的一段主要功能描述</span>
        </div>
      </div>
      <!-- 授权表头 -->
      <div style="width: 100%; height: 40px; background-color: #f3f0f0; position: relative">
        <span style="width: 110px; height: 100%; display: inline-block; background-color: blue"></span>
        <el-button style="position: absolute; right: 10px; top: 5px" type="primary" icon="el-icon-upload2"
          >授权</el-button
        >
      </div>
      <!-- 授权列表 -->
      <div class="deploy-main">
        <div class="bs">
          <div class="bs-l">
            <div class="bs-l-top">
              <div>
                <span class="he">开发人员</span>
                <span>({{ ip.length }})</span>
              </div>
              <div class="mr5">
                <el-checkbox></el-checkbox>
              </div>
            </div>
            <div class="bs-l-main">
              <el-input suffix-icon="el-icon-search" placeholder="搜索人员" :data="fw"></el-input>
              <div class="list-box">
                <ul>
                  <li v-for="(item, index) in ip" :key="index" class="line-h">
                    <template>
                      <div class="row-l">
                        <div class="dfc">
                          <img class="mr5 ml5" src="../../assets/img/校准.png" />
                          <span style="display: inline-block; width: 50px">{{ item.name }}</span>
                          <span>{{ item.desc }}</span>
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
                <span class="he">已选人员</span>
                <span>({{ ip.length }})</span>
              </div>
              <div class="mr5">
                <img src="../../assets/img/异常信息.png" />
              </div>
            </div>
            <div class="bs-l-main">
              <el-input suffix-icon="el-icon-search" placeholder="搜索已人员" :data="fw"></el-input>
              <div class="list-box">
                <ul>
                  <li v-for="(item, index) in ip" :key="index" class="line-h" @mouseenter="xs(index)">
                    <div class="row-l">
                      <div class="dfc">
                        <img class="mr5 ml5" src="../../assets/img/完成.png" />
                        <span style="display: inline-block; width: 50px">{{ item.name }}</span>
                        <span>{{ item.desc }}</span>
                      </div>
                      <div>
                        <img class="del" src="../../assets/img/关闭，错误 拷贝.png" />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import DataMdTable from "./comp/DataMdTable.vue";
import Table from "../../components/Table.vue";
import { ref, reactive, onMounted } from "vue";
import { Ref } from "vue";
import { Test, Zjdata, AddForm, AllList, GaugeChartData } from "./types";
import { TableData, TableHeader } from "../../components/types";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { Tickets, Delete } from "@element-plus/icons-vue";

import * as echarts from "echarts";

// 弹框
let addDialogVisible: Ref<boolean> = ref(false);
let zjxxDialogVisible: Ref<boolean> = ref(false);
let bsDialogVisible: Ref<boolean> = ref(false);
let sjmxDialogVisible: Ref<boolean> = ref(false);
let zjsqDialogVisible: Ref<boolean> = ref(false);
let mini: number = 99999;
const ip = reactive([
  {
    name: "李琦",
    desc: "（组件：8，应用：1）",
  },
  {
    name: "张晓月",
    desc: "（组件：8，应用：1）",
  },
  {
    name: "李琦",
    desc: "（组件：8，应用：1）",
  },
  {
    name: "张晓月",
    desc: "（组件：8，应用：1）",
  },
  {
    name: "李琦",
    desc: "（组件：8，应用：1）",
  },
  {
    name: "张晓月",
    desc: "（组件：8，应用：1）",
  },
  {
    name: "李琦",
    desc: "（组件：8，应用：1）",
  },
  {
    name: "张晓月",
    desc: "（组件：8，应用：1）",
  },
]);
const fw: Ref<string> = ref("");

// 组件弹窗
const zjSeachData: { [key: string]: string } = reactive({
  status: "",
  name: "",
});
// 数据模型
const sjmxSearchData: { [key: string]: string } = reactive({
  type: "",
  name: "",
});
//组件授权
// const zjsqForm = {};
// 部署
// const deploy = 0;
// const mxtype = "";
const test: Test[] = reactive([
  {
    id: 1,
    name: "离线",
    sxname: "ONline",
    sxtype: "字符串",
  },
  {
    id: 2,
    name: "在线",
    sxname: "inline",
    sxtype: "数字",
  },
  {
    id: 3,
    name: "在线",
    sxname: "inline",
    sxtype: "数字",
  },
  {
    id: 4,
    name: "在线",
    sxname: "inline",
    sxtype: "数字",
  },
  {
    id: 5,
    name: "在线",
    sxname: "inline",
    sxtype: "数字",
  },
]);
// const serverlist = [
//   {
//     part: "192.168.1.999",
//   },
//   {
//     part: "192.168.1.999",
//   },
//   {
//     part: "192.168.1.999",
//   },
//   {
//     part: "192.168.1.999",
//   },
//   {
//     part: "192.168.1.999",
//   },
//   {
//     part: "192.168.1.999",
//   },
//   {
//     part: "192.168.1.999",
//   },
//   {
//     part: "192.168.1.999",
//   },
//   {
//     part: "192.168.1.999",
//   },
//   {
//     part: "192.168.1.999",
//   },
//   {
//     part: "192.168.1.999",
//   },
// ];
const value1: string[] = reactive([]);
const options = [
  {
    value: "选项1",
    label: "1",
  },
  {
    value: "选项2",
    label: "2",
  },
];
const value: Ref<string> = ref("");
const input2: Ref<string> = ref("");
// const datamx = "";
const tableHeader: TableHeader[] = reactive([
  {
    prop: "id",
    name: "序号",
    width: 60,
  },
  {
    prop: "module",
    name: "组件名称",
    width: 150,
  },
  {
    prop: "target",
    name: "目标",
    width: 150,
  },
  {
    prop: "type",
    name: "组件类型",
    width: 150,
  },
  {
    prop: "people",
    name: "创建人",
    width: 150,
  },
  {
    prop: "deploy",
    name: "部署量",
    width: 150,
  },
  {
    prop: "describe",
    name: "组件描述",
  },
  {
    prop: "time",
    name: "创建时间",
    button: true,
  },
]);
const tableData: TableData[] = reactive([
  {
    id: "1",
    module: "组件名称",
    target: "目标",
    type: "船",
    time: "2021/03/12 13:12:12",
    people: "创建人",
    deploy: 9,
    describe: "此组件只可作为流程发起时使用",
    isHover: false,
  },
  {
    id: "1",
    module: "组件名称",
    target: "目标",
    type: "飞机",
    time: "2021/03/12 13:12:12",
    people: "创建人",
    deploy: 9,
    describe: "此组件只可作为流程发起时使用",
    isHover: false,
  },
  {
    id: "1",
    module: "组件名称",
    target: "目标",
    type: "飞机",
    time: "2021/03/12 13:12:12",
    people: "创建人",
    deploy: 9,
    describe: "此组件只可作为流程发起时使用",
    isHover: false,
  },
  {
    id: "1",
    module: "组件名称",
    target: "目标",
    type: "飞机",
    time: "2021/03/12 13:12:12",
    people: "创建人",
    deploy: 9,
    describe: "此组件只可作为流程发起时使用",
    isHover: false,
  },
  {
    id: "1",
    module: "组件名称",
    target: "目标",
    type: "飞机",
    time: "2021/03/12 13:12:12",
    people: "创建人",
    deploy: 9,
    describe: "此组件只可作为流程发起时使用",
    isHover: false,
  },
  {
    id: "1",
    module: "组件名称",
    target: "目标",
    type: "飞机",
    time: "2021/03/12 13:12:12",
    people: "创建人",
    deploy: 9,
    describe: "此组件只可作为流程发起时使用",
    isHover: false,
  },
  {
    id: "1",
    module: "组件名称",
    target: "目标",
    type: "飞机",
    time: "2021/03/12 13:12:12",
    people: "创建人",
    deploy: 9,
    describe: "此组件只可作为流程发起时使用",
    isHover: false,
  },
  {
    id: "1",
    module: "组件名称",
    target: "目标",
    type: "飞机",
    time: "2021/03/12 13:12:12",
    people: "创建人",
    deploy: 9,
    describe: "此组件只可作为流程发起时使用",
    isHover: false,
  },
  {
    id: "1",
    module: "组件名称",
    target: "目标",
    type: "飞机",
    time: "2021/03/12 13:12:12",
    people: "创建人",
    deploy: 9,
    describe: "此组件只可作为流程发起时使用",
    isHover: false,
  },
  {
    id: "1",
    module: "组件名称",
    target: "目标",
    type: "飞机",
    time: "2021/03/12 13:12:12",
    people: "创建人",
    deploy: 9,
    describe: "此组件只可作为流程发起时使用",
    isHover: false,
  },
  {
    id: "1",
    module: "组件名称",
    target: "目标",
    type: "飞机",
    time: "2021/03/12 13:12:12",
    people: "创建人",
    deploy: 9,
    describe: "此组件只可作为流程发起时使用",
    isHover: false,
  },
  {
    id: "1",
    module: "组件名称",
    target: "目标",
    type: "飞机",
    time: "2021/03/12 13:12:12",
    people: "创建人",
    deploy: 9,
    describe: "此组件只可作为流程发起时使用",
    isHover: false,
  },
]);
const zjdata: Zjdata[] = reactive([
  {
    id: 1,
    servers: "192.168.1.999",
    time: "2021/03/21 13:12:12",
    isHover: false,
  },
  {
    id: 1,
    servers: "192.168.1.999",
    time: "2021/03/21 13:12:12",
    isHover: false,
  },
  {
    id: 1,
    servers: "192.168.1.999",
    time: "2021/03/21 13:12:12",
    isHover: false,
  },
  {
    id: 1,
    servers: "192.168.1.999",
    time: "2021/03/21 13:12:12",
    isHover: false,
  },
  {
    id: 1,
    servers: "192.168.1.999",
    time: "2021/03/21 13:12:12",
    isHover: false,
  },
  {
    id: 1,
    servers: "192.168.1.999",
    time: "2021/03/21 13:12:12",
    isHover: false,
  },
  {
    id: 1,
    servers: "192.168.1.999",
    time: "2021/03/21 13:12:12",
    isHover: false,
  },
  {
    id: 1,
    servers: "192.168.1.999",
    time: "2021/03/21 13:12:12",
    isHover: false,
  },
  {
    id: 1,
    servers: "192.168.1.999",
    time: "2021/03/21 13:12:12",
    isHover: false,
  },
  {
    id: 1,
    servers: "192.168.1.999",
    time: "2021/03/21 13:12:12",
    isHover: false,
  },
  {
    id: 1,
    servers: "192.168.1.999",
    time: "2021/03/21 13:12:12",
    isHover: false,
  },
  {
    id: 1,
    servers: "192.168.1.999",
    time: "2021/03/21 13:12:12",
    isHover: false,
  },
  {
    id: 1,
    servers: "192.168.1.999",
    time: "2021/03/21 13:12:12",
    isHover: false,
  },
]);
// const multipleSelection = [];
const addForm: AddForm = {
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: "",
  resource: "",
  desc: "",
};
const form = {};
// 资源总量
const allList: AllList[] = reactive([
  {
    name: "调器",
    num: 16,
    all: 20,
    color: "#4898fc",
  },
  {
    name: "译码",
    num: 4,
    all: 20,
    color: "#23d037",
  },
  {
    name: "帧解析",
    num: 12,
    all: 20,
    color: "#00ceeb",
  },
  {
    name: "规格",
    num: 4,
    all: 20,
    color: "#fd9f6c",
  },
  {
    name: "数据转换",
    num: 4,
    all: 20,
    color: "#fd9f6c",
  },
]);
const gaugeChartData: GaugeChartData[] = reactive([
  {
    val: 17,
    sColor: "#54B6FF",
    eColor: "#138FFF",
    title: "待审批",
    all: 20,
  },
  {
    val: 3,
    sColor: "#FF8C8D",
    eColor: "#FF5D5B",
    title: "未审批",
    all: 20,
  },
  {
    val: 8,
    sColor: "#FF8C8D",
    eColor: "#FF5D5B",
    title: "草稿箱",
    all: 20,
  },
]);

const router = useRouter();
const xs = (index: number) => {
  mini = index;
};

const onSubmit = () => {
  console.log("submit!");
};
// const handleOpen = (key, keyPath) => {
//   console.log(key, keyPath);
// };

const handleDetail = () => {
  //  zjxxDialogVisible = true;
  // console.log(row);
  router.push("/componentFactory/compoentmangement");
};
const handleBs = () => {
  bsDialogVisible.value = true;
  // console.log(row);
};
const handleDataMX = () => {
  console.log(111);
  sjmxDialogVisible.value = true;
  // console.log(row);
};
const handleDelete = () => {
  ElMessageBox.confirm("是否删除所选组件?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "删除成功!",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
  // console.log(row);
};
const handleClose = () => {
  addDialogVisible.value = false;
  zjxxDialogVisible.value = false;
  bsDialogVisible.value = false;
  sjmxDialogVisible.value = false;
  zjsqDialogVisible.value = false;
};
// const handleCloseMenu = (key, keyPath) => {
//   console.log(key, keyPath);
// };
//上架
const appliactionUp = () => {
  ElMessage({
    type: "success",
    message: "应用上架成功！",
  });
};
//授权
// const applicationAuth = (row) => {
//   if ($refs.zjTable.multipleSelection.length == 0) {
//     ElMessage({
//       type: "waring",
//       message: "请选择一个组件进行授权",
//     });
//     return;
//   }
//   zjsqDialogVisible = true;
// };
//下架
// const applicationDown = (row) => {
//   ElMessage({
//     type: "success",
//     message: "应用下架成功！",
//   });
// };
//应用拒绝
const applicationReacject = () => {
  ElMessage({
    type: "success",
    message: "应用拒绝成功！",
  });
};
const gaugeChartFunc = (chartsData: GaugeChartData, el: HTMLElement) => {
  const gaugeChart = echarts.init(el);
  let options = {
    title: {
      text: chartsData.title,
      bottom: "10",
      x: "center",
      borderColor: "#000",
      textStyle: {
        fontWeight: "normal",
        fontSize: 12,
        color: "#000",
      },
    },

    angleAxis: {
      show: false,
      max: (100 * 360) / 270, //-45度到225度，二者偏移值是270度除360度
      type: "value",
      startAngle: 225, //极坐标初始角度
      splitLine: {
        show: false,
      },
    },
    barMaxWidth: 14, //圆环宽度
    radiusAxis: {
      show: false,
      type: "category",
    },
    //圆环位置和大小
    polar: {
      center: ["50%", "50%"],
      radius: "110",
    },
    series: [
      {
        type: "bar",
        data: [
          {
            //上层圆环，显示数据
            value: (chartsData.val / chartsData.all) * 100,
            itemStyle: {
              color: {
                //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                type: "linear",
                x: 0,
                y: 0,
                x2: 1, //从左到右 0-1
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: chartsData.sColor,
                  },
                  {
                    offset: 1,
                    color: chartsData.eColor,
                  },
                ],
              },
            },
          },
        ],
        barGap: "-100%", //柱间距离,上下两层圆环重合
        coordinateSystem: "polar",
        roundCap: true, //顶端圆角从 v4.5.0 开始支持
        z: 2, //圆环层级，同zindex
      },
      {
        //下层圆环，显示最大值
        type: "bar",
        data: [
          {
            value: 100,
            itemStyle: {
              color: "#E0E3E8",
            },
          },
        ],
        barGap: "-100%",
        coordinateSystem: "polar",
        roundCap: true,
        z: 1,
      },
      //仪表盘
      {
        // name: "AQI",
        type: "gauge",
        startAngle: 225, //起始角度，同极坐标
        endAngle: -45, //终止角度，同极坐标
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLabel: {
          show: false,
        },
        pointer: {
          show: false,
        },
        title: {
          offsetCenter: [0, 0],
          color: "#0080FF",
          fontSize: 35,
          fontWeight: 500,
        },
        detail: {
          formatter: " ",
        },
        data: [
          {
            name: chartsData.val,
          },
        ],
      },
    ],
  };
  gaugeChart.setOption(options);
  window.addEventListener("resize", function () {
    gaugeChart.resize();
  });
};

onMounted(() => {
  for (let i = 0; i < gaugeChartData.length; i++) {
    let el = document.getElementById(`gaugeChart${i + 1}`) as HTMLElement;
    gaugeChartFunc(gaugeChartData[i], el);
  }
});
</script>

<style lang="less" scoped>
.line-h {
  line-height: 25px;
  &:hover {
    background-color: #f1f1f1;
    .del {
      display: inline-block !important;
    }
  }
}
.tab {
  // height: 100%;
  overflow: hidden !important;
  border-radius: 0 0 20px 20px;
}
.component {
  // background: white;
  // padding: 15px;
  display: flex;
  width: 100%;
  height: 100%;
  .list-tree {
    width: 230px;
    height: 100%;
    line-height: 36px;
    background: #f5f9ff;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .menutitle {
      img {
        margin-left: 10px !important;
      }
    }
    .title {
      padding-left: 15px;
      display: flex;
      align-items: center;
      background: #32405a;

      span {
        color: white;
        font-size: 16px;
        margin-right: 10px;
      }
      div {
        background: white;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 20px;
      }
    }
  }
  .subassStatis {
    height: 125px;
    width: 100%;
    display: flex;
    .statisLeft {
      width: 50%;
      position: relative;
      display: flex;
      .subassTypeImage {
        background-color: #fff;
      }
      .subassTypeCharts {
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        width: 100%;
        .item {
          display: flex;
          flex-direction: column;
          flex: 0 0 33%;
          height: 50%;
          padding-right: 30px;
          justify-content: center;
          .title {
            display: flex;
            justify-content: space-between;
            .name {
              i {
                display: inline-block;
                width: 10px;
                border-radius: 50%;
                height: 10px;
                background-color: #ffffff;
                border: solid 2px #23d037;
              }
            }
            .num {
            }
          }
          .bbar {
            margin-top: 10px;
            width: 100%;
            height: 10px;
            background-color: #e0e4e9;
            border-radius: 5px;
            .bar {
              border-radius: 5px;
              height: 100%;
              // background-color: ;
            }
          }
        }
      }
    }
    .statisRight {
      width: 50%;
      position: relative;
      display: flex;
      .subassStatusImage {
        background-color: #fff;
      }
      .subassStatusCharts {
        background-color: #fff;
        width: 100%;
        display: flex;
        // line-height: 125px;
        .gaugeChart {
          width: 25%;
          height: 125px;
        }
      }
    }
  }
  .maintable {
    height: 100%;
    // width: calc(100% - 300px);
    width: 100%;
    padding: 20px;
    .top {
      line-height: 36px;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      .toplf {
        padding-left: 15px;
        span {
          margin-right: 15px;
          font-weight: bold;
        }
        .addZJ {
          background: #0084f2 !important;
        }
        .addJM {
          background: #4e58db !important;
        }
      }
      .toprg {
        display: flex;
        .time {
          width: 300px;
          margin-right: 10px;
          margin-top: 2px;
        }
        .sel {
          margin: 0;
          margin-right: 10px;
        }
        .serchinp {
          width: 150px;
          margin-right: 5px;
        }
      }
    }
    .tablelist {
      // margin: 5px;
      flex: 1;
      .tb {
      }
      .btm {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        padding: 0 15px;
        background-color: #fff;
      }
      .op {
        cursor: pointer;
      }
      .op:not(:first-child) {
        margin-left: 10px;
      }
    }
  }

  .deploy-main {
    .bs {
      display: flex;
      padding: 15px;
      justify-content: space-between;
      .bs-l {
        width: 45%;
        border: 1px solid #e3e3e3;
        border-radius: 10px 10px 10px 10px;
        .bs-l-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 40px;
          color: white;
          background: #4e5c72;
          border-radius: 10px 10px 0 0;
          padding: 0 15px;
          .he {
            font-size: 16px;
            margin-right: 10px;
          }
        }
        .bs-l-main {
          padding: 10px;
        }

        .bcol {
          background: #4e5c72;
          line-height: 40px;
          color: white;
          padding-left: 15px;
          border-radius: 5px 5px 0 0;
        }
        .row-l {
          display: flex;
          justify-content: space-between;
        }
        .list-box {
          height: 365px;
          overflow: hidden;
          overflow: scroll;
          padding: 0 5px;
        }
      }
      .bs-r {
        width: 45%;
        border: 1px solid #e3e3e3;
        border-radius: 10px 10px 10px 10px;
        .bs-l-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 40px;
          color: white;
          background: #0084f2;
          border-radius: 10px 10px 0 0;
          padding: 0 15px;
          .he {
            font-size: 16px;
            margin-right: 10px;
          }
        }
        .bs-l-main {
          padding: 10px;
        }
        .bcol {
          background: #4e5c72;
          line-height: 40px;
          color: white;
          padding-left: 15px;
          border-radius: 5px 5px 0 0;
        }
        .row-l {
          display: flex;
          justify-content: space-between;
          .del {
            display: none;
          }
        }
        .list-box {
          height: 365px;
          overflow: hidden;
          overflow: scroll;
          padding: 0 5px;
        }
      }
    }
    // .bs-bt {
    //   display: flex;
    //   justify-content: center;
    // }
  }
  .stform {
    padding: 20px;
    padding-right: 50px;
    .f100 {
      margin-bottom: 20px !important;
    }
  }
  .zjxx {
    .basic {
      padding: 15px;
      background: #f4f4f4;
      .basic-main {
        padding: 0 20px;
        box-sizing: border-box;
        p {
          margin-top: 15px;
          .font-col {
            color: #acacac;
            margin-right: 5px;
          }
          .mrm {
            margin-right: 35px;
          }
          .mrm2 {
            margin-right: 64px;
          }
        }
      }
    }
    .moder {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 20px;
      > div {
        display: flex;
      }
    }
  }
  .sjmx {
    .moder {
      display: flex;
      padding: 5px 10px;
    }
  }
  .zjsqClass {
    display: flex;
    flex-wrap: wrap;
    div {
      padding: 10px;
      width: 33%;
    }
    .zjsqSpanClass {
      width: 80px;
      display: inline-block;
      text-align: right;
    }
  }
}
</style>
