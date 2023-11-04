import { mySocketOptions } from "./types/wsOption"
import { eventType } from "./types/eventType"
import { webSocketBucketType } from './types/bucket'
const DEFAULT_WS_URL = import.meta.env.VITE_APP_WS_URL        // ws url
const DEFAULT_HEART_BEAT_INTERVAL = 30 * 1000                 // 心跳间隔
const DEFAULT_RETRIES_CNT = 10                                // 断线默认重连次数
const DEFAULT_CHECK_TEXT = 'ping'                             // 心跳检测默认文案

export class WebSocketEventBucket implements webSocketBucketType {
    bucket = new Map<number | string, Function>()
    addEvent(type: number | string, callback: Function) {
        this.bucket.set(type, callback)
    }
    useMethod(type: number | string, e: any) {
        this.bucket.get(type)?.(e)
        //this.bucket.get(type)(e)
    }
}

class mySocket extends WebSocket {
    heartInterval: null | number = null
    constructor(receivedURL?: string) {
        let wsURL = receivedURL ? receivedURL : DEFAULT_WS_URL
        super(wsURL)
        this.initSocket()
    }

    initSocket() {
        // 监听连接
        this.onopen = function (e) {
            this
            console.log('websocket连接成功: ', e)
        }
        // 监听断开
        this.onclose = function (e) {
            if (this.$retryCnt < DEFAULT_RETRIES_CNT) {
                this.$retryCnt++
                console.log('websocket连接断开: ', e)
                const socket = new mySocket()
                this.$bucket.get('reconnect', socket)
            }
        }
    }

    // 发送事件
    sendMessage(msg: string) {

    }

    receiveMesaage(e) {
        console.log('接收到消息: ', e)
        const { data } = e
    }

    heartBeatCheck() {
        this.heartInterval = window.setInterval(() => {
            this.sendMessage(DEFAULT_CHECK_TEXT)
        }, DEFAULT_HEART_BEAT_INTERVAL)
    }
    stopHeartBeatCheck() {

    }
}