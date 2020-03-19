import IOperationHandler from "./IOperationHandler";
import GGHttpOperation from "./GGHttpOperation";
import GGHttpResponse from "../response/GGHttpResponse";

/**
 * 默认响应处理器
 */
export default class DefaultOperationHandler implements IOperationHandler {


    handle(oper: GGHttpOperation): void {
        let xhr = oper.xhr!;
        let respData = xhr.responseText;
        oper.complate = true;
        let callbackData = new GGHttpResponse();
        callbackData.data = respData
        if ((xhr.status >= 200 && xhr.status < 300)) {
            oper.onCallback && oper.onCallback(callbackData);
        }
        else if (xhr.status >= 400) {
            oper.onError && oper.onError(callbackData);
        }
        else if (xhr.status == 0) {
            oper.onError && oper.onError(callbackData);
        }

    }

}