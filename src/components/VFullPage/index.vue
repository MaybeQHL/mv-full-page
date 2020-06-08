<template>
  <!-- 全屏滚动组件 -->
  <div class="full-page-wrapper"
       ref="fullPage">
    <div class="all-page"
         ref="allPage">
      <template v-for="(item, index) in pagesArr">
        <div class="page"
             :class="{ floatLeft: !isV }"
             :key="index"
             :id="`page-${item.page}`"
             :data-index="item.page"
             :style="{
            height: fullHeight + 'px',
            width: fullWidth + 'px',
            'background-color': !bgArr[index].isBg ? bgArr[index] : '',
            'background-image': bgArr[index].isBg
              ? `url(${bgArr[index].src})`
              : '',
          }"
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
import inobounce from './inobounce'
import { debounce, throttle } from './utils'
export default {
  name: 'MvFullPage',
  props: {
    // 滚动的方向 true为垂直方向，false为左右方向
    isV: {
      type: Boolean,
      default: true,
    },
    // 是否缓存页面
    isCache: {
      type: Boolean,
      default: true,
    },
    // 页面总数
    pages: {
      type: Number,
      default: 4,
    },
    // 当前页面
    page: {
      type: Number,
      default: 1,
    },
    // 默认页面背景
    bgArr: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  data () {
    return {
      pagesArr: [],
      isPc: false, // 默认 移动端
      fullHeight: 800, // 全屏高度
      fullWidth: 1920, // 全屏宽度
      maxY: 0,
      maxX: 0,
      startY: 0,
      endY: 0,
      startX: 0,
      endX: 0,
      currentPage: 1, // 当前页面页码
      isRoll: false, // 是否可以开始滚动
      isUp: false, // 是否向上滑动
      subScrollEl: null // 触发源为内部滚动子元素dom
    }
  },
  computed: {},
  created () {
    this.isPc = this.isPCFn()
    if (!this.isPc) {
      console.log('当前mv-full-page运行环境为: 移动端')
      // let isIos = this.isIOS();
      // if (isIos) {
      //   inobounce.enable()
      // }
      // 由于安卓微信公众号也存在类似问题，现全平台开启滚动禁用
      inobounce.enable()
    } else {
      console.log('当前mv-full-page运行环境为: PC端')
    }
    this.pagesArr.length = 0
    for (let index = 0; index < this.pages; index++) {
      this.pagesArr.push({
        page: index + 1,
        isShow: index == 0 ? true : false,
      })
    }
  },
  mounted () {
    // 禁止回弹
    // stopDrop();
    // 初始化页面宽高
    this.initPageWH();
    // 初始化页面滑动事件
    this.initPageListener()
    // PC端监听窗口大小变化
    // if (this.isPc) {
    //   window.onresize = throttle(this.initPageWH, 100)
    // }
  },
  watch: {
    page: {
      handler: function (val) {
        this.currentPage = val
        // 动态切换到具体页面
        this.$nextTick(() => {
          let rollOffset = -(
            (val - 1) *
            (this.isV ? this.fullHeight : this.fullWidth)
          )
          this.rollPage(rollOffset)
        })
      },
      immediate: true,
    },
    currentPage (value) {
      this.$emit('update:page', value)
    },
  },
  methods: {
    /**
     * 判断是否是ios系统
     */
    isIOS () {
      let u = navigator.userAgent
      if (u.indexOf('iPhone') > -1) {
        return true
      }
      return false
    },
    /**
     * 判断是否是PC端
     */
    isPCFn () {
      var userAgentInfo = navigator.userAgent
      var Agents = [
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPad',
        'iPod',
      ]
      var flag = true
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false
          break
        }
      }
      return flag
    },
    // 初始化容器宽高
    initPageWH () {
      // 获取全屏高度
      this.fullHeight = this.$refs.fullPage.clientHeight
      // 获取全屏宽度
      this.fullWidth = this.$refs.fullPage.clientWidth
      // 设置最大滑动高度
      this.maxY = this.pages * this.fullHeight
      // 设置最大滑动宽度
      this.maxX = this.pages * this.fullWidth
      // 初始化容器高度
      this.$refs.allPage.style.height = this.fullHeight * this.pages + 'px'
      // 初始化容器宽度
      this.$refs.allPage.style.width = this.fullWidth * this.pages + 'px'
    },
    initPageListener () {
      if (!this.isPc) {
        this.$refs.allPage.addEventListener('touchstart', this.pageStart, false)
        this.$refs.allPage.addEventListener('touchmove', this.pageMove, false)
        this.$refs.allPage.addEventListener('touchend', this.pageEnd, false)
      } else {
        // pc端鼠标滚轮事件监听 使用函数防抖解决滚动多次触发问题
        window.onmousewheel = document.onmousewheel = debounce(
          this.pcRoll,
          100,
          true
        ) //IE/Opera/Chrome
      }
    },
    pcRoll (e) {
      if (e.deltaY > 0) {
        console.log('滚动下')
        this.switchPage(true)
      } else {
        this.switchPage(false)
        console.log('滚动上')
      }
    },
    removePageListener () {
      this.$refs.allPage.removeEventListener('touchstart')
      this.$refs.allPage.removeEventListener('touchmove')
      this.$refs.allPage.removeEventListener('touchend')
    },
    pageStart (e) {
      let self = this;
      // console.log(e)
      // 判断是否是子元素滚动
      e.path.forEach(el => {
        if (el.dataset && el.dataset.scroll == 'true') {
          // 保存子元素实例
          self.subScrollEl = el;
        }
        // console.log(el)
      })
      if (self.subScrollEl) {
        // console.log('处理子元素滚动');
        inobounce.disable();
      } else {
        // console.log('处理插件滚动');
        inobounce.enable();
      }
      // console.log('触摸开始')
      this.startY = e.changedTouches[0].pageY
      this.startX = e.changedTouches[0].pageX
      // console.log(e.changedTouches[0].pageY, e.changedTouches[0].pageX)
    },
    pageMove (e) {
      let self = this;
      // console.log('触摸移动中...')
      if (self.subScrollEl && self.subScrollEl.scrollTop == 0 && e.changedTouches[0].pageY - this.startY > 0) {
        // 子元素顶部向下滑动禁用回弹
        inobounce.enable();
      }
    },
    pageEnd (e) {
      // console.log('触摸结束')
      // // 判断是否是子元素滚动
      if (this.subScrollEl) {
        this.subScrollEl = null;
        inobounce.enable();
        // console.log('子元素滚动结束')
        return;
      }
      // 滑动逻辑
      if (this.isV) {
        if (e.changedTouches[0].pageY - this.startY < -50) {
          this.startY = null
          this.switchPage(true)
        } else if (e.changedTouches[0].pageY - this.startY > 50) {
          this.startY = null
          this.switchPage(false)
        }
      } else {
        if (e.changedTouches[0].pageX - this.startX < -50) {
          this.startX = null
          this.switchPage(true)
        } else if (e.changedTouches[0].pageX - this.startX > 50) {
          this.startX = null
          this.switchPage(false)
        }
      }
    },
    rollPage (offset) {
      let transformBind = `translate${this.isV ? 'Y' : 'X'}(${offset}px)`
      this.$refs.allPage.style.transform = transformBind
    },
    /**
     * 切换页面
     * @param   {Boolean} isDown 滑动方向 默认向下滑动 true  向上滑动 false
     * @author   maybe
     */
    switchPage (isDown = true) {
      // debugger;
      if (this.$refs.allPage && !this.isRoll) {
        let rollY
        let rollX
        let rollOffset
        if (isDown && this.currentPage < this.pages) {
          this.isRoll = true
          // 设置下一页为可视
          this.pagesArr[this.currentPage + 1 - 1].isShow = true
          rollOffset = -(
            this.currentPage * (this.isV ? this.fullHeight : this.fullWidth)
          )
          // 页面开始滑动
          let transformBind = `translate${
            this.isV ? 'Y' : 'X'
            }(${rollOffset}px)`
          this.$refs.allPage.style.transform = transformBind
          let self = this
          let rollTransitionend = () => {
            setTimeout(() => {
              console.log('解除滑动限制')
              self.isRoll = false
            }, 100)
            self.currentPage++
            this.$refs.allPage.removeEventListener(
              'transitionend',
              rollTransitionend
            )
          }
          this.$refs.allPage.addEventListener(
            'transitionend',
            rollTransitionend
          )
        } else if (!isDown && this.currentPage > 1) {
          this.isRoll = true
          rollOffset =
            -(
              (this.currentPage - 1) *
              (this.isV ? this.fullHeight : this.fullWidth)
            ) + (this.isV ? this.fullHeight : this.fullWidth)
          // 页面开始滑动
          let transformBind = `translate${
            this.isV ? 'Y' : 'X'
            }(${rollOffset}px)`
          this.$refs.allPage.style.transform = transformBind
          let self = this
          let rollTransitionend = () => {
            setTimeout(() => {
              console.log('解除滑动限制')
              self.isRoll = false
            }, 100)
            self.currentPage--
            this.$refs.allPage.removeEventListener(
              'transitionend',
              rollTransitionend
            )
          }
          this.$refs.allPage.addEventListener(
            'transitionend',
            rollTransitionend
          )
        }
      }
    },
  },
  destroyed () {
    if (!this.isPc) {
      // 解除滚动禁用
      inobounce.disable()
      // 销毁页面滑动事件
      this.removePageListener()
    } else {
      window.onmousewheel = document.onmousewheel = null
      // window.onresize = null;
    }
  },
}
</script>

<style scoped lang="scss">
.full-page-wrapper {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #ffffff;
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
    // transition: all 0.1s linear;
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
</style>
