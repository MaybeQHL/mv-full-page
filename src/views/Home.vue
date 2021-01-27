<template>
  <div class="home">
    <mv-full-page
      :isPointer="true"
      pointerPos="right"
      :isV="isV"
      :pages="4"
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
      <template #page1>
        <div class="page1" style="line-height: 30px">
          <h2>mv-full-page</h2>
          <h3 style="margin-bottom: 10px">一款兼容PC端移动端的Vue滑动组件</h3>
          <h3>动画（可以使用三方动画库或者自己封装）↓</h3>
          <p
            v-animate="{
              name: 'bounceInLeft',
            }"
          >
            页面1 第一个动画
          </p>
          <p
            v-animate="{
              name: 'bounceInLeft',
              delay: 500,
            }"
          >
            页面1 第二个动画
          </p>
          <h3>事件注册和销毁测试↓</h3>
          <div>
            <router-link to="/about">切换页面</router-link>
          </div>
          <h3>移动端局部列表滚动demo↓</h3>
          <div class="sub_scroll-test-box" data-scroll="true">
            <p v-for="item in 99" :key="item">滚动测试数据</p>
          </div>
          <h3>滑动方向↓</h3>
          <div>
            <button @click="isV = !isV">切换滑动方向(默认垂直方向)</button>
          </div>
          <h3>手动切换到具体页码</h3>
          <div>
            <input type="text" v-model="tempPage" />
            <button @click="toPage">切换</button>
          </div>
          <h3>开源资源↓</h3>
          <p>
            <a
              style="color: #f36b91"
              href="https://gitee.com/null_639_5368/v-full-page"
              >码云</a
            >
          </p>
          <p>
            <a
              style="color: #6751c1"
              href="https://www.npmjs.com/package/mv-full-page"
              >npm</a
            >
          </p>
        </div>
      </template>

      <template #page2>
        <div class="page2">
          <p
            class="block"
            style="margin-top: 250px"
            v-animate="{
              name: 'bounceInUp',
            }"
          >
            页面2 第一个动画
          </p>
          <h3>手动切换到具体页码</h3>
          <div>
            <input type="text" v-model="tempPage" />
            <button @click="toPage">切换</button>
          </div>
        </div>
      </template>

      <template #page3>
        <div class="page3">
          <p
            class="block"
            v-animate="{
              name: 'bounceInRight',
            }"
          >
            页面3 第一个动画
          </p>
          <h3>手动切换到具体页码</h3>
          <div>
            <input type="text" v-model="tempPage" />
            <button @click="toPage">切换</button>
          </div>
        </div>
      </template>

      <template #page4>
        <div class="page4">
          4
          <h3>手动切换到具体页码</h3>
          <div>
            <input type="text" v-model="tempPage" />
            <button @click="toPage">切换</button>
          </div>
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
    };
  },
  methods: {
    onRollEnd(page) {
      console.log("当前页面为", page);
    },
    toPage() {
      this.currentPage = this.tempPage;
    },
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
