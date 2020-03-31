import GGClientConfig from "./config/GGClientConfig";
import GGEvents from "./event/GGEvents";
import EventData from "./event/model/EventData";
import GGEventListener from "./event/listener/GGEventListener";
import WSClient from "./WSClient";



/**
 * GGClient客户端
 */
export class GGClient {

    config: GGClientConfig;
    wsClient: WSClient;

    /**
     * 构造器
     * @param config 配置
     */
    constructor(config: GGClientConfig) {
        this.config = config;
        this.wsClient = new WSClient(config);
    }

    /**
     * 发射事件
     * @param eventId 事件id
     * @param eventData 事件数据
     */
    emit(eventId: string, eventData: EventData): void {
        this.config.eventManager.trigger(eventId, eventData);
    }


    /**
     * 添加监听器
     * @param eventId 事件id
     * @param listener 监听器
     */
    on(eventId: string, listener: GGEventListener): void {
        this.config.eventManager.addListener(eventId, listener);
    }


}