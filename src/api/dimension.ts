import { request } from "@/utils/http/request";
import { TombstoneGeneratedFields } from "./types/public";

/**
 * @description 接收的维度评论项配置
 */
export interface DimensionCommandItem extends TombstoneGeneratedFields {
    name: string;
    department_id: number;
    description: string;
    icon: string
}

/**
 * @description 发送的维度评论项内容
 */
export type DimensionCommandContentItem =
    Pick<DimensionCommandItem, 'name' | 'icon'>
    & { text: string, course_evaluate_id: number, course_evaluate_top_id: number, id?: number, description?: string }