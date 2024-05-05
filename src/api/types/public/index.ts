/**
 * 后端的逻辑删除自动生成字段, 前端只需要在获取list的接口里, item的类型继承这个接口即可，
 * 新增item不需要传这些字段
 */
export interface TombstoneGeneratedFields {
    gmtCreate?: string,
    gmtModified?: string,
    createBy?: number,
    updateBy?: number,
    isDeleted?: number,
    id: string | number
    [key: string]: any
}

/**
 * 分页查询的基本参数, 需要拓展请继承这个接口
 */
export interface pageParams {
    key?: string | null
    page?: number
    pageNum?: number
    pageSize: number
}


/**
 * @description 基础分页请求返回的数据结构
 */
export interface ListResponseModel<T> {
    list: T[]
    total: number
}

/**
 * @description 课程分类
 */
export const CourseCategory = {
    '全部': "",
    "日常劳动": "日常生活劳动",
    "生产顶岗": "生产顶岗劳动",
    "劳动理论": "劳动理论学习",
    "公益服务": "公益服务劳动",
    "其他劳动": "其他方式劳动",
    "三下乡": "“三下乡”社会实践"
} as const

/**
 * @description 课程类别, 传空串查全部
 */
export type CourseCategoryType = typeof CourseCategory[keyof typeof CourseCategory]

export interface CateGoryScore {
    name: CourseCategoryType     // 劳动二课的类别
    value: number                    // 学生大学期间修读的总学分
}