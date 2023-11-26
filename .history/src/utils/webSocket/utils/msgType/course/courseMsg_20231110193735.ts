import { msgType } from "../../../types/eventType";
import { wsDataType } from '../../../types/ws'
import { mySocket } from "../../../useSocket";
import { useNotifyStore } from "@/store/modules/notify";
import { useUserStore } from "@/store/modules/user";
const notifyStore = useNotifyStore()
let userStore: any
export enum courseTypeMap {
    courseStateChange = -1,
    beAdmitted = 2,
    courseBegin = 3,
    signBegin = 4,
    unReadEvaluate = 6
}

export const courseStateChangeType = [courseTypeMap.beAdmitted, courseTypeMap.courseBegin, courseTypeMap.signBegin, courseTypeMap.unReadEvaluate]

export function subscribeCourseType(wsInstance: mySocket): Map<string | number, Function> {
    const courseMsgMap = new Map()
    const typesObj: msgType[] = [
        {
            type: courseTypeMap.beAdmitted,
            callback: (wxData: wsDataType) => {
                const { message } = wxData
                notifyStore.notify(message as string)
            }
        },
        {
            type: courseTypeMap.courseStateChange,
            callback: (wxData: wsDataType<string>) => {
                const { data, message } = wxData
                if (wxData.type == courseTypeMap.unReadEvaluate) {
                    if (!userStore) {
                        userStore = useUserStore()
                    }
                    console.log(userStore)
                    userStore.hasEvaluateUnRead = true
                }
                // 是否需要点击跳转?
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