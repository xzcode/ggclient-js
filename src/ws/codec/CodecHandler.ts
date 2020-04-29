import Message from "./model/Message";

/**
 * 编解码处理器
 */
export default interface CodecHandler {

    /**
     * 处理解码
     * @param data 
     */
    handleDecode(buff: ArrayBuffer): Message;

    /**
     * 处理编码
     * @param data 
     */
    handleEncode(message: Message): ArrayBuffer;

}