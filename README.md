# mv-full-page

> 一款兼容PC、移动端(包含微信公众号)的滑动(滚动)组件

[![npm](https://img.shields.io/npm/v/mv-full-page.svg)](https://www.npmjs.com/package/mv-full-page)
[![npm](https://img.shields.io/npm/dt/mv-full-page.svg)](https://www.npmjs.com/package/mv-full-page)
[![npm](https://img.shields.io/bundlephobia/min/mv-full-page.svg)](https://www.npmjs.com/package/mv-full-page)
![NPM](https://img.shields.io/npm/l/mv-full-page)
![npm collaborators](https://img.shields.io/npm/collaborators/mv-full-page)
## NPM

https://www.npmjs.com/package/mv-full-page

## 码云

https://gitee.com/null_639_5368/v-full-page

## 示例

[http://null_639_5368.gitee.io/v-full-page](http://null_639_5368.gitee.io/v-full-page)

## 介绍

vue 全屏滑动组件(移动端、PC 端(鼠标滚轮滑动)都已兼容)

支持局部页面动画 附带示例 demo

注意事项：本组件目前仅支持刷新初始化判断 PC 端和移动端环境、以及元素高度的初始化。

其他：喜欢的帮忙给个 star, 只要有时间就更新和优化


## 功能点

01. 移动端全屏触摸滑动

02. pc 端鼠标滚轮切换

03. 页面切换动画重置

04. 支持动画队列式出现

05. 解决 ios 滑动页面回弹

06. 扩展：自定义 animate 动画指令

07. 支持水平方向或垂直方向的滚动

08. 支持 ts

09. 支持组件内添加局部滚动（已经处理了微信公众号局部元素滚动回弹的问题）

10. 支持自定义滚动容器定位方式和容器大小

11. 指示器切换页面

12. 兼容 IE、Chrome、Firefox

13. 支持自定义过渡动画 

## 属性

> 组件属性

| name       | 类型    | 默认值                                                  | 备注                                                                                                                                                                      |
| ---------- | ------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| position   | String  | "fixed"                                                 | 容器定位模式支持 ['fixed', 'relative'，'static', 'absolute', 'inherit']                                                                                                   |
| width      | String  | "100%"                                                  | 设置滚动容器的宽度                                                                                                                                                        |
| height     | String  | "100%"                                                  | 设置滚动容器的高度                                                                                                                                                        |
| isV        | Boolean | true                                                    | 滚动的方向 true 为垂直方向，false 为左右方向                                                                                                                              |
| isCache    | Boolean | true                                                    | 是否缓存页面                                                                                                                                                              |
| pages      | Number  | 4                                                       | 页面总数                                                                                                                                                                  |
| bgArr      | Array   | [ ]                                                     | 默认页面背景, 设置图片背景请传入{isBg:true, src:require('这里是你的背景图片路径') }}<br>示例格式: ["pink", "orange", "pink", {isBg:true, src:require('@/assets/....') } ] |
| page       | Number  | 1                                                       | 当前页面                                                                                                                                                                  |
| isPointer  | Boolean | true                                                    | 是是否显示指示器                                                                                                                                                          |
| pointerPos | String  | 'right'                                                 | 指示器的位置 ['right', 'left', 'top', 'bottom']                                                                                                                           |
| transition | Object  | {  duration: '700ms',  timingFun: 'ease',  delay: '0s'} | duration = 动画时长(s/ms)  timingFun=动画速度曲线 delay= 动画延迟(s/ms)                                                                                                   |
***
<br>
<br>

> 事件

| name    | 说明           | 回调参数          |
| ------- | -------------- | ----------------- |
| rollEnd | 滚动页面后触发 | page:滚动后的页码 |
<br>
<br>

> 局部滚动 div

| name        | 类型    | 默认值 | 备注                                                                  |
| ----------- | ------- | ------ | --------------------------------------------------------------------- |
| data-scroll | Boolean | false  | 局部滚动一定要在滚动容器添加这个属性 `<div data-scroll="true"></div>` |



## 安装和更新

> 尽量更新到最新版本组件
> 
```
npm i mv-full-page
```

## 注册组件


``` 
// 全局引入
import 'mv-full-page/lib-dist/mv-full-page.css'
import MvFullPage from 'mv-full-page'

Vue.use(MvFullPage)
```
## 具体使用
``` 
<template>
  <div class="home">
    <mv-full-page   
    :isPointer="true"
    pointerPos="right" 
    :isV="isV" 
    :pages="4" 
    :page.sync="currentPage" 
    :bgArr="bgArr" 
    :isCache="false"
    :transition="{
        duration: '700ms', // 动画时长
        timingFun: 'ease', // 动画速度曲线
        delay: '0s', // 动画延迟
      }"
    >
      <template #page1>
        页面1
      </template>

      <template #page2>
        <div class="page2">
         页面2
        </div>
      </template>

      <template #page3>
        <div class="page3">
        页面3
        </div>
      </template>

      <template #page4>
        页面4
      </template>
    </mv-full-page>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      isV: true,
      currentPage: 1,
      bgArr: ["#4FD7F9", "orange", "pink", "green"]
      // bgArr: [{
      //   isBg: true,
      //   src: require('@/assets/....')
      // }, 'orange', 'pink', 'green']
    };
  },
};
</script>

```

``` 
// vue + typescript
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import "mv-full-page/lib-dist/mv-full-page.css";
import MvFullPage from "mv-full-page";

@Component({
  components: {
    MvFullPage
  }
})
export default class extends Vue {
  currentPage = 1;
  bgArr = ["pink", "orange", "pink", "green"];
  isV = false;
  isCache = false;
  pages = 4;
  page = 1;
}
</script>
```
