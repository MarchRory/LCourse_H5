<script setup lang="ts">
import { useRoute } from 'vue-router';
import rqCourseD from '@/api/courses/courses'
import { showSuccessToast, showFailToast, showConfirmDialog } from 'vant';
const route = useRoute()
const courseId = Number(route.query.courseId)

const join = () => {
    showConfirmDialog({
        title: '报名课程',
        message: '请确认报名该课程? '
    }).then(() => {
        rqCourseD.joinCourse(courseId)
            .then((res: any) => {
                console.log('res: ', res)
                if (res.code == 200) {
                    showSuccessToast('报名成功')
                } else {
                    showFailToast('报名失败或你已经报名该课程')
                }
            })
    }).catch(() => { })
}

</script>

<template>
    <div>
        <h1> 临时报名使用, 后台需要数据, 做这个页面时候记得删 </h1>
        <van-button type="default" @click="join">报名</van-button>
    </div>
</template>

<style scoped lang="less"></style>