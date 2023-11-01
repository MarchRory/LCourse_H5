import { TombstoneGeneratedFields } from "../public";

export interface annulReportItem extends TombstoneGeneratedFields {
    courseTotal: number                // 学年参加课程总量
    scoreDetail: any                   // 
    courseTimeTotal: string
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

}