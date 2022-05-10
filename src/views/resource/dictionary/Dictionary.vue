<template>
  <div class="dictionary">
    <el-row>
      <el-col :span="4">
        <div class="list-tree">
          <div class="title">
            <span style="margin-left: 10px">字典结构</span>
          </div>
          <div class="search">
            <el-input
              class="search-input"
              placeholder="搜索关键字查找"
              type="text"
              maxlength="20"
              v-model="searchKeyword"
              suffix-icon="el-icon-search"
            />
          </div>
          <div style="width: 100%">
            <el-tree
              style="width: 100%"
              :data="treeData"
              :props="defaultProps"
              default-expand-all
            >
              <div class="my-tree-node" slot-scope="{ data }">
                <img
                  class="icon"
                  src="../../../assets/img/dict/文件夹.png"
                /><span class="text">{{ data.label }}</span>
                <span class="right-add">
                  <img src="../../../assets/img/dict/新建1.png" />
                </span>
              </div>
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="20" class="content">
        <div class="btn-group">
          <el-button
            type="primary"
            icon="el-icon-folder-add"
            size="small"
            @click="dialogVisible = true"
            >新建字典</el-button
          >
          <el-button type="text" icon="el-icon-delete" size="small"
            >删除</el-button
          ><el-button icon="el-icon-copy-document" size="small">移动</el-button>
        </div>
        <div class="nav">
          <i class="el-icon-arrow-left"></i> <i class="el-icon-arrow-right"></i
          ><i class="el-icon-refresh-right"></i>
          <span class="line"></span>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>某解调器</el-breadcrumb-item>
            <el-breadcrumb-item>基本信息</el-breadcrumb-item>
            <el-breadcrumb-item>设备类型</el-breadcrumb-item>
          </el-breadcrumb>

          <div class="right">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in tableTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>

            <el-input
              class="table-search-input"
              placeholder="输入字段名称"
              type="text"
              maxlength="20"
              v-model="tableSearchKeyword"
              suffix-icon="el-icon-search"
            />
          </div>
        </div>

        <div class="table">
          <el-table
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="fileName" label="文件名"> </el-table-column>
            <el-table-column prop="englishFileName" label="英文名">
            </el-table-column>
            <el-table-column prop="type" label="类型"> </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <!-- 弹出框 查看详情 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="35%"
      :close-on-press-escape="false"
    >
      <div class="dict-detail-dialog">
        <div class="header">
          <span class="title">基本信息：</span>
          <el-button type="primary">保存</el-button>
        </div>
        <div class="form">
          <el-form :inline="true" :model="form" class="form-inline">
            <el-form-item label="字典名称">
              <el-input
                v-model="form.dictName"
                placeholder="字典名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="字典英文名">
              <el-input
                v-model="form.dictEnglishName"
                placeholder="字典英文名"
              ></el-input>
            </el-form-item>

            <el-form-item label="字典类型">
              <el-input
                v-model="form.dictType"
                placeholder="字典类型"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="check-condition"><span>验证条件</span></div>

          <el-row class="radio-row" type="flex" align="middle" justify="center">
            <el-col :span="6">
              <el-radio v-model="form.checkCondtion" label="1"
                >数值范围</el-radio
              >
            </el-col>
            <el-col :span="6"
              ><el-radio v-model="form.checkCondtion" label="2"
                >枚 举</el-radio
              ></el-col
            >
            <el-col :span="6"
              ><el-radio v-model="form.checkCondtion" label="3"
                >Fel算出逻辑</el-radio
              ></el-col
            >
            <el-col :span="6">
              <el-radio v-model="form.checkCondtion" label="4"
                >正则逻辑</el-radio
              ></el-col
            >
          </el-row>
        </div>

        <div class="collapse">
          <el-collapse accordion>
            <el-collapse-item title="数值范围" name="1">
              <div class="data">
                <div class="data-value">
                  <el-switch
                    style="width: 40%; margin-top: 10px"
                    v-model="form.sectionSwitch"
                    inactive-text="开值闭值"
                  >
                  </el-switch>

                  <el-slider
                    style="width: 40%"
                    v-model="form.sectionValue"
                    range
                    :max="100"
                  ></el-slider>
                </div>
                <div>
                  <el-checkbox-group v-model="form.dictSelectedList">
                    <el-checkbox label="自然数"></el-checkbox>
                    <el-checkbox label="正数"></el-checkbox>
                    <el-checkbox label="负数"></el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="枚  举" name="2">
              <div class="enum">
                <el-row>
                  <el-col class="left" :span="8">
                    <div class="search">
                      <el-input
                        class="search-input"
                        placeholder="搜索关键字查找"
                        type="text"
                        maxlength="20"
                        v-model="searchKeyword"
                        suffix-icon="el-icon-search"
                      />
                    </div>
                    <div class="left-menu">
                      <div class="menu-item menu-active">
                        <span class="left">运动（01/09）</span>
                        <span class="right">
                          <img src="../../../assets/img/dict/新建(2).png" />
                          <img src="../../../assets/img/dict/删除(1).png" />
                        </span>
                      </div>

                      <div class="menu-item">
                        <span class="left">数码产品（01/09）</span>
                        <span class="right">
                          <img src="../../../assets/img/dict/新建(2).png" />
                          <img src="../../../assets/img/dict/删除(1).png" />
                        </span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div class="right">
                      <el-row>
                        <el-col :span="20">
                          <el-checkbox label="全选" name="all"></el-checkbox>
                          <el-checkbox label="已选" name="all"></el-checkbox>
                          <span style="margin-left: 20px; font-size: 14px"
                            ><i class="el-icon-delete"></i
                            ><span class="delete">删除</span></span
                          >
                        </el-col>
                        <el-col :span="4" class="selected-count">
                          <span>已选0个</span>
                        </el-col>
                      </el-row>
                      <div class="checkbox-list">
                        <el-checkbox-group v-model="form.dictSelectedList">
                          <el-checkbox label="复选框 A"></el-checkbox>
                          <el-checkbox label="复选框 B"></el-checkbox>
                          <el-checkbox label="复选框 C"></el-checkbox>
                          <el-checkbox label="复选框 A"></el-checkbox>
                          <el-checkbox label="复选框 B"></el-checkbox>
                          <el-checkbox label="复选框 C"></el-checkbox>
                          <el-checkbox label="复选框 A"></el-checkbox>
                          <el-checkbox label="复选框 B"></el-checkbox>
                          <el-checkbox label="复选框 C"></el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
            <el-collapse-item title="Fel算出逻辑" name="3">
              <div class="fel">
                <el-row>
                  <el-col :span="6">
                    <div class="search">
                      <el-input
                        class="search-input"
                        placeholder="搜索关键字查找"
                        type="text"
                        maxlength="20"
                        v-model="searchKeyword"
                        suffix-icon="el-icon-search"
                      />
                    </div>
                    <div class="create">
                      <el-row>
                        <el-col :span="16">
                          <el-select
                            style="width: 90%"
                            v-model="value"
                            placeholder="全部类型"
                          >
                            <el-option key="1" label="" value="1"> </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="8">
                          <el-button class="btn" type="primary" size="mini"
                            >创建</el-button
                          >
                        </el-col>
                      </el-row>
                    </div>
                    <div class="left-menu">
                      <div class="menu-item menu-active">
                        <span class="left">运动</span>
                        <span class="right">
                          <img src="../../../assets/img/dict/删除(1).png" />
                        </span>
                      </div>

                      <div class="menu-item">
                        <span class="left">数码产品</span>
                        <span class="right">
                          <img src="../../../assets/img/dict/删除(1).png" />
                        </span>
                      </div>
                      <div class="menu-item">
                        <span class="left">数码产品</span>
                        <span class="right">
                          <img src="../../../assets/img/dict/删除(1).png" />
                        </span>
                      </div>
                      <div class="menu-item">
                        <span class="left">数码产品</span>
                        <span class="right">
                          <img src="../../../assets/img/dict/删除(1).png" />
                        </span>
                      </div>
                      <div class="menu-item">
                        <span class="left">数码产品</span>
                        <span class="right">
                          <img src="../../../assets/img/dict/删除(1).png" />
                        </span>
                      </div>
                      <div class="menu-item">
                        <span class="left">数码产品</span>
                        <span class="right">
                          <img src="../../../assets/img/dict/删除(1).png" />
                        </span>
                      </div>
                      <div class="menu-item">
                        <span class="left">数码产品</span>
                        <span class="right">
                          <img src="../../../assets/img/dict/删除(1).png" />
                        </span>
                      </div>
                      <div class="menu-item">
                        <span class="left">数码产品</span>
                        <span class="right">
                          <img src="../../../assets/img/dict/删除(1).png" />
                        </span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="form">
                      <el-form
                        ref="form"
                        :model="felForm"
                        label-width="80px"
                        label-position="top"
                        size="mini"
                      >
                        <el-form-item label="公式名称" style="width: 100%">
                          <el-input
                            type="text"
                            v-model="felForm.name"
                          ></el-input>
                        </el-form-item>

                        <el-form-item label="公式预览" style="width: 100%">
                          <el-input
                            type="textarea"
                            :rows="4"
                            v-model="felForm.preview"
                          ></el-input>
                        </el-form-item>

                        <div class="form-btn">
                          <el-button type="danger" size="mini">重置</el-button>
                          <el-button type="info" size="mini">保存</el-button>
                          <el-button type="primary" size="mini">确认</el-button>
                        </div>
                      </el-form>
                    </div>
                  </el-col>
                  <el-col :span="6" class="right">
                    <div class="title1">算法符号</div>
                    <el-row class="search-form">
                      <el-col :span="12">
                        <el-input
                          class="search-input"
                          placeholder="搜索算法"
                          type="text"
                          maxlength="20"
                          v-model="searchKeyword"
                          suffix-icon="el-icon-search"
                        />
                      </el-col>
                      <el-col :span="12">
                        <el-select
                          style="width: 90%"
                          v-model="value"
                          placeholder="全部类型"
                        >
                          <el-option key="1" label="" value="1"> </el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                    <div class="title2">
                      <span class="symbol"></span
                      ><span class="text">算法类型</span>
                    </div>
                    <div class="algo">
                      <span class="algo-item active">左括号</span>
                      <span class="algo-item">右括号</span>
                      <span class="algo-item">求 和</span>
                      <span class="algo-item">平 均</span>
                      <span class="algo-item">相 加</span>
                      <span class="algo-item">相 减</span>
                      <span class="algo-item">相 乘</span>
                      <span class="algo-item">相 除</span>
                    </div>

                    <div class="title2">
                      <span class="symbol"></span
                      ><span class="text">算法类型</span>
                    </div>
                    <div class="algo">
                      <span class="algo-item active">左括号</span>
                      <span class="algo-item">右括号</span>
                      <span class="algo-item">求 和</span>
                      <span class="algo-item">平 均</span>
                      <span class="algo-item">相 加</span>
                      <span class="algo-item">相 减</span>
                      <span class="algo-item">相 乘</span>
                      <span class="algo-item">相 除</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
            <el-collapse-item title="正则逻辑" name="4">
              <div class="regular">
                <el-input
                  class="input"
                  type="textarea"
                  :rows="10"
                  placeholder="请输入正则逻辑"
                  v-model="textarea"
                >
                </el-input>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "dictionary",
  data() {
    return {
      dialogVisible: false,
      treeSearchKeyword: "",
      tableSearchKeyword: "",
      multipleSelection: [],
      tableTypeOptions: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      treeData: [
        {
          label: "某解调器",
          children: [
            {
              label: "基本信息",
              children: [
                {
                  label: "设备类型",
                },
                {
                  label: "内部结构",
                },
              ],
            },
          ],
        },
      ],
      tableData: [
        {
          fileName: "设备类型",
          englishFileName: "Device Type",
          type: "数字",
          createTime: "2021/07/01",
          updateTime: "2021/07/02",
        },
        {
          fileName: "设备类型",
          englishFileName: "Device Type",
          type: "数字",
          createTime: "2021/07/01",
          updateTime: "2021/07/02",
        },
        {
          fileName: "设备类型",
          englishFileName: "Device Type",
          type: "数字",
          createTime: "2021/07/01",
          updateTime: "2021/07/02",
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      form: {
        dictName: "",
        dictEnglishName: "",
        type: "",
        checkCondtion: "",
        dictSelectedList: "",
        sectionSwitch: true,
        sectionValue: [20, 70],
      },
      felForm: {
        name: "",
        preview: "",
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleSelectionChange: function (val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style lang="less" scoped>
.dictionary {
  width: calc(100%);
  height: calc(100%);
  .list-tree {
    width: calc(100%);
    height: calc(100vh - 50px);
    line-height: 36px;
    background: #f9fafb;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .search {
      border-bottom: 1px solid #dbdbdb;

      /deep/.el-input__inner {
        background: #ffffff !important;
        border: none !important;
      }
    }
    .title {
      padding-left: 15px;
      display: flex;
      align-items: center;
      background: #626771;
      color: #ffffff;

      span {
        font-size: 16px;
        margin-right: 10px;
        color: #ffffff;
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

    .my-tree-node {
      height: 40px;
      display: flex;
      width: 100%;

      .icon {
        height: 20px;
        width: 20px;
        margin: 10px;
        vertical-align: middle;
      }

      .text {
        height: 40px;
        line-height: 40px;
        vertical-align: middle;
      }

      .right-add {
        flex: 1;
        align-items: center;
        justify-content: flex-end;
        font-size: 14px;
        padding-right: 8px;
        display: inline-block;
        text-align: right;
        height: 40px;
        line-height: 40px;
      }
    }
  }

  .content {
    .btn-group {
      padding: 10px;
      background: #f0f3f8;
    }

    .nav {
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      background: #fefefe;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      /deep/.el-input__inner {
        background: #ffffff !important;
        border: none !important;
      }

      i {
        margin-left: 20px;
        vertical-align: middle;
      }

      .line {
        display: inline-block;
        width: 2px;
        height: calc(100% - 16px);
        background: #e6e6e6;
        vertical-align: middle;
        margin: 8px 20px 8px 20px;
      }

      .table-search-input {
        width: 200px;
      }

      .right {
        flex: 1;
        text-align: right;
      }
    }
  }

  .dict-detail-dialog {
    .header {
      display: flex;
      justify-content: space-between;
      margin: 10px;

      .title {
        height: 38px;
        line-height: 38px;
        display: inline-block;
      }
    }
    .form {
      .form-inline {
        /deep/.el-form-item {
          margin: 10px;
        }
      }
    }
    .check-condition {
      display: block;
      height: 40px;
      margin-top: 10px;
      margin-bottom: 10px;
      background: #f7f7f7;

      span {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        width: 80px;
        color: #fff;
        background: #0084f2;
        text-align: center;
      }
    }

    .radio-row {
      height: 40px;
      line-height: 40px;
      padding: 10px;
    }

    .collapse {
      /deep/.el-collapse-item__header {
        color: #b4b4b4;
        padding-left: 10px;
      }
      /deep/.is-active {
        color: #313131;
      }

      .regular {
        background: #f6f7f8;
        padding: 10px 20px 10px 20px;
      }

      .enum {
        height: 250px;
        overflow: hidden;
        .search {
          /deep/.el-input__inner {
            background: #ffffff !important;
            border: none !important;
          }
        }

        .left-menu {
          .menu-active {
            border-left: 4px solid #267ff7;
            background: #edf5ff !important;

            .left {
              color: #267ff7 !important;
            }
          }

          .menu-item {
            height: 40px;
            background: #ffffff;
            display: flex;

            .left {
              height: 40px;
              line-height: 40px;
              padding-left: 10px;
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #272727;
            }

            .right {
              flex: 1;
              text-align: right;

              span {
                height: 40px;
                vertical-align: middle;
              }
              img {
                height: 15px;
                margin: 10px;
                vertical-align: middle;
              }
            }
          }
        }

        .right {
          height: 250px;
          .selected-count {
            height: 40px;
            display: inline-block;
            font-size: 10px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #939393;
          }

          .delete {
            margin-left: 10px;
          }

          .checkbox-list {
            background: #f6f7f8;
            padding: 10px;
            height: 100%;

            /deep/.el-checkbox__label {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #323232;
            }
          }
        }
      }

      .data {
        padding: 10px;
        .data-value {
          display: flex;
          height: 40px;
          line-height: 40px;
        }
      }
    }

    .fel {
      height: 250px;
      overflow: hidden;

      .search {
        /deep/.el-input__inner {
          background: #ffffff !important;
          border: none !important;
        }
      }

      .left-menu {
        overflow: scroll;

        .menu-active {
          border-left: 4px solid #267ff7;
          background: #edf5ff !important;

          .left {
            color: #267ff7 !important;
          }
        }

        .menu-item {
          height: 40px;
          background: #ffffff;
          display: flex;

          .left {
            height: 40px;
            line-height: 40px;
            padding-left: 10px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #272727;
          }

          .right {
            flex: 1;
            text-align: right;

            span {
              height: 40px;
              vertical-align: middle;
            }
            img {
              height: 15px;
              margin: 10px;
              vertical-align: middle;
            }
          }
        }
      }

      .create {
        /deep/.el-input__inner {
          background: #ffffff !important;
          border: none !important;
        }

        .btn {
          margin: 5px 0px 5px 0px;
        }
      }

      .form {
        height: 250px;
        background: #f6f7f8;
        padding: 10px;
        /deep/.el-input__inner {
          background: #ffffff !important;
        }

        .form-btn {
          display: flex;
          justify-content: flex-end;
          margin-top: 10px;
        }
      }

      .right {
        height: 250px;
        overflow: scroll;

        /deep/.el-input__inner {
          background: #ffffff !important;
          border: none !important;
        }

        .title1 {
          height: 36px;
          line-height: 36px;
          padding-left: 10px;
          color: #313131;
        }

        .title2 {
          height: 36px;
          line-height: 36px;
          color: #bbbbbb;
          display: flex;
          margin: 10px;

          .symbol {
            width: 6px;
            border-radius: 4px;
            height: 20px;
            margin: 8px 8px 8px 0px;
            background: #3d8df8;
            line-height: 36px;
          }

          .text {
            height: 36px;
            line-height: 36px;
          }
        }

        .search-form {
          border-top: 1px solid #e9e9e9;
          border-bottom: 1px solid #e9e9e9;
        }

        .algo {
          padding: 10px;

          .active {
            border: 1px solid #65a4f9 !important;
            color: #65a4f9 !important;
          }

          .algo-item {
            width: 31%;
            border: 1px solid #e5e8ec;
            height: 26px;
            border-radius: 4px;
            display: inline-block;
            line-height: 26px;
            font-size: 12px;
            text-align: center;
            margin: 1%;
            color: #939393;
          }
        }
      }
    }
  }
}

/deep/.el-tree-node__content {
  height: 40px;
}
</style>
