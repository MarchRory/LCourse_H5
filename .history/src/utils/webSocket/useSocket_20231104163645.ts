import { mySocketOptions } from "./types/wsOption"

const DEFAULT_WS_URL = import.meta.env.VITE_APP_WS_URL        // ws url
const DEFAULT_HEART_BEAT_INTERVAL = 30 * 1000                 // 心跳间隔
const DEFAULT_RETRIES_CNT = 5                                 // 断线默认重连次数
const DEFAULT_CHECK_TEXT = 'ping'                             // 心跳检测默认文案

class mySocket {
    private ws: null | WebSocket = null
    private heartInterval: null | number
    constructor(receivedURL?: string) {
        let wsURL = receivedURL ? receivedURL : DEFAULT_WS_URL
        this.initSocket(wsURL)
    }

    initSocket(ws_URL: string) {
        this.ws = new WebSocket(ws_URL)
        this.ws.onopen = this.onConnect.bind(this)
        this.ws.onclose = this.close.bind(this)
        this.ws.send = this.sendMessage.bind(this)
        this.ws.onmessage = this.receiveMesaage.bind(this)
    }

    // 开启连接
    onConnect(e: Event) {
        console.log('ws连接开启: ', e)
        this.heartBeatCheck()
    }

    // 发送事件
    sendMessage(msg: string) {

    }

    receiveMesaage(e: Event) {

    }

    heartBeatCheck() {
        this.heartInterval = window.setInterval(() => { }, DEFAULT_HEART_BEAT_INTERVAL)
    }
    stopHeartBeatCheck() {

    }
    close(e: Event) {
        console.log('ws连接关闭: ', e)
    }
}