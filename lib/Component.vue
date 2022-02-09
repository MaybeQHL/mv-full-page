<template>
  <div
    class="mv-page-container"
    :style="{
      position: config.position,
      height: config.height,
      width: config.width,
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
      <template v-for="(item, index) in pagesArr" :key="index">
        <div
          class="page"
          :class="{ floatLeft: !(config.direction == 'v') }"
          :style="{
            height: fullHeight + 'px',
            width: fullWidth + 'px',
            'background-color':
              config.bgArr[index] && config.bgArr[index].color,
            'background-image':
              config.bgArr[index].image && `url(${config.bgArr[index].image})`,
          }"
          :ref="`page${item.page}`"
        >
          <template v-if="config.cache">
            <div class="page-box" v-show="item.isShow">
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
      :class="config.poiPosition"
      v-if="config.pointer"
    >
      <ul :class="isPc && 'hover'">
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
      v-if="config.arrow.last && page > 1"
      @click="toPage('last')"
    ></div>
    <div
      class="next-arrow iconfont icon-jiantouxia"
      v-if="config.arrow.next && page < pages"
      @click="toPage('next')"
    ></div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  PropType,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import throttle from "lodash/throttle";
import { Config } from "./type";
import { addEvent, eventPath, isFireFox, isMoile, removeEvent } from "./utils";
import inobounce from "./libs/inobounce";

export default defineComponent({
  name: "MvFullPage",
  components: {},
  props: {
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
  },
  setup(props, { emit }) {
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
    });

    const allPageRef = ref();
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
        direction: "h",
        /**
         * 显示指示器
         */
        pointer: true,
        /**
         * 指示器位置
         */
        poiPosition: "right",
        /**
         * 缓存页面
         */
        cache: true,
        /**
         * 页面背景数组
         * 示例格式: ["pink", "orange", "pink", {bg:true, src:require('@/assets/....') } ]
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
      };
      const reConfig = Object.assign(baseConfig, props.config);
      return reConfig;
    });

    const toPage = (type: any) => {
      if (type == "last") {
        emit("update:page", props.page - 1);
      }
      if (type == "next") {
        emit("update:page", props.page + 1);
      }
    };
    const pointerMouseover = (event: any, index: any) => {
      emit("pointerMouseover", {
        event,
        index,
      });
    };
    const initAutoPlay = () => {
      state.playInterval = setInterval(() => {
        if (props.page < props.pages && state.isForward) {
          emit("update:page", props.page + 1);
        } else if (config.value.loop) {
          if (props.page > 1) {
            state.isForward = false;
            emit("update:page", props.page - 1);
          } else {
            state.isForward = true;
            emit("update:page", props.page + 1);
          }
        } else {
          stopAutoPlay();
        }
      }, config.value.interval || 1000);
    };

    const stopAutoPlay = () => {
      clearInterval(state.playInterval);
      state.playInterval = null;
      state.isForward = true;
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
     * 根据偏移量开始滚动
     */
    const startRoll = (offset: any) => {
      let transformBind = `translate${
        config.value.direction == "v" ? "Y" : "X"
      }(${offset}px)`;
      allPageRef.value.style.transform = transformBind;
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
      if (state.isRock) return;
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
      // 初始化内部容器高度
      allPageRef.value.style.height = state.fullHeight * props.pages + "px";
      // 初始化内部容器宽度
      allPageRef.value.style.width = state.fullWidth * props.pages + "px";
    };
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
    const pcRoll = (e: any) => {
      if (state.isRock) return;
      //#region 解决鼠标滚轮冲突
      // 获取事件冒泡路径
      /**
       * @type {HTMLElement}
       */
      let scrollEl;
      let path = eventPath(e);
      let isSubScroll = Array.from(path).some((el: any) => {
        if (el.dataset && el.dataset.scroll == "true") {
          scrollEl = el;
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
      let self = this;
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
      let self = this;
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
      // console.log('触摸结束')
      if (state.isRock || config.value.autoPlay) return;
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

    const rollPage = (page: number, isStatic?: boolean) => {
      const self = this;
      if (allPageRef.value && state.fullHeight > 0 && state.fullWidth > 0) {
        let offset = -(
          (page - 1) *
          (config.value.direction == "v" ? state.fullHeight : state.fullWidth)
        );
        if (isStatic) {
          allPageRef.value.style.transitionProperty = "none";
        }
        let transformBind = `translate${
          config.value.direction == "v" ? "Y" : "X"
        }(${offset}px)`;
        allPageRef.value.style.transform = transformBind;
        if (isStatic) {
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
          };
          allPageRef.value.addEventListener("transitionend", eventFn);
        }
      }
    };

    /**
     * 切换页面
     * @param   {Boolean} forward 滑动方向 前进方向 true  后退方向 false
     * @author   maybe
     */
    const switchPage = (forward = true) => {
      // debugger;
      if (allPageRef.value) {
        if (forward && props.page < props.pages) {
          emit("update:page", props.page + 1);
        } else if (!forward && props.page > 1) {
          emit("update:page", props.page - 1);
        }
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

    watch(
      () => props.page,
      (val) => {
        // 是否需要重置位置（避免页面显示错误的过渡动画）
        if (state.isInitTranslate) {
          startRoll(0);
          state.isInitTranslate = false;
          // 用setTimeout进入异步队列避免还没重置位置就提前解除过渡动画锁定
          setTimeout(() => {
            allPageRef.value.classList.remove("transition-clear");
          }, 1);
          return;
        }
        nextTick(() => {
          // 设置当前页面为可视页面
          state.pagesArr[props.page - 1].isShow = true;
          // 动画切换页面
          if (!state.isInitPage) {
            state.isInitPage = true;
            rollPage(val, true);
            return;
          }
          rollPage(val);
        });
      },
      {
        immediate: true,
      }
    );

    watch(
      () => props.pages,
      (val) => {
        if (!props.pages || props.pages <= 0) {
          return;
        }
        state.pagesArr.length = 0;
        for (let index = 0; index < props.pages; index++) {
          state.pagesArr.push({
            page: index + 1,
            isShow: index == 0 ? true : false,
          });
        }
        // 初始化设置页面1为可视页面
        state.pagesArr[0].isShow = true;
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
          return;
        }
        // 初始化切换页面
        emit("update:page", 1);
      },
      {
        immediate: true,
      }
    );

    watch(
      () => config.value.autoPlay,
      (val) => {
        if (val) {
          nextTick(() => {
            initAutoPlay();
          });
        } else {
          stopAutoPlay();
        }
      },
      {
        immediate: true,
      }
    );

    onMounted(() => {
      init();
    });
    onBeforeUnmount(() => {
      // 销毁页面事件
      removePageListener();
      window.removeEventListener("resize", resizeWin);
      stopAutoPlay();
      console.log("销毁页面事件成功");
    });
    return {
      ...toRefs(state),
      config,
      allPageRef,
      outContainerRef,
      pointerClick,
      pointerMouseover,
      toPage,
    };
  },
});
</script>


<style scoped lang="scss">
@import url("./iconfont/iconfont.css");
.mv-page-container {
  position: fixed;
  top: 0px;
  left: 0px;
  // width: 100%;
  // height: 100%;
  background: #ffffff;
  overflow: hidden;
  .mv-all-page {
    width: 100%;
    transform: translateY(0px);
    -webkit-overflow-scrolling: touch;
    // transition: all 700ms ease 0s;
    transition-property: none;
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
    box-sizing: border-box;
    list-style: none;
    width: 15px;
    height: 15px;
    border: 2px solid transparent;
    border-radius: 50%;
    background-color: #fff;
    vertical-align: middle;
    cursor: pointer;
    transition: all 0.2s;
    &.active {
      border: 2px solid #fff;
      background-color: #00a1d6;
      transform: scale(1.3);
    }
  }
}
.hover li:hover {
  border: 2px solid #fff;
  background-color: #00a1d6;
  transform: scale(1.3);
}
.transition-clear {
  transition: none !important;
}
.last-arrow,
.next-arrow {
  opacity: 0.8;
  cursor: pointer;
  font-size: 50px;
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
@keyframes upAnime {
  0% {
    transform: translateX(-50%) translateY(0);
  }
  25% {
    transform: translateX(-50%) translateY(-10%);
  }
  50% {
    transform: translateX(-50%) translateY(-25%);
  }
  75% {
    transform: translateX(-50%) translateY(-15%);
  }
  100% {
    transform: translateX(-50%) translateY(0);
  }
}
@keyframes downAnime {
  0% {
    transform: translateX(-50%) translateY(0);
  }
  25% {
    transform: translateX(-50%) translateY(10%);
  }
  50% {
    transform: translateX(-50%) translateY(25%);
  }
  75% {
    transform: translateX(-50%) translateY(15%);
  }
  100% {
    transform: translateX(-50%) translateY(0);
  }
}
</style>
