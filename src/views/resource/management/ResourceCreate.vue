<template>
  <div class="cont">
    <div class="cont-main">
      <el-collapse v-model="activeNames" @change="handleChange">
        <!-- 填写基本信息 -->
        <el-collapse-item name="1">
          <template slot="title">
            <button class="btn-class">选择资源</button>
            <span class="collapseTitle">展开</span>
          </template>
          <div class="basic">
            <div class="dfc zjmingc">
              <span> 资源类型：</span>
              <span>
                <el-select size="mini" v-model="value" placeholder="选择资源类型">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </span>
            </div>
          </div>
        </el-collapse-item>
        <!-- 填写基本信息 -->
        <el-collapse-item name="2">
          <template slot="title">
            <button class="btn-class">填写基本信息</button>
            <span class="collapseTitle">展开</span>
          </template>
          <div class="basic">
            <div class="dfc zjmingc">
              <span> 资源名称：</span>
              <span>
                <el-input size="small" v-model="comname"></el-input>
              </span>
            </div>
            
            <div class="dfc">
              <span>ip号： </span>
              <span>
                <el-input v-model="comversions" size="small"></el-input>
              </span>
            </div>
            <div class="dfc">
              <span>端口号：</span>
              <span>
                <el-input
                  v-model="comdescribe"
                  size="small"
                ></el-input>
              </span>
            </div>
            <div class="dfc">
              <span>内存：</span>
              <span>
                <el-input
                  v-model="comdescribe"
                  size="small"
                ></el-input>
              </span>
            </div>
            <div class="dfc">
              <span>磁盘：</span>
              <span>
                <el-input
                  v-model="comdescribe"
                  size="small"
                ></el-input>
              </span>
            </div>
          </div>
        </el-collapse-item>
        <!-- 配置参数 -->
        <el-collapse-item name="3">
          <template slot="title">
            <button class="btn-class">配置参数</button>
            <span class="collapseTitle">展开</span>
          </template>
          <div class="basic config" style="flex-wrap: wrap;">
            <div class="dfc">
              <span>信号类型： </span>
              <span>
                <el-select size="mini" v-model="value" placeholder="选择资源类型">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </span>
            </div>
            <div class="dfc">
              <span>载波类型： </span>
              <span>
                <el-select size="mini" v-model="value" placeholder="选择载波类型">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </span>
            </div>
            <div class="dfc">
              <span>阶段数： </span>
              <span>
                <el-input v-model="comversions" size="small"></el-input>
              </span>
            </div>
            <div class="dfc">
              <span>正反谱：</span>
              <span>
                <el-input
                  v-model="comdescribe"
                  size="small"
                ></el-input>
              </span>
            </div>
            <div class="dfc">
              <span>调制方式：</span>
              <span>
                <el-select size="mini" v-model="value" placeholder="选择调制方式">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </span>
            </div>
            <div class="dfc">
              <span>载波频率：</span>
              <span>
                <el-input
                  v-model="comdescribe"
                  size="small"
                ></el-input>
              </span>
            </div>
            <div class="dfc">
              <span>调制速率：</span>
              <span>
                <el-input
                  v-model="comdescribe"
                  size="small"
                ></el-input>
              </span>
            </div>
          </div>
        </el-collapse-item>
        <!-- 部署要求 -->
        <el-collapse-item name="4">
          <template slot="title">
            <button class="btn-class">资源调用</button>
            <span class="collapseTitle">展开</span>
          </template>
          <!-- 运行配置 -->
          <el-collaps>
            <el-collapse-item name="4-1">
              <template slot="title">
                <el-divider direction="vertical"></el-divider>
                <span>运行配置</span>
                <i class="el-icon-minus"></i>
                <i class="el-icon-minus"></i>
                <span class="collapseTitle">展开</span>
              </template>
              <div class="dfc systm">
                <div class="dfc">
                  <div class="dfc min">
                    <span>最大实列数：</span>
                    <span><el-input v-model="cp" size="small"></el-input></span>
                  </div>
                  <div class="dfc min">
                    <span>运行时间限制：</span>
                    <span><el-input v-model="cp" size="small"></el-input></span>
                  </div>
                  <div class="dfc min">
                    <span>单机线程并发数：</span>
                    <span
                      ><el-input v-model="cpu" size="small"></el-input
                    ></span>
                  </div>
                  
                </div>
              </div>
            </el-collapse-item>
          </el-collaps>
          <!-- 重试配置 -->
          <el-collaps>
            <el-collapse-item name="4-2">
              <template slot="title">
                  <el-divider direction="vertical"></el-divider>
                <span>重试配置</span>
                <i class="el-icon-minus"></i>
                <i class="el-icon-minus"></i>
                <span class="collapseTitle">展开</span>
              </template>
              <div class="dfc systm">
                <div class="dfc">
                  <div class="dfc min">
                    <span>Instance次数：</span>
                    <span><el-input v-model="cp" size="small"></el-input></span>
                  </div>
                  <div class="dfc min">
                    <span>Task次数：</span>
                    <span><el-input v-model="cp" size="small"></el-input></span>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collaps>
          <!-- 机器配置 -->
          <el-collaps>
            <el-collapse-item name="4-3">
              <template slot="title">
                  <el-divider direction="vertical"></el-divider>
                <span> 机器配置 </span>
                <i class="el-icon-minus"></i>
                <i class="el-icon-minus"></i>
                <span class="collapseTitle"> 展开 </span>
              </template>
              <div class="dfc waydiv">
                <div class="dfc waylist">
                  <span> 最低CPU核心数：</span>
                  <span>
                    <el-input v-model="cp" size="small"></el-input>
                  </span>
                </div>
                <div class="dfc waylist">
                  <span>最低内存：</span>
                  <span>
                    <el-input v-model="cp" size="small"></el-input>
                  </span>
                </div>
                <div class="dfc waylist">
                  <span>最低磁盘空间：</span>
                  <span>
                    <el-input v-model="cp" size="small"></el-input>
                  </span>
                </div>
              </div>
            </el-collapse-item>
          </el-collaps>
          <!-- 集群配置 -->
          <el-collaps>
            <el-collapse-item name="4-4">
              <template slot="title">
                  <el-divider direction="vertical"></el-divider>
                <span> 集群配置 </span>
                <i class="el-icon-minus"></i>
                <i class="el-icon-minus"></i>
                <span class="collapseTitle"> 展开 </span>
              </template>
              <div class="dfc waydiv">
                <div class="dfc waylist">
                  <span> 执行机器地址：</span>
                  <span>
                    <el-input v-model="cp" size="small"></el-input>
                  </span>
                </div>
                <div class="dfc waylist">
                  <span>最大执行机器数：</span>
                  <span>
                    <el-input v-model="cp" size="small"></el-input>
                  </span>
                </div>
              </div>
            </el-collapse-item>
          </el-collaps>
          <!-- 报警配置 -->
          <el-collaps>
            <el-collapse-item name="4-5">
              <template slot="title">
                  <el-divider direction="vertical"></el-divider>
                <span> 报警配置 </span>
                <i class="el-icon-minus"></i>
                <i class="el-icon-minus"></i>
                <span class="collapseTitle"> 展开 </span>
              </template>
              <div class="dfc waydiv">
                <div class="dfc waylist">
                  <span> 报警通知人员：</span>
                  <span>
                    <el-select v-model="cp" size="small"></el-select>
                  </span>
                </div>
              </div>
            </el-collapse-item>
          </el-collaps>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="cont-bottom">
      <el-button type="primary" size="small"><i class="el-icon-s-promotion"></i> 确定</el-button>
      <el-button type="success" size="small"><i class="delete el-icon-document-copy"></i> 保存草稿</el-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  directives: {},

  data() {
    return {
      activeNames: ["1","2","3","4","5"],
      comname: "",
      comversions: "20321342",
      comdescribe: "组件描述",
      scene: "应用场景描述",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      system: "",
      internal: "",
      cpu: "",
      cp: "",
      slway: "",
      dyway: "",
      addview: [
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
      ],
    };
  },

  mounted() {},

  methods: {
    handleChange(val) {
      console.log(val);
    },
    del(num) {
      this.addview.splice(num, 1);
    },

    addexplain() {
      let obj = this.addview[0];
      this.addview.push(obj);
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    InterParamsRemove(index, paramIndex){
      this.addview[index].jkcs.splice(paramIndex, 1);
    },
    InterParamsAdd(index){
      this.addview[index].jkcs.push({
        id: 2,
        name: "参数现名称",
        data: "userName",
        type: "字符串",
        sm: "一段很长的参数说明一段很长的参数说明一段很长的参数说明一段很长的参数说明一段很长的参数说明一段很长的参数说明一段很长的参数说明",
      })
    }
  },
};
</script>

<style lang="less" scoped>
.zjmingc {
  padding: 0 15px;
}
.dfi {
  display: flex;
  margin-top: 15px;
}
.mrnum {
  margin-right: 30px;
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
    /deep/.el-collapse-item__arrow{
      margin: 0 8px 0 8px;
    }
    .collapseTitle{
      margin-left: 10px;
    }
    .interfaceItems{
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
  .config{
    .dfc {
      margin-top: 10px;
      padding-right: 15px;
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
  /deep/.el-divider--vertical{
      width: 5px;
      background: cornflowerblue;
  }
}
</style>