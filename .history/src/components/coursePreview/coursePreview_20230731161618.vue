<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
    props: {
        course: {
            type: Object as any,
            required: true,
            default: () => { }
        }
    },
    setup(props) {
        const { course } = toRefs(props)
        const isComplusory = ref(0)
        let courseType = course.objectivesType
        if (courseType == null || typeof courseType == 'undefined') {
            isComplusory.value = 0  // 无此字段
        } else if (courseType == 0) {
            isComplusory.value = 1  // 必修
        } else {
            isComplusory.value = 2  // 选修
        }
        const router = useRouter();
        const defaultCover = ref("");
        (async () => {
            let dc = await import('@/assets/imgs/Cool-Kids-Discussion.png');
            defaultCover.value = dc.default;
        })();
        return {
            course,
            defaultCover,
            router,
            isComplusory
        }
    },
    methods: {
        openDetail() {
            this.router.push({
                path: "/detail",
                query: { courseId: this.course.id, isSignUp: this.course.signUpstate },
            });
        }
    }
}
</script>

<template>
    <div @click="openDetail">
        <div class="course">
            <div>
                <van-image width="100%" height="230" fit="cover" lazy-load :src="course.cover || defaultCover" />
                <div class="category"> {{ course.pointsRules }}</div>
                <div v-if="isComplusory">

                </div>
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
    </div>
</template>

<style scoped lang="less">
.course {
    width: 680px;
    height: 600px;
    border-radius: 10px;
    margin-top: 18px;
    border: 1px solid rgb(132, 132, 132);
    overflow: hidden;

    .category {
        position: absolute;
        padding: 3px 19px;
        border-radius: 27px;
        background-color: #65AAEA;
        color: white;
        left: 60%;
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