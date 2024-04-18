import { mySocket } from "../../../useSocket";
interface eventType {
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
    typesObj.forEach((eventItem: ) => {
        baseEventMap.set(typeKey, callback)
    })
    return baseEventMap
}