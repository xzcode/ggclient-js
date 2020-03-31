import IGGHttpClient from './HttpClient'
import IHeaderProvider from './header/IHeaderProvider'
import DefaultHeaderProvider from './header/DefaultHeaderProvider';
import IXMLHttpRequestProvider from './xhr/IXMLHttpRequestProvider';
import DefaultXMLHttpRequestProvider from './xhr/DefaultXmlHttpRequestProvider';
import GGHttpOperation from './operation/GGHttpOperation';
import DefaultOperationHandler from './operation/DefaultOperationHandler';
import IOperationHandler from './operation/IOperationHandler';
import DefaultUrlParamsProvider from './params/DefaultUrlParamsProvider';

/**
 * 默认http客户端实现类
 */
export class GGHttpClient implements IGGHttpClient {

    //默认超时时间
    private timeout: number = 30 * 1000;

    //默认服务端url
    private serverUrl = 'http://localhost';

    //XMLHttpRequest提供者
    private xhrProvider: IXMLHttpRequestProvider = new DefaultXMLHttpRequestProvider();

    //默认的请求头提供者
    headerProvider: IHeaderProvider = new DefaultHeaderProvider();

    //默认的url参数提供者
    defaultUrlParamsProvider?: DefaultUrlParamsProvider;

    //响应处理器
    responseHandler: IOperationHandler = new DefaultOperationHandler();

    constructor();
    constructor(xhrProvider: IXMLHttpRequestProvider);
    /**
     * 全参构造
     * @param xhrProvider XMLHttpRequest提供者
     */
    constructor(xhrProvider?: IXMLHttpRequestProvider) {
        xhrProvider && (this.xhrProvider = xhrProvider);
    }

    request(method: string, url: string, options?: any): GGHttpOperation {
        const oper = new GGHttpOperation();
        oper.method = method;
        oper.url = url;
        if (options) {
            oper.params = options.params;
            oper.body = options.body;
        }

        const xhr = this.xhrProvider.getXMLHttpRequest();
        oper.xhr = xhr;

        this.headerProvider?.provideHeaders(xhr);

        xhr.timeout = this.timeout;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                //进行响应处理
                this.responseHandler.handle(oper);
            }
        };
        //如果存在默认url参数提供者，就把默认参数拼接到url上
        if (this.defaultUrlParamsProvider) {
            const defaultParams = this.defaultUrlParamsProvider.getUrlParams();
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
            fullUrl = this.serverUrl + fullUrl;
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