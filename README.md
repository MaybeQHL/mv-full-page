
<h1 style="text-align:center;">mv-full-page</h1>
<p align="center">
 兼容PC、移动端(微信公众号) 全屏滚动组件
</p>
<p align="center">
 喜欢的帮忙给个 star, 只要有时间就更新和优化
</p>

 <p align="center" >
    <img src="https://img.shields.io/npm/v/mv-full-page/next?style=flat-square" alt="npm version"  style="margin-right:5px;" />
    <img src="https://img.shields.io/npm/dt/mv-full-page.svg?style=flat-square&color=#4fc08d" alt="downloads" style="margin-right:5px;"   />
    <img src="https://img.shields.io/jsdelivr/npm/hm/mv-full-page@next?style=flat-square" alt="Jsdelivr Hits" style="margin-right:5px;"  >

  <img src="https://img.shields.io/github/stars/maybeQHL/mv-full-page?style=flat-square&logo=GitHub" alt="star" style="margin-right:5px;"  >
   <img src="https://gitee.com/null_639_5368/v-full-page/badge/star.svg?style=flat-square" alt="star">
</p>

## 安装
```
npm i mv-full-page@next
```
或
```
yarn add mv-full-page@next
```

## 全局注册

``` 
import { createApp } from 'vue';
import MvFullPage from 'mv-full-page'
import 'mv-full-page/dist-lib/style.css'

const app = createApp();

app.use(MvFullPage);
```
## 局部注册
```
import { defineComponent } from "vue";
import MvFullPage from 'mv-full-page'
import 'mv-full-page/dist-lib/style.css'

export default defineComponent({
    components:{
        MvFullPage
    }
});
```
## 示例代码
### 基本使用

[跳转](https://gitee.com/null_639_5368/v-full-page/blob/vue3/src/App.vue)

### 动态插槽
```
   <mv-full-page   
    :pages="list.length"
    :v-model:page="page" 
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
```
## 演示

[Demo](http://null_639_5368.gitee.io/v-full-page)


## 功能点

*  移动端触摸滑动

*  pc端鼠标滚轮切换

*  支持页面缓存

*  解决 ios 滑动页面回弹

*  支持滚动方向切换

*  支持局部滚动（处理了微信公众号局部元素滚动回弹的问题）

*  支持自定义滚动容器定位方式和容器大小

*  指示器切换页面

*  支持自定义过渡动画速度

*  支持响应式窗口大小改变

*  支持动态插槽

*  支持 typescript

## Props

| name                 | 类型   | 默认值 | 备注       |
| -------------------- | ------ | ------ | ---------- |
| pages                | Number | 1      | 页面总数   |
| page: `v-model:page` | Number | 1      | 当前页面   |
| config               | Object | -      | 详情见配置 |

### 配置
```
{
        /**
         * 定位模式
         */
        position: "fixed",
        /**
         * 自定义容器宽度
         */
        width: "100%",
        /**
         * 自定义容器高度
         */
        height: "100%",
        /**
         *  v => 垂直方向 ， h => 水平方向
         */
        direction: "h",
        /**
         * 指示器
         */
        poi: {
          /**
           * 显示指示器
           */
          pointer: true,
          /**
           * 指示器位置
           */
          position: "right",
          /**
           * 指示器类名
           */
          className: ""
        },
        /**
         * 缓存页面
         */
        cache: true,
        /**
         * 页面背景数组
         * 示例格式: [{ color:'pink' },{ image:'https://xxx.png' }]
         */
        bgArr: [],
        /**
         * 自定义过渡动画
         */
        transition: {
          duration: "1000ms", // 动画时长
          timingFun: "ease", // 动画速度曲线
          delay: "0s", // 动画延迟
        },
        // 自动播放
        autoPlay: false,
        //  循环播放
        loop: false,
        // 切换间隔
        interval: 1000,
        arrow: {
          // 上一页箭头
          last: false,
          // 下一页箭头
          next: false,
        },
}
```

***

### Events

| name             | 说明                            | 回调参数                              |
| ---------------- | ------------------------------- | ------------------------------------- |
| rollEnd          | 滚动页面后触发                  | `(page:滚动后的页码)`                 |
| pointerMouseover | 指示器mouseover事件和指示器索引 | `({event:事件,index:指示器对应索引})` |
<br>

### 局部滚动 div

| name        | 类型    | 默认值 | 备注                                                                  |
| ----------- | ------- | ------ | --------------------------------------------------------------------- |
| data-scroll | Boolean | false  | 局部滚动一定要在滚动容器添加这个属性 `<div data-scroll="true"></div>` |


## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="42px" height="42px" />](https://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="42px" height="42px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="42px" height="42px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="42px" height="42px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge                                                                                                                                                                                                        | last 2 versions                                                                                                                                                                                                    | last 2 versions                                                                                                                                                                                                | last 2 versions                                                                                                                                                                                                |
