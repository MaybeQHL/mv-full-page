<template>
  <div class="home">
    <v-full-page :pages="4"
                 :page.sync="currentPage"
                 :bgArr="bgArr">
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

      <template #page2>
        <div class="page2">
          <p class="block"
             v-animate="{
            name:'bounceInUp'
          }">页面2 第一个动画</p>
        </div>
      </template>

      <template #page3>
        <div class="page3">
          <p class="block"
             v-animate="{
            name:'bounceInRight'
          }">页面3 第一个动画</p>
        </div>
      </template>

      <template #page4>
        <div class="page4">4</div>
      </template>
    </v-full-page>
  </div>
</template>

<script>

import VFullPage from '@/components/VFullPage/index.vue'

export default {
  name: 'home',
  components: {
    VFullPage
  },
  data () {
    return {
      currentPage: 1,
      bgArr: ['cadetblue', 'orange', 'pink', 'green']
    }
  }
}
</script>
<style lang="scss" scoped>
.block {
  height: 300px;
  width: 200px;
  background: red;
}
</style>
