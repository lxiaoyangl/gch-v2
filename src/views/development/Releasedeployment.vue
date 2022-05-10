<template>
    <div class="deployment">
        <div class="deploymentHeader">
            <div class="deployLog">
                <div style="margin-left:80px;">
                    <img src="../../assets/img/发布日志.png">
                </div>
                <div style="margin-left:45px;">
                    <div style="color: #fff;font-size: 24px;margin-bottom:30px;">【流程处理】 发布中</div>
                    <div style="color: gainsboro;">正在部署：<span>{{deployLog}}</span></div>
                </div>
                <div style="margin-left:380px;">
                    <span style="color:#fff;">已用时：{{useTime}}</span>
                </div>
                <div style="margin-left:30px;">
                    <img src="../../assets/img/发布部署节点.png">
                </div>
            </div>
            <div class="deployProgress">
                <el-progress :text-inside="true" :stroke-width="26" :percentage="percentage"></el-progress>
            </div>
        </div>
        <div class="deploymentCenter">
            <div style="height:75px;line-height:75px;padding-left: 100px;">
                <span style="font-weight: bold;font-size: 18px;">正在处理【处理流程一】 发布 - 组件共 <span style="color:blue;">10</span> 个</span> <span>（发布检查是否存在不匹配的部署设置）</span>
            </div>
            <el-divider></el-divider>
            <div class="deployNode">
                <div class="deployNodeChildren">
                    <div>
                        <img class="deployNodeChildrenImage" src="../../assets/img/基本信息节点.png">
                        <div class="deployComplete">完成</div>
                    </div>
                </div>
                <div class="deployNodeChildren">
                    <div>
                        <img class="deployNodeChildrenImage" src="../../assets/img/应用数据节点.png">
                        <div class="deployComplete">完成</div>
                    </div>
                </div>
                <div class="deployNodeChildren">
                    <div>
                        <img class="deployNodeChildrenImage" src="../../assets/img/处理流程节点.png">
                        <div class="deployRuning">正在部署...</div>
                    </div>
                </div>
                <div class="deployNodeChildren">
                    <div>
                        <img class="deployNodeChildrenImage" src="../../assets/img/可视化设计节点.png">
                        <div class="waiteDeploy">待部署</div>
                    </div>
                </div>
                <div class="deployNodeChildren">
                    <div>
                        <img class="deployNodeChildrenImage" src="../../assets/img/发布部署节点.png">
                        <div class="waiteDeploy">待部署</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data() {
        return {
            deployLog: '流程处理一 \\ 译码组件 \\ 运行环境 \\ 系统检查中......',
            useTime: '',
            useTimeH: 0,
            useTimeM: 0,
            useTimeS: 0,
            percentage: 0
        }
    },
    methods: {
        deployLogFunc(){
            let that = this;
            let ind = 0;
            window.setInterval(function(){
                if(ind % 3 == 0){
                    that.deployLog = '流程处理一 \\ 解码组件 \\ 运行环境 \\ 系统检查中......'
                }
                if(ind % 3 == 1){
                    that.deployLog = '流程处理二 \\ 资源规划 \\ 运行环境 \\ 系统检查中......'
                }
                if(ind % 3 == 2){
                    that.deployLog = '流程处理三 \\ 译码组件 \\ 运行环境 \\ 系统检查中......'
                }
                
                ind++;

                //计算用时
                that.useTimeS = ind % 60;
                if(that.useTimeS == 0){
                    that.useTimeM++;
                }
                if(that.useTimeM == 60){
                    that.useTimeM = 0;
                    that.useTimeH++;
                }
                that.useTime = (that.useTimeH < 10 ? '0'+that.useTimeH : that.useTimeH) + ':' 
                             + (that.useTimeM < 10 ? '0'+that.useTimeM : that.useTimeM) + ':'
                             + (that.useTimeS < 10 ? '0'+that.useTimeS : that.useTimeS);
                   
                //每秒进度涨1
                that.percentage++;
                if(that.percentage == 100){
                    that.percentage = 0;
                }

            }, 1000)
        }
    },
    created(){
        this.deployLogFunc();
    }
};
</script>

<style lang="less" scoped>
    .deployment{
        width: 100%;
        height: 100%;
        padding: 0 15px 0 15px;
        .deploymentHeader{
            height: 215px;
            .deployLog{
                height:195px;
                background: url('../../assets/img/发布部署背景.png');
                display: flex;
                align-items: center;
            }
        }
        .deploymentCenter{
            background-color: #fff;
            height: calc(100vh - 280px);
            /deep/.el-divider--horizontal{
                margin: 0 0 0px 0;
                height: 5px;
            }
            .deployNode{
                margin-top: 65px;
                display: flex;
                .deployNodeChildren{
                    margin-left: 120px;
                    text-align: center;
                    .deployNodeChildrenImage{
                        margin-bottom: 25px;
                    }
                    .deployComplete{
                        background: #1818ab;
                        border-radius: 20px;
                        height: 25px;
                        line-height: 25px;
                        width: 70px;
                        color: #fff;
                    }
                    .deployRuning{
                        color:#3333ca;
                    }
                    .waiteDeploy{
                        background: #80808d;
                        border-radius: 20px;
                        height: 25px;
                        line-height: 25px;
                        width: 70px;
                        color: rgb(211, 202, 202);
                    }
                }
            }

        }
    }
</style>