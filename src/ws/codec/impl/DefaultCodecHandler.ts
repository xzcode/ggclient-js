import ICodecHandler from "../ICodecHandler";
import GGClientConfig from "../../config/GGClientConfig";
import CodecUtil from "../../util/CodecUtil";
import Message from "../model/Message";

/**
 * 默认编解码处理器
 */
export default class DefaultCodecHandler implements ICodecHandler {

    config: GGClientConfig;

    constructor(config: GGClientConfig) {
        this.config = config;
    }


    handleDecode(data: ArrayBuffer): Message {
        let message = new Message();


        return message;
    }

    handleEncode(message: Message): ArrayBuffer {

        let meta:Uint8Array = this.config.serializer.serialize(message.meta);

        let mBuf: Uint8Array|undefined;
        if(meta) {
            let mdv = new DataView(new ArrayBuffer(2));
            mdv.setInt16(0, meta.length);
            mBuf = new Uint8Array(mdv.buffer);
        }

        let dv = new DataView(new ArrayBuffer(1));
        if(message.actionId){
            dv.setInt8(0, message.actionId.length);
        } 

        let headBuf: Uint8Array = new Uint8Array(dv.buffer);
        let tagBuf;
        if(message.actionId){
            tagBuf = CodecUtil.stringToUtf8ByteArr(message.actionId);
        }

        let bodyBuf = this.config.serializer.serialize(message.data);

        let _arr: any[] = [];
            
        mBuf && mBuf.forEach(e => _arr.push(e));

        headBuf && headBuf.forEach(e => _arr.push(e));

        tagBuf && tagBuf.forEach(e => _arr.push(e));

        bodyBuf && bodyBuf.forEach(e => _arr.push(e));

        return new Uint8Array(_arr);

    }

}