<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/store/modules/user/index';
import rqUser from '@/api/user/user'
import rqCourse from '@/api/courses/courses'
import { defineAsyncComponent } from 'vue';
import { get } from 'vant/lib/utils';
const searchBar = defineAsyncComponent(() => import('@/components/searchBar/searchBar.vue'))
const userStore = useUserStore()
const selectParams = reactive({
    keyWords: '',
    pageNum: 1,
    pageSize: 15
})
const chosenTagIndex = ref(0)
const coursesList = reactive(new Array())
const tags = reactive([
    {
        tag: '全部',
        key: '*'
    },
    {
        tag: '日常劳动',
        key: '日常生活劳动'
    },
    {
        tag: '生产顶岗',
        key: '生产定岗劳动'
    },
    {
        tag: "劳动理论",
        key: '劳动理论学习'
    },
    {
        tag: '其他劳动',
        key: '其他方式劳动'
    }
])

const loadStatus = reactive({
    loading: false,
    error: false,
    finished: true
})

onMounted(() => {
    getList()
})

const getList = () => {
    loadStatus.loading = true
    loadStatus.finished = false
    loadStatus.error = false
    rqCourse.getCourses(selectParams)
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
        }).finally(() => {
            loadStatus.loading = false
            loadStatus.finished = true
        })
}

const searchTag = (key, index) => {
    chosenTagIndex.value = index

}


</script>

<template>
    <div class="container">
        <div class="header">
            <div class="welcomeInfo">
                <div class="leftSide">
                    <div style="text-align: left;">
                        <span style="color: #3C3A36; font-size: 16px;">欢</span>
                        <span style="color: rgb(163, 163, 163); ">迎回来</span>
                    </div>
                    <div style="font-size: 28px; font-weight: 300;">{{ userStore.name }}</div>
                </div>
                <div class="tools">
                    <van-icon name="scan" size="25" />
                </div>
            </div>
            <van-sticky :offset-top="50">
                <search-bar :key-words="selectParams.keyWords" @update:key-words="selectParams.keyWords = $e"></search-bar>
                <div class="tag">
                    <span style="font-weight: 300;line-height: 21px;font-size: 16px; width: 47px;">分类: </span>
                    <div class="tagList">
                        <van-tag mark :color="chosenTagIndex == index ? '#E3562A' : '#65AAEA'" size="medium"
                            v-for="(item, index) in  tags " :key="index" @click="searchTag(item.key, index)">
                            {{ item.tag }}
                        </van-tag>
                    </div>
                </div>
            </van-sticky>
        </div>

        <div class="list">
            <van-list v-model:loading="loadStatus.loading" :finished="loadStatus.finished" v-model:error="loadStatus.error"
                error-text="请求失败，点击重新加载" finished-text="已经到底了" @load="getList">
                <van-cell v-for="( item, index ) in  coursesList " :key="index">

                </van-cell>
            </van-list>
        </div>
    </div>
</template>


<style scoped lang="less">
.container {
    padding: 20px;

    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        .welcomeInfo {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: @max-div-width;
            //width: calc(100% - 40px);
            margin-bottom: 10px;
        }

        .tools {
            border-radius: 50%;
            width: 90px;
            height: 90px;
            border: 2px solid #BEBAB3;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .tag {
            display: flex;
            flex-direction: row;
            width: @max-div-width;
            margin-bottom: 10px;
            align-items: center;
            margin: 0 auto;

            .tagList {
                display: flex;
                flex-direction: row;
                align-items: center;
                overflow-x: auto;

                :deep(.van-tag) {
                    margin-left: 10px;
                }

                ::webkit-scrollbar {
                    display: none;
                }
            }
        }
    }
}
</style>