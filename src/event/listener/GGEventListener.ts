import EventData from "../model/EventData";

/**
 *  事件监听器
 */
export default interface GGEventListener {
    
    /**
     * 事件触发行为
     * @param event 事件对象
     */
    (event: EventData): void;

}