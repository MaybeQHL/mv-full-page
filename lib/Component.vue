<template>
  <div
    class="mv-page-container"
    :style="{
      position: config.position,
      width: '100%',
      height: '100%'
    }"
    ref="outContainerRef"
  >
    <div
      class="mv-all-page"
      ref="allPageRef"
      :style="{
        'transition-duration': config.transition.duration,
        'transition-timing-function': config.transition.timingFun,
        'transition-delay': config.transition.delay,
      }"
    >
      <template v-for="(item, index) in state.pagesArr" :key="index">
        <div
          class="page"
          :class="{ floatLeft: !(config.direction == 'v') }"
          :style="{
            height: state.fullHeight + 'px',
            width: state.fullWidth + 'px',
            'background-color':
              config.bgArr[index] && config.bgArr[index].color,
          }"
          :ref="`page${item.page}`"
          :data-num="index + 1"
        >
          <img
            class="page-bg-img"
            v-if="config.bgArr[index] && config.bgArr[index].image"
            :src="`${config.bgArr[index].image}`"
            :style="{ 'object-fit': config.bgConfig.fit }"
            @load="imgLoad(index + 1)"
          />
          <template v-if="config.cache">
            <div class="page-box">
              <slot :name="`page${item.page}`" :data="item"></slot>
            </div>
          </template>
          <template v-else>
            <div class="page-box" v-show="page == item.page">
              <slot :name="`page${item.page}`" :data="item"></slot>
            </div>
          </template>
        </div>
      </template>
    </div>
    <div
      class="mv-pointer-wrapper"
      v-if="config.poi.pointer"
      :class="[config.poi.position, config.poi.className]"
    >
      <ul :class="state.isPc && 'hover'">
        <li
          :class="{ active: page == index }"
          @click.stop="pointerClick(index)"
          v-for="index in pages"
          :key="index"
          @mouseover="pointerMouseover($event, index)"
        ></li>
      </ul>
    </div>
    <div
      class="last-arrow iconfont icon-jiantoushang"
      v-if="config.arrow.last"
      @click="toPage('last')"
    ></div>
    <div
      class="next-arrow iconfont icon-jiantouxia"
      v-if="config.arrow.next"
      @click="toPage('next')"
    ></div>
  </div>
</template>
<script setup lang="ts">
import {
  computed,
  PropType,
  reactive,
  ref,
  nextTick,
  watch,
  onBeforeUnmount,
  onMounted,
  toRefs
} from "vue";
import throttle from "lodash/throttle";
import merge from "lodash/merge";
import { Config } from "../types/type";
import { addEvent, eventPath, isFireFox, isMoile, removeEvent } from "./utils";
import inobounce from "./libs/inobounce";


const props = defineProps({
  /**
    * 页面总数
    */
  pages: {
    type: Number,
    default: 1,
  },
  /**
   * 当前页面
   */
  page: {
    type: Number,
    default: 1,
  },
  /**
   * 额外配置
   */
  config: {
    type: Object as PropType<Config>,
  },
})

const emit = defineEmits(['pointerMouseover', 'update:page', 'rollEnd']);

const state = reactive({
  pagesArr: [] as any[],
  isPc: false, // 默认 移动端
  fullHeight: 0, // 全屏高度
  fullWidth: 0, // 全屏宽度
  maxY: 0,
  maxX: 0,
  startY: 0,
  endY: 0,
  startX: 0,
  endX: 0,
  currentPage: 1, // 当前页面页码
  isRock: false, // 是否锁定页面避免多次触发出现bug
  isUp: false, // 是否向上滑动
  subScrollEl: null as any, // 触发源为内部滚动子元素dom
  wheelEventName: null as any, // 不同浏览器环境下滚轮事件名称
  isInitTranslate: false, // 是否初始化位置
  playInterval: null as any,
  isForward: true,
  isInitPage: false, // 已经初始化页面
  autoPlayFinished: false, // 自动播放完成（非loop模式轮播一次）
});

const allPageRef = ref<any>();
const outContainerRef = ref();
const config = computed<Config>(() => {
  const baseConfig = {
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
    direction: "v",
    poi: {
      /**
       * 显示指示器
       */
      pointer: true,
      /**
       * 指示器位置
       */
      position: "right",
    },
    /**
     * 缓存页面
     */
    cache: true,
    /**
     * 页面背景数组
     * @example [{color:'green',image:'http://...'}]
     */
    bgArr: [],
    /**
     * 背景图片属性配置
     */
    bgConfig: {
      fit: "cover",
    },
    /**
     * 自定义过渡动画
     */
    transition: {
      duration: "1000ms", // 动画时长
      timingFun: "ease", // 动画速度曲线
      delay: "0s", // 动画延迟
    },
    //  循环播放
    loop: false,
    arrow: {
      // 上一页箭头
      last: false,
      // 下一页箭头
      next: false,
    },
    // 自动播放
    autoPlay: {
      play: false,
      // 切换间隔
      interval: 1000,
    },
  };
  const reConfig = merge(baseConfig, props.config);
  return reConfig;
});

/**
 * 箭头移动页面
 * @param type
 */
const toPage = (type: "last" | "next") => {
  if (!preCheck()) return;
  if (type == "last") {
    switchPage(false);
  }
  if (type == "next") {
    switchPage(true);
  }
};
const pointerMouseover = (event: any, index: any) => {
  emit("pointerMouseover", {
    event,
    index,
  });
};
/**
 * 自动轮播
 */
const startAutoPlay = () => {
  setTimeout(() => {
    switchPage(true);
  }, config.value.autoPlay.interval);
};

/**
 * 监听页面动画结束
 */
const addPageTransEndListener = (fn: any) => {
  const eventFn = () => {
    fn();
    allPageRef.value.removeEventListener("transitionend", eventFn);
  };
  allPageRef.value.addEventListener("transitionend", eventFn);
};
/**
 * 根据偏移量移动页面
 */
const movePageByOffset = (offset = 0, quiet = false) => {
  quiet && setQuiet(true);
  allPageRef.value;
  let transformBind = `translate${config.value.direction == "v" ? "Y" : "X"
    }(${offset}px)`;
  allPageRef.value.style.transform = transformBind;
  quiet &&
    setTimeout(() => {
      setQuiet(false);
    }, 500);
};

const resizeWin = throttle(() => {
  // 初始化页面宽高
  initPageWH();
}, 500);

/**
 * 指示器点击
 * @param index
 */
const pointerClick = (index: any) => {
  // console.log(state.isRock);
  if (!preCheck()) return;
  movePage(index, true);
  emit("update:page", index);
};
/**
 * 初始化容器宽高
 */
const initPageWH = () => {
  // 获取外部容器高度
  state.fullHeight = outContainerRef.value.clientHeight;
  // 获取外部容器宽度
  state.fullWidth = outContainerRef.value.clientWidth;
  // 设置最大滑动高度
  state.maxY = props.pages * state.fullHeight;
  // 设置最大滑动宽度
  state.maxX = props.pages * state.fullWidth;

};
const initContainer = () => {
  // 初始化内部容器高度
  // allPageRef.value.style.height = state.fullHeight * props.pages + "px";
  allPageRef.value.style.height = (allPageRef.value as HTMLElement).querySelectorAll('.page').length * state.fullHeight + 'px'
  // 初始化内部容器宽度
  // allPageRef.value.style.width = state.fullWidth * props.pages + "px";
  allPageRef.value.style.width = (allPageRef.value as HTMLElement).querySelectorAll('.page').length * state.fullWidth + 'px'
}
const initPageListener = () => {
  if (!state.isPc) {
    allPageRef.value.addEventListener("touchstart", pageStart, false);
    allPageRef.value.addEventListener("touchmove", pageMove, false);
    allPageRef.value.addEventListener("touchend", pageEnd, false);
  } else {
    // pc端鼠标滚轮事件监听 使用函数防抖解决滚动多次触发问题
    // 判断不同浏览器环境下滚轮事件名称
    state.wheelEventName = isFireFox() ? "DOMMouseScroll" : "mousewheel";
    addEvent(allPageRef.value, state.wheelEventName, pcRoll);
  }
};
const removePageListener = () => {
  if (!state.isPc) {
    // 解除滚动禁用
    inobounce.disable();
    allPageRef.value.removeEventListener("touchstart", pageStart);
    allPageRef.value.removeEventListener("touchmove", pageMove);
    allPageRef.value.removeEventListener("touchend", pageEnd);
  } else {
    removeEvent(allPageRef.value, state.wheelEventName, pcRoll);
  }
};
/**
 * 页面切换前验证
 */
const preCheck = () => {

  if (
    state.isRock ||
    (config.value.autoPlay.play && !state.autoPlayFinished)
  ) {
    return false;
  }


  return true;
};
const pcRoll = (e: any) => {
  if (!preCheck()) return;
  //#region 解决鼠标滚轮冲突
  // 获取事件冒泡路径
  /**
   * @type {HTMLElement}
   */

  let path = eventPath(e);
  let isSubScroll = Array.from(path).some((el: any) => {
    if (el.dataset && el.dataset.scroll == "true") {
      return true;
    }
    return false;
  });
  // 如果是子元素滚动直接终止父元素滚动
  if (isSubScroll) {
    return;
  }
  //#endregion
  // 判断是否达到滚动条件
  if (e.deltaY > 0 || e.detail > 0 || e.wheelDelta < 0) {
    // console.log("滚动下");
    switchPage(true);
  } else {
    switchPage(false);
    // console.log("滚动上");
  }
};
const pageStart = (e: any) => {

  console.log(e);
  let path = eventPath(e);
  // 判断是否是子元素滚动
  path.forEach((el: any) => {
    if (el.dataset && el.dataset.scroll == "true") {
      // 保存子元素实例
      state.subScrollEl = el;
    }
    // console.log(el)
  });
  if (state.subScrollEl) {
    // console.log('处理子元素滚动');
    inobounce.disable();
  } else {
    // console.log('处理插件滚动');
    inobounce.enable();
  }
  // console.log('触摸开始')
  state.startY = e.changedTouches[0].pageY;
  state.startX = e.changedTouches[0].pageX;
  // console.log(e.changedTouches[0].pageY, e.changedTouches[0].pageX)
};
const pageMove = (e: any) => {

  // console.log('触摸移动中...')
  if (
    state.subScrollEl &&
    state.subScrollEl.scrollTop == 0 &&
    e.changedTouches[0].pageY - state.startY > 0
  ) {
    // 子元素顶部向下滑动禁用回弹
    inobounce.enable();
  }
};
const pageEnd = (e: any) => {
  if (!preCheck()) return;
  // console.log('触摸结束')
  if (state.isRock) return;
  // // 判断是否是子元素滚动
  if (state.subScrollEl) {
    state.subScrollEl = null;
    inobounce.enable();
    // console.log('子元素滚动结束')
    return;
  }
  // 滑动逻辑
  if (config.value.direction == "v") {
    if (e.changedTouches[0].pageY - state.startY < -50) {
      state.startY = 0;
      switchPage(true);
    } else if (e.changedTouches[0].pageY - state.startY > 50) {
      state.startY = 0;
      switchPage(false);
    }
  } else {
    if (e.changedTouches[0].pageX - state.startX < -50) {
      state.startX = 0;
      switchPage(true);
    } else if (e.changedTouches[0].pageX - state.startX > 50) {
      state.startX = 0;
      switchPage(false);
    }
  }
};
/**
 * 页面移动
 * @param page 页码
 * @param quiet 静态移动(没有过渡动画)
 * @param delayPage 延迟移动页面（通常为loop服务）
 */
const movePage = (page: number, quiet?: boolean, delayPage?: number) => {
  if (allPageRef.value && state.fullHeight > 0 && state.fullWidth > 0) {
    // debugger;
    let offset = -(
      page *
      (config.value.direction == "v" ? state.fullHeight : state.fullWidth)
    );
    if (quiet) {
      allPageRef.value.style.transitionProperty = "none";
    }
    let transformBind = `translate${config.value.direction == "v" ? "Y" : "X"
      }(${offset}px)`;
    allPageRef.value.style.transform = transformBind;

    if (quiet) {
      // debugger;
      setTimeout(() => {
        allPageRef.value.style.transitionProperty = "transform";
      }, 1);
    } else {
      state.isRock = true;
      const eventFn = () => {
        state.isRock = false; // 解除锁定
        emit("rollEnd", props.page);
        allPageRef.value.removeEventListener("transitionend", eventFn);
        // 延迟跳转页面（loop）
        if (delayPage && delayPage > 0) {
          movePage(delayPage, true);
        }
        // debugger;
        // 自动轮播
        if (config.value.autoPlay.play) {
          if (config.value.loop) {
            startAutoPlay();
          } else if (props.page < props.pages && !state.autoPlayFinished) {
            startAutoPlay();
          } else {
            state.autoPlayFinished = true;
          }
        }
      };
      allPageRef.value.addEventListener("transitionend", eventFn);
    }
  }
};

/**
 * 切换页面
 * @param   {Boolean} forward 滑动方向 前进方向 true  后退方向 false
 * @param   {Boolean} quiet 是否静默移动
 * @author   maybe
 */
const switchPage = (forward = true, quiet = false) => {
  if (allPageRef.value) {
    let targetPage;
    let delayPage;
    if (forward) {
      targetPage = props.page + 1;
      delayPage = props.page == props.pages && 1;
    } else {
      targetPage = props.page - 1;
      delayPage = props.page == 1 && props.pages;
    }
    if (delayPage) {
      movePage(targetPage, quiet, delayPage);
      emit("update:page", delayPage);
      return;
    }

    movePage(targetPage, quiet);
    emit("update:page", targetPage);
  }
};
const setQuiet = (quiet = true) => {
  const container = allPageRef.value as HTMLElement;

  if (quiet) {
    container.classList.add("transition-clear");
  } else {
    container.classList.remove("transition-clear");
  }
};
const initLoop = () => {
  const container = allPageRef.value as HTMLElement;
  if (container.firstChild && container.lastChild) {
    const pageFirst = container.querySelector(
      ".page[data-num = '1']"
    ) as HTMLElement;

    const pageLast = container.querySelector(
      `.page[data-num = '${props.pages}']`
    ) as HTMLDivElement;

    const pageFirstClone = pageFirst.cloneNode(true);
    const pageLastClone = pageLast.cloneNode(true);

    container.append(pageFirstClone);
    container.prepend(pageLastClone);
    // console.log(container.firstChild, container.lastChild);
  }
};
const init = () => {
  state.isPc = !isMoile();
  if (!state.isPc) {
    console.log("当前mv-full-page运行环境为: 移动端");
    // 由于安卓微信公众号也存在类似问题，现全平台开启滚动禁用
    inobounce.enable();
  } else {
    console.log("当前mv-full-page运行环境为: PC端");
  }

  // 初始化页面宽高
  initPageWH();
  // 初始化页面滑动事件
  initPageListener();
  // 响应窗口大小
  window.addEventListener("resize", resizeWin);

};

const goPage = (page: number, quiet?: boolean) => {
  movePage(page, quiet)
}

let loadedImgCount = 0;
const imgLoad = (page: number) => {
  loadedImgCount += 1;
  if (loadedImgCount == props.pages && config.value.autoPlay.play) {
    console.log(`全部背景图片初始化完成`)
    setTimeout(() => {
      // 初始化自动播放
      startAutoPlay();
    }, config.value.autoPlay.interval);
  }
}

watch(
  () => props.page,
  (val: number) => {
    nextTick(() => {
      // 初始化页面
      if (!state.isInitPage) {
        // movePage(val, true);
        const offset = -(val * state.fullHeight);
        movePageByOffset(offset, true);
        state.isInitPage = true;
        return;
      }
    });
  },
  {
    immediate: true,
  }
);

watch(
  () => props.pages,
  (val: number) => {
    if (!props.pages || props.pages <= 0) {
      return;
    }
    state.pagesArr.length = 0;
    for (let index = 0; index < props.pages; index++) {
      state.pagesArr.push({
        page: index + 1
      });
    }
    // 如果当前页码大于1重置位置（避免页面显示错误的过渡动画）
    if (props.page > 1 && state.isInitPage) {
      // 页面数改变标识
      allPageRef.value &&
        allPageRef.value.classList.add("transition-clear");
      state.isInitTranslate = true;
    }

    if (!state.isInitPage) {
      // 初始化切换页面
      emit("update:page", props.page);
    } else {
      // 初始化切换页面
      emit("update:page", 1);
    }

    nextTick(() => {
      nextTick(() => {
        // 初始化loop
        initLoop();
        // 初始化容器高度
        initContainer();
      });
    });
  },
  {
    immediate: true,
  }
);

watch(() => config.value.direction, (val) => {
  nextTick(() => {
    const container = allPageRef.value as HTMLElement;
    if (val == 'h') {
      movePageByOffset(-state.fullWidth, true)
      container.querySelectorAll('.page').forEach(item => {
        item.classList.add('floatLeft');
      })
    } else {
      movePageByOffset(-state.fullHeight, true)
      container.querySelectorAll('.page').forEach(item => {
        item.classList.remove('floatLeft');
      })
    }
  })
}, {
  immediate: true
})

watch(
  () => config.value.autoPlay.play,
  (val) => {
    if (val) {
      nextTick(() => {
        startAutoPlay();
      });
    }
  },
  {
    immediate: false,
  }
);

// 向外暴露的方法和变量
defineExpose({
  goPage
})

onMounted(() => {
  init();
});
onBeforeUnmount(() => {
  // 销毁页面事件
  removePageListener();
  window.removeEventListener("resize", resizeWin);
  console.log("销毁页面事件成功");
});


</script>
<script lang="ts">
export default {
  name: 'MvFullPage'
}
</script>


<style scoped lang="scss">
@import url("./iconfont/iconfont.css");
@import url("./anime.css");
* {
  margin: 0;
  padding: 0;
}
.mv-page-container {
  position: fixed;
  top: 0px;
  left: 0px;
  // width: 100%;
  // height: 100%;
  background: #ffffff;
  overflow: hidden;
  .mv-all-page {
    width: auto;
    height: auto;
    transform: translateY(0px);
    -webkit-overflow-scrolling: touch;
    // transition: all 700ms ease 0s;
    transition-property: transform;
    transition-duration: 700ms;
    transition-timing-function: ease;
    transition-delay: 0s;
  }
  .page {
    z-index: 11;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    background-size: cover;
  }
  .page-box {
    position: absolute;
    height: 100%;
    width: 100%;
  }
}
.floatLeft {
  float: left;
}
.mv-pointer-wrapper {
  position: fixed;
  &.right {
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    li {
      display: block;
      margin: 10px 0px;
    }
  }
  &.left {
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    li {
      display: block;
      margin: 10px 0px;
    }
  }
  &.top {
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    li {
      display: inline-block;
      margin: 0px 10px;
    }
  }

  &.bottom {
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    li {
      display: inline-block;
      margin: 0px 10px;
    }
  }

  ul > li {
    display: inline-block;
    width: 15px;
    height: 12px;
    margin: 0 3px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.4);
    overflow: hidden;
    cursor: pointer;
    transition: height 0.3s;
    &.active {
      height: 30px;
      background-color: #fff;
    }
  }
}
.hover li:hover {
  background-color: #6bd1f3;
}
.transition-clear {
  transition: none !important;
}
.last-arrow,
.next-arrow {
  opacity: 0.8;
  cursor: pointer;
  font-size: 50px;
  color: #fff;
}
.last-arrow {
  z-index: 99;
  position: absolute;
  top: 3%;
  left: 50%;
  transform: translateX(-50%);
  // width: 10vw;
  // height: 10vw;
  animation: upAnime linear 2s infinite;
}

.next-arrow {
  z-index: 99;
  position: absolute;
  bottom: 3%;
  left: 50%;
  transform: translateX(-50%);
  // width: 10vw;
  // height: 10vw;

  animation: downAnime linear 2s infinite;
}

.page-bg-img {
  z-index: -1;
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: "cover";
}
</style>
