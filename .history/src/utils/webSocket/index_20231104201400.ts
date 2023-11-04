import { useWebSocket } from "./useSocket";
const socket = ref()
export const initMyWebSocket = () => {
    socket.value = useWebSocket()
    const myWSIntance = socket.value
    socket.value.subscribe('reconnect', (newSocketIntance) => {
        socket.value = newSocketIntance
    })
    return socket.value
}
