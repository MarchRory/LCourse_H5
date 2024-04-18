import { msgType } from "../../../types/eventType";
import { mySocket } from "../../../useSocket";
export function subscribeCourseType(wsInstance: mySocket): Map<string | number, Function> {
    const courseMsgMap = new Map()
    const typesObj = [
    ]
    typesObj.forEach((eventItem: msgType) => {
        courseMsgMap.set(eventItem.type, eventItem.callback)
    })
    return courseMsgMap
}