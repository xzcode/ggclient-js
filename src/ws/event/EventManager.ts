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

    
    removeListener(listener: GGEventListener): void {

    }
    /**
     * 移除监听器
     * @param eventId 
     * @param listener 
     */
    remove(eventId?: string, listener?: GGEventListener): void {
        if (eventId) {
            this.groups.delete(eventId);
            return;
        }
        if (listener) {
            let flag = false;
            this.groups.forEach((v, k) => {
                if (flag) {
                    return;
                }
                flag = v.removeListener(listener);
            });
        }
    }

}