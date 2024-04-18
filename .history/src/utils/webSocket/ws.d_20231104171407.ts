import { WebSocketEventBucket } from './useSocket'
declare interface WebSocket {
    $retryCnt: number         // 重连次数
    $bucket: WebSocketEventBucket
}