<template>
  <div class="component">
    <el-row>
      <el-col :span="3">
        <div class="list-tree">
          <div class="title">
            <img src="../../assets/img/已跳过.png"/>
            <span style="margin-left:10px;">全部类型</span>
          </div>
          <div>
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleCloseMenu"
              unique-opened
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>解调</span>
                  <img src="../../assets/img/关闭，错误 拷贝.png" class="ml10" />
                  <img src="../../assets/img/已跳过.png" class="ml10" />
                  <img src="../../assets/img/进行中.png" class="ml10" />
                </template>
                <el-menu-item-group>
                  <el-submenu index="2-1">
                    <template slot="title" index="2-1">目标类型</template>
                    <el-menu-item index="2-1-1">船(12)</el-menu-item>
                    <el-menu-item index="2-1-2">飞 机(12)</el-menu-item>
                    <el-menu-item index="2-1-3">游 艇(12)</el-menu-item>
                  </el-submenu>
                  <el-submenu index="2-2">
                    <template slot="title">信号类型</template>
                  </el-submenu>
                  <el-submenu index="2-3">
                    <template slot="title">信源类型</template>
                  </el-submenu>
                  <el-submenu index="2-4">
                    <template slot="title"> 解调规格 </template>
                  </el-submenu>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>目标类型</span>
                </template>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>译码</span>
                </template>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>帧解析</span>
                </template>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>解调规格</span>
                </template>
              </el-submenu>
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>数据转化</span>
                </template>
              </el-submenu>
            </el-menu>
          </div>
        </div>
      </el-col>
      <el-col :span="21">
        <!-- 组件表格板块 -->
        <div class="maintable">
          <div class="top">
            <div class="toplf">
              <span>组件模板</span>
            </div>
            <div class="toprg">
              <el-select
                size="small"
                class="sel"
                v-model="value"
                placeholder="模板类型"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                size="small"
                class="sel"
                v-model="value"
                placeholder="应用场景"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-date-picker
                class="time"
                size="small"
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
              <el-input
                class="serchinp"
                size="small"
                placeholder="搜索内容"
                suffix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </div>
          <div class="tablelist">
            <Table
              :tableData="tableData"
              height='calc(100vh - 145px)'
              @handleDetail="handleDetail"
              @handleBs="handleBs"
              @handleDataMX="handleDataMX"
              @handleDelete="handleDelete"
            />
            <div class="btm">
              <div>
                <!-- <el-button type="danger" size="small">删除</el-button> -->
              </div>
              <div>
                <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30, 40]" :current-page="1" :total="1000">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>




    <!-- 新增组件 -->
    <el-dialog
      title="新增组件"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :visible.sync="addDialogVisible"
      center
      width="30%"
      :before-close="handleClose"
    >
      <div class="stform">
        <el-form ref="form" :model="addForm" label-width="80px">
          <el-form-item class="f100" label="组件名称：">
            <el-input v-model="form.name" placeholder="组件名称"></el-input>
          </el-form-item>
          <el-form-item class="f100" label="业务类型：">
            <el-select
              style="width: 100%"
              v-model="form.region"
              placeholder="业务类型"
              class="wid"
            >
              <el-option label="1" value="shanghai"></el-option>
              <el-option label="2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="f100" label="应用场景：">
            <el-select
              style="width: 100%"
              v-model="form.region"
              placeholder="应用场景"
              class="wid"
            >
              <el-option label="1" value="shanghai"></el-option>
              <el-option label="2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="f100" label="类型：">
            <el-select
              style="width: 100%"
              v-model="form.region"
              placeholder="类型"
              class="wid"
            >
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="f100" label="组件描述：">
            <el-input
              style="width: 100%"
              type="textarea"
              v-model="form.desc"
            ></el-input>
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
              <div class="el-upload__text wid">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip bc" slot="tip">
                拖拽或点击选择文件上传
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="onSubmit" size="medium"
          >确定</el-button
        >
        <el-button size="medium" plain @click="addDialogVisible = false"
          >取消</el-button
        >
      </span>
    </el-dialog>

    <!-- 组件信息 -->
    <el-dialog
      title="组件信息"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :visible.sync="zjxxDialogVisible"
      center
      width="40%"
      :before-close="handleClose"
    >
      <div class="zjxx">
        <div class="basic">
          <div class="basic-head">基本信息</div>
          <div class="basic-main">
            <p>
              <span class="mrm">
                <span class="font-col">组件名称:</span> 组件名称</span
              >
              <span class="mrm">
                <span class="font-col">上传时间:</span> 2021年3月1日
                14:14:12</span
              >
              <span><span class="font-col">创建人:</span> 创建人</span>
            </p>
            <p>
              <span class="mrm2">
                <span class="font-col">业务类型:</span> 解调</span
              >
              <span class="mrm2">
                <span class="font-col">应用场景:</span> 目标类型</span
              >
              <span><span class="font-col">类型:</span> 船</span>
            </p>
            <p>
              <span>
                <span class="font-col">组件描述:</span
                >此组件只可为流程发起时使用</span
              >
            </p>
          </div>
        </div>
        <div class="moder">
          <div>
            部署列表
            <span> (3 6) </span>
          </div>
          <div>
            <el-select
              style="width: 130px; margin-right: 10px"
              size="small"
              placeholder="服务器状态"
              v-model="zjSeachData.status"
            >
            </el-select>
            <el-input
              style="width: 200px"
              placeholder="输入服务器"
              suffix-icon="el-icon-search"
              v-model="zjSeachData.name"
              size="small"
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
    <el-dialog
      title="部署服务器"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :visible.sync="bsDialogVisible"
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
              <el-input
                suffix-icon="el-icon-search"
                size="small"
                placeholder="搜索服务器"
                :data="fw"
              ></el-input>
              <div class="list-box">
                <ul>
                  <li v-for="(item, index) in ip" :key="index" class="line-h">
                    <template>
                      <div class="row-l">
                        <div class="dfc">
                          <img
                            class="mr5 ml5"
                            src="../../assets/img/校准.png"
                          />
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
              <el-input
                suffix-icon="el-icon-search"
                size="small"
                placeholder="搜索服务器"
                :data="fw"
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
                        <img class="mr5 ml5" src="../../assets/img/完成.png" />
                        <span>{{ item.num }}</span>
                      </div>
                      <div>
                        <img
                          class="del"
                          src="../../assets/img/关闭，错误 拷贝.png"
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
      <div slot="footer">
        <el-button size="small" type="primary">确定</el-button>
        <el-button size="small" plain>取消</el-button>
      </div>
    </el-dialog>

    <!-- 数据模型-->
    <el-dialog
      title="数据模型"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :visible.sync="sjmxDialogVisible"
      center
      width="40%"
      :before-close="handleClose"
    >
      <div class="sjmx">
        <div class="moder">
          <el-select
            style="width: 130px; margin-right: 10px"
            size="small"
            placeholder="类型"
            v-model="sjmxSearchData.type"
          >
          </el-select>
          <el-input
            style="width: 200px"
            placeholder="搜索内容"
            suffix-icon="el-icon-search"
            v-model="sjmxSearchData.name"
            size="small"
          >
          </el-input>
        </div>
        <div class="tab">
          <el-table
            :data="test"
            style="width: 100%"
            height="calc(100vh - 305px)"
          >
            <el-table-column show-overflow-tooltip prop="id" label="序号">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="显示名">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="sxname" label="属性名">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="sxtype"
              label="属性类型"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DataMdTable from "./comp/DataMdTable.vue";
import Table from "./comp/ModelTable.vue";
// import Gauge from "./comp/Gauge.vue";
export default {
  components: {
    Table,
    DataMdTable,
    // Gauge
  },
  data() {
    return {
      // 弹框
      addDialogVisible: false,
      zjxxDialogVisible: false,
      bsDialogVisible: false,
      sjmxDialogVisible: false,
      mini: 99999,
      ip: [
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
        {
          num: "192.168.1.999",
        },
      ],
      fw: "",

      // 组件弹窗
      zjSeachData: {
        status: "",
        name: "",
      },
      // 数据模型
      sjmxSearchData: {
        type: "",
        name: "",
      },
      // 部署
      deploy: 0,
      mxtype: "",
      test: [
        {
          id: 1,
          name: "离线",
          sxname: "ONline",
          sxtype: "字符串",
        },
        {
          id: 1,
          name: "在线",
          sxname: "inline",
          sxtype: "数字",
        },
        {
          id: 1,
          name: "在线",
          sxname: "inline",
          sxtype: "数字",
        },
        {
          id: 1,
          name: "在线",
          sxname: "inline",
          sxtype: "数字",
        },
        {
          id: 1,
          name: "在线",
          sxname: "inline",
          sxtype: "数字",
        },
        {
          id: 1,
          name: "在线",
          sxname: "inline",
          sxtype: "数字",
        },
        {
          id: 1,
          name: "在线",
          sxname: "inline",
          sxtype: "数字",
        },
        {
          id: 1,
          name: "在线",
          sxname: "inline",
          sxtype: "数字",
        },
        {
          id: 1,
          name: "在线",
          sxname: "inline",
          sxtype: "数字",
        },
        {
          id: 1,
          name: "在线",
          sxname: "inline",
          sxtype: "数字",
        },

        {
          id: 1,
          name: "在线",
          sxname: "inline",
          sxtype: "数字",
        },
        {
          id: 1,
          name: "在线",
          sxname: "inline",
          sxtype: "数字",
        },
        {
          id: 1,
          name: "在线",
          sxname: "inline",
          sxtype: "数字",
        },
        {
          id: 1,
          name: "在线",
          sxname: "inline",
          sxtype: "数字",
        },
        {
          id: 1,
          name: "在线",
          sxname: "inline",
          sxtype: "数字",
        },
        {
          id: 1,
          name: "在线",
          sxname: "inline",
          sxtype: "数字",
        },
        {
          id: 1,
          name: "在线",
          sxname: "inline",
          sxtype: "数字",
        },
        {
          id: 1,
          name: "在线",
          sxname: "inline",
          sxtype: "数字",
        },
      ],
      serverlist: [
        {
          part: "192.168.1.999",
        },
        {
          part: "192.168.1.999",
        },
        {
          part: "192.168.1.999",
        },
        {
          part: "192.168.1.999",
        },
        {
          part: "192.168.1.999",
        },
        {
          part: "192.168.1.999",
        },
        {
          part: "192.168.1.999",
        },
        {
          part: "192.168.1.999",
        },
        {
          part: "192.168.1.999",
        },
        {
          part: "192.168.1.999",
        },
        {
          part: "192.168.1.999",
        },
      ],
      value1: [],
      options: [
        {
          value: "选项1",
          label: "1",
        },
        {
          value: "选项2",
          label: "2",
        },
      ],
      value: "",
      input2: "",
      datamx: "",
      tableData: [
        {
          id: "1",
          module: "组件名称",
          target: "目标",
          type: "船",
          version: '1.0',
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
          version: '1.0',
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
          version: '1.0',
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
          version: '1.0',
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
          version: '1.0',
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
          version: '1.0',
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
          version: '1.0',
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
          version: '1.0',
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
          version: '1.0',
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
          version: '1.0',
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
          version: '1.0',
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
          version: '1.0',
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
          version: '1.0',
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
          version: '1.0',
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
          version: '1.0',
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
          version: '1.0',
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
          version: '1.0',
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
          version: '1.0',
          time: "2021/03/12 13:12:12",
          people: "创建人",
          deploy: 9,
          describe: "此组件只可作为流程发起时使用",
          isHover: false,
        },
      ],
      zjdata: [
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
      ],
      multipleSelection: [],
      addForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      form: {},
      // 资源总量
      allList: [
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
      ],
      gaugeChartData: [
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
      ],
    };
  },
  methods: {
    xs(index) {
      this.mini = index;
    },

    onSubmit() {
      console.log("submit!");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },

    handleDetail(row) {
      this.zjxxDialogVisible = true;
      console.log(row);
    },
    handleBs(row) {
      this.bsDialogVisible = true;
      console.log(row);
    },
    handleDataMX(row) {
      console.log(111);
      this.sjmxDialogVisible = true;
      console.log(row);
    },
    handleDelete(row) {
      this.$confirm("是否删除所选组件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      console.log(row);
    },
    handleClose() {
      this.addDialogVisible = false;
      this.zjxxDialogVisible = false;
      this.bsDialogVisible = false;
      this.sjmxDialogVisible = false;
    },
    handleCloseMenu(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
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
  // display: flex;
  width: 100%;
  height: 100%;
  .list-tree {
    width: 100%;
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
      background: white;

      span {
        color: black;
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
  .subassStatis{
    height: 125px;
    width: 100%;
    display: flex;
    .statisLeft{
      width: 50%;
      position: relative;
      display: flex;
      .subassTypeImage{
        background-color: #fff;
      }
      .subassTypeCharts{
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
    .statisRight{
      width: 50%;
      position: relative;
      display: flex;
      .subassStatusImage{
        background-color: #fff;
      }
      .subassStatusCharts{
        background-color: #fff;
        width: 100%;
        display: flex;
        // line-height: 125px;
        .gaugeChart{
          width: 185px;
          height: 125px;
        }
      }
    }
  }
  .maintable {
    height: calc(100vh);
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
}
</style>
