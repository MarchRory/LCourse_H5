import { msgType } from "../../../types/eventType";
import { mySocket } from "../../../useSocket";
import { useNotifyStore } from "@/store/modules/notify";
const notifyStore = useNotifyStore()
enum TypeMap {
    beAdmitted = 2,
    courseBegin = 3,
    signBegin = 4
}

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