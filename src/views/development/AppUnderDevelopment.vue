<template>
  <div class="app-dev">
    <div class="main">
      <img class="icon" src="../../assets/img/应用开发中.png" />
      <div class="title">开发中</div>
      <div class="btn-group">
        <el-button>放 弃</el-button>
        <el-button type="primary">返 回</el-button>
      </div>
      <div class="info">请返回完成所有开发信息。</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.main {
  width: 300px;
  height: calc(100vh - 50px);
  margin: 0px auto;

  .icon {
    width: 150px;
    margin: 75px 75px 30px 75px;
  }

  .title {
    width: 100%;
    text-align: center;
    font-size: 30px;
    color: #414141;
    font-weight: bold;
  }

  .btn-group {
    display: flex;
    margin: 30px;

    .el-button {
      width: 50%;
    }

    :deep(.el-button--default) {
      background: #ffffff;
      border: 1px solid #c2c2c2;
    }
  }

  .info {
    text-align: center;
    color: #878787;
    font-weight: bold;
  }
}
</style>
