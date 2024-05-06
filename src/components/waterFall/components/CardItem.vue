<script setup lang="ts">
import { coursesItem } from '@/api/types/courses';

/**
 * @description 瀑布流默认卡片
 */
const props = defineProps<{
    course: coursesItem
}>()
</script>

<template>
    <div class="course-default-card" @click="$router.push({path: '/detail', query: {courseId: course.id}})">
        <van-image 
            :src="course.cover.url"
            height="75%"
            fit="cover"
            lazy-load
            class="course-default-cover">
        </van-image>
        <div class="course-default-info">
            <div class="course-default-info-title">{{ props.course.title }}</div>
            <div class="course-default-info-category">
                <div class="">
                    <t-icon class="category-icon" icon="tabler:brand-planetscale" />
                    {{ props.course.courseCategory }}
                </div>
                <div class="">
                    <t-icon icon="tabler:building-community" />
                    {{ props.course.departmentLimits ? props.course.departmentLimits[0] : '全校' }}
                </div>
            </div>
            <div class="course-default-info-back">
                <span><t-icon icon="tabler:tie" />{{ props.course.organizer || '未填写举办方' }}</span>
                <span>限{{ props.course.numberLimit }}人</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.course-default {
    &-card {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        height: 100%;  
        transition: all 0.2s ease;
        animation: fadeMove 0.2s;  
    }
    &-cover {
    }
    &-info {
        flex: 1;
        width: 98%;
        margin: 0 auto;
        display: flex;
        text-align: left;
        align-items: center;
        flex-direction: column;
        justify-content: space-around;
        div {
            width: 100%;
            text-overflow: ellipsis;
            text-align: left;
        }
        &-title {
            font-size: 28px;
            font-weight: bold;
        }
        &-category {
            font-size: 16px;
            font-weight: bold;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            text-align: left;
            div {
                width: max-content;
            }
        }
        &-back {
            font-size: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }
}

:deep(.van-image__img) {
    border-radius: 10px !important;
}

@keyframes fadeMove {
    from {
        opacity: 0;
        transform: translateY(5%); 
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>