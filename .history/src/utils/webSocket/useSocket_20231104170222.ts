import { mySocketOptions } from "./types/wsOption"

const DEFAULT_WS_URL = import.meta.env.VITE_APP_WS_URL        // ws url
const DEFAULT_HEART_BEAT_INTERVAL = 30 * 1000                 // 心跳间隔
const DEFAULT_RETRIES_CNT = 10                                // 断线默认重连次数
const DEFAULT_CHECK_TEXT = 'ping'                             // 心跳检测默认文案

class mySocket extends WebSocket {
    heartInterval: null | number = null
    constructor(receivedURL?: string) {
        let wsURL = receivedURL ? receivedURL : DEFAULT_WS_URL
        super(wsURL)
        this.$retryCnt = 0
        this.initSocket()
    }

    initSocket() {
        // 监听连接
        this.onopen = function (e) {
            console.log('websocket连接成功: ', e)
        }
        // 监听断开
        this.onclose = function (e) {
            if (this.$retryCnt = 0)
                console.log('websocket连接断开: ', e)
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
    close(e: Event) {
        console.log('ws连接关闭: ', e)
    }
}