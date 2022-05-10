<template>
  <el-container>
    <el-aside width="80px" default-active="1">
      <div v-if="checkUserInfo(1)" :class="changenum==1 ?'ui backgr' :'ui'" @click="todevpent">
        <img src="../../assets/img/基本信息节点.png">
        <span>开发模板</span>
      </div>
      <div v-if="checkUserInfo(1)" :class="changenum==2 ?'ui backgr' :'ui'"  @click="tozjzc">
        <img src="../../assets/img/发布部署节点.png">
        <span>组件注册</span>
      </div>
      <div v-if="checkUserInfo(1)" :class="changenum==3 ?'ui backgr' :'ui'" @click="tozjgl">
        <img src="../../assets/img/应用数据节点.png">
        <span>组件管理</span>
      </div>
      <div v-if="checkUserInfo(4)" :class="changenum==3 ?'ui backgr' :'ui'" @click="tozjgl">
        <img src="../../assets/img/应用数据节点.png">
        <span>组件管理</span>
      </div>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
    <div class="xd">
      <div class="xdcl">
        <i class="el-icon-paperclip" @click="look">向导</i>
      </div>
      <div :class="dis == true ? 'xdmain' : 'xdmain displayin'">
        <div class="db">
          <el-steps direction="vertical" :active="1">
            <el-step title="基本信息"></el-step>
            <el-step title="应用场景"></el-step>
            <el-step title="部署要求"></el-step>
            <el-step title="组件上传"></el-step>
            <el-step title="提交申请"></el-step>
          </el-steps>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      dis: false,
      changenum:"1"
    };
  },
  methods: {
    look() {
      this.dis = !this.dis;
    },
    todevpent(){
      this.changenum=1
      this.$router.push('/componentFactory/ComponentModes')
    },
    tozjzc(){
      this.changenum=2
      this.$router.push('/componentFactory/compoentmangement')
    },
    tozjgl(){
      this.changenum=3
      if(window.userId == 4){
        this.$router.push('/componentFactory/componentDevOps')
      }else{
        this.$router.push('/componentFactory/component')
      }
    },
    checkUserInfo(userId){
      if(window.userId == userId){
        return true;
      }
      return false;
    }
  },
  created(){
    if(window.userId == 1){
      this.changenum=1
      this.$router.push('/componentFactory/componentModes')
    }
    if(window.userId == 4){
      this.changenum=4
      this.$router.push('/componentFactory/componentDevOps')
    }
  }
};
</script>

<style lang="less" scoped>
.backgr{
  background: #BAD7FF;
}
.ui{
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  height: 90px;
  cursor: pointer;
  img{
    width: 25px;
  }
  span{
    font-size: 14px;
    margin-top:10px;
  }
}
.displayin {
  display: none;
}
.el-container {
  position: relative;
  .xd {
    position: absolute;
    top: 40px;
    right: 0;
    width: 50px;
    line-height: 40px;
    color: white;
    .xdcl {
      background: #0084f0;
      text-align: center;
      border-radius: 5px 5px 0 0;
      cursor: pointer;
    }
    .xdmain {
      background: white;
      border: 1px solid skyblue;
    }
  }
}
.el-aside {
  background: white;
  height: calc(100vh - 52px);
}
/deep/.el-step.is-vertical{
  justify-content: center;
  flex-wrap: wrap;
}
/deep/.el-step.is-vertical .el-step__title{
  font-size: 14px;
}
</style>>

