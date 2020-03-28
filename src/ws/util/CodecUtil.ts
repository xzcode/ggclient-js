/**
 * 编码转换工具
 */
export default class CodecUtil {

    /**
     * 字符串转utf-8字节数组
     * @param text 字符串
     */
    static stringToUtf8ByteArr(text: string): number[] {
        const code = encodeURIComponent(text);
        const bytes = [];
        for (let i = 0; i < code.length; i++) {
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

    /**
     * 字节数组转字符串
     * @param byteArray 字节数组
     */
    static byteArrayToString(byteArray: number[]): string {
        const encodedString = String.fromCharCode.apply(null, byteArray);
        const decodedString = decodeURIComponent(escape((encodedString)));
        return decodedString;
    }
}