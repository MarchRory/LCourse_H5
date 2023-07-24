<script setup>
import { useUserStore } from '@/store/modules/user';
const useStore = useUserStore()

const checked = ref(false)

const userInfo = [
    { icon: 'manager', key: '姓名', content: useStore.name },
    { icon: 'invitation', key: '联系方式', content: Object.values(useStore)[0] },
    { icon: 'lock', key: '密码', content: '修改密码' }
]

const quitLog = () => {
    const useStore = useUserStore()
    useStore.logOut()
}

// 通知不做了，后面要改成其他的功能，后面再说
const handleSwitchChange = (value) => {

}

</script>

<template>
    <div class="container">
        <div class="logout" @click="quitLog">
            <svg t="1689927073832" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="2303" width="35" height="35">
                <path
                    d="M665.6 716.8a51.2 51.2 0 0 0-51.2 51.2v102.4H102.4V153.6h512v102.4a51.2 51.2 0 0 0 102.4 0V102.4a51.2 51.2 0 0 0-51.2-51.2H51.2a51.2 51.2 0 0 0-51.2 51.2v819.2a51.2 51.2 0 0 0 51.2 51.2h614.4a51.2 51.2 0 0 0 51.2-51.2v-153.6a51.2 51.2 0 0 0-51.2-51.2z"
                    fill="#3E4055" p-id="2304"></path>
                <path
                    d="M1008.128 475.136L834.56 301.568a51.2 51.2 0 0 0-72.704 72.192L848.384 460.8H307.2a51.2 51.2 0 0 0 0 102.4h541.184l-86.528 86.528a51.2 51.2 0 1 0 72.192 72.192l173.568-173.568a51.2 51.2 0 0 0 0.512-73.216z"
                    fill="#3E4055" p-id="2305"></path>
            </svg>
        </div>
        <div class="guide"> 个人中心 </div>
        <div class="avatar">
            <van-image round width="8rem" height="8rem" fit="cover" position="center"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        </div>
        <div class="name">name</div>
        <div class="infoBox" style="margin: 0 auto;">
            <div class="icon">
                <van-icon name="bell" color="#ffffff" size="25" />
            </div>
            <div class="info">
                通知
            </div>
            <div>
                <van-switch v-model="checked" @change="handleSwitchChange" size="22px" active-color="#5BA092"
                    inactive-color="#dcdee0" />
            </div>
        </div>
        <div class="toolGuide"> 用户信息 </div>
        <div id="userInfo">
            <div class="infoBox" v-for="(item, index) in userInfo" :key="index">
                <div class="icon">
                    <van-icon :name="item.icon" color="#ffffff" size="25" />
                </div>
                <div class="info">
                    <div class="tag">{{ item.key }}</div>
                    <div class="detailInfo">{{ item.content }}</div>
                </div>
                <div class="tools">
                    <van-icon name="arrow" @click="action(item, index)" size="30" color="#BEBAB3" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
:deep(.van-image--round) {
    border: 10px solid #c0e2ff;
}

:deep(.van-switch) {
    display: flex;
    align-items: center;
    font-size: 22px;
    height: 20px;
    background-color: rgb(91, 160, 146);
    width: 70px;

    .van-switch__node {
        top: -12px;
        left: 0;
        background: #589158;
        width: 30px;
        height: 30px;
        border: 6px solid #F8F2EE;
    }
}

.container {

    height: calc(100vh - var(--van-tabbar-height));

    .logout {
        position: absolute;
        left: 650px;
    }

    .guide {
        font-family: Gen Jyuu Gothic;
        font-size: 60px;
        font-weight: 400;
        line-height: 32px;
        text-align: center;
        position: relative;
        top: -70px;
    }

    .name {
        height: 90px;
        font-size: 50px;
        margin-bottom: 20px;
    }

    .toolGuide {
        margin-top: 10px;
        width: 550px;
        height: 120px;
        font-family: Gen Jyuu Gothic;
        font-size: 45px;
        font-weight: 300;
        line-height: 26px;
        display: flex;
        align-items: center;
        letter-spacing: -0.5px;
        color: #3C3A36;
    }

    .infoBox {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 550px;
        height: 120px;
        border-radius: 30px;
        padding: 8px 16px;
        gap: 8px;
        align-self: stretch;
        background: #FFFFFF;
        box-sizing: border-box;
        border: 1px solid #BEBAB3;
        padding: 0 30px;
        margin-bottom: 30px;

        .icon {
            height: 80px;
            width: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: #65AAEA;
        }

        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            text-align: left;
            width: 300px;
            height: 85px;

            .tag {
                font-family: Gen Jyuu Gothic;
                font-size: 40px;
                font-weight: 300;
                line-height: 26px;
                letter-spacing: -0.5px;
                color: #000000;
            }

            .detailInfo {
                font-family: Gen Jyuu Gothic Monospace;
                font-size: 25px;
                font-weight: 300;
                line-height: 21px;
                letter-spacing: 0px;
                color: #8a8a83;
            }
        }
    }
}
</style>