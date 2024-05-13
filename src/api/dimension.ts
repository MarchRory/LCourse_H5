import { TombstoneGeneratedFields } from "./types/public";

/**
 * @description 接收的维度评论项配置
 */
export interface DimensionCommentItem extends TombstoneGeneratedFields {
    name: string;
    description: string;
    icon: string;
    departmentId?: number | string;
}

/**
 * @description 发送的维度评论项内容
 */
export type DimensionCommentContentItem =
    Pick<DimensionCommentItem, 'name' | 'icon'>
    & { text: string, course_evaluate_id: number, id: number, description?: string }