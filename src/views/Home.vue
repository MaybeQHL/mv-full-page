<template>
  <div class="home">
    <v-full-page :isV="true"
                 :pages="4"
                 :page.sync="currentPage"
                 :bgArr="bgArr"
                 :isCache="false">
      <template #page1>
        <div class="page1">
          <h2> mv-full-page</h2>
          <p v-animate="{
            name:'bounceInLeft'
          }">页面1 第一个动画</p>
          <p v-animate="{
            name:'bounceInLeft',
            delay:1
          }">页面1 第二个动画</p>
          <!-- <div class="img-test"></div> -->
          <div class="sub_scroll-test-box"
               data-scroll="true">
            <p v-for="item in 99">滚动测试数据</p>
          </div>
        </div>
      </template>

      <template #page2>
        <div class="page2">
          <p class="block"
             style="margin-top:250px;"
             v-animate="{
            name:'bounceInUp'
          }">页面2 第一个动画</p>
        </div>
      </template>

      <template #page3>
        <div class="page3">
          <p class="block"
             v-animate="{
            name:'bounceInRight'
          }">页面3 第一个动画</p>
        </div>
      </template>

      <template #page4>
        <div class="page4">4</div>
      </template>
    </v-full-page>
  </div>
</template>

<script>
// 局部导入这里替换这下面的代码
// import 'mv-full-page/lib-dist/mv-full-page.css'
// import MvFullPage from 'mv-full-page'

// test
import VFullPage from "@/components/VFullPage/index.vue";

export default {
  name: "home",
  components: {
    VFullPage
  },
  data () {
    return {
      currentPage: 1,
      bgArr: ["pink", "orange", "pink", "green"],
      // bgArr: [{
      //   isBg: true,
      //   src: require('@/assets/....')
      // }, 'orange', 'pink', 'green']
    };
  }
};
</script>
<style lang="scss" scoped>
.block {
  height: 300px;
  width: 200px;
  background: red;
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
  height: 300px;
  width: 300px;
  border: 1px solid red;
  overflow: auto;
}
</style>
