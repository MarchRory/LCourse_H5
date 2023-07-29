import request from '@/utils/http/request'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()

export default {
    async getUserObjects() {
        return await request({
            url: `/curriculum/page?pageNum=1&pageSize=100&semesterId=${userStore.semesterId}&userId=${userStore.uid}`,
            method: "GET"
        })
    }
}