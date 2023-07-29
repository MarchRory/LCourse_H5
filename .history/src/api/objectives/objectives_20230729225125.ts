import request from '@/utils/http/request'
import { usePlanStore } from '@/store/modules/plan'
import { storeToRefs } from 'pinia'
const { list, total } = storeToRefs(usePlanStore())


export default {
    async getUserObjects() {
        return await request({
            url: `/curriculum/page?pageNum=1&pageSize=100&semesterId=${userStore.semesterId}&userId=${userStore.uid}`,
            method: "GET"
        })
    }
}