import { App } from 'vue';
import MyComponent from './Component.vue'

// vue的install方法，用于定义vue插件
MyComponent.install = (app: App, options: any) => {
    app.component(MyComponent.name, MyComponent)
};
export default MyComponent // 提供按需导入组件