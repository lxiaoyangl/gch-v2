<template>
  <div class="cont">
    <div class="main">
      <el-collapse v-model="activeNames" @change="handleChange">
        <!-- 数据存储 -->
        <el-collapse-item name="1">
          <template #title>
            <button class="btn-class">数据存储</button>
            <span>展开</span>
          </template>
          <div class="back">
            <div class="dfc zjmingc">
              <span class="mr10"> 存储路径 : </span>
              <span>
                <el-input v-model="cclj" style="width: 700px; margin-right: 15px"></el-input>
              </span>
              <el-button type="primary">选择路径</el-button>
            </div>
            <div class="back-b dfc mt10">
              <div>
                <span class="mr10">分表存储 :</span>
                <span>
                  <el-select placeholder="按时间、存量、字段" v-model="zero" style="width: 200px"></el-select>
                </span>
              </div>
              <div class="ml20">
                <span>分表存储 :</span>
                <span>
                  <el-select placeholder="选择分库存储方式" v-model="fs" style="width: 200px"></el-select>
                </span>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <!-- 数据配置 -->
        <el-collapse-item name="2">
          <template #title>
            <button class="btn-class">部署要求</button>
            <span>展开</span>
          </template>
          <!-- 应用场景-->
          <el-collapse>
            <el-collapse-item>
              <template #title>
                <span>应用场景</span>
                <i class="el-icon-minus"></i>
                <i class="el-icon-minus"></i>
                <span>展开</span>
              </template>
              <div class="xz">
                <div class="dfc">
                  <el-checkbox label="目标" class="marz"></el-checkbox>
                  <div class="dfc">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <div style="margin: 15px 0"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" disabled>
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="dfc">
                  <el-checkbox label="轨迹" class="marz"></el-checkbox>
                  <div class="dfc">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <div style="margin: 15px 0"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="dfc">
                  <el-checkbox label="通联" class="marz"></el-checkbox>
                  <div class="dfc">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <div style="margin: 15px 0"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="dfc">
                  <el-checkbox label="GIS地图" class="mar"></el-checkbox>
                  <div class="dfc">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <div style="margin: 15px 0"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- 业务数据 -->
          <el-collapse>
            <el-collapse-item>
              <template #title>
                <span> 业务数据 </span>
                <i class="el-icon-minus"></i>
                <i class="el-icon-minus"></i>
                <span> 展开 </span>
              </template>
              <div class="xz">
                <div class="dfc">
                  <el-checkbox label="目标" class="marz"></el-checkbox>
                  <div class="dfc">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <div style="margin: 15px 0"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" disabled>
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="dfc">
                  <el-checkbox label="轨迹" class="marz"></el-checkbox>
                  <div class="dfc">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <div style="margin: 15px 0"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="dfc">
                  <el-checkbox label="通联" class="marz"></el-checkbox>
                  <div class="dfc">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <div style="margin: 15px 0"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="dfc">
                  <el-checkbox label="GIS地图" class="mar"></el-checkbox>
                  <div class="dfc">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <div style="margin: 15px 0"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- 过程数据 -->
          <el-collapse>
            <el-collapse-item>
              <template #title>
                <span> 过程数据 </span>
                <i class="el-icon-minus"></i>
                <i class="el-icon-minus"></i>
                <span> 展开 </span>
              </template>
              <div class="xz">
                <div class="dfc">
                  <el-checkbox label="目标" class="marz"></el-checkbox>
                  <div class="dfc">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <div style="margin: 15px 0"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" disabled>
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="dfc">
                  <el-checkbox label="轨迹" class="marz"></el-checkbox>
                  <div class="dfc">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <div style="margin: 15px 0"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="dfc">
                  <el-checkbox label="通联" class="marz"></el-checkbox>
                  <div class="dfc">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <div style="margin: 15px 0"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="dfc">
                  <el-checkbox label="GIS地图" class="mar"></el-checkbox>
                  <div class="dfc">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <div style="margin: 15px 0"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- 成果数据 -->
          <el-collapse>
            <el-collapse-item name="3">
              <template #title>
                <span> 成果数据 </span>
                <i class="el-icon-minus"></i>
                <i class="el-icon-minus"></i>
                <span> 展开 </span>
              </template>
              <div class="xz">
                <div class="dfc">
                  <el-checkbox label="目标" class="marz"></el-checkbox>
                  <div class="dfc">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <div style="margin: 15px 0"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" disabled>
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="dfc">
                  <el-checkbox label="轨迹" class="marz"></el-checkbox>
                  <div class="dfc">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <div style="margin: 15px 0"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="dfc">
                  <el-checkbox label="通联" class="marz"></el-checkbox>
                  <div class="dfc">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <div style="margin: 15px 0"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="dfc">
                  <el-checkbox label="GIS地图" class="mar"></el-checkbox>
                  <div class="dfc">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <div style="margin: 15px 0"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="cont-bottom">
      <el-button type="primary" @click="next"> 下一步</el-button>
      <el-button type="info" @click="up">上一步</el-button>
      <el-button type="success"><i class="delete el-icon-document-copy"></i> 保存草稿</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const cityOptions = ["类型", "状态", "轨迹", "通联", "经纬度"];
let activeNames = ["1", "2", "3"];
let cclj = "选择存储路径";
let zero = "";
let fs = "";
let checkAll = false;
let checkedCities = ["状态", "轨迹"];
let cities = cityOptions;
let isIndeterminate = true;
const router = useRouter();

const handleChange = (val: string) => {
  console.log(val);
};
const handleCheckAllChange = (val: any) => {
  checkedCities = val ? cityOptions : [];
  isIndeterminate = false;
};
const handleCheckedCitiesChange = (value: string | any[]) => {
  let checkedCount = value.length;
  checkAll = checkedCount === cities.length;
  isIndeterminate = checkedCount > 0 && checkedCount < cities.length;
};
const up = () => {
  router.push("/fidlddata/basic");
};
const next = () => {
  router.push("/fidlddata/flow");
};
</script>

<style lang="less" scoped>
.marz {
  margin-right: 74px;
}
.mar {
  margin-right: 50px;
}
.cont {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .cont-bottom {
    background: white;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
  }
}
.main {
  margin: 0 15px;
  padding: 20px;
  height: calc(100vh - 100px);
  background: white;
  overflow-y: auto;
  .back {
    padding: 0 15px;
  }
  .xz {
    padding: 0 15px;
  }
}
.btn-class {
  background: #267ff6;
  border: none;
  color: white;
  border-radius: 15px;
  line-height: 30px;
  height: 30px;
  width: 100px;
  margin-right: 10px;
}
:deep(.el-collapse-item__arrow) {
  margin: 0 8px 0 8px;
}
</style>
