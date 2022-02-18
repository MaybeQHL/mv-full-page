import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'



// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  const baseConfig = {
    optimizeDeps: {
      exclude: ['vue-demi']
    },
    plugins: [
      vue(),
    ]
  }
  if (mode == 'lib') {
    const config = {
      build: {
        outDir: 'dist-lib',
        lib: {
          entry: path.resolve(__dirname, './lib/index.ts'),
          name: 'MvFullPage',
          fileName: (format: any) => `mv-full-page.${format}.js`
        },
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external: ['vue'],
          output: {
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals: {
              vue: 'Vue'
            }
          }
        }
      }
    } as UserConfig
    return Object.assign(baseConfig, config);

  } else {
    const config = {
      base: '/v-full-page/'
    }
    return Object.assign(baseConfig, config);;
  }

})


