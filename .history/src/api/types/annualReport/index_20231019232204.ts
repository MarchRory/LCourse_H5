import { TombstoneGeneratedFields } from "../public";

export interface annulReportItem extends TombstoneGeneratedFields {
    courseTotal: number                // 学年参加课程总量
    scoreDetail: any                   // 一个obj, 学年获取的劳动二课总学分, 其中还包含每个类别二课的得分
    courseTimeTotal: string            // 本学年参加劳动二课花费的时间， 分钟
    maxCourse: any
    maxEvaluate: any
    maxScoreCategory: string
    firstCourse: any
    maxCourseMonth: string
    maxCourseMonthCount: number
    keyword: string[]
    ranking: number
}

export interface annualReportListItemType extends TombstoneGeneratedFields {
    reportBatchName: string | null
    start: string | Date
    end: string | Date
}

export interface annualReportListResult {
    list: annualReportListItemType[]
    total: number;
}

export interface annualReportParamsType {
    page: number
    pageSize: number
}