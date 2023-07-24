<script lang="ts">
import { toRefs } from 'vue';
import rqCourse from '../../api/courses/courses'
export default {
    props: {
        key: {
            tyep: String,
            default: '',
            required: true
        }
    },
    setup(props) {
        const { key } = toRefs(props)
        return {
            key
        }
    },
    data() {
        return {
            coursesList: [] as any,
            selectParams: {
                pageNum: 1,
                pageSize: 15
            },
            loadStatus: {
                loading: false,
                error: false,
                finished: false
            },
            total: 0,
            keycopy: ''
        }
    },
    methods: {
        loadList() {
            let params = Object.assign({ keyWords: this.key }, this.selectParams)
            this.loadStatus.loading = true
            this.loadStatus.finished = false
            rqCourse.getCourses(params)
                .then((res: any) => {
                    if (res.code == 200) {
                        const { data } = res
                        this.total = data.total
                        if (data.total > 0) {
                            if (this.keycopy === this.key) {
                                data.list.forEach((element: any) => {
                                    this.coursesList.push(element)
                                });
                            } else {
                                this.coursesList = data.list
                            }
                        }
                        if (this.coursesList.length === this.total) {
                            this.loadStatus.finished = true
                        }
                    } else {
                        this.loadStatus.error = true
                    }
                }).finally(() => {
                    this.loadStatus.loading = false
                })
        }
    },
    watch: {
        key: {
            handler(newVal) {
                if (newVal || newVal == '') {
                    this.keycopy = newVal
                    this.loadList()
                }
            },
            immediate: true
        }
    }
}

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
                            <van-image width="100%" height="230" fit="cover" lazy-load :src="course.cover" />
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