/**
 * 事件数据
 */
export default class EventData {
    eventId?: string;
    data? : unknown;

    /**
     * 构造器
     * @param eventId 事件id
     */
    constructor(eventId: string) {
        this.eventId = eventId;
    }

}