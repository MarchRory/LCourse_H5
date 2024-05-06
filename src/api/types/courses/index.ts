import { DimensionCommentContentItem } from "@/api/dimension";
import { CourseCategoryType, CourseStateEnum, ListResponseModel, TombstoneGeneratedFields } from "../public";
import { WaterFallCard } from "@/components/waterFall/types";

/**
 * 获取课程列表
 */
export interface selectCourseParams {
    title: string | null; // 课程名关键字, 用于输入框搜索
    category: CourseCategoryType; // 课程标签关键字, 用于首页按照标签查找
    pageNum: number;
    pageSize: number;
    semesterId: string; // 学期id, 废弃
    departmentLimit: string[]
    gradeLimit: string[]
    userType?: number;
    state: CourseStateEnum; // 课程状态,   0->全部,  1->筹备中, 2->报名中， 3->进行中, 4->已结束
    passType?: number; // 查询全部
    reviewed?: number | null
} // 后面还要补一个semsesterId
export interface coursesItem extends WaterFallCard {
    state: number
    id: number | string
    title: string
    semester: string | null
    numberlimit: number | null
    courseManager: null | string
    courseLocation: string | null
    applicationStart: string
    applicationEnd: string
    hostingEnd: string
    hostingStart: string
    courseCategory: string
    pointsRules: string
    ruleContent: string | null
    scoringStandards: string
    organizer: string
    undertaker: string
    introduction: string
    contact: any
    attachment: any
    signUpCount: number
    signUpstate: number
    objectivesType: number | null
    signUpState?: number
}
export type coursesListResultModel = ListResponseModel<coursesItem>

// 评语维度
export interface CommentDimensionItem {
    id: number;
    title: string;
    content: string;
    icon?: string
}

export interface commentToCourseObj {
    score: number; // 自嗨的打分
    courseId: number;
    evaluateText: string;  // 课程建议
    anonymous: boolean; // 是否匿名
    detailComment: DimensionCommentContentItem[]
}

export interface commentToSelfObj {
    courseId: number | null,   // 课程id
    score: number,             // 打分, 不打则在80到90间生成随机数
    evaluateText: string
}

export interface signInfo {
    courseId: number | string;
    code: string;
}

export interface page {
    page: number,
    pageSize: number
}

export interface evalutionType extends TombstoneGeneratedFields {
    uid?: string | number
    title?: string
    cover?: string
    text?: string
    courseId?: string | number
    evaluate?: string
    pass: number
    attendance: number
    checked: boolean
    score: number
}

export type evalutionListResultModel = ListResponseModel<evalutionType>