import { wsDataType } from "./types/ws"
import { ref } from "vue"
import { useWsStore } from "@/store/modules/ws"
import { getToken } from "../auth/auth"
import { webSocketBucketType } from './types/bucket'
import { showFailToast } from "vant"
const DEFAULT_WS_URL = import.meta.env.VITE_APP_WS_URL        // ws url
const DEFAULT_HEART_BEAT_INTERVAL = 60 * 1000                 // 心跳间隔
const DEFAULT_RETRIES_CNT = 5                                 // 断线默认重连次数
const DEFAULT_CHECK_TEXT = 'ping'                             // 心跳检测默认文案
const wxStore = ref()
export class WebSocketEventBucket implements webSocketBucketType {
    bucket = new Map<number | string, Function>()
    addEvent(type: number | string, callback: Function) {
        this.bucket.set(type, callback)
    }
    useMethod(type: number | string, e: any) {
        this.bucket.get(type)?.(e)
    }
}

export class mySocket extends WebSocket {
    heartInterval: NodeJS.Timer | number = 0
    $bucket: webSocketBucketType | null = null
    constructor(bucket: webSocketBucketType | null, receivedURL?: string) {
        let wsURL = `${receivedURL ? receivedURL : DEFAULT_WS_URL}?swpu_token=${getToken()}`
        super(wsURL)
        this.$bucket = bucket
        this.initSocket()
    }

    subscribe(type: string | number, callback: Function) {
        this.$bucket?.addEvent(type, callback)
    }

    initSocket() {
        let that = this
        // 监听连接
        super.onopen = function (e) {
            wxStore.value = useWsStore()
            console.log('websocket连接成功: ', e)
            that.heartBeatCheck()
        }
        // 监听断开
        super.onclose = (e) => {
            if (!wxStore.value.isUserQuit) {
                if (wxStore.value.$retryCnt < DEFAULT_RETRIES_CNT) {
                    wxStore.value.$retryCnt++
                    console.log('websocket连接断开: ', e)
                    const socket = new mySocket(this.$bucket)
                    that.$bucket?.useMethod('reconnect', socket)
                } else {
                    that.stopHeartBeatCheck()
                    showFailToast('WebSocket异常')
                }
            }
        }
        // 监听错误
        super.onerror = (err) => {
            console.log('ws出错: ', err)
        }
        // 监听消息
        super.onmessage = (e) => {
            console.log('收到消息: ', e)
        }
    }

    // 发送事件
    sendMessage(msg: string) {
        super.send(msg)
    }

    receiveMesaage(e) {
        console.log('接收到消息: ', e)
        console.log(e.data)
        const wsData: wsDataType = JSON.parse(e.data)
        console.log(wsData)
        const { type, state, message, survival, time, data } = wsData
    }

    heartBeatCheck() {
        this.heartInterval = setInterval(() => {
            this.sendMessage(DEFAULT_CHECK_TEXT)
        }, DEFAULT_HEART_BEAT_INTERVAL)
    }
    stopHeartBeatCheck() {
        clearInterval(this.heartInterval)
    }
    closeLink() {
        super.close(1000)
    }
    // 批量订阅
    async mount(EventMap: Map<number | string, Function>) {
        let that = this
        EventMap.forEach((callback: Function, msgType: string | number) => {
            that.subscribe(msgType, callback)
        })
    }
}
export const useWebSocket = () => {
    const bucket = new WebSocketEventBucket()
    return new mySocket(bucket)
}