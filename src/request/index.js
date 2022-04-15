/**
 * @date 2022/4/15
 * @description request封装
 * @author 雷婉悦
 */

import axios from "axios";
import { netConfig } from "@/config/net.config";
const { contentType, invalidCode, noPermissionCode, requestTimeout, successCode } = netConfig;
import { ElMessage } from "element-plus";

const instance = axios.create({
    baseURL: "http://localhost:9999/api",
    timeout: requestTimeout,
    headers: {
        "Content-Type": contentType,
    },
});

//添加请求拦截器: 这是向后台服务器发起的ajax请求
instance.interceptors.request.use(
    (config) => {
        if (store.getters["user/token"]) {
            config.headers["authorization"] = store.getters["user/token"];
        }

        if (config.data && config.headers["Content-Type"] === "application/x-www-form-urlencoded;charset=UTF-8") config.data = qs.stringify(config.data);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// 添加响应拦截器：后端返回的数据
instance.interceptors.response.use(
    (response) => {
        const res = response.data;
        const { data } = response;
        const { status, message } = data;
        console.log(status, "status");
        console.log(message, "message");

        // 操作成功
        if (successCode.indexOf(status) !== -1) {
            return data;
        } else {
            ElMessage.error(message);
            handleCode(status, message);
            return data;
        }
    },
    (error) => {
        const { response, msg } = error;
        if (error.response && error.response.data) {
            const { status, message } = response.data;
            console.log("---===1222=", response);
            ElMessage.error(message);
            return Promise.reject(error);
        } else {
            console.log("错误的else");
            let { message } = error;
            if (message === "Network Error") {
                message = "后端接口连接异常";
            }
            if (message.includes("timeout")) {
                message = "后端接口请求超时";
            }
            if (message.includes("Request failed with status code")) {
                const code = message.substr(message.length - 3);
                console.log("---===2244=", response);
                message = "后端接口" + code + "异常";
            }
            console.log("---===224ee4=", response);
            ElMessage.error(message || `后端接口未知异常`);
            return Promise.reject(error);
        }
    }
);

export default instance;