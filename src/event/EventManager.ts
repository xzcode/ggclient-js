import EventListenerGroup from "./group/EventListenerGroup";
import GGEventListener from "./listener/GGEventListener";
import EventData from "./model/EventData";

/**
 * 事件管理器
 */
export default class EventManager {

    private groups: Map<string, EventListenerGroup> = new Map();

    /**
     * 添加监听器
     * @param listener 监听器
     */
    addListener(eventId: string, listener: GGEventListener): void {
        let group = this.groups.get(eventId);
        if(!group) {
            group = new EventListenerGroup(eventId);
        }
        group.addListener(listener);
    }

    /**
     * 移除监听
     * @param eventId 事件id
     */
    removeListener(eventId: string): void ;
    /**
     * 移除监听器
     * @param eventId 
     * @param listener 
     */
    removeListener(eventId?: string, listener?: GGEventListener): void {
        if (eventId) {
            this.groups.delete(eventId);
            return;
        }
        if (listener) {
            for (const group of this.groups) {
                if(group[1].removeListener(listener)) {
                    break;
                }
                
            }
        }
    }

    /**
     * 触发事件
     * @param eventId 事件id
     * @param eventData 事件数据
     */
    trigger(eventId: string, eventData: EventData): void {
        const group = this.groups.get(eventId);
        group && group.trigger(eventData);
    }

}