import { defineNuxtPlugin } from '#app'
import MvFullPage from '../../../dist-lib/mv-full-page.es'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(MvFullPage as any, {

    })
})