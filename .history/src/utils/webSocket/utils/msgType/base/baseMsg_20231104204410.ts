import { mySocket } from "../../../useSocket";
interface msgType {
    type: string | number
    callback: Function
}
export function subscribeBaseType(wsInstance: mySocket): Map<string | number, Function> {
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