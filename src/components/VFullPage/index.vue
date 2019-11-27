<template>
  <!-- 全屏滚动组件 -->
  <div class="full-page-wrapper"
       ref="fullPage">
    <div class="all-page"
         ref="allPage">
      <template v-for="(item,index) in pagesArr">
        <div class="page"
             :key="index"
             :id="`page-${item.page}`"
             :data-index="item.page"
             :style="{
               height:fullHeight+'px',
              'background-color':!bgArr[index].isBg?bgArr[index]:'',
              'background-image':bgArr[index].isBg?`url(${bgArr[index].src})`:''
              }
             "
             :ref="`page${item}`">
          <template v-if="isCache">
            <div class="page-box"
                 v-if="item.isShow">
              <slot :name="`page${item.page}`"></slot>
            </div>
          </template>
          <template v-else>
            <div class="page-box"
                 v-if="currentPage == item.page">
              <slot :name="`page${item.page}`"></slot>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
/**
 * @description vue全屏滚动组件(支持PC端和移动端)
 * @author maybe 
 * @warn 转载请注明出处 https://gitee.com/null_639_5368/v-full-page
 */
// 禁止IOS回弹库
import inobounce from 'inobounce'
import { debounce } from './utils'
export default {
  name: 'VFullPage',
  props: {
    // 是否缓存页面
    isCache: {
      type: Boolean,
      default: true
    },
    // 页面总数
    pages: {
      type: Number,
      default: 4
    },
    // 当前页面
    page: {
      type: Number,
      default: 1
    },
    // 默认页面背景
    bgArr: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data () {
    return {
      pagesArr: [],
      isPc: false, // 默认 移动端
      fullHeight: 800,
      maxY: 0,
      startY: 0,
      endY: 0,
      currentPage: 1,  // 当前页面页码
      isRoll: false,  // 是否可以开始滚动
      isUp: false,   // 是否向上滑动
    };
  },
  computed: {
  },
  created () {
    this.isPc = this.isPCFn();
    if (!this.isPc) {
      // let isIos = this.isIOS();
      // if (isIos) {
      //   inobounce.enable()
      // }
      // 由于安卓微信公众号也存在类似问题，现全平台开启滚动禁用
      inobounce.enable()
    }
    this.pagesArr.length = 0;
    for (let index = 0; index < this.pages; index++) {
      this.pagesArr.push({
        page: index + 1,
        isShow: index == 0 ? true : false
      })
    }
  },
  mounted () {
    // 获取全屏高度
    this.fullHeight = this.$refs.fullPage.clientHeight;
    // 设置最大滑动高度
    this.maxY = this.pages * this.fullHeight;
    // 初始化容器高度
    this.$refs.allPage.style.height = this.fullHeight * this.pages + 'px';
    // 初始化页面滑动事件
    this.initPageListener();
  },
  watch: {
    page: {
      handler: function (val) {
        this.currentPage = val;
        this.$nextTick(() => {
          this.rollPage(-((val - 1) * this.fullHeight));
        })
      },
      immediate: true
    },
    currentPage (value) {
      this.$emit('update:page', value)
    }
  },
  methods: {
    /**
     * 判断是否是ios系统
     */
    isIOS () {
      let u = navigator.userAgent
      if (u.indexOf('iPhone') > -1) {
        return true;
      }
      return false;
    },
    /**
     * 判断是否是PC端
     */
    isPCFn () {
      var userAgentInfo = navigator.userAgent;
      var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    initPageListener () {
      if (!this.isPc) {
        document.addEventListener('touchstart', this.pageStart, false)
        document.addEventListener('touchmove', this.pageMove, false)
        document.addEventListener('touchend', this.pageEnd, false)
      } else {
        // pc端鼠标滚轮事件监听 使用函数防抖解决滚动多次触发问题
        window.onmousewheel = document.onmousewheel = debounce(this.pcRoll, 100, true);//IE/Opera/Chrome
      }
    },
    pcRoll (e) {
      if (e.deltaY > 0) {
        console.log('滚动下')
        this.switchPage(true);
      } else {
        this.switchPage(false);
        console.log('滚动上')
      }
    },
    removePageListener () {
      document.removeEventListener('touchstart');
      document.removeEventListener('touchmove');
      document.removeEventListener('touchend');
    },
    pageStart (e) {
      console.log('触摸开始')
      this.startY = e.changedTouches[0].pageY
      console.log(e.changedTouches[0].pageY)
    },
    pageMove () {
      console.log('触摸移动中...')
    },
    pageEnd (e) {
      console.log('触摸结束');
      // 滑动逻辑
      if ((e.changedTouches[0].pageY - this.startY) < -50) {
        this.startY = null;
        this.switchPage(true);
      } else if ((e.changedTouches[0].pageY - this.startY) > 50) {
        this.startY = null;
        this.switchPage(false);
      }
    },
    rollPage (rollY) {
      this.$refs.allPage.style.transform = `translateY(${rollY}px)`;
    },
    /**
     * 切换页面
     * @param   {Boolean} isDown 滑动方向 默认向下滑动 true  向上滑动 false
     * @author   maybe
     */
    switchPage (isDown = true) {
      if (this.$refs.allPage && !this.isRoll) {
        let rollY;
        if (isDown && this.currentPage < this.pages) {
          this.isRoll = true;
          // 向下翻页
          // 设置下一页为可视
          this.pagesArr[(this.currentPage + 1) - 1].isShow = true;
          rollY = -(this.currentPage * this.fullHeight);
          // 页面开始滑动
          this.$refs.allPage.style.transform = `translateY(${rollY}px)`;
          let self = this;
          let rollTransitionend = () => {
            setTimeout(() => {
              console.log('解除滑动限制')
              self.isRoll = false;
            }, 100)
            self.currentPage++
            this.$refs.allPage.removeEventListener('transitionend', rollTransitionend)
          }
          this.$refs.allPage.addEventListener('transitionend', rollTransitionend)
        } else if (!isDown && this.currentPage > 1) {
          this.isRoll = true;
          // 向上翻页
          rollY = -((this.currentPage - 1) * this.fullHeight) + this.fullHeight;
          // 页面开始滑动
          this.$refs.allPage.style.transform = `translateY(${rollY}px)`;
          let self = this;
          let rollTransitionend = () => {
            setTimeout(() => {
              console.log('解除滑动限制')
              self.isRoll = false;
            }, 100)
            self.currentPage--;
            this.$refs.allPage.removeEventListener('transitionend', rollTransitionend)
          }
          this.$refs.allPage.addEventListener('transitionend', rollTransitionend)
        }
      }
    }
  },
  destroyed () {
    if (!this.isPc) {
      // 解除滚动禁用
      inobounce.disable()
      // 销毁页面滑动事件
      this.removePageListener();
    } else {
      window.onmousewheel = document.onmousewheel = null;
    }
  }
};
</script>

<style scoped lang="scss">
.full-page-wrapper {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #cccccc;
  overflow: hidden;
  .all-page {
    width: 100%;
    transform: translateY(0px);
    transition: transform 0.6s linear;
    -webkit-overflow-scrolling: touch;
  }
  .page {
    z-index: 11;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
  }
  .page-box {
    position: absolute;
    height: 100%;
    width: 100%;
  }
}
</style>
