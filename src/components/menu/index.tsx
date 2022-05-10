import { defineComponent, ref, computed, reactive } from "vue";
import { Ref } from "vue";
import { Routes } from "../../router/router";
import { useRouter } from "vue-router";
import userRouteList from "../../router/user";
import devRouteList from "../../router/developer";
export default defineComponent({
  name: "Menu",
  setup() {
    let defaultActive: Ref<string> = ref("");
    let routeList = reactive<Routes[]>([]);

    let flag = sessionStorage.getItem("user");
    if (flag == "user2") {
      routeList = userRouteList;
    } else if (flag == "user1") {
      routeList = devRouteList;
    }
    console.log(routeList);

    defaultActive = computed(() => {
      let activeNav = localStorage.getItem("activeNav") || routeList[0].path;
      if (activeNav) {
        return activeNav;
      } else {
        return "";
      }
    });
    const handleSelect = (key: string) => {
      localStorage.setItem("activeNav", key);
    };

    return () => (
      <>
        <el-menu
          default-active={defaultActive}
          class="title-menu"
          background-color="#252E3F"
          text-color="#909399"
          active-text-color="#fff"
          router={true}
          mode="horizontal"
          onSelect={handleSelect}
        >
          {routeList.map((item: Routes) => (
            <el-menu-item key={item.path}>
              <el-icon>
                <component class="icon" is={item.mate?.icon}></component>
              </el-icon>
              <el-link to={item.path}>{item.mate?.title}</el-link>
            </el-menu-item>
          ))}
          {/* <el-menu-item v-for="(item, i) in routeList" index={item.path} :route="item.path">
          <span style="display: flex; align-items: center">
            <el-icon :class="icons(item)"></el-icon>
            {{ item.mate?.title }}
          </span>
        </el-menu-item> */}
        </el-menu>
      </>
    );
  },
});
