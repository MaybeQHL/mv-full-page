import MvFullPage from './index.vue'

// vue的install方法，用于定义vue插件
MvFullPage.install = (Vue) => {
  Vue.component('mv-full-page', MvFullPage)
};


export default MvFullPage // 提供按需导入组件