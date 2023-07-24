<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/store/modules/user';
import rq from '@/api/user/user'
import { defineAsyncComponent } from 'vue';
const searchBar = defineAsyncComponent(() => import('@/components/searchBar/searchBar.vue'))
const userStore = useUserStore()
const keyWords = ref('')


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
                    <div>
                        <span>欢</span>
                        <span>迎回来</span>
                    </div>
                    <div>{{ userStore.name }}</div>
                </div>
                <div class="tools">
                    <van-icon name="scan" size="30" />
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
        </div>
        <div class="searchBar">

        </div>
    </div>
</template>


<style scoped lang="less">
.container {
    padding: 20px;

    .header {
        display: flex;
        justify-content: center;

        .welcomeInfo {
            display: flex;
            align-items: center;
            justify-content: space-between;
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