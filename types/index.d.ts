// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

import Vue from 'vue'
/*~ This is the module plugin template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */
interface InstallationOptions {
  locale: any
  i18n: any
  size: string
}
/** The version of current plugin */
export const version: string

/**
 * Install all demo components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(demo)` to install.
 */
export function install(vue: typeof Vue, options: InstallationOptions): void

/*~ Here, declare the same module as the one you imported above */
declare module 'mv-full-page' {
  // /*~ Inside, add new function, classes, or variables. You can use
  //  *~ unexported types from the original module if needed. */
  // export function theNewMethod(x: m.foo): other.bar
  // /*~ You can also add new properties to existing interfaces from
  //  *~ the original module by writing interface augmentations */
  // export interface SomeModuleOptions {
  //   someModuleSetting?: string
  // }
  // /*~ New types can also be declared and will appear as if they
  //  *~ are in the original module */

  export type currentPage = number
  export type isV = boolean
  export type isCache = boolean
  export type pages = number
  export type page = number
  export type bgArr = Array<string | { isBg: boolean; src: string }>
}
