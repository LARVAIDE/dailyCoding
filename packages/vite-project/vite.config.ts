import { defineConfig, normalizePath } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import windi from 'vite-plugin-windicss';
import viteEslint from 'vite-plugin-eslint';
import viteStylelint from 'vite-plugin-stylelint';
import svgr from 'vite-plugin-svgr';
import viteImagemin from 'vite-plugin-imagemin';

const variablePath = normalizePath(path.resolve('./src/variable.scss'));

const isProduction = process.env.NODE_ENV === 'production';
const CDN_URL = 'xxxxxx';

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? CDN_URL : '/',
  resolve: {
    alias: {
      '@assets': path.join(__dirname, 'src/assets')
    }
  },
  optimizeDeps: {
    entries: ['./src/App.tsc']
  },
  build: {
    assetsInlineLimit: 8 * 1024
  },
  css: {
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        })
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${variablePath}";`
      }
    }
  },
  plugins: [
    react(),
    windi(),
    viteEslint(),
    viteStylelint({
      exclude: /windicss|node_modules/
    }),
    svgr(),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9]
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ]
});
