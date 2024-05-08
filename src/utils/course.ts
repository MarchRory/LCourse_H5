import {
    CourseCategoryType,
    CourseStateEnum,
    CourseCategoryMap,
    CourseSignUpStateEnum,
    CourseSignUpStateMap,
    courseStateMap
} from "@/api/types/public";


export type RealCourseStateConfig =
    typeof courseStateMap[keyof typeof courseStateMap]
    & { disabled: boolean, btnText: string }

interface ConfigCacheKey extends Object {
    state: CourseStateEnum,
    signUpState: CourseSignUpStateEnum,
    allowJoin: boolean
}

const generateJoinConfig = (stateConfig: Pick<RealCourseStateConfig, 'label' | 'tagColor'>, signUpState: CourseSignUpStateEnum): RealCourseStateConfig => {
    let config = {} as RealCourseStateConfig
    const { signUpLabel, signUpTagColor, btnText } = CourseSignUpStateMap[signUpState]

    if (signUpState === CourseSignUpStateEnum.normal) {
        config = {
            ...stateConfig,
            disabled: true,
            btnText
        }
    } else if (signUpState === CourseSignUpStateEnum.waitToExamine) {
        config = {
            label: courseStateMap[CourseStateEnum.examining].label,
            tagColor: courseStateMap[CourseStateEnum.examining].tagColor,
            disabled: false,
            btnText
        }
    } else if ([CourseSignUpStateEnum.rejetced, CourseSignUpStateEnum.admitted].includes(signUpState)) {
        config = {
            label: signUpLabel,
            tagColor: signUpTagColor,
            disabled: false,
            btnText
        }
    }

    return config
}

const generateIngConfig = (signUpState: CourseSignUpStateEnum): RealCourseStateConfig => {
    let config = {} as RealCourseStateConfig
    const { signUpLabel, signUpTagColor, btnText } = CourseSignUpStateMap[signUpState]

    const disabled = CourseSignUpStateEnum.completeSign === signUpState

    config = {
        label: signUpLabel,
        tagColor: signUpTagColor,
        disabled,
        btnText
    }

    return config
}


// 计算缓存, 提升性能
const realConfigCache = new Map<string, RealCourseStateConfig>()
/**
 * @description 根据课程状态、学生报名状态、学院参与许可生成实际课程状态配置
 * @param state 
 * @param signUpState 
 * @param allowJoin 
 * @returns 
 */
export const generateCourseStateConfig = (data: ConfigCacheKey): RealCourseStateConfig => {
    const cache = realConfigCache.get(data.toString())
    // 取缓存
    if (typeof cache !== 'undefined') {
        return cache
    }

    const { state, signUpState, allowJoin } = data
    const stateConfig = courseStateMap[state]
    let realConfig = {} as RealCourseStateConfig

    // 不对学院开放
    if (!allowJoin) {
        realConfig = {
            ...stateConfig,
            disabled: false,
            btnText: '本课程不对当前学院开放'
        }
        return realConfig
    }

    // 对学院开放时生成实际配置
    switch (state) {
        case CourseStateEnum.prepare:
            realConfig = {
                ...stateConfig,
                disabled: allowJoin,
                btnText: '未到报名时间'
            }
            break;
        case CourseStateEnum.joining:
            realConfig = generateJoinConfig(stateConfig, signUpState)
            break;
        case CourseStateEnum.examining:
            realConfig = {
                ...stateConfig,
                disabled: false,
                btnText: '请等待后台审核结果'
            }
            break;
        case CourseStateEnum.ing:
            realConfig = generateIngConfig(signUpState)
            break;
        case CourseStateEnum.finished:
            realConfig = {
                ...stateConfig,
                disabled: true,
                btnText: '课程已结束'
            }
            break;
        default:
            break;
    }
    realConfigCache.set(data.toString(), realConfig)
    return realConfig
}

/**
 * @description 根据后端传的课程类别, 获取课程类别缩写和配置对象
 * @param value 
 * @returns 
 */
export const getCategoryConfig = (value: CourseCategoryType) => {
    // @ts-ignore
    const key = Object.keys(CourseCategoryMap).find((key) => CourseCategoryMap[key].value === value) || ''
    return {
        categoryKey: key,
        // @ts-ignore
        categoryConfig: CourseCategoryMap[key] as typeof CourseCategoryMap[keyof typeof CourseCategoryMap]
    }
}