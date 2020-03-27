import Serializer from "./Serializer";
import CodecUtil from "../util/CodecUtil";

/**
 * json序列化器
 */
export default class JsonSerializer implements Serializer {

    private defaultEmptyArrayBuffer = new Uint8Array([]);

    serialize(data: any): Uint8Array {
        if (!data) return this.defaultEmptyArrayBuffer;
        const arr: number[] = CodecUtil.stringToUtf8ByteArr(data);
        return new Uint8Array([...arr]);
    }

    deserialize(data: Uint8Array): any {
        if (!data) return undefined;
        return JSON.parse(CodecUtil.arraybufferToString(data));
    }

}