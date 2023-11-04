import { msgType } from "../../../types/eventType";
import { mySocket } from "../../../useSocket";

export function subscribeBaseType(wsInstance: mySocket): Map<string | number, Function> {
    const baseEventMap = new Map()
    const typesObj: msgType[] = [
        {
            type: 'reconnect',
            callback: (newInstance: mySocket) => {
                wsInstance = newInstance
            }
        }
    ]

    if (typesObj.length) {
        typesObj.forEach((eventItem: msgType) => {
            baseEventMap.set(eventItem.type, eventItem.callback)
        })
    }

    return baseEventMap
}