import { RouteRecordRaw } from "vue-router";
import { Log, LogRequest } from "./types"
import Queue from "@/dataStruct/queue";

/**
 * @description 监控埋点工具类, 因为埋点的产生频率会随着需求迭代变得越来越高, 所以前端必须在设计时候采用高并发控制
 */
class XdLogger {
    // 界面曝光时长map
    private timeMap: Map<RouteRecordRaw['path'], number>

    // 埋点请求发送池
    private logPool: Queue<LogRequest>

    // 埋点请求等待队列
    private waitPool: Queue<LogRequest>

    // 传输队列
    private baseQueue: Queue<LogRequest>

    // 发送池规模限制
    private reqLimit: number

    // 定时器, 利用空闲时间, 及时消费请求池中未满的暂存内容
    private timeout: NodeJS.Timeout | null

    // 请求状态控制器
    private isRequesting: boolean

    constructor(reqLimit: number) {
        const self = this
        this.reqLimit = reqLimit
        this.isRequesting = false
        this.baseQueue = new Queue()
        this.timeMap = new Map()
        this.logPool = new Proxy(new Queue(), {
            set(target, key, value) {
                if (key === 'length') {
                    // 请求池队长变化, 主要关注池子清空时的情况
                    if (self.isRequesting && value === 0) {
                        // 当前队列被消费完毕
                        const waitSize = self.waitPool.size()
                        const needReqNum = waitSize < self.reqLimit ? waitSize : self.reqLimit
                        for (let i = 1; i <= needReqNum; i++) {
                            const log = self.waitPool.deQueue()
                            log && self.logPool.enQueue(log)
                        }

                    } else if (!self.isRequesting) {
                        // 500ms内没有新增就自动消费
                        self.timeout = setTimeout(() => {
                            self.sendLog()
                        }, 500)
                    }
                }
                return true
            }
        })
        this.waitPool = new Queue()
        // this.waitPool = new Proxy(new Queue(), {
        //     set(target, key, value) {
        //         // 等待池长度变化时
        //         if (key === 'length') {
        //             // 每次增删

        //         }
        //         return true
        //     }
        // })
    }

    /**
     * @description 埋点请求发送底层逻辑, 高并发请求控制
     * @param logData 
     */
    private sendLog() {

    }

    /**
     * @description 埋点调度器
     * @param logReq 
     */
    private dispatch(logReq: LogRequest) {
        if (this.isRequesting || this.reqLimit < this.logPool.size()) {
            this.waitPool.enQueue(logReq)
        } else {
            this.logPool.enQueue(logReq)
        }
    }

    // 点击埋点发送顶层逻辑
    sendClickLog() {

    }

    // 浏览量埋点发送顶层逻辑
    sendPvLog() {

    }

    // 页面曝光时间埋点发送顶层逻辑
    sendViewTimingLog() {

    }

    // 网站性能埋点发送顶层逻辑
    sendPerformanceLogger() {

    }

    clear() {

    }
}

const logger = new XdLogger(6)

export default logger