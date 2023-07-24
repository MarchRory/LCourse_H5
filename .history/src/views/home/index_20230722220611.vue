<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/store/modules/user';
import rq from '@/api/user/user'
import { defineAsyncComponent } from 'vue';
const searchBar = defineAsyncComponent(() => import('@/components/searchBar/searchBar.vue'))
const userStore = useUserStore()
const keyWords = ref('')
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

onMounted(() => {

})

const search = (keyWords) => {

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
            <div class="myInput">
                <van-cell-group inset>
                    <van-field v-model="keyWords" center clearable placeholder="请输入关键词搜索课程">
                        <template #button>
                            <van-icon name="search" color="#3C3A36" @click="search(keyWords)" size="22" />
                        </template>
                    </van-field>
                </van-cell-group>
            </div>
            <div class="tag">
                <span>分类: </span>
                <div>
                    <van-tag mark type="primary" v-for="(item, index) in tags" :key="index" @click="search(item.key)">
                        {{ item.tag }}
                    </van-tag>
                </div>
            </div>
        </div>

        <div class="list">

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
        }

        .myInput {
            :deep(.van-cell-group--inset) {
                border: 4px solid #bbb9b5;

                .van-field {
                    padding: 20px;

                    .van-field__control {
                        width: 580px;
                    }
                }
            }
        }
    }
}
</style>