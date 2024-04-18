import { mySocket } from "../../../useSocket";
export function subscribeBaseType(wsInstance: mySocket): Map<string | number, Function> {
    const baseEventMap = new Map()
    const typesObj = {
        reconnect: (newInstance: mySocket) => {
            wsInstance = newInstance
        }
    }


    baseEventMap.forEach((callback: Function, typeKey: string | number) => {
        baseEventMap.set(typeKey, callback)
    })
    return baseEventMap
}