import HeaderProvider from "../header/HeaderProvider";
import DefaultHeaderProvider from "../header/DefaultHeaderProvider";
import DefaultUrlParamsProvider from "../params/DefaultUrlParamsProvider";
import IOperationHandler from "../operation/IOperationHandler";
import DefaultOperationHandler from "../operation/DefaultOperationHandler";


/**
 * http客户端配置
 */
export default class HttpClientConfig {

     //默认超时时间
     timeout: number = 30 * 1000;

     //默认服务端url
     serverUrl = 'http://localhost';
 
 
     //默认的请求头提供者
     headerProvider: HeaderProvider = new DefaultHeaderProvider();
 
     //默认的url参数提供者
     defaultUrlParamsProvider?: DefaultUrlParamsProvider;
 
     //响应处理器
     responseHandler: IOperationHandler = new DefaultOperationHandler();
 

}