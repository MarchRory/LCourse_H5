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
 * @description 后端课程状态
 */
export const enum CourseStateEnum {
    all = 0,
    prepare = 1,
    joining = 2,
    ing = 3,
    finished = 4,
    examining = 5
}

type CourseStateMapType = {
    [state in CourseStateEnum]: string
}

export const courseStateMap: CourseStateMapType = {
    [CourseStateEnum.all]: '全部',
    [CourseStateEnum.prepare]: '筹备中',
    [CourseStateEnum.joining]: '报名中',
    [CourseStateEnum.ing]: '进行中',
    [CourseStateEnum.finished]: '已结束',
    [CourseStateEnum.examining]: '审核中'
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