<template>
  <div class="home">
    <mv-full-page
      :pages="pages"
      v-model:page="page"
      :config="config"
      @rollEnd="onRollEnd"
      @pointerMouseover="pointerMouseover"
    >
      <!-- 动态插槽 -->
      <!-- <template v-slot:[dynamicSlotName+page] v-for="page in pages">
        <div :class="`page${page}`" :key="page">
          {{ `页面${page}` }}
        </div>
      </template>-->
      <!-- 静态插槽 -->
      <template #page1>
        <div class="page1" style="line-height: 30px">
          <h2>mv-full-page</h2>
          <h3 style="margin-bottom: 10px">一款兼容PC端移动端的Vue全屏滚动组件</h3>

          <m-panel title="切换方向">
            <button class="btn btn-s1" @click="switchDire">切换滑动方向(默认垂直方向)</button>
          </m-panel>

          <m-panel title="手动切换到具体页码">
            <input type="text" v-model="tempPage" />
            <p>
              <button class="btn btn-s1" @click="toPage">切换</button>
            </p>
          </m-panel>

          <m-panel title="自动播放">
            时间间隔：
            <input type="text" v-model="config.autoPlay.interval" />
            <button
              class="btn btn-s1"
              @click="
                () => {
                  config.loop = true;
                  config.autoPlay.play = true;
                }
              "
            >开启自动且循环播放</button>
          </m-panel>

          <m-panel title="移动端局部列表滚动demo">
            <div class="sub_scroll-test-box" data-scroll="true">
              <p v-for="item in 99" :key="item">滚动测试数据</p>
            </div>
          </m-panel>
        </div>
      </template>

      <template #page2>
        <div class="page2">2</div>
      </template>

      <template #page3>
        <div class="page3">3</div>
      </template>

      <template #page4>
        <div class="page4">4</div>
      </template>
    </mv-full-page>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import MPanel from "./components/MPanel.vue";
// 本地测试组件，实际使用npm i mv-full-page@next 安装后导入
import MvFullPage from "../lib";

export default defineComponent({
  components: {
    MPanel,
    [MvFullPage.name]: MvFullPage,
  },
  setup() {
    const state = reactive({
      dynamicSlotName: "page",
      pages: 4,
      tempPage: 1,
      page: 1,
      config: {
        direction: "v",
        cache: true,
        bgArr: [
          {
            image:
              "https://dongman-10014144.cos.ap-shanghai.myqcloud.com/demo1.jpg",
          },
          {
            image:
              "https://dongman-10014144.cos.ap-shanghai.myqcloud.com/demo2.jpg",
          },
          {
            image:
              "https://dongman-10014144.cos.ap-shanghai.myqcloud.com/demo3.jpg",
          },
          {
            image:
              "https://dongman-10014144.cos.ap-shanghai.myqcloud.com/demo4.jpg",
          },
        ],
        //  循环播放
        loop: true,
        // 自动轮播
        autoPlay: {
          play: false,
          // 切换间隔
          interval: 1000,
        },

        arrow: {
          // 上一页箭头
          last: true,
          // 下一页箭头
          next: true,
        },
        poi: {
          className: "my-poi",
        },
      } as import("../lib/type").Config,
    });
    const pointerMouseover = ({ event, index }: any) => {
      console.log(event, index);
    };
    const onRollEnd = (page: any) => {
      console.log("当前页面为", page);
    };
    const toPage = () => {
      state.page = state.tempPage;
    };
    const switchDire = () => {
      state.config.direction == "v"
        ? (state.config.direction = "h")
        : (state.config.direction = "v");
    };
    return {
      ...toRefs(state),
      pointerMouseover,
      onRollEnd,
      toPage,
      switchDire,
    };
  },
});
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.home {
  text-align: center;
  color: #ffffff;
  line-height: 30px;
  a {
    color: #ffffff;
  }
  position: relative;
  height: 300px;
}
.block {
  height: 300px;
  width: 200px;
  background: #ff715e;
}
.page2 {
  // position: absolute;
  width: 100%;
  height: 100%;
}
.img-test {
  background: url("~@/assets/logo.png") no-repeat;
  width: 300px;
  height: 300px;
  background-size: cover;
}
.sub_scroll-test-box {
  margin: 0px auto;
  height: 30vw;
  width: 300px;
  border: 1px solid #ff715e;
  color: #ffffff;
  background: #ff715e;
  overflow-y: auto;
  overflow-x: hidden;
}
.color-red {
  color: aquamarine;
}
</style>
<style lang="scss">
input[type="text"] {
  height: 30px;
}
.btn {
  vertical-align: top;
  margin: 10px 15px;
  display: inline-block;
  text-align: center;
  width: auto;
  padding: 0px 30px;
  height: 44px;
  line-height: 44px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  border: none;
}
.btn-s1 {
  transition: 0.5s;
  background-size: 200% auto;
  background-image: linear-gradient(
    to right,
    #84fab0 0%,
    #8fd3f4 51%,
    #84fab0 100%
  );
  &:hover {
    background-position: right center;
  }
}
</style>