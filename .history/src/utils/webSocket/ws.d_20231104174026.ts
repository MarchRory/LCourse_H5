import { webSocketBucketType } from "./types/bucket"
declare interface myWebSocketType extends WebSocket {
    $retryCnt: number                       // 重连次数
    $bucket: webSocketBucketType          // msgEventType与对应处理方法的映射
} 