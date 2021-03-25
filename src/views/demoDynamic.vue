<template>
  <div class="home">
    <mv-full-page
      :isPointer="true"
      pointerPos="right"
      :isV="isV"
      :pages="list.length"
      :page.sync="page"
      :bgArr="bgArr"
      :isCache="false"
      :transition="{
        duration: '700ms', // 动画时长
        timingFun: 'ease', // 动画速度曲线
        delay: '0s', // 动画延迟
      }"
      @rollEnd="onRollEnd"
    >
      <!-- 动态插槽 -->
      <template
        v-slot:[dynamicSlotName+(index+1)]
        v-for="(item, index) in list"
      >
        <div :class="`page${index + 1}`" :key="index">
          {{ `页面${JSON.stringify(item)}` }}
        </div>
      </template>
    </mv-full-page>
  </div>
</template>

<script>
// 局部导入这里替换这下面的代码
// import 'mv-full-page/lib-dist/mv-full-page.css'
// import MvFullPage from 'mv-full-page'

// 本地测试组件，实际使用npm i mv-full-page 安装后导入
import MvFullPage from "@/components/MvFullPage/index.vue";

export default {
  name: "home",
  components: {
    MvFullPage,
  },
  data() {
    return {
      dynamicSlotName: "page",
      pages: 4,
      tempPage: 1,
      isV: true,
      page: 1,
      bgArr: [
        {
          isBg: true,
          src: require("@/assets/bg_img_1.jpg"),
        },
        {
          isBg: true,
          src: require("@/assets/bg_img_2.jpg"),
        },
        {
          isBg: true,
          src: require("@/assets/bg_img_3.jpg"),
        },
        {
          isBg: true,
          src: require("@/assets/bg_img_4.jpg"),
        },
      ],
      list: [],
    };
  },
  methods: {
    onRollEnd(page) {
      console.log("当前页面为", page);
    },
    toPage() {
      this.page = this.tempPage;
    },
  },
  mounted() {
    // 模拟异步请求
    setTimeout(() => {
      this.list = [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
      ];
    }, 1000);
  },
};
</script>
<style lang="scss" scoped>
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
  height: 200px;
  width: 300px;
  border: 1px solid #ff715e;
  color: #ffffff;
  overflow: auto;
  background: #ff715e;
}
.color-red {
  color: aquamarine;
}
</style>
