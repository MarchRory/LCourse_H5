import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { viteVConsole } from 'vite-plugin-vconsole'
import path, { resolve } from 'path'
import basicSsl from '@vitejs/plugin-basic-ssl'
import fs from 'fs'

export default ({ command, mode }) => {
  // 获取环境变量
  const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd());
  return defineConfig({
    define: {
      'process.env': env,
    },
    resolve: {
      alias: [
        {
          find: '@/',
          replacement: '/src/'
        }
      ]
    },
    server: {
      hmr: true,
      /*       proxy: {
              '/api': {
                target: 'https://162.14.102.246:8100',
                ws: true,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
              }
            }, */
      open: true,
      /*       https: {
              cert: fs.readFileSync(path.join(__dirname, 'src/ssl/ca.crt')),
              key: fs.readFileSync(path.join(__dirname, 'src/ssl/ca.key'))
            } */
      //https: true,
    },
    plugins: [
      vue(),
      //basicSsl(),
      createHtmlPlugin(),
      Components({
        resolvers: [VantResolver()],
      }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        // 设置为在'src/'目录下生成解决ts报错，默认是当前目录('./'，即根目录)
        dts: 'src/auto-import.d.ts',
        // 自动生成'eslintrc-auto-import.json'文件，在'.eslintrc.cjs'的'extends'中引入解决报错
        // 'vue-global-api'这个插件仅仅解决vue3 hook报错
        eslintrc: {
          enabled: true,
        },
      }),
      viteVConsole({
        entry: path.resolve('src/main.ts'),
        localEnabled: true,
        // 环境变量 VITE_BUILD_VCONSOLE 控制移动端调试控制台是否打开, 打包时候记得关了
        enabled: env.VITE_BUILD_VCONSOLE === 'true',
        config: {
          maxLogNumber: 1000,
          theme: 'dark',
        },
      }),
    ],
    build: {
      outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
      sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
      // minify默认esbuild，esbuild模式下terserOptions将失效
      // vite3变化：Terser 现在是一个可选依赖，如果你使用的是 build.minify: 'terser'，你需要手动安装它 `npm add -D terser`
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: env.VITE_BUILD_DROP_CONSOLE === 'true', // 去除 console
          drop_debugger: true, // 去除 debugger
        },
      },
      chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          globalVars: {
            primary: '#fff'
          },
          additionalData: `@import "${resolve(__dirname, 'src/styles/index.less')}";`,
        },
      },
    },
  });
};

