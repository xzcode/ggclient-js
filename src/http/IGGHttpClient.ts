import GGHttpOperation from "./operation/GGHttpOperation";

/**
 * http客户端默认接口
 */
export default interface IHttpClient {


    /**
     * 自定义请求
     * @param method 方法
     * @param url 请求url
     * @param data 请求参数
     * @param options 附加选项
     */
    request(method: string, url: string, data: Object, options: Object): GGHttpOperation;

    /**
     * 自定义请求
     * @param method 方法
     * @param url 请求url
     * @param data 请求参数
     */
    request(method: string, url: string, data: Object): GGHttpOperation;

    /**
     * get请求
     * @param url 请求url
     * @param data 请求参数
     */
    get(url: string, data: Object): GGHttpOperation;

    /**
     * post请求
     * @param url 请求url
     * @param data 请求参数
     */
    post(url: string, data: Object): GGHttpOperation;

}