<template>
  <el-container>
    <el-aside width="90px" default-active="1">
      <div :class="changenum==1 ?'ui backgr' :'ui'" @click="todevpent" class="resourceMenus">
        <img src="../../assets/img/资源管理.png">
        <span>资源管理</span>
      </div>
<!--      <div :class="changenum==2 ?'ui backgr' :'ui'" @click="tozyz" class="resourceMenus">-->
<!--        <img src="../../assets/img/资源组.png">-->
<!--        <span>资源组</span>-->
<!--      </div>-->
      <div :class="changenum==3 ?'ui backgr' :'ui'"  @click="tozyxj" class="resourceMenus">
        <img src="../../assets/img/新建资源.png">
        <span>新建资源</span>
      </div>
      <div :class="changenum==4 ?'ui backgr' :'ui'"  @click="tozjmx" class="resourceMenus">
        <img src="../../assets/img/资源建模.png">
        <span>资源模型</span>
      </div>
      <div :class="changenum==5 ?'ui backgr' :'ui'"  @click="tozdk" class="resourceMenus">
        <img src="../../assets/img/发布部署节点.png">
        <span>字典库</span>
      </div>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
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
  created() {
    this.todevpent()
  },
  methods: {
    look() {
      this.dis = !this.dis;
    },
    todevpent(){
      this.changenum=1
      this.$router.push('/resource/management')
    },
    tozyz(){
      this.changenum=2
      this.$router.push('/resource/group')
    },
    tozyxj(){
      this.changenum=3
      this.$router.push('/resource/create')
    },

    tozjmx(){
      this.changenum=4
      this.$router.push('/resource/modeling')
    },

    tozdk(){
      this.changenum=5
      this.$router.push('/resource/dictionary')
    }
  },
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
    top: 200px;
    right: 0;
    width: 50px;
    line-height: 40px;
    color: white;
    .xdcl {
      background: #0084f0;
      text-align: center;
      border-radius: 5px 5px 0 0;
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
.resourceMenus{
  cursor: pointer;
}
</style>>
