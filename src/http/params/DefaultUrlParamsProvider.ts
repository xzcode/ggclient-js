
/**
 * 默认url参数提供者
 */
export default class DefaultUrlParamsProvider{

    private params: any;

    constructor(params: any) {
        this.params = params;
    }
    getUrlParams() {
        if(!this.params) {
            return;
        }
        return Object.keys(this.params).map(e => e + "=" + this.params[e]).join('&');
    }

}