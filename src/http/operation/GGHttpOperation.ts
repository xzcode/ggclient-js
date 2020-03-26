import GGHttpResponse from "../response/GGHttpResponse";

/**
 * http请求包装类
 */
export default class GGHttpOperation {
    method: string = 'GET';
    url: string = '/';
    params?: any;
    body?: any;
    xhr?: XMLHttpRequest;
    callbackData?: GGHttpResponse;
    onCallback?: Function;
    onError?: Function;
    complate: boolean = false;
    error: boolean = false;

    /**
     * 回调
     * @param onCallback 自定义回调函数
     */
    then(onCallback: Function):GGHttpOperation {
        this.onCallback = onCallback;
        if(this.complate) {
            this.onCallback(this.callbackData);
        }
        return this;
    }

    /**
     * 异常回调
     * @param onError 自定义异常回调函数
     */
    catch(onError: Function):GGHttpOperation {
        this.onError = onError;
        if(this.error) {
            this.onError(this.callbackData);
        }
        return this;
    }
}