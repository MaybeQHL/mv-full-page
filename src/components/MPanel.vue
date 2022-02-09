<!-- 面板 -->
<template>
  <div class="m-panel-wrapper">
    <div class="m-panel-title" v-if="isTitle">{{ title }}</div>
    <div class="m-panel-content" :class="cClass">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MPanel",
  props: {
    title: { type: String, default: "面板标题" },
    isTitle: { type: Boolean, default: true },
    cClass: { type: String, default: "" },
  },
  setup(props, ctx) {
    // console.log(props, ctx.slots);
  },
});
</script>

<style lang='scss' scoped>
.m-panel-wrapper {
  text-align: left;
  line-height: initial;
  .m-panel-title {
    // color: rgba(69, 90, 100, 0.8);
    color: #fff;
    font-weight: bold;
    font-size: 1em;
    position: relative;
    padding: 0px 30px;
    text-align: center;
    &::after {
      // content: "";
      // position: absolute;
      // width: 100%;
      // left: 0px;
      // bottom: 0px;
      // height: 1px;
      // border-bottom: 1px solid #9d9d99;
    }
  }
  .m-panel-content {
    padding: 10px 30px;
    color: #fff;
    text-align: center;
  }
}
</style>