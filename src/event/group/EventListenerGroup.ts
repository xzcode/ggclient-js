import GGEventListener from "../listener/GGEventListener";
import EventData from "../model/EventData";

/**
 * 事件组
 */
export default class EventListenerGroup {

    /**
     * 事件ID
     */
    private eventId: string;

    /**
     * 监听器
     */
    private listeners: Array<GGEventListener> = new Array<GGEventListener>();

    constructor(eventId: string) {
        this.eventId = eventId;
    }

    /**
     * 添加监听器
     * @param listener 监听器
     */
    addListener(listener: GGEventListener): void {
        if (!this.listeners.some(e => e == listener)) {
            this.listeners.push(listener);
        }
    }

    /**
     * 移除监听器
     * @param listener 监听器
     */
    removeListener(listener: GGEventListener): boolean {
        const len = this.listeners.length;
        this.listeners = this.listeners.filter(e => e != listener);
        return len != this.listeners.length;
    }

    /**
     * 触发监听器
     * @param eventData 事件数据
     */
    trigger(eventData: EventData): void {
        this.listeners.forEach(listener => {
            listener(eventData);
        });
    }


}