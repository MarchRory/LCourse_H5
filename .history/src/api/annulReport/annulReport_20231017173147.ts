import { request } from "@/utils/http/request";
import * as annualReportTypes from '../types/annualReport/index'

enum API {
    annualReportList = ''
}

export async function getAnnualReportList() {
    return await request.get<annualReportTypes.annualReportListResultModel>({
        url: API.annualReportList
    })
}