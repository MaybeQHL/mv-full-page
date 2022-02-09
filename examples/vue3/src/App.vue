<template>
  <div class="home">
    <mv-full-page
      :pages="pages"
      v-model:page="page"
      :config="config"
      @rollEnd="onRollEnd"
      @pointerMouseover="pointerMouseover"
    >
      <template #page1> 1 </template>
      <template #page2> 2 </template>
      <template #page3> 3 </template>
      <template #page4> 4 </template>
    </mv-full-page>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import MPanel from "../../../src/components/MPanel.vue";
// 本地测试组件，实际使用npm i mv-full-page@next 安装后导入
import MvFullPage from "mv-full-page";
import "mv-full-page/dist-lib/style.css";
export default defineComponent({
  components: {
    MPanel,
    MvFullPage,
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
        // 自动播放
        autoPlay: false,
        //  循环播放
        loop: false,
        // 切换间隔
        interval: 1000,
        arrow: {
          // 上一页箭头
          last: true,
          // 下一页箭头
          next: true,
        },
      },
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
  color: orange;
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