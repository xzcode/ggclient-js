/**
 * http请求包装类
 */
export default class GGHttpOperation {
    method: string = 'GET';
    url: string = '/';
    params?: any;
    body?: any;
    xhr?: XMLHttpRequest;
    onCallback?: Function;
    onError?: Function;
    complate: boolean = false;
    error: boolean = false;

    then(onCallback: Function):GGHttpOperation {
        this.onCallback = onCallback;
        return this;
    }

    catch(onError: Function):GGHttpOperation {
        this.onError = onError;
        return this;
    }
}