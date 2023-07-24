<script setup  lang="ts">
import { reactive, watch } from 'vue';
import rqCourse from '../../api/courses/courses'
const selectParams = reactive({
    pageNum: 1,
    pageSize: 15
})
const loadStatus = reactive({
    loading: false,
    error: false,
    finished: true
})
type coursesProps = {
    keyWords: string,
}

const coursesProps = withDefaults(defineProps<coursesProps>(), {
    keyWords: '',
})

const coursesList = reactive([] as any)

const loadList = () => {
    let params = Object.assign({ keyWords: coursesProps.keyWords }, selectParams)
    rqCourse.getCourses(params)
        .then(res => {
            if (res.code == 200) {
                console.log('courseList: ', res)
                const { data } = res
                if (data.total > 0) {
                    data.list.forEach((element: any) => {
                        coursesList.push(element)
                    });
                } else {

                }
            } else {
                loadStatus.error = true
            }
        })
}


watch(
    () => coursesProps.keyWords,
    (newVal) => {
        if (newVal || newVal == '') {
            loadList()
        }
    },
    {
        immediate: true
    }
)

// 组件对外发送事件
type Emits = {
}



</script>

<template>
    <div>
        <div class="list">
            <van-list v-model:loading="loadStatus.loading" :finished="loadStatus.finished" v-model:error="loadStatus.error"
                error-text="请求失败，点击重新加载" finished-text="已经到底了" @load="loadList">
                <van-cell v-for="( course, index ) in  coursesList " :key="index">
                    <div class="course">
                        <div class="coverBox">
                            {{ course }}
                        </div>
                        <div class="timeRange">

                        </div>
                        <div class="title">

                        </div>
                        <div class="introduce">

                        </div>
                    </div>
                </van-cell>
            </van-list>
        </div>
    </div>
</template>

<style scoped lang="less">
.course {
    width: 690px;
    height: 300px;
    border-radius: 8px 8px 0px 0px;
    margin-top: 18px;
    border: 3px solid black
}
</style>