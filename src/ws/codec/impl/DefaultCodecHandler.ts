import CodecHandler from "../CodecHandler";
import CodecUtil from "../../util/CodecUtil";
import Message from "../model/Message";
import WSockConfig from "../../config/WSockConfig";

/**
 * 默认编解码处理器
 */
export default class DefaultCodecHandler implements CodecHandler {

    //|2b|1b|tag|data|


    /**
     * action id 长度标识字节数
     */
    private static readonly ACTION_ID_LEN_BYTES = 1;

     /**
     * 保留内容标识字节数
     */
    private static readonly RESERVE_LEN_BYTES = 2;

    /**
     * 配置
     */
    config: WSockConfig;

    constructor(config: WSockConfig) {
        this.config = config;
    }


    handleDecode(buff: ArrayBuffer): Message {
        const message = new Message();
        let readIndex = 0;

        //reserve
        new DataView(buff.slice(readIndex, (readIndex += DefaultCodecHandler.RESERVE_LEN_BYTES)));

        //actionid
        const actionIdDv = new DataView(buff.slice(readIndex, (readIndex += DefaultCodecHandler.ACTION_ID_LEN_BYTES)));
        const actionIdLen = actionIdDv.getInt8(0);
        const actionIdBuff = buff.slice(readIndex, (readIndex += actionIdLen));
        const actionId = CodecUtil.byteArrayToString([...new Uint8Array(actionIdBuff)]).toLocaleLowerCase();
        message.actionId = actionId;

        //消息体
        const dataBuff = buff.slice(readIndex, buff.byteLength);
        const data = this.config.serializer.deserialize(new Uint8Array(dataBuff));//反序列化
        message.data = data;

        return message;
    }

    handleEncode(message: Message): ArrayBuffer {

        const buff: number[] = [];

        //reserve
        buff.push(0, 0);

        //actionid
        if( message.actionId) {
            buff.push(message.actionId.length);
            buff.push(...CodecUtil.stringToUtf8ByteArr(message.actionId));
        }
        //消息体
        const bodyBuf = this.config.serializer.serialize(message.data);
        buff.push(...bodyBuf);
        return new Uint8Array(buff);

    }

}