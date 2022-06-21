<template>
  <div class="basic-info">
    <div class="main">
      <el-collapse v-model="activeNames">
        <el-collapse-item class="pd" name="1">
          <template #title>
            <el-button type="primary" round>填写基本信息</el-button>
            <span style="margin-left: 10px">收起</span>
          </template>
          <el-form :inline="true" :model="formInline" style="margin-top: 10px">
            <el-form-item label="应用名称：">
              <el-input v-model="formInline.user" placeholder="应用名称"></el-input>
            </el-form-item>
            <el-form-item label="应用类型：">
              <el-select v-model="formInline.region" placeholder="选择应用类型">
                <el-option label="侦察" value="侦察"></el-option>
                <el-option label="侦守" value="侦守"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="版本：">
              <el-input v-model="formInline.user" placeholder="输入版本"></el-input>
            </el-form-item>
            <el-form-item label="应用描述：">
              <el-input class="appDesc" v-model="formInline.user" placeholder="输入描述"></el-input>
            </el-form-item>
          </el-form>
          <div style="margin-top: 10px">
            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
              <template #tip>
                <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
              </template>
            </el-upload>
          </div>
        </el-collapse-item>
        <el-collapse-item class="pd" name="2">
          <template #title>
            <el-button type="primary" round>应用场景配置</el-button>
            <span style="margin-left: 10px">收起</span>
          </template>
          <el-form :inline="true" :model="formInlineCj" :label-position="labelPosition">
            <el-form-item label="场景描述：" class="formInlineCjClass">
              <el-input class="appDescCj" v-model="formInlineCj.appDescCj" placeholder="输入描述"></el-input>
            </el-form-item>
            <!-- <el-form-item label="信号接入：" class="formInlineCjClass">
                    <el-select class="singleIn" v-model="formInlineCj.singleIn" placeholder="选择信号">
                    <el-option label="侦察" value="侦察"></el-option>
                    <el-option label="侦守" value="侦守"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="外部接口：" class="formInlineCjClass">
                    <el-input class="outerInterf" v-model="formInlineCj.outerInterf" placeholder="外部接口"></el-input>
                </el-form-item> -->
            <el-form-item label="资源分组：" class="formInlineCjClass resourceGroupSelect">
              <!-- <el-select class="resourceGroup" v-model="formInlineCj.resourceGroup" placeholder="选择资源组">
                    <el-option label="资源组一" value="资源组一"></el-option>
                    <el-option label="资源组二" value="资源组二"></el-option>
                    <el-option label="资源组三" value="资源组三"></el-option>
                    </el-select> -->
              <el-row align="middle">
                <el-col :span="16">
                  <el-input placeholder="选择资源组">
                    <template #append>
                      <span @click="resourceGroup = true">添加资源组</span>
                    </template>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-button type="primary" style="margin-left: 20px" @click="resourceApplay = true"
                    >申请资源</el-button
                  >
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="信号接入网：" class="formInlineCjClass">
              <el-radio v-model="formInlineCj.insertType" label="1">硬件接入</el-radio>
              <el-radio v-model="formInlineCj.insertType" label="2">软件接入</el-radio>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="3" class="singleInsert">
          <template #title>
            <span>硬件接入</span>
          </template>
          <div class="satellite">
            <el-row>
              <el-col :span="1">
                <div class="satelliteTitle">
                  <el-divider direction="vertical"></el-divider><span style="font-weight: bold">卫星</span>
                </div>
              </el-col>
              <el-col :span="23">
                <div class="satelliteInput">
                  <el-form :inline="true" :model="formInline">
                    <el-form-item label="卫星名称：" label-width="140px">
                      <el-input v-model="formInline.wx"></el-input>
                    </el-form-item>
                    <el-form-item label="极化：" label-width="140px">
                      <el-select v-model="formInline.jh"></el-select>
                    </el-form-item>
                    <el-form-item label="转发本振：" label-width="140px">
                      <el-select v-model="formInline.zfbz"></el-select>
                    </el-form-item>
                    <el-form-item label="KU下变频：" label-width="140px">
                      <el-select v-model="formInline.ku"></el-select>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="dvbs2">
            <el-row>
              <el-col :span="1">
                <div class="dvbs2Title">
                  <el-divider direction="vertical"></el-divider><span style="font-weight: bold">主站</span>
                </div>
              </el-col>
              <el-col :span="23">
                <div class="dvbs2Input">
                  <el-form :inline="true" :model="formInline">
                    <el-form-item label="解调锁定：" label-width="140px">
                      <el-select v-model="formInline.jtsd"></el-select>
                    </el-form-item>
                    <el-form-item label="网台识别：" label-width="140px">
                      <el-select v-model="formInline.wtsb"></el-select>
                    </el-form-item>
                    <el-form-item label="载波频率：" label-width="140px">
                      <el-input v-model="formInline.zbpl"></el-input>
                    </el-form-item>
                    <el-form-item label="滚降系数：" label-width="140px">
                      <el-select v-model="formInline.gjxs"></el-select>
                    </el-form-item>
                    <el-form-item label="输入选择：" label-width="140px">
                      <el-select v-model="formInline.srxz"></el-select>
                    </el-form-item>
                    <el-form-item label="输入数据类型：" label-width="140px">
                      <el-select v-model="formInline.srsjlx"></el-select>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="lineConfig">
            <div class="lineConfigTitle">
              <el-divider direction="vertical"></el-divider>&nbsp;&nbsp;<span style="font-weight: bold">线路配置</span
              >&nbsp;&nbsp;&nbsp;
              <el-button type="primary">新增配置</el-button>
            </div>
            <div class="lineConfigContent">
              <div v-for="(item, ind) in 3" :key="ind" class="lineConfigContentItem">
                <div class="lineConfigContentItemTitle">
                  <span>线路配置一</span>
                </div>
                <div class="lineConfigContentItemContent">
                  <el-form :inline="true" :model="formInline">
                    <el-form-item label="线路名称：" label-width="140px">
                      <el-input v-model="formInline.lxmc"></el-input>
                    </el-form-item>
                    <el-form-item label="L下变频通道名称：" label-width="140px">
                      <el-select v-model="formInline.xbpmc"></el-select>
                    </el-form-item>
                    <el-form-item label="L下变频频点：" label-width="140px">
                      <el-select v-model="formInline.xbppd"></el-select>
                    </el-form-item>
                    <el-form-item label="频偏校准量：" label-width="140px">
                      <el-select v-model="formInline.jzl"></el-select>
                    </el-form-item>
                    <el-form-item label="正反谱：" label-width="140px">
                      <el-switch v-model="formInline.zfp" active-text="正谱"></el-switch>
                    </el-form-item>
                    <el-form-item label="天狼设备：" label-width="140px">
                      <el-select v-model="formInline.tlsb"></el-select>
                    </el-form-item>
                    <el-form-item label="中频号：" label-width="140px">
                      <el-select v-model="formInline.zph"></el-select>
                    </el-form-item>
                    <el-form-item label="状态：" label-width="140px">
                      <el-switch v-model="formInline.zt" active-text="启用"></el-switch>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4" class="softwordInsert">
          <template #title>
            <span>软件接入</span>
          </template>
          <div>
            <div class="pdTop">
              <span>协议类型：</span>
              <el-select v-model="formInline.xylx"></el-select>
            </div>
            <div>
              <div class="tcpTitle pdTop">
                <el-divider direction="vertical"></el-divider>
                <span>tcp</span> &nbsp;&nbsp;---&nbsp;&nbsp; <span>收起</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <el-icon><ArrowUp /></el-icon>
              </div>
              <div class="pdTop" style="margin-left: 20px">
                <span>监听端口：</span>
                <el-select v-model="formInline.jtdk"></el-select>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>通用服务器：</span>
                <el-select v-model="formInline.tyfwq"></el-select>
              </div>
            </div>
            <div>
              <div class="httpTitle pdTop">
                <el-divider direction="vertical"></el-divider>
                <span>http</span> &nbsp;&nbsp;---&nbsp;&nbsp; <span>收起</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <el-icon><ArrowUp /></el-icon>
              </div>
              <div class="pdTop" style="margin-left: 20px">
                <span>监听端口：</span>
                <el-select v-model="formInline.jtdk"></el-select>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>通用服务器：</span>
                <el-select v-model="formInline.tyfwq"></el-select>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
          <div>
            <div style="font-weight: bold">数据来源</div>
            <div class="pdTop" style="margin-left: 20px">
              <span>IP：</span>
              <el-select v-model="formInline.ip"></el-select>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>端口：</span>
              <el-input v-model="formInline.dk"></el-input>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="cont-bottom">
      <el-button type="primary" @click="next"> 下一步</el-button>
      <!-- <el-button type="info" @click="up">上一步</el-button> -->
      <el-button type="success">
        <el-icon><DocumentCopy /></el-icon>
        <span>保存草稿</span>
      </el-button>
    </div>

    <!-- 资源申请 -->
    <el-dialog
      title="资源申请"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      v-model="resourceApplay"
      center
      width="50%"
      :before-close="handleClose"
      custom-class="resourceBody"
    >
      <div class="resouceBody">
        <el-collapse v-model="resourceActiveNames">
          <el-collapse-item name="1">
            <template #title>
              <span style="font-weight: bold; color: #000">资源申请一</span>
              <span style="margin-left: 10px" @click="addResouceSelect">
                <el-icon style="color: blue"><CirclePlus /></el-icon>
              </span>
            </template>
            <el-form :inline="true" :model="ResourceformInline" label-width="100px">
              <el-form-item label="资源类型：">
                <el-input class="resourceInput" v-model="ResourceformInline.user" placeholder="资源类型"></el-input>
              </el-form-item>
              <el-form-item label="资源数量：" class="resourceRightItem">
                <el-input class="resourceInput" v-model="ResourceformInline.number" placeholder="资源数量"></el-input>
              </el-form-item>
              <div style="border-top: 1px #e4e4e4 dashed; width: 100%; margin: 10px 0 10px 0"></div>
              <el-form-item label="操作系统：">
                <el-select class="resourceInput" v-model="ResourceformInline.os" placeholder="选择操作系统">
                  <el-option label="windows" value="windows"></el-option>
                  <el-option label="linux" value="linux"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="最小CPU：" class="resourceRightItem">
                <el-input class="resourceInput" v-model="ResourceformInline.minCpu" placeholder="最小CPU"></el-input>
              </el-form-item>
              <el-form-item label="最小内存：">
                <el-input
                  class="resourceInput"
                  v-model="ResourceformInline.minMemeroy"
                  placeholder="最小内存"
                ></el-input>
              </el-form-item>
              <el-form-item label="最小磁盘：" class="resourceRightItem">
                <el-input class="resourceInput" v-model="ResourceformInline.minDisk" placeholder="最小磁盘"></el-input>
              </el-form-item>
              <el-form-item label="处理器：">
                <el-select class="resourceInput" v-model="ResourceformInline.cpuType" placeholder="处 理 器">
                  <el-option label="I5" value="I5"></el-option>
                  <el-option label="I6" value="I6"></el-option>
                  <el-option label="I7" value="I7"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-collapse-item>

          <el-collapse-item :name="index + 1" v-for="(item, index) in addResouceSelectData" :key="index">
            <template #title>
              <span style="font-weight: bold; color: #000">资源申请{{ resourceItemName[index + 1] }}</span>
              <span style="margin-left: 10px" @click="removeResourceSelect(index)">
                <el-icon style="color: red"><Remove /></el-icon>
              </span>
              <span style="margin-left: 10px" @click="addResouceSelect">
                <el-icon style="color: blue"><CirclePlus /></el-icon>
              </span>
            </template>
            <el-form :inline="true" :model="item">
              <el-form-item label="资源类型：" label-width="80px">
                <el-input class="resourceInput" v-model="item.user" placeholder="资源类型"></el-input>
              </el-form-item>
              <el-form-item label="资源数量：" label-width="80px" class="resourceRightItem">
                <el-input class="resourceInput" v-model="item.number" placeholder="资源数量"></el-input>
              </el-form-item>
              <div style="border-top: 1px #e4e4e4 dashed; width: 100%; margin: 10px 0 10px 0"></div>
              <el-form-item label="操作系统：" label-width="80px">
                <el-select class="resourceInput" v-model="item.os" placeholder="选择操作系统">
                  <el-option label="windows" value="windows"></el-option>
                  <el-option label="linux" value="linux"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="最小CPU：" label-width="80px" class="resourceRightItem">
                <el-input class="resourceInput" v-model="item.minCpu" placeholder="最小CPU"></el-input>
              </el-form-item>
              <el-form-item label="最小内存：" label-width="80px">
                <el-input class="resourceInput" v-model="item.minMemeroy" placeholder="最小内存"></el-input>
              </el-form-item>
              <el-form-item label="最小磁盘：" label-width="80px" class="resourceRightItem">
                <el-input class="resourceInput" v-model="item.minDisk" placeholder="最小磁盘"></el-input>
              </el-form-item>
              <el-form-item label="处理器：" label-width="80px">
                <el-select class="resourceInput" v-model="item.cpuType" placeholder="处 理 器">
                  <el-option label="I5" value="I5"></el-option>
                  <el-option label="I6" value="I6"></el-option>
                  <el-option label="I7" value="I7"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-dialog>

    <!-- 资源分组 -->
    <el-dialog
      title="资源申请"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      v-model="resourceGroup"
      center
      width="70%"
      custom-class="resourceGroupDialog"
      :before-close="handleClose"
    >
      <div class="resourceGroup">
        <div style="position: relative">
          <div>
            <div style="height: 30px; line-height: 30px; padding: 0 10px; width: 150px">资源组-侦察</div>
            <el-menu default-active="1">
              <el-menu-item>
                <template #title>
                  <span>资源组一</span>
                  <span class="mgleft">3/20</span>
                </template>
              </el-menu-item>
              <el-menu-item>
                <template #title>
                  <span>资源组二</span>
                  <span class="mgleft">16/50</span>
                </template>
              </el-menu-item>
              <el-menu-item>
                <template #title>
                  <span>资源组三</span>
                  <span class="mgleft">14/30</span>
                </template>
              </el-menu-item>
            </el-menu>
          </div>
          <div style="bottom: 10px; position: absolute; width: 100%; text-align: center">
            <el-button type="primary">确认选择</el-button>
          </div>
        </div>
        <div style="padding: 0 10px">
          <div style="height: 30px; line-height: 30px">资源组一</div>
          <Table :tableData="tableData" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import Table from "./comp/Table.vue";
import { useRouter } from "vue-router";
import { UploadFilled, Remove, CirclePlus, ArrowUp, DocumentCopy } from "@element-plus/icons-vue";
import { ref } from "vue";

let activeNames = ["1", "2"];
let resourceActiveNames = ["1"];
let resourceItemName = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
let formInline = {
  user: "",
  wx: "",
  jh: "",
  ku: "",
  zfbz: "",
  jtsd: "",
  wtsb: "",
  zbpl: "",
  gjxs: "",
  srxz: "",
  srsjlx: "",
  lxmc: "",
  xbpmc: "",
  xbppd: "",
  jzl: "",
  zfp: "",
  tlsb: "",
  zph: "",
  zt: "",
  xylx: "",
  jtdk: "",
  tyfwq: "",
  ip: "",
  dk: "",
  region: "",
};
let formInlineCj = {
  appDescCj: "",
  insertType: "",
};
let ResourceformInline = {
  user: "",
  number: "",
  os: "",
  minCpu: "",
  minMemeroy: "",
  minDisk: "",
  cpuType: "",
};
let labelPosition = "right";
let resourceApplay = ref(false);
let resourceGroup = ref(false);
let addResouceSelectData: {
  user: string;
  number: string;
  os: string;
  minCpu: string;
  minMemeroy: string;
  minDisk: string;
  cpuType: string;
}[] = [];
let tableData = [
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
];
let router = useRouter();
const handleClose = () => {
  resourceApplay.value = false;
  resourceGroup.value = false;
};
const addResouceSelect = () => {
  addResouceSelectData.push({
    user: "string",
    number: "string",
    os: "string",
    minCpu: "string",
    minMemeroy: "string",
    minDisk: "string",
    cpuType: "string",
  });
  resourceActiveNames[0] = String(addResouceSelectData.length + 1);
};
const removeResourceSelect = (index: number) => {
  addResouceSelectData.splice(index, 1);
};
const next = () => {
  router.push({ path: "/fidlddata/fldata" });
};
</script>
<style lang="less" scoped>
// @import url("../../assets/css/common.less");
// .ptb5 {
//   padding: 5px 0;
// }
.basic-info {
  :deep(.el-collapse-item__arrow) {
    margin: 0 8px 0 8px;
  }
  .main {
    background-color: #fff;
    margin: 0 15px 0 15px;
    height: calc(100vh - 93px);
    overflow-y: auto;
    .pd {
      padding: 0 20px 0 20px;
    }
  }
  .mgleft {
    margin-left: 20px;
  }
  .appDesc {
    width: 570px;
  }
  .appDescCj {
    width: 1295px;
  }
  .singleIn {
    width: 500px;
  }
  .outerInterf {
    width: 715px;
  }
  .resourceGroupDialog {
    :deep(.el-dialog__header) {
      display: none;
    }
    .resourceGroup {
      display: flex;
      :deep(.el-menu) {
        border-right: 0px;
      }
    }
  }
  .formInlineCjClass {
    margin-top: 10px;
  }
  .resourceGroupSelect {
    :deep(.el-form-item__content .el-input-group) {
      padding: 5px 0;
      // .ptb5();
    }
    // :deep(.el-input__inner{
    //   width: 300px;
    // }
    :deep(.el-input-group__append) {
      background: #6495ed;
      color: #fff;
      cursor: pointer;
    }
    :deep(.el-form-item__content) {
      width: 1300px;
    }
  }
  .resouceBody {
    padding: 15px;
    .resourceInput {
      width: 250px;
    }
    .resourceRightItem {
      margin-left: 15%;
    }
  }
  .cont-bottom {
    background: white;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
  }
  .singleInsert {
    :deep(.el-collapse-item__wrap) {
      background: #f5f5f5;
      padding: 0 20px 0 20px;
    }
    :deep(.el-collapse-item__header) {
      padding: 0 20px 0 20px;
    }
    .satellite {
      .satelliteTitle {
        padding: 9px 0;
        :deep(.el-divider) {
          background: #1890ff;
        }
        :deep(.el-divider--vertical) {
          width: 5px;
        }
      }
      .satelliteInput {
        :deep(.el-input) {
          width: 200px;
        }
        :deep(.el-select) {
          width: 200px;
        }
        :deep(.el-input__inner) {
          background: #fff !important;
        }
      }
    }
    .dvbs2 {
      .dvbs2Title {
        padding: 9px 0;
        :deep(.el-divider) {
          background: #1890ff;
        }
        :deep(.el-divider--vertical) {
          width: 5px;
        }
      }
      .dvbs2Input {
        :deep(.el-input) {
          width: 200px;
        }
        :deep(.el-select) {
          width: 200px;
        }
        :deep(.el-input__inner) {
          background: #fff !important;
        }
      }
    }
    .lineConfig {
      .lineConfigTitle {
        :deep(.el-divider) {
          background: #1890ff;
        }
        :deep(.el-divider--vertical) {
          width: 5px;
        }
      }
      .lineConfigContent {
        .lineConfigContentItem {
          width: 100%;
          // height: 110px;
          // border: 1px solid;
          background: #fff;
          position: relative;
          margin-top: 20px;
          margin-left: 10px;
          border-radius: 8px;
          .lineConfigContentItemTitle {
            // position: absolute;
            // top: -11px;
            // left: 10px;
            display: inline-block;
            // background: #fff;
            width: 90px;
            text-align: center;
            font-weight: bold;
          }
          .lineConfigContentItemContent {
            padding: 10px;
            :deep(.el-input) {
              width: 200px;
            }
            :deep(.el-select) {
              width: 200px;
            }
            :deep(.el-switch) {
              width: 200px;
            }
          }
        }
      }
    }
  }
  .softwordInsert {
    :deep(.el-collapse-item__wrap) {
      background: #f5f5f5;
      padding: 0 20px;
    }
    :deep(.el-collapse-item__header) {
      padding: 0 20px 0 20px;
    }
    :deep(.el-select) {
      width: 200px;
    }
    :deep(.el-input) {
      width: 200px;
    }
    :deep(.el-switch) {
      width: 200px;
    }
    :deep(.el-divider--vertical) {
      width: 5px;
      background: #1890ff;
    }
    :deep(.el-input__inner) {
      background: #fff !important;
    }
    .pdTop {
      margin-top: 20px;
    }
  }
}
</style>
