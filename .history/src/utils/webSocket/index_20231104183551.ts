import { useWebSocket } from "./useSocket";
const socket = ref()
const initMyWebSocket = () => {
    socket.value = useWebSocket()
    socket.value.subscribe('reconnect', (newSocketIntance) => {
        socket.value = newSocketIntance
    })
}
initMyWebSocket()