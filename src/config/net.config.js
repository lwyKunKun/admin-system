/**
 * @date 2022/4/15
 * @description 配置axios请求基础信息
 * @author 雷婉悦
 *
 */

export const netConfig = {
    // axios 基础url地址
    baseURL: "",
    // 为开发服务器配置 CORS。默认启用并允许任何源，传递一个 选项对象 来调整行为或设为 false 表示禁用
    cors: true,
    // 根据后端定义配置
    contentType: "application/json;",
    //消息框消失时间
    messageDuration: 3000,
    //最长请求时间
    requestTimeout: 10000,
    //操作正常code，支持String、Array、int多种类型
    successCode: [200, 0],
    //登录失效code
    invalidCode: -1,
    //无权限code
    noPermissionCode: -1,
};