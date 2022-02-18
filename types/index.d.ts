import { AnyRecord } from 'dns';
import { App, Plugin, VueElement } from 'vue'


/**  component common definition */
export declare class BaseComponent {
    /** Install component into Vue */
    static install(app: App, ...options: any): AnyRecord
}
export default class MvFullPage extends BaseComponent {
}

export * from './type'