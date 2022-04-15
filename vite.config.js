/**
 * @date 2022/4/15
 * @description vite.config.js配置文件
 * @author 雷婉悦
 */

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");
const isDev = process.env.NODE_ENV === "development";

// vite打包后的文件提供传统浏览器兼容性支持
import legacy from "@vitejs/plugin-legacy";
//vite项目组件库按需引入
import Components from "unplugin-vue-components/vite";
//elmentui
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
////mock模拟数据
import { viteMockServe } from "vite-plugin-mock";

import { setting } from "./src/config/setting";
const {
    base,
    publicDir,
    outDir,
    assetsDir,
    sourcemap,
    cssCodeSplit,
    host,
    port,
    strictPort,
    open,
    cors,
    brotliSize,
    logLevel,
    clearScreen,
    drop_console,
    drop_debugger,
    chunkSizeWarningLimit,
} = setting;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        base,
        root: process.cwd(),
        publicDir,
        logLevel,
        clearScreen,
        plugins: [
            vue(),
            legacy({
                polyfills: ["es.promise.finally", "es/map", "es/set"],
                modernPolyfills: ["es.promise.finally"],
            }),
            Components({
                resolvers: [
                    ElementPlusResolver({
                        importStyle: "sass",
                    }),
                ],
            }),
            viteMockServe({
                mockPath: "mock", //mock文件地址
                supportTs: false, //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
                localEnabled: isDev, // 开发打包开关
                prodEnabled: !isDev, // 生产打包开关
                injectCode: `
             import { setupProdMockServer } from './mockProdServer';
             setupProdMockServer();
           `,
            }),
        ],
        server: {
            host,
            port,
            cors,
            strictPort,
            open,
            fs: {
                strict: false,
            },
        },
        resolve: {
            // 设置别名
            alias: {
                views: path.resolve(__dirname, "src/views"),
                styles: path.resolve(__dirname, "src/styles"),
                "@": path.resolve(__dirname, "src"),
            },
        },
        css: {
            preprocessorOptions: {
                // 引入公用的样式
                scss: {
                    additionalData: `@use "@/styles/index.scss" as *;`,
                },
            },
        },
        build: {
            target: "es2015",
            outDir,
            assetsDir,
            sourcemap,
            cssCodeSplit,
            brotliSize,
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    // 用于删除生产环境中的console
                    drop_console,
                    drop_debugger,
                },
            },
            chunkSizeWarningLimit,
        },
        optimizeDeps: {
            // 检测需要预构建的依赖项
            entries: [],
        },
    };
});