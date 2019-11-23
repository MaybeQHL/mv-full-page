<template>
  <!-- 全屏滚动组件 -->
  <div class="full-page-wrapper"
       ref="fullPage">
    <div class="all-page"
         ref="allPage">
      <template v-for="(item,index) in pages">
        <div class="page"
             :key="item"
             :id="`page-${item}`"
             :data-index="item"
             :style="{height:fullHeight+'px','background':bgArr[index]}"
             :ref="`page${item}`">
          <div class="page-box"
               v-show="currentPage==item">
            <slot :name="`page${item}`"></slot>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// 禁止IOS回弹库
import inobounce from 'inobounce'

export default {
  name: 'VFullPage',
  props: {
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
      fullHeight: 800,
      maxY: 0,
      startY: 0,
      endY: 0,
      currentPage: 1,  // 当前页面页码
      isRoll: false,  // 是否达到滑动阈值
      isUp: false,   // 是否向上滑动
      isUpdate: true // 页码异步是否更新完成
    };
  },
  computed: {

  },
  created () {
    let isIos = this.isIOS();
    if (isIos) {
      inobounce.enable()
    }
  },
  mounted () {
    // 获取全屏高度
    this.fullHeight = this.$refs.fullPage.clientHeight;
    // 设置最大滑动高度
    this.maxY = this.pages * this.fullHeight;

    this.$refs.allPage.style.height = this.fullHeight * this.pages + 'px';
    // 初始化页面滑动事件
    this.initPageListener();
    console.log(this.maxY)
  },
  watch: {
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
    initPageListener () {
      document.addEventListener('touchstart', this.pageStart, false)
      document.addEventListener('touchmove', this.pageMove, false)
      document.addEventListener('touchend', this.pageEnd, false)
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
    pageMove (e) {
      console.log('触摸移动中...')
      if ((e.changedTouches[0].pageY - this.startY) < -50) {
        this.isRoll = true;
        this.isUp = true;
      } else if ((e.changedTouches[0].pageY - this.startY) > 50) {
        this.isRoll = true;
        this.isUp = false;
      }
    },
    pageEnd (e) {
      console.log('触摸结束');
      if (this.isRoll && this.isUpdate) {
        // 滑动逻辑
        let rollY;
        if (this.isUp && this.currentPage < this.pages) {
          // 上滑动
          this.isUpdate = false
          rollY = -(this.currentPage * this.fullHeight);
          this.$refs.allPage.style.transform = `translateY(${rollY}px)`;
          setTimeout(() => {
            this.currentPage++;
            this.isUpdate = true
          }, 800)
        }
        if (!this.isUp && this.currentPage > 1) {
          // 下滑动
          this.isUpdate = false
          rollY = -((this.currentPage - 1) * this.fullHeight) + this.fullHeight;
          this.$refs.allPage.style.transform = `translateY(${rollY}px)`;
          setTimeout(() => {
            this.currentPage--;
            this.isUpdate = true
          }, 800)
        }
        this.isRoll = false;
      }
    }
  },
  destroyed () {
    inobounce.disable()
    // 销毁页面滑动事件
    this.removePageListener();
  }
};
</script>

<style scoped lang="scss">
.full-page-wrapper {
  position: absolute;
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
  }
}
</style>
