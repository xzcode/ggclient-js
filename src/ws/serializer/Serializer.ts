/**
 * 序列化器
 */
export default interface Serializer {

    /**
     * 序列化
     * @param data 需要进行序列化的对象
     */
    serialize(data: any): number[];

    /**
     * 反序列化
     * @param data 需要进行反序列化的字节数组
     * @param type 反序列化目标类型
     */
    deserialize(data: any): any;

}