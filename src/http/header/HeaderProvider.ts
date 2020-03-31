
/**
 * 请求头提供者默认接口
 */
export default interface HeaderProvider {

    /**
     * 对传入的xhr注入header
     * @param xhr XMLHttpRequest对象
     */
    provideHeaders(xhr: XMLHttpRequest): void;
}