import CodecHandler from "../CodecHandler";
import CodecUtil from "../../util/CodecUtil";
import Message from "../model/Message";
import WSockConfig from "../../config/WSockConfig";

/**
 * 默认编解码处理器
 */
export default class DefaultCodecHandler implements CodecHandler {

    //|2b|metadata|1b|tag|data|

    /**
     * 元数据长度标识字节数
     */
    private static readonly META_LEN_BYTES = 2;

    /**
     * action id 长度标识字节数
     */
    private static readonly ACTION_ID_LEN_BYTES = 1;

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

        //meta
        const metaDv = new DataView(buff.slice(0, 2));
        const metaLen = metaDv.getInt16(DefaultCodecHandler.META_LEN_BYTES);
        readIndex += DefaultCodecHandler.META_LEN_BYTES;

        if (metaLen > 0) {
            //如果存在meta数据
            const metadataBuff = buff.slice(readIndex, (readIndex += metaLen));
            const metadata = this.config.serializer.deserialize(new Uint8Array(metadataBuff));
            message.meta = metadata;
        }

        //actionid
        const actionIdDv = new DataView(buff.slice(readIndex, (readIndex += DefaultCodecHandler.ACTION_ID_LEN_BYTES)));
        readIndex += DefaultCodecHandler.ACTION_ID_LEN_BYTES;
        const actionIdLen = actionIdDv.getInt8(0);
        const actionIdBuff = buff.slice(readIndex, (readIndex += actionIdLen));
        const actionId = CodecUtil.byteArrayToString([...new Uint8Array(actionIdBuff)]).toLocaleLowerCase();
        message.actionId = actionId;

        //消息体
        const dataBuff = buff.slice(readIndex, buff.byteLength);
        const data = this.config.serializer.deserialize(dataBuff);//反序列化
        message.data = data;

        return message;
    }

    handleEncode(message: Message): ArrayBuffer {
        const buff: number[] = [];
        //meta
        if(message.meta) {
            const meta = this.config.serializer.serialize(message.meta);
            const metaLenDv = new DataView(new ArrayBuffer(2));
            metaLenDv.setInt16(0, meta.length);
            buff.push(metaLenDv.getUint8(0), metaLenDv.getUint8(1));
            buff.push(...meta);
        }else {
            buff.push(0, 0);
        }
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