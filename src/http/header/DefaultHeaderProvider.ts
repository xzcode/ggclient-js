import IHeaderProvider from "./IHeaderProvider";

/**
 * 默认请求头提供者
 */
export default class DefaultHeaderProvider implements IHeaderProvider {

    
    provideHeaders(xhr: XMLHttpRequest): void {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    }

}