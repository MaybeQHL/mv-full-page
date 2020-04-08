// export * from './full-page'

// import { MvFullPage } from './full-page'
// export default MvFullPage
import Vue, { PluginObject } from 'vue'
import { BaseComponent } from './component'

/**  Component */
export class FullPage extends BaseComponent {
  currentPage: number
  isV: boolean
  isCache: boolean
  pages: number
  page: number
  bgArr: Array<string | { isBg: boolean; src: string }>
}
/** The version  */
export const version: string

export interface InstallationOptions {
  locale: any
  i18n: any
  size: string
}
export function install(vue: typeof Vue, options: InstallationOptions): void

export default class MvFullPage extends FullPage {}
