import { msgType } from "../../../types/eventType";
import { wsDataType } from '../../../types/ws'
import { mySocket } from "../../../useSocket";
import { useNotifyStore } from "@/store/modules/notify";
const notifyStore = useNotifyStore()
enum TypeMap {
    courseStateChange = -1,
    beAdmitted = 2,
    courseBegin = 3,
    signBegin = 4,

}

export const courseStateChangeType = [TypeMap.beAdmitted, TypeMap.courseBegin, TypeMap.signBegin]

export function subscribeCourseType(wsInstance: mySocket): Map<string | number, Function> {
    const courseMsgMap = new Map()
    const typesObj: msgType[] = [
        {
            type: TypeMap.beAdmitted,
            callback: (wxData: wsDataType) => {
                const { message } = wxData
                notifyStore.notify(message as string)
            }
        },
    ]
    if (typesObj.length) {
        typesObj.forEach((eventItem: msgType) => {
            courseMsgMap.set(eventItem.type, eventItem.callback)
        })
    }
    return courseMsgMap
}