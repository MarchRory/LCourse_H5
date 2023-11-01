import { request } from "@/utils/http/request";
import * as annualReportTypes from '../types/annualReport/index'

enum API {
    annualReportList = '',
    annualReportDetail = ''
}

/**
 * 获取年度报告列表
 * @returns 
 */
export async function getAnnualReportListAPI() {
    return await request.get<annualReportTypes.annualReportListResult>({
        url: API.annualReportList
    })
}

/**
 * 获取年度报告详情数据
 * @param annualReportId 
 * @returns 
 */
export async function getAnnualReportDetailAPI(annualReportId: number | string, options) {
    return await request.get<annualReportTypes.annulReportItem>({
        url: API.annualReportDetail + `/${annualReportId}`,
        ...options
    })
}