<script setup>
import { defineProps } from 'vue';
</script>

<template>
    <div>
        <van-cell-group inset>
            <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
                <template #button>
                    <van-button size="small" type="primary">发送验证码</van-button>
                </template>
            </van-field>
        </van-cell-group>
    </div>
</template>

<style lang="less" scoped></style>