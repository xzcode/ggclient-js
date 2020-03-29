import Serializer from "../serializer/Serializer";
import JsonSerializer from "../serializer/JsonSerializer";
import CodecHandler from "../codec/CodecHandler";
import DefaultCodecHandler from "../codec/impl/DefaultCodecHandler";
import EventManager from "../event/EventManager";

/**
 * 客户端配置
 */
export default class GGClientConfig {

    serverUrl = 'ws://localhost/websocket';
    serializer: Serializer = new JsonSerializer();
    eventManager: EventManager = new EventManager();
    codecHandler: CodecHandler = new DefaultCodecHandler(this);

}