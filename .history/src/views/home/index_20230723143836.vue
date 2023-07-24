<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/store/modules/user/index';
import rqUser from '@/api/user/user'
import { defineAsyncComponent } from 'vue';
import { get } from 'vant/lib/utils';
const searchBar = defineAsyncComponent(() => import('@/components/searchBar/searchBar.vue'))
const courseList = defineAsyncComponent(() => import('@/components/courseList/courseList.vue'))
const userStore = useUserStore()
const keyWords = ref('')
const chosenTagIndex = ref(0)
const coursesList = reactive(new Array())
const tags = reactive([
    {
        tag: '全部',
        key: ''
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

onMounted(() => {

})

const searchTag = (key, index) => {
    chosenTagIndex.value = index
    keyWords.value = key
}



const search = () => {

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
            <van-sticky :offset-top="0">
                <search-bar :key-words="keyWords" @search-course="search" @update:key-words="keyWords = $event" />
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

        <div style="">
            <course-list :key-words="keyWords" />
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
        background-color: white;

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