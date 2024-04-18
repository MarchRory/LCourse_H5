import { mySocketOptions } from "./types/wsOption"
import { eventType } from "./types/eventType"
import { webSocketBucketType } from './types/bucket'
import { showFailToast } from "vant"
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
    }
}

class mySocket extends WebSocket {
    heartInterval: NodeJS.Timer | number = 0
    $retryCnt: number = 0
    $bucket: webSocketBucketType | null = null
    constructor(receivedURL?: string, bucket: webSocketBucketType) {
        let wsURL = receivedURL ? receivedURL : DEFAULT_WS_URL
        super(wsURL)
        this.$bucket = bucket
        this.initSocket()
    }

    loadBucket() {

    }

    initSocket() {
        // 监听连接
        super.onopen = function (e) {
            console.log('websocket连接成功: ', e)
        }
        // 监听断开
        super.onclose = (e) => {
            if (this.$retryCnt < DEFAULT_RETRIES_CNT) {
                this.$retryCnt++
                console.log('websocket连接断开: ', e)
                const socket = new mySocket()
                this.$bucket?.useMethod('reconnect', socket)
            } else {
                this.stopHeartBeatCheck()
                showFailToast('WebSocket异常')
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
        const { data } = e
    }

    heartBeatCheck() {
        this.heartInterval = setInterval(() => {
            this.sendMessage(DEFAULT_CHECK_TEXT)
        }, DEFAULT_HEART_BEAT_INTERVAL)
    }
    stopHeartBeatCheck() {
        clearInterval(this.heartInterval)
    }
}

export const useWebSocket = () => {
    const bucket
}