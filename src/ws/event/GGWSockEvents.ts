/**
 * 自定websocket客户端事件
 */
export default class GGWSockEvents {
    /**
     * 连接打开
     */
    static readonly CONNECTION_OPEN = "ggevent.connection.open";

    /**
     * 连接关闭
     */
    static readonly CONNECTION_CLOSE = "ggevent.connection.close";

    /**
     * 连接异常
     */
    static readonly CONNECTION_ERROR = "ggevent.connection.error";

}