import EventData from "../event/model/EventData";
import WSockConfig from "./config/WSockConfig";
import GGWSockEvents from "./event/GGWSockEvents";



/**
 * websocket客户端
 */
export default class WSClient {

    config: WSockConfig;
    ws?: WebSocket;

    /**
     * 构造器
     * @param config 
     */
    constructor(config: WSockConfig) {
        this.config = config;
    }

    /**
     * 进行连接
     */
    connect(): void {
        if (!this.checkForConnect()) {
            return;
        }
        this.ws = new WebSocket(this.config.serverUrl);
        this.ws.binaryType = "arraybuffer";
        const eventManager = this.config.eventManager;
        
        this.ws.onopen = (e: Event): void => {
            eventManager.trigger(GGWSockEvents.CONNECTION_OPEN, new EventData(e));
        }

        this.ws.onmessage = (e: MessageEvent): void => {
            //获取消息数据
            const buff = e.data;
            //进行编解码
            const message = this.config.codecHandler.handleDecode(buff);
            if(message.actionId) {
                //处理消息 
                eventManager.trigger(message.actionId, new EventData(message));
            }
        }

        this.ws.onclose = (e: CloseEvent): void => {
            eventManager.trigger(GGWSockEvents.CONNECTION_CLOSE, new EventData(e));
        }

        this.ws.onerror = (e: Event): void => {
            eventManager.trigger(GGWSockEvents.CONNECTION_ERROR, new EventData(e));
        }

    }

    /**
     * 检查连接条件
     */
    private checkForConnect(): boolean {
        if (this.ws) {
            if (this.ws.url == this.config.serverUrl) {
                if (this.ws.readyState === 1) {
                    return false;
                }
            } else {
                if (this.ws.readyState <= 1) {
                    this.ws.close();
                }
            }
        }
        return true;
    }

    /**
     * 关闭连接
     */
    close(): void;
    close(code: number | undefined): void;
    close(code?: number, reason?: string): void {
        this.ws && this.ws.close(code, reason);
    }


}