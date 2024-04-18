import { useWebSocket } from "./useSocket";
import { subscribeBaseType } from './utils/msgType/base/baseEvent'
const socket = ref()
export const initMyWebSocket = () => {
    socket.value = useWebSocket()
    const myWSIntance = socket.value
    const baseMsgMap = subscribeBaseType(myWSIntance)
    socket.value.mount()
    return socket.value
}
