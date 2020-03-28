import Serializer from "./Serializer";
import CodecUtil from "../util/CodecUtil";

/**
 * json序列化器
 */
export default class JsonSerializer implements Serializer {
    private defaultEmptyArrayBuffer = [];

    serialize(data: any): number[] {
        if (!data) return [];
        const arr: number[] = CodecUtil.stringToUtf8ByteArr(data);
        return arr;
    }

    deserialize(data: number[]): any {
        if (!data) return undefined;
        return JSON.parse(CodecUtil.byteArrayToString(data));
    }

}