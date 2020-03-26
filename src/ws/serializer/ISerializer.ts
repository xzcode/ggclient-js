/**
 * 序列化器
 */
export interface ISerializer {

    /**
     * 序列化
     * @param data 需要进行序列化的对象
     */
    serialize(data: any): Uint8Array;

    /**
     * 反序列化
     * @param data 需要进行反序列化的字节数组
     */
    deserialize(data: Uint8Array): any;

}