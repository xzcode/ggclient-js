import EventManager from "../event/EventManager";
import HttpClientConfig from "../http/config/HttpClientConfig";
import WSockConfig from "../ws/config/WSockConfig";

/**
 * 客户端总配置
 */
export default class GGClientConfig {

    eventManager: EventManager = new EventManager();
    httpClientConfig: HttpClientConfig = new HttpClientConfig();
    wsockConfig: WSockConfig = new WSockConfig(this.eventManager);


}