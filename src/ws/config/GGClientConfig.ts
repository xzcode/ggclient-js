import ISerializer from "../serializer/ISerializer";
import JsonSerializer from "../serializer/JsonSerializer";
import ICodecHandler from "../codec/ICodecHandler";
import DefaultCodecHandler from "../codec/impl/DefaultCodecHandler";

/**
 * 客户端配置
 */
export default class GGClientConfig {

    serializer: ISerializer = new JsonSerializer();
    codecHandler: ICodecHandler = new DefaultCodecHandler(this);

}