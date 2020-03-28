import GGClientConfig from "./config/GGClientConfig";



/**
 * GGClient客户端
 */
export class GGClient {

    config: GGClientConfig;
    ws?: WebSocket;

    /**
     * 
     * @param config 
     */
    constructor(config: GGClientConfig) {
        this.config = config;
    }

    /**
     * 进行连接
     */
    connect(): void {
        if (!this.checkForConnect()) {
            return;
        }
        this.ws = new WebSocket(this.config.serverUrl);
        this.ws.binaryType = "arraybuffer";

        this.ws.onopen = (e: Event) => {
            
        }
        
        this.ws.onmessage = (e: MessageEvent) => {

        }

        this.ws.onclose = (e: CloseEvent) => {

        }

        this.ws.onerror = (e: Event) => {

        }

    }

    /**
     * 检查连接条件
     */
    private checkForConnect(): boolean {
        if (this.ws) {
            if (this.ws.url == this.config.serverUrl) {
                if (this.ws.readyState === 1) {
                    return false;
                }
            } else {
                if (this.ws.readyState <= 1) {
                    this.ws.close();
                }
            }
        }
        return true;
    }



}