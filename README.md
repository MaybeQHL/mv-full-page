# vue-full-page

## 介绍

vue全屏滑动组件(目前仅支持移动端，后续支持PC端) 附带animate动画指令

## 安装

拷贝 components/VFullPage 以及 utils/directives.js

yarn add animate.css

yarn add inobounce

```
// main.js

import 'animate.css'
import directives from './utils/directives'
Vue.use(directives)

```

## 使用方法
```
<v-full-page     :pages="4" // 全屏页面数量
                 :page.sync="currentPage"  // 当前页码
                 :bgArr="bgArr" // 页面背景数组> 
     <template #page1>
        <div class="page1">
          <p v-animate="{
            name:'bounceInLeft'
          }">页面1 第一个动画</p>
          <p v-animate="{
            name:'bounceInLeft',
            delay:1
          }">页面1 第二个动画</p>
        </div>
      </template>
</v-full-page>
```


## 功能点

1.自定义animate动画指令

2.全屏触摸滑动

3.页面切换动画重置

4.支持动画队列式出现

5.解决ios滑动页面回弹


