import GGHttpOperation from "./GGHttpOperation";

/**
 * 消息响应操作处理接口
 */
export default interface IOperationHandler {

    /**
     * 请求响应处理 -- 
     * 当( xhr.readyState === 4 )时候触发该处理
     * @param xhr XMLHttpRequest对象
     */
    handle(oper: GGHttpOperation): void;

}