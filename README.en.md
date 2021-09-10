# mv-full-page

> A sliding (rolling) component compatible with PC and mobile terminal (including WeChat public number)

[![npm](https://img.shields.io/npm/v/mv-full-page.svg)](https://www.npmjs.com/package/mv-full-page)
[![npm](https://img.shields.io/npm/dt/mv-full-page.svg)](https://www.npmjs.com/package/mv-full-page)
[![npm](https://img.shields.io/bundlephobia/min/mv-full-page.svg)](https://www.npmjs.com/package/mv-full-page)
![NPM](https://img.shields.io/npm/l/mv-full-page)
![npm collaborators](https://img.shields.io/npm/collaborators/mv-full-page)
## NPM

https://www.npmjs.com/package/mv-full-page

## gitee

https://gitee.com/null_639_5368/v-full-page

## demo

[http://null_639_5368.gitee.io/v-full-page](http://null_639_5368.gitee.io/v-full-page)

## introduce

Vue full-screen sliding component (mobile terminal, PC (mouse wheel sliding) are compatible)
Support partial page animation with sample demo
Note: This component currently only supports refresh initialization to determine the PC and mobile environments, and the height of the element initialization.
Others: If you like it, give it a STAR, and update and optimize it as long as there is time


## The function point

01. Full-screen touch sliding on the mobile terminal
02. Switch the mouse wheel on PC
03. Page switch animation reset
04. Support animated queue appearance
05. Solve iOS sliding page rebound
06. Extension: Customize the animate animation directive
07. Horizontal or vertical scrolling is supported
08. Support for ts
09. Support to add local scrolling within the component (WeChat public account has dealt with the issue of local element scrolling rebound)
10. Support custom scrolling container positioning and container size
11. Indicator switch page
12. Compatible with IE, Chrome and Firefox
13. Support custom transition animation
14. Support for responsive window size resizing
## attribute

> Component attributes

| name       | type    | default                                                 | reamark                                                                                                                                                                                                          |
| ---------- | ------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| position   | String  | "fixed"                                                 | Container location mode support ['fixed', 'relative'，'static', 'absolute', 'inherit']                                                                                                                           |
| width      | String  | "100%"                                                  | Sets the width of the scroll container                                                                                                                                                                           |
| height     | String  | "100%"                                                  | Sets the height of the scroll container                                                                                                                                                                          |
| isV        | Boolean | true                                                    | Direction of roll  true vertical ，false horizontal                                                                                                                                                              |
| isCache    | Boolean | true                                                    | cache page                                                                                                                                                                                                       |
| pages      | Number  | 4                                                       | total pages                                                                                                                                                                                                      |
| bgArr      | Array   | [ ]                                                     | Default page background, set picture background please pass in {isBg:true, src:require('Here is your background image path') }}<br>demo: ["pink", "orange", "pink", {isBg:true, src:require('@/assets/....') } ] |
| page       | Number  | 1                                                       | The current page                                                                                                                                                                                                 |
| isPointer  | Boolean | true                                                    | Display or not indicator                                                                                                                                                                                         |
| pointerPos | String  | 'right'                                                 | Indicator position ['right', 'left', 'top', 'bottom']                                                                                                                                                            |
| transition | Object  | {  duration: '700ms',  timingFun: 'ease',  delay: '0s'} | duration = Animation duration(s/ms)  timingFun=Animation speed curve delay= Animation delay(s/ms)|
| config | Object | {autoPlay: false,  loop:  false,  interval: 1000} |  autoPlay = automatic playback, loop = whether looping, interval = time interval|
<br>
<br>

> event

| name    | explain                            | callback parameter           |
| ------- | ---------------------------------- | ---------------------------- |
| rollEnd | Triggered after scrolling the page | page: Scroll the page number |
| pointerMouseover | pointer mouseover event and pointer index |{event:event,page:pointer index}|
<br>
<br>

> Local rolling div

| name        | type    | default | remark                                                                                             |
| ----------- | ------- | ------- | -------------------------------------------------------------------------------------------------- |
| data-scroll | Boolean | false   | Local scrolling must add this property to the scrolling container `<div data-scroll="true"></div>` |


## Installation and Updates

> Try to update to the latest version of the component
> 
```
npm i mv-full-page
```

## register

``` 
// Introduced the global
import 'mv-full-page/lib-dist/mv-full-page.css'
import MvFullPage from 'mv-full-page'

Vue.use(MvFullPage)
```
## use
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
        duration: '700ms',
        timingFun: 'ease', 
        delay: '0s',
      }"
    >
      <template #page1>
        page1
      </template>

      <template #page2>
        <div class="page2">
         page2
        </div>
      </template>

      <template #page3>
        <div class="page3">
        page3
        </div>
      </template>

      <template #page4>
        page4
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
  }
};
</script>

```

### dynamic slot Demo

``` 
<template>
  <div class="home">
    <mv-full-page   
    :isPointer="true"
    pointerPos="right" 
    :isV="isV" 
    :pages="list.length"
    :page.sync="currentPage" 
    :bgArr="bgArr" 
    :isCache="false"
    :transition="{
        duration: '700ms', // 动画时长
        timingFun: 'ease', // 动画速度曲线
        delay: '0s', // 动画延迟
      }"
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
export default {
  components: {
  },
  data() {
    return {
      dynamicSlotName: "page",
      pages:4,
      isV: true,
      currentPage: 1,
      bgArr: ["#4FD7F9", "orange", "pink", "green"]
      // bgArr: [{
      //   isBg: true,
      //   src: require('@/assets/....')
      // }, 'orange', 'pink', 'green']
      list: [],
    };
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

```
### vue + typescript
``` 
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
