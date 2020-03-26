/**
 * 编码转换工具
 */
export default class CodecUtil {

    /**
     * 字符串转utf-8字节数组
     * @param text 字符串
     */
    static stringToUtf8ByteArr(text:string) {
        const code = encodeURIComponent(text);
        const bytes = [];
        for (var i = 0; i < code.length; i++) {
            const c = code.charAt(i);
            if (c === '%') {
                const hex = code.charAt(i + 1) + code.charAt(i + 2);
                const hexVal = parseInt(hex, 16);
                bytes.push(hexVal);
                i += 2;
            }
            else {
                bytes.push(c.charCodeAt(0));
            }
        }
        return bytes;
    }

    static arraybufferToString(unit8Arr:Uint8Array|any) {
        let encodedString = String.fromCharCode.apply(null,unit8Arr);
        let decodedString = decodeURIComponent(escape((encodedString)));
        return decodedString;
    }
}