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
    key: string,
}

const coursesProps = withDefaults(defineProps<coursesProps>(), {
    key: '',
})

const coursesList = reactive([] as any)

const getNewList = () => {
    let params = Object.assign({ keyWords: coursesProps.key }, selectParams)
    rqCourse.getCourses(params)
        .then((res: any) => {
            if (res.code == 200) {
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

const load

watch(
    () => coursesProps.key,
    (newVal) => {
        if (newVal || newVal == '') {
            getNewList()
        }
    },
    {
        immediate: true
    }
)

// 组件对外发送事件
/* type Emits = {
} */



</script>

<template>
    <div>
        <div class="list">
            <van-list v-model:loading="loadStatus.loading" :finished="loadStatus.finished" v-model:error="loadStatus.error"
                error-text="请求失败，点击重新加载" finished-text="已经到底了" @load="loadList">
                <van-cell v-for="( course, index ) in  coursesList " :key="index">
                    <div class="course">
                        <div>
                            <van-image width="100%" height="230" fit="cover" lazy-load :src="coursesList.cover" />
                            <div class="category"> {{ course.scoringStandards }}</div>
                        </div>
                        <div class="timeRange">
                            {{ course.hostingStart }} 至 {{ course.hostingEnd }}
                        </div>
                        <div class="title">
                            {{ course.title }}
                        </div>
                        <div class="introduce">
                            {{ course.courseLocation }}
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
    height: 600px;
    border-radius: 10px;
    margin-top: 18px;
    border: 1px solid black;
    overflow: hidden;

    .category {
        position: absolute;
        padding: 3px 20px;
        border-radius: 27px;
        background-color: #65AAEA;
        color: white;
        left: 61%;
        top: 60%;
    }

    .timeRange,
    .title,
    .introduce {
        text-align: left;
        margin-left: 20px;
        margin-bottom: 13px;
    }

    .timeRange {
        color: #5BA092;
    }

    .title {
        font-size: 48px;
        font-family: Gen Jyuu Gothic;
        line-height: 32px;
        color: rgb(121, 121, 121);
    }

    .introduce {
        font-weight: 300;
    }
}
</style>