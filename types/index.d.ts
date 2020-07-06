// export * from './full-page'

// import { MvFullPage } from './full-page'
// export default MvFullPage
import Vue, { PluginObject } from "vue";
import { BaseComponent } from "./component";

/**  Component */
export default class MvFullPage extends BaseComponent {
  /**
   * 容器宽度
   * @type {string}
   * @default "fixed"
   */
  position?: "fixed" | "relative" | "static" | "absolute" | "inherit";
  /**
   * 容器宽度
   * @type {string}
   */
  height?: string;
  /**
   * 容器高度
   * @type {string}
   */
  width?: string;
  /**
   * 当前页码
   * @type {number}
   */
  currentPage?: number;
  /**
   * 滚动的方向
   * @type {boolean}
   * @description true为垂直方向，false为左右方向
   * @default true
   */
  isV?: boolean;
  /**
   * 是否缓存页面
   * @type {boolean}
   * @default true
   */
  isCache?: boolean;
  /**
   * 总页数
   * @type {number}
   */
  pages: number;
  /**
   * 当前页面
   * @type {number}
   */
  page: number;
  /**
   * 页面背景
   * @type {Array<string | { isBg: boolean; src: string }>}
   * @example ["pink", "orange", "pink", { isBg:true, src:require('@/assets/....') } ]
   */
  bgArr: Array<string | { isBg: boolean; src: string }>;
}
/** The version  */
export const version: string;

export interface InstallationOptions {
  locale: any;
  i18n: any;
  size: string;
}

export function install(vue: typeof Vue, options: InstallationOptions): void;

