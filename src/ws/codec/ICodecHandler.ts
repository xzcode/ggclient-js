import Message from "./model/Message";

/**
 * 编解码处理器
 */
export default interface ICodecHandler {

    /**
     * 处理解码
     * @param data 
     */
    handleDecode(data: ArrayBuffer):Message;

    /**
     * 处理编码
     * @param data 
     */
    handleEncode(data: Message):void;

}