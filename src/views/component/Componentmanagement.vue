<template>
  <div class="cont">
    <div class="cont-main">
      <el-collapse v-model="activeNames" @change="handleChange">
        <!-- 填写基本信息 -->
        <el-collapse-item name="1">
          <template #title>
            <button class="btn-class">填写基本信息</button>
            <span class="collapseTitle">展开</span>
          </template>
          <div class="basic">
            <div class="dfc zjmingc">
              <span> 组件名称：</span>
              <span>
                <el-input v-model="comname"></el-input>
              </span>
            </div>
            <span class="dfc">
              组件类型：
              <el-select v-model="comtype">
                <el-option value="1" label="1"></el-option>
                <el-option value="2" label="2"></el-option>
              </el-select>
            </span>
            <div class="dfc">
              <span>版本： </span>
              <span>
                <el-input v-model="comversions"></el-input>
              </span>
            </div>
            <div class="dfc">
              <span>组件描述：</span>
              <span>
                <el-input v-model="comdescribe" class="wid"></el-input>
              </span>
            </div>
          </div>
        </el-collapse-item>
        <!-- 填写应用场景 -->
        <el-collapse-item name="2">
          <template #title>
            <button class="btn-class">填写应用场景</button>
            <span class="collapseTitle">展开</span>
          </template>
          <div class="p10">
            <div class="dfc">
              <span>应用场景描述：</span>
              <el-input v-model="scene" class="inpwid"></el-input>
            </div>
            <div class="df">
              <span> 上传案例：</span>
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </div>
          </div>
        </el-collapse-item>
        <!-- 部署要求 -->
        <el-collapse-item name="3">
          <template #title>
            <button class="btn-class">部署要求</button>
            <span class="collapseTitle">展开</span>
          </template>
          <!-- 运行环境 -->
          <el-collapse>
            <el-collapse-item name="3">
              <template #title>
                <span>运行环境</span>
                <i class="el-icon-minus"></i>
                <i class="el-icon-minus"></i>
                <span class="collapseTitle">展开</span>
              </template>
              <div class="dfc systm">
                <div class="mrnum">
                  <span>操作系统：</span>
                  <span>
                    <el-select v-model="system">
                      <el-option value="1" label="1"></el-option>
                      <el-option value="2" label="2"></el-option
                    ></el-select>
                  </span>
                  <span> 已选：</span>
                </div>
                <div class="dfc">
                  <div class="dfc min">
                    <span>最小磁盘：</span>
                    <span><el-input v-model="cp"></el-input></span>
                  </div>
                  <div class="dfc min">
                    <span>最小CPU：</span>
                    <span><el-input v-model="cpu"></el-input></span>
                  </div>
                  <div class="dfc min">
                    <span>最小内存：</span>
                    <span><el-input v-model="internal"></el-input></span>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- 运行方式 -->
          <el-collapse>
            <el-collapse-item name="4">
              <template #title>
                <span> 运行方式 </span>
                <i class="el-icon-minus"></i>
                <i class="el-icon-minus"></i>
                <span class="collapseTitle"> 展开 </span>
              </template>
              <div class="dfc waydiv">
                <div class="dfc waylist">
                  <span> 实例方式：</span>
                  <span>
                    <el-select v-model="slway" placeholder="单机多实例">
                      <el-option value="1" label="1"></el-option>
                      <el-option value="2" label="2"></el-option>
                    </el-select>
                  </span>
                </div>
                <div class="dfc waylist">
                  <span>调用方式：</span>
                  <span>
                    <el-select v-model="dyway" placeholder="power job">
                      <el-option value="1" label="1"></el-option>
                      <el-option value="2" label="2"></el-option
                    ></el-select>
                  </span>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- 开发说明 -->
          <el-collapse>
            <el-collapse-item name="5">
              <template #title>
                <span> 开发说明 </span>
                <i class="el-icon-minus"></i>
                <i class="el-icon-minus"></i>
                <span class="collapseTitle"> 展开 </span>
                <el-button type="primary" class="addbtn" @click="addexplain">新增接口</el-button>
              </template>
              <div>
                <div v-for="(item, index) in addview" :key="index" class="interfaceItems">
                  <div class="viewbox">
                    <span class="sptitle">
                      开发说明{{ index + 1 }}
                      <el-button type="primary" v-if="index == 0">说明</el-button>
                      <el-button type="danger" v-if="index != 0" @click="del(index)">删除</el-button>
                    </span>
                    <div class="dfc">
                      <div class="dfc jkming">
                        <span>接口名：</span>
                        <span><el-input v-model="item.jkname"></el-input></span>
                      </div>
                      <div class="dfc jkming">
                        <span>接口：</span>
                        <span><el-input v-model="item.jk" style="width: 400px"></el-input></span>
                      </div>
                    </div>
                    <div class="dfc">
                      <span> 接口说明：</span>
                      <span style="flex: 1">
                        <el-input v-model="item.jksm" style="width: 100%"></el-input>
                      </span>
                    </div>
                    <div class="dfi">
                      <span> 接口参数：</span>
                      <el-table :data="item.jkcs" style="width: 100%">
                        <el-table-column prop="id" label="参数索引" width="100"> </el-table-column>
                        <el-table-column prop="name" label="参数名" width="110"> </el-table-column>
                        <el-table-column prop="data" label="变量名" width="110"> </el-table-column>
                        <el-table-column prop="type" label="类型" width="110"> </el-table-column>
                        <el-table-column prop="sm" label="说明"> </el-table-column>
                        <el-table-column label="操作" width="110">
                          <template #="scope">
                            <i
                              style="cursor: pointer"
                              class="el-icon-remove"
                              @click="InterParamsRemove(index, scope.$index)"
                            ></i>
                            <i
                              style="margin-left: 10px; cursor: pointer"
                              class="el-icon-circle-plus-outline"
                              @click="InterParamsAdd(index)"
                            ></i>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-collapse-item>
        <!-- 组件上传 -->
        <el-collapse-item name="4">
          <template #title>
            <button class="btn-class">组件上传</button>
            <span class="collapseTitle">展开</span>
          </template>
          <div class="files">
            <span>文件上传：</span>
            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
              <template #tip>
                <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
              </template>
            </el-upload>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="cont-bottom">
      <el-button type="primary"><i class="el-icon-s-promotion"></i> 保存 </el-button>
      <el-button type="success"><i class="delete el-icon-document-copy"></i> 保存草稿</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Plus, UploadFilled } from "@element-plus/icons-vue";

import { ref } from "vue";
import { ElMessage } from "element-plus";

import type { UploadProps } from "element-plus";

const imageUrl = ref("");

let activeNames = ["1", "2"];
let comname = "";
let comversions = "20321342";
let comdescribe = "组件描述";
let scene = "应用场景描述";
let comtype = "";
let system = "";
let internal = "";
let cpu = "";
let cp = "";
let slway = "";
let dyway = "";
let addview = [
  {
    jkname: "用户信息接口",
    jk: "com.sinux.user.manager.Userinfo",
    jksm: "接口说明",
    jkcs: [
      {
        id: 1,
        name: "参数现名称",
        data: "userName",
        type: "字符串",
        sm: "一段很长的参数说明一段很长的参数说明一般很长的参数说明一段很长的参数说明一段很长的参数说明一段很长的参数说明一段很长的参数说明",
      },
      {
        id: 2,
        name: "参数现名称",
        data: "userName",
        type: "字符串",
        sm: "一段很长的参数说明一段很长的参数说明一段很长的参数说明一段很长的参数说明一段很长的参数说明一段很长的参数说明一段很长的参数说明",
      },
    ],
  },
];

const handleAvatarSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

const handleChange = (val: string) => {
  console.log(val);
};
const del = (num: number) => {
  addview.splice(num, 1);
};

const addexplain = () => {
  let obj = addview[0];
  addview.push(obj);
};
const InterParamsRemove = (index: number, paramIndex: number) => {
  addview[index].jkcs.splice(paramIndex, 1);
};
const InterParamsAdd = (index: number) => {
  addview[index].jkcs.push({
    id: 2,
    name: "参数现名称",
    data: "userName",
    type: "字符串",
    sm: "一段很长的参数说明一段很长的参数说明一段很长的参数说明一段很长的参数说明一段很长的参数说明一段很长的参数说明一段很长的参数说明",
  });
};
</script>

<style lang="less" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.zjmingc {
  padding: 0 15px;
}
.dfi {
  display: flex;
  margin-top: 15px;
}
.mrnum {
  margin-right: 150px;
}
.inpwid {
  width: 1340px;
}
.df {
  display: flex;
  margin-top: 10px;
  margin-left: 25px;
}
.cont {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  .cont-bottom {
    background: white;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
  }
  .cont-main {
    margin: 15px 15px 0 15px;
    background: white;
    height: calc(100vh - 120px);
    padding: 15px;
    overflow: scroll;
    :deep(.el-collapse-item__arrow) {
      margin: 0 8px 0 8px;
    }
    .collapseTitle {
      margin-left: 10px;
    }
    .interfaceItems {
      margin-top: 30px;
    }
  }
  .basic {
    display: flex;
    align-items: center;
    .dfc {
      margin-right: 30px;
    }
  }
  .files {
    padding: 0 15px;
    display: flex;
  }
  .addbtn {
    margin-left: 10px;
  }
  .waydiv {
    padding: 0 15px;
  }
  .waylist {
    margin-right: 20px;
  }
  .systm {
    padding: 0 15px;
  }
  .min {
    margin-right: 30px;
  }
  .btn-class {
    background: #267ff6;
    border: none;
    color: white;
    border-radius: 15px;
    line-height: 30px;
    height: 30px;
    width: 100px;
  }
  .wid {
    width: 500px;
  }
  .viewbox {
    width: 100%;
    border: 1px solid #dcdcdc;
    position: relative;
    padding: 30px 10px 10px 10px;
    // margin-bottom: 15px;
    .sptitle {
      position: absolute;
      top: -12px;
      background: white;
      left: 10px;
    }
    .jkming {
      margin-right: 50px;
      padding-left: 12px;
      margin-bottom: 15px;
    }
  }
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
