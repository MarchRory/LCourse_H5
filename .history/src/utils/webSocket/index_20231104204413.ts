import { useWebSocket } from "./useSocket";
import { subscribeBaseType } from './utils/Events/base/baseEvent'
const socket = ref()
export const initMyWebSocket = () => {
    socket.value = useWebSocket()
    const myWSIntance = socket.value
    const baseMsgType
    socket.value.mount()
    return socket.value
}
