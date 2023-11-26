import { request } from "@/utils/http/request";
import * as annualReportTypes from '../types/annualReport/index'
import { AxiosRequestConfig } from "axios";

enum API {
    annualReportList = '/curriculum/academic_year_report/batch',
    annualReportDetail = '/curriculum/academic_year_report/create'
}

/**
 * 获取年度报告列表
 * @returns 
 */
export async function getAnnualReportListAPI(params: annualReportTypes.annualReportParamsType) {
    return await request.get<annualReportTypes.annualReportListResult>({
        url: API.annualReportList,
        params
    })
}

/**
 * 获取年度报告详情数据
 * @param annualReportId 
 * @returns 
 */
export async function getAnnualReportDetailAPI(batchId: number | string, options: AxiosRequestConfig) {
    return await request.get<annualReportTypes.annulReportItem>({
        url: API.annualReportDetail + `/${batchId}`,
        ...options
    })
}