
/**
 * 请求头提供者默认接口
 */
export default interface IHeaderProvider {
    provideHeaders(xhr: XMLHttpRequest): void;
}