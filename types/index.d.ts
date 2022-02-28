import { AnyRecord } from 'dns';
import { extend } from 'lodash';
import { App, Plugin, VueElement } from 'vue'


/**  component common definition */
export declare class BaseComponent extends VueElement {
    /** Install component into Vue */
    static install(app: App, ...options: any): AnyRecord
}
export default class MvFullPage extends BaseComponent {
    /**
     * 手动跳转页面
     * @param page 页码
     * @param quiet 静态移动(没有过渡动画)
     */
    goPage: (page: number, quiet?: boolean) => void
}


export * from './type'