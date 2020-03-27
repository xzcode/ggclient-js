import CodecHandler from "../CodecHandler";
import GGClientConfig from "../../config/GGClientConfig";
import CodecUtil from "../../util/CodecUtil";
import Message from "../model/Message";

/**
 * 默认编解码处理器
 */
export default class DefaultCodecHandler implements CodecHandler {

    //|2b|metadata|1b|tag|data|

    config: GGClientConfig;

    constructor(config: GGClientConfig) {
        this.config = config;
    }


    handleDecode(buff: ArrayBuffer): Message {
        let message = new Message();
        let readIndex = 0;
        //meta
        let metaBuff = buff.slice(0, 2);
        let dv = new DataView(metaBuff);
        let len = dv.getInt16(2);
        readIndex = 2;
        if (len > 0) {
            let metadataBuff = buff.slice(2, 2 + len);
            readIndex += len;
            let metadata = this.config.serializer.deserialize(new Uint8Array(metadataBuff));
            message.meta = metadata;
        }

        //actionid
        let bodyBuf = buff.slice(3, 3 + len);
        let tag = CodecUtil.arraybufferToString(bodyBuf).toLocaleLowerCase();

        //消息体


        return message;
    }

    handleEncode(message: Message): ArrayBuffer {

        //meta
        let meta: Uint8Array = this.config.serializer.serialize(message.meta);

        let mBuf: Uint8Array | undefined;
        if (meta) {
            let mdv = new DataView(new ArrayBuffer(2));
            mdv.setInt16(0, meta.length);
            mBuf = new Uint8Array(mdv.buffer);
        }

        //actionid
        let dv = new DataView(new ArrayBuffer(1));
        if (message.actionId) {
            dv.setInt8(0, message.actionId.length);
        }

        let headBuf: Uint8Array = new Uint8Array(dv.buffer);
        let tagBuf;
        if (message.actionId) {
            tagBuf = CodecUtil.stringToUtf8ByteArr(message.actionId);
        }

        //消息体
        let bodyBuf = this.config.serializer.serialize(message.data);

        let _arr: any[] = [];

        //合并消息字节数组

        mBuf && mBuf.forEach(e => _arr.push(e));

        headBuf && headBuf.forEach(e => _arr.push(e));

        tagBuf && tagBuf.forEach(e => _arr.push(e));

        bodyBuf && bodyBuf.forEach(e => _arr.push(e));

        return new Uint8Array(_arr);

    }

}