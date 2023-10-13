import { TombstoneGeneratedFields } from "../public";

export interface selectCourseParams {
    title: string | null; // 课程名关键字, 用于输入框搜索
    category?: string | null; // 课程标签关键字, 用于首页按照标签查找
    pageNum: number;
    pageSize: number;
    semesterId: number | null; // 学期id
    userType?: number; // userId
    state: number; // 课程状态,   0->全部,  1->筹备中, 2->报名中， 3->进行中, 4->已结束
    passType?: number; // 查询全部
    reviewed?: number | null
} // 后面还要补一个semsesterId

export interface commentToCourseObj {
    score: number; // 自嗨的打分
    courseId: number;
    evaluateText: string;
    anonymous: boolean;
}

export interface commentToSelfObj {
    courseId: number | null,   // 课程id
    score: number,             // 打分, 不打则在80到90间生成随机数
    evaluateText: string
}

export interface signInfo {
    courseId: number;
    code: string;
}

export interface page {
    page: number,
    pageSize: number
}

export interface templateType {
    page: number
    pageSize: number
    level: number
    type: number
    key: string
}

export interface commentTemplate extends TombstoneGeneratedFields {
    templateText: string  // 模板的str
    level: number         // 模板内容对应的分值
    type: number
}

export interface commentTemplateData {
    list: commentTemplate[]
    total: number
}