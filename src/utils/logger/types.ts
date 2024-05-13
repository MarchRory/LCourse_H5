export type LogType =
    'timing'
    | 'click'
    | 'performance'
    | 'pv'

export interface Log {
    type: LogType
    value: string
    userInfo: any
    desc: any
}

export type LogRequest = (...args: any[]) => Promise<any>