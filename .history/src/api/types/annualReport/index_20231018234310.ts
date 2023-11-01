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

export interface annualReportListResultModel {
    list: {
        id: number | string
        uid: number | string
        year: string
    }[]
    total: number;
}

export interface annualReportParamsType {

}