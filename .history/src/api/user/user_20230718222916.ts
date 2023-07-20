import http from '@/utils/http/request'
import { Response } from '@/utils/http/types'

export interface loginParams {
    username: String,
    password: String
}

export interface token {
    swpu_token: String
}

export default {
    async login(data: loginParams) {
        return await http.post<Response<token>>("user/login", data)
    }
}