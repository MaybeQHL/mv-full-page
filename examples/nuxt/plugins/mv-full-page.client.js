import { defineNuxtPlugin } from '#app'
import MvFullPage from 'mv-full-page'

// mv-full-page/dist-lib/style.css
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(MvFullPage)

})