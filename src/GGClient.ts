import GGClientConfig from "./config/GGClientConfig";
import EventData from "./event/model/EventData";
import GGEventListener from "./event/listener/GGEventListener";
import WSClient from "./ws/WSockClient";
import HttpClient from "./http/HttpClient";



/**
 * GGClient客户端
 */
export class GGClient {

    config: GGClientConfig;
    wsock: WSClient;
    http: HttpClient;

    /**
     * 构造器
     * @param config 配置
     */
    constructor(config: GGClientConfig) {
        this.config = config;
        this.wsock = new WSClient(config.wsockConfig);
        this.http = new HttpClient(config.httpClientConfig);
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