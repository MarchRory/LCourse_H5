import { TombstoneGeneratedFields } from "../public";

export interface annulReportItem extends TombstoneGeneratedFields {
    courseTotal: number
    scoreDetail: any
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

export interface annualReportListItemType {
    id: number | string
    uid: number | string
    year: string
}

export interface annualReportListResult {
    list: annualReportListItemType[]
    total: number;
}

export interface annualReportParamsType {

}

export interface annualReportListResultModel {
    code: number
    message: string | null
    data: annualReportListResult
}