/**
 * 消息包装类
 */
export default class Message {

    actionId?: string;//指令标识
    data?: any;//数据体

    constructor();
    constructor(actionId: string)
    constructor(actionId: string, data?: any);
    /**
     * 构造器
     * @param actionId 指令标识
     * @param data 元数据
     * @param meta 数据体
     */
    constructor(actionId?: string, data?: any) {
        this.actionId = actionId;
        this.data = data;
    };

}