import { ISerializer } from "./ISerializer";
import CodecUtil from "../util/CodecUtil";

/**
 * json序列化器
 */
export default class JsonSerializer implements ISerializer {

    private defaultEmptyArrayBuffer = new Uint8Array([]);

    serialize(data: any): Uint8Array {
        if(!data) return this.defaultEmptyArrayBuffer;
        let arr = CodecUtil.stringToUtf8ByteArr(data);
        return  new Uint8Array([...arr]);
    }
    
    deserialize(data: Uint8Array): any {
        if(!data) return undefined;
        return JSON.parse(CodecUtil.arraybufferToString(data));
    }

}