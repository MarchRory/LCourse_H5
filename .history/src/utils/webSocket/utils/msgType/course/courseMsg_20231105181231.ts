import { msgType } from "../../../types/eventType";
import { mySocket } from "../../../useSocket";

export function subscribeCourseType(wsInstance: mySocket): Map<string | number, Function> {
    const courseMsgMap = new Map()
    const typesObj: msgType[] = [
        // usage
        /*         {
                    type: 'reconnect',
                    callback: (newInstance: mySocket) => {
                        wsInstance = newInstance
                    }
                } */
    ]
    if (typesObj.length) {
        typesObj.forEach((eventItem: msgType) => {
            courseMsgMap.set(eventItem.type, eventItem.callback)
        })
    }
    return courseMsgMap
}