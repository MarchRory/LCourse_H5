import { wsDataType } from "@/utils/webSocket/types/ws";
import { msgType } from "../../../types/eventType";
import { mySocket } from "../../../useSocket";
const TypeMap = {
    1: 'reconnect',      // 重连

}


export function subscribeBaseType(wsInstance: mySocket): Map<string | number, Function> {
    const baseEventMap = new Map()
    const typesObj: msgType[] = [
        {
            type: TypeMap[1],
            callback: (newInstance: mySocket) => {
                wsInstance = newInstance
            }
        },
        {
            type: 1,
            callback: (wsData: wsDataType) => {
                const { message } = wsData
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