import { WebSocketEventBucket } from './useSocket'
declare interface WebSocket {
    $retryCnt: number                       // 重连次数
    // $bucket: WebSocketEventBucket           // msgEventType与对应处理方法的映射
} 