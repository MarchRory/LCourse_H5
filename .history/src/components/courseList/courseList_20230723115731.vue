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

var loadList = () => {
    let params = Object.assign({ keyWords: coursesProps.keyWords }, selectParams)
    rqCourse.getCourses(params)
        .then(res => {
            if (res.code == 200) {
                console.log('courseList: ', res)
                const { data } = res
                if (data.total > 0) {
                    data.list.forEach(element => {
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
    (newVal, oldVal) => {
        console.log(newVal)
        if (newVal) {
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
                <van-cell v-for="( item, index ) in  coursesList " :key="index">

                </van-cell>
            </van-list>
        </div>
    </div>
</template>

<style scoped lang="less"></style>