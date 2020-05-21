# mv-full-page

## 当前版本

<h2>v1.1.2</h2>

## 介绍

vue 全屏滑动组件(移动端、PC 端(鼠标滚轮滑动)都已兼容)

支持局部页面动画 附带示例 demo

注意事项：本组件目前仅支持刷新初始化判断 PC 端和移动端环境、以及元素高度的初始化。

其他：喜欢的帮忙给个star, 只要有时间就更新和优化

## 更新

同安装 yarn add mv-full-page , 尽量更新到最新版本组件。

## 功能点

1. 移动端全屏触摸滑动

2. pc 端鼠标滚轮切换

3. 页面切换动画重置

4. 支持动画队列式出现

5. 解决 ios 滑动页面回弹

6. 扩展：自定义 animate 动画指令

7. 支持水平方向或垂直方向的滚动

8. 支持 ts

9. 支持组件内添加局部滚动（已经处理了微信公众号局部元素滚动回弹的问题）

## 示例

http://null_639_5368.gitee.io/v-full-page/#/

## 码云

https://gitee.com/null_639_5368/v-full-page

## 属性

| name    | 类型    | 默认值 | 备注                                                                                       |
| ------- | ------- | ------ | ------------------------------------------------------------------------------------------ |
| isV     | Boolean | true   | 滚动的方向 true 为垂直方向，false 为左右方向                                               |
| isCache | Boolean | true   | 是否缓存页面                                                                               |
| pages   | Number  | 4      | 页面总数                                                                                   |
| bgArr   | Array   | [ ]    | 默认页面背景 格式 ["pink", "orange", "pink", { isBg:true, src:require('@/assets/....') } ] |
| page    | Number  | 1      | 当前页面                                                                                   |
| data-scroll    | Number  | 1      | 局部滚动一定要在滚动容器添加这个属性`<div data-scroll="true"></div>`                                                                                  |
## 安装

yarn add mv-full-page

yarn add inobounce （禁止屏幕回弹 js 从1.1.2版本开始无需再导入已经集成在插件中)

按需使用动画指令：

拷贝 utils/directives.js

yarn add animate.css

```
// main.js

import 'animate.css'
import directives from './utils/directives'
Vue.use(directives)

```

## 使用方法

```
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
               data-scroll="true"
              >
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

```

```
// vue + typescript
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import MvFullPage from 'mv-full-page'
@Component({
  components: {
    Button
  },
})
export default class Home extends Vue implements MvFullPage {
  currentPage = 1
  bgArr = ['pink', 'orange', 'pink', 'green']
  isV = false
  isCache = false
  pages = 4
  page = 1
}
</script>
```

```
// 全局引入
// main.js
import 'mv-full-page/lib-dist/mv-full-page.css'
import MvFullPage from 'mv-full-page'

Vue.use(MvFullPage)
```
