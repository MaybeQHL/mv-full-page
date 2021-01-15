import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 注册动画指令
import "animate.css";
import directives from "./utils/directives";
Vue.use(directives);


import VConsole from 'vconsole' //引入
new VConsole() //初始化

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
