import { TombstoneGeneratedFields } from "../public";

export interface annulReportItem extends TombstoneGeneratedFields {
    courseTotal: number                // 学年参加课程总量
    scoreDetail: {                     // 一个obj, 学年获取的劳动二课总学分, 其中还包含每个类别二课的得分

    }
    courseTimeTotal: string            // 本学年参加劳动二课花费的时间， 分钟
    maxCourse: any                     // 本年度学生打分最高的课程, 可能是一个列表
    maxEvaluate: any                   // 教师打分最高的课程
    maxScoreCategory: string           // 获取学分最多的课程类别
    firstCourse: any                   // 本年度参加的第一个课程
    maxCourseMonth: string             // 本年度参加二课数量最多的月份
    maxCourseMonthCount: number        // 本年度参加二课数量最多的那个月的二课数
    keyword: string[]                  // 学年关键词
    ranking: number                    // 学年积分排位
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