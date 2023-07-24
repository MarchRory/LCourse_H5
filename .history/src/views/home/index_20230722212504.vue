<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/store/modules/user';
import rq from '@/api/user/user'
import { defineAsyncComponent } from 'vue';
const searchBar = defineAsyncComponent(() => import('@/components/searchBar/searchBar.vue'))

onMounted(() => {

})


</script>

<template>
    <div class="container">
        <div class="header">
            <div class="myInput">
                <van-cell-group inset>
                    <van-field :value="keyWords" center clearable placeholder="请输入关键词搜索课程">
                        <template #button>
                            <van-icon name="search" color="#3C3A36" @click="$emit('search', keyWords)" size="22" />
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
.myInput {
    :deep(.van-cell-group--inset) {
        border: 4px solid #bbb9b5;

        .van-field {
            padding: 25px;

            .van-field__control {
                width: 580px;
            }
        }
    }
}
</style>