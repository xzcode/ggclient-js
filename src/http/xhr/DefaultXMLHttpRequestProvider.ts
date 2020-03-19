import IXMLHttpRequestProvider from "./IXMLHttpRequestProvider";

/**
 * 默认xhr提供者实现
 */
export default class DefaultXMLHttpRequestProvider implements IXMLHttpRequestProvider {

    getXMLHttpRequest(): XMLHttpRequest {
        return new XMLHttpRequest();
    }
    
}