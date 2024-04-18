import { useWebSocket } from "./useSocket";
const socket = ref()
export const initMyWebSocket = (token: string) => {
    socket.value = useWebSocket()
    socket.value.subscribe('reconnect', (newSocketIntance) => {
        socket.value = newSocketIntance
    })
}
initMyWebSocket()
