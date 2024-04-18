import { msgType } from "../../../types/eventType";
import { mySocket } from "../../../useSocket";
export function subscribeCourseType(wsInstance: mySocket): Map<string | number, Function> {
    const baseEventMap = new Map()
    const typesObj = [
        {
            type: 'reconnect',
            callback: (newInstance: mySocket) => {
                wsInstance = newInstance
            }
        }
    ]
    typesObj.forEach((eventItem: msgType) => {
        baseEventMap.set(eventItem.type, eventItem.callback)
    })
    return baseEventMap
}