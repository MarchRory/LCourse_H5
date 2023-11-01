import { TombstoneGeneratedFields } from "../public";
import { coursesItem, evalutionType } from "../courses";
export interface scoreDetailType {
    '公益服务劳动'?: number
    '日常生活劳动'?: number
    '生产顶岗劳动'?: number
    '劳动理论学习'?: number
    '其他方式劳动'?: number
}

export interface annulReportItem extends TombstoneGeneratedFields {
    batchId?: number                   // 批次Id
    year: string                       // 学年: XXXX年年度报告
    courseTotal: number                // 学年参加课程总量
    scoreDetails: scoreDetailType,      // 一个obj, 学年获取的劳动二课总学分, 其中还包含每个类别二课的得分
    courseTimeTotal: string            // 本学年参加劳动二课花费的时间， 分钟
    maxCourse: coursesItem[]           // 本年度学生打分最高的课程, 可能是一个列表
    maxEvaluate: evalutionType         // 教师打分最高的评价
    maxEvaluateCourse: coursesItem     // 教师打分最高的课程
    maxScoreCategory: string           // 获取学分最多的课程类别
    firstCourse: coursesItem           // 本年度参加的第一个课程
    monthDetails: Map<String, String>  // 学年中每个月份对应完成的课程数量
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