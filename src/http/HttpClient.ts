import GGHttpOperation from './operation/GGHttpOperation';
import HttpClientConfig from './config/HttpClientConfig';

/**
 * http客户端
 */
export default class HttpClient {

    /**
     * http客户端配置
     */
    config: HttpClientConfig;

    constructor(config: HttpClientConfig) {
        this.config = config;
    }
   

    /**
     * 请求操作
     * @param method 请求方法
     * @param url 请求url
     * @param options 请求选项
     */
    request(method: string, url: string, options?: any): GGHttpOperation {
        const oper = new GGHttpOperation();
        oper.method = method;
        oper.url = url;
        if (options) {
            oper.params = options.params;
            oper.body = options.body;
        }

        const xhr = new XMLHttpRequest();
        oper.xhr = xhr;

        this.config.headerProvider.provideHeaders(xhr);

        xhr.timeout = this.config.timeout;
        xhr.onreadystatechange = (): void => {
            if (xhr.readyState === 4) {
                //进行响应处理
                this.config.responseHandler.handle(oper);
            }
        };
        //如果存在默认url参数提供者，就把默认参数拼接到url上
        if (this.config.defaultUrlParamsProvider) {
            const defaultParams = this.config.defaultUrlParamsProvider.getUrlParams();
            oper.url += '?' + defaultParams;
        }
        //GET方式，把参数拼接到url后面
        if (method.toLocaleUpperCase() === "GET" && oper.params) {

            const addParams = Object.keys(oper.params).map(e => e + '=' + oper.params[e]).join('&');
            if (addParams && oper.url.indexOf('?') == -1) {
                oper.url += "?";
            }
            oper.url += addParams;
        }

        let fullUrl = url.trim();
        if (fullUrl.indexOf("http") == -1) {
            if (fullUrl.indexOf("/") != 0) {
                fullUrl = "/" + fullUrl;
            }
            fullUrl = this.config.serverUrl + fullUrl;
        }

        xhr.open(method.toUpperCase(), fullUrl, true);

        oper.body ? xhr.send(oper.body) : xhr.send();

        return oper;
    }

    get(url: string, data: any): GGHttpOperation {
        return this.request('GET', url, data);
    }

    post(url: string, data: any): GGHttpOperation {
        return this.request('POST', url, data);
    }



}