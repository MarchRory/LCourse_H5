import request from '@/utils/http/request'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()

export default {
    async getUserObjects() {
        return await request({
            url: `/curriculum/front/page?pageNum=1&pageSize=100&semesterId=${userStore.semesterId}&userType=0`,
            method: "GET"
        })
    },

    async getObjDetail(id: number) {
        return await request({
            url: `/curriculum/details/${id}`,
            method: 'GET'
        })
    }
}