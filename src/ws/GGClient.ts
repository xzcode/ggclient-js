import { WebSocketProvider } from "./provider/WebSocketProvider";
import { ISerializer } from "./serializer/ISerializer";



/**
 * GGClient客户端
 */
export class GGClient {

    serverUrl: string = 'ws://localhost/websocket';
    defaultParams: Object = {};
    serializer: ISerializer;
    ws: WebSocket | undefined;

    /**
     * 
     * @param serverUrl 服务器地址
     * @param webSocketProvider WebSocketProvider
     * @param ISerializer 序列化器
     */
    constructor(serverUrl: string, webSocketProvider: WebSocketProvider, serializer: ISerializer)

    /**
     * 基础构造器
     * @param args 参数素组
     */
    constructor(...args: any) {
        this.serverUrl = args[0];
        this.serializer = args[1]
    }

    connect() {
        this.ws = new WebSocket(this.serverUrl);
        this.ws.binaryType = "arraybuffer";
    }



}