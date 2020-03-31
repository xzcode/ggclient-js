import Serializer from "../serializer/Serializer";
import EventManager from "../../event/EventManager";
import CodecHandler from "../codec/CodecHandler";
import JsonSerializer from "../serializer/JsonSerializer";
import DefaultCodecHandler from "../codec/impl/DefaultCodecHandler";

/**
 * websocket配置类
 */
export default class WSockConfig {
    serverUrl = 'ws://localhost/websocket';
    serializer: Serializer = new JsonSerializer();
    eventManager: EventManager = new EventManager();
    codecHandler: CodecHandler = new DefaultCodecHandler(this);

    constructor(eventManager?: EventManager) {
        eventManager && (this.eventManager = eventManager);
    }
}