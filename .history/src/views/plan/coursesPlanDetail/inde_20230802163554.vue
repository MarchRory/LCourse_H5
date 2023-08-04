<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, defineAsyncComponent, nextTick } from 'vue'
import rqObj from '@/api/objectives/objectives'
import { showFailToast } from 'vant';
import { waterBall } from '@/assets/base64Img';
import 'echarts-liquidfill/src/liquidFill'; // echarts 水晶球 type
import { ECharts, EChartsOption, init } from 'echarts';
const route = useRoute()
const hasPass = ref(0)
const list = ref([] as any)
const skeletonLoad = ref(true)
const objInfo = ref({} as any)
const waterBallChart = ref<ECharts | null>()
const chart = ref<HTMLElement>()
const echarts = inject('$echarts')
const backBtn = defineAsyncComponent(
    () => import('@/components/backButton/backButton.vue')
)
const courseSke = defineAsyncComponent(
    () => import('@/components/coursePageSkeleton/coursePageSkeleton.vue')
)
const course = defineAsyncComponent(
    () => import('@/components/coursePreview/coursePreview.vue')
)

const getWaterBallOpts = (numerator: number, denominator: number) => {
    var rate = Number((numerator / denominator).toFixed(1))
    const opts: EChartsOption = {
        title: [{
            bottom: '15%',
            left: 'center',
            text: '该目标学分修读情况',
            textStyle: {
                color: '#4F515A',
                fontSize: 16,
                fontWeight: 300
            }
        }],
        series: [{
            type: 'liquidFill',
            radius: '45%',
            //水波
            color: [
                '#def2fe',
                '#b6e3fc',
                (echarts as any).graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#72D1FB",
                }, {
                    offset: 0.8,
                    color: "#43ABF7",
                }
                ])],
            data: [rate, rate, rate],
            center: ['50%', '50%'],
            label: {
                normal: {
                    formatter: `${rate * 100}%`,
                    fontSize: 30,
                    fontWeight: 400,
                    color: '#72D1FB'
                }
            },
            itemStyle: {
                //opacity: 0.7, // 波浪的透明度
                shadowBlur: 0 // 波浪的阴影范围
            },
            outline: {
                borderDistance: 0,
                itemStyle: {
                    borderWidth: 4,
                    borderColor: '#ecebea',
                    shadowBlur: 20
                }
            },
            backgroundStyle: {
                color: '#fff'
            }
        },
        {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['50%', '51%'],
            borderCap: 'round',
            data: [
                {
                    name: '',
                    value: denominator - numerator,
                    labelLine: {
                        show: false,
                    },
                    itemStyle: {
                        normal: {
                            borderColor: (echarts as any).graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#43ABF7'
                            }, {
                                offset: 1,
                                color: '#72D1FB'
                            }]),
                            borderWidth: 5
                        },
                        emphasis: {
                            borderColor: (echarts as any).graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#43ABF7'
                            }, {
                                offset: 1,
                                color: '#72D1FB'
                            }]),
                            borderWidth: 5
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        }
                    },
                },


                { //画水球
                    name: "",
                    value: 0,
                    label: {
                        position: 'inside',
                        backgroundColor: {
                            image: waterBall,
                        },
                        shadowColor: 'rgba(18, 64, 123, 0.38)',
                        shadowBlur: 8,
                        padding: 20,
                        distance: 50
                    }
                },
                {
                    //画剩余的刻度圆环
                    name: '',
                    value: numerator,
                    itemStyle: {
                        normal: {
                            color: '#ecebea',
                        },
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    }
                },
                {
                    name: '',
                    value: 0.2,
                    itemStyle: {
                        color: 'rgba(0,0,0,0)',
                    },
                }
            ],
        }]


    }

    return opts
}

const initwaterBallChart = () => {
    if (!waterBallChart.value) {
        waterBallChart.value = echarts.init(chart.value)
        waterBallChart.setOption(
            getWaterBallOpts(objInfo.value.completed, objInfo.value.fixRestrictions)
        )
        window.addEventListener('resize', () => {
            waterBallChart.resize()
        })
    }
}

const isShowStats = ref(false)
const showStats = async () => {
    isShowStats.value = true
    nextTick(() => {
        initwaterBallChart()
    })
}
onMounted(() => {
    let objId = Number(route.query.id)
    Promise.all([rqObj.getObjDetail(objId), rqObj.getObjCourses(objId)])
        .then((res: any) => {
            if (res[0].code == 200 && res[1].code == 200) {
                objInfo.value = res[0].data
                list.value = res[1].data.list
                res[1].data.list.forEach((item: any) => {
                    hasPass.value += item.signUpstate == 4 ? 1 : 0
                });
            } else {
                showFailToast('网络异常, 课程信息获取失败')
            }
        })
        .finally(() => {
            skeletonLoad.value = false
        })
    rqObj.getObjDetail(objId)
        .then((res: any) => {
            const { data } = res
            objInfo.value = data
        })
})

const reLoad = ref(false)
const refresh = () => {
    reLoad.value = true
    rqObj.getObjCourses(Number(route.query.id))
        .then((res: any) => {
            if (res.code == 200) {
                list.value = res.data.list
            }
        })
        .finally(() => {
            reLoad.value = false
        })
}
</script>

<template>
    <course-ske :ske-load="skeletonLoad"></course-ske>

    <div class="container" v-if="!skeletonLoad">
        <header ref="header">
            <back-btn />
            <div class="title">{{ objInfo.objectivesName }}</div>
            <div class="tools" @click="showStats">
                <van-icon name="bar-chart-o" size="32" />
            </div>
        </header>

        <van-pull-refresh v-model="reLoad" @refresh="refresh">
            <div v-if="list && list.length" class="list">
                <van-cell v-for="( course, index ) in  list " :key="index">
                    <course :course="course"></course>
                </van-cell>
            </div>
            <van-empty v-else description="老师还没有给这个目标分配课程哦" />
        </van-pull-refresh>
    </div>

    <van-popup v-model:show="isShowStats" round position="top" :style="{ height: '380px' }">
        <div class="popup-container">
            <div id="chartTitle">
                <div>
                    {{ objInfo.objectivesName }}
                </div>
            </div>

            <div id="otherInfo">
                <div>已完成修读课程: {{ hasPass }}</div>
                <div>该目标安排课程: {{ list.length }}</div>
            </div>

            <div id="chartBox">
                <div id="chart" ref="chart"></div>
            </div>
        </div>
    </van-popup>
</template>

<style scoped lang="less">
.container {
    width: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;

    header {
        height: 140px;
        width: calc(100vw - 70px);
        display: flex;
        padding-left: 25px;
        padding-right: 25px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .title {
            width: calc((100vw - 40px)/2);
            font-family: Gen Jyuu Gothic;
            font-size: 42px;
            font-weight: 500;
            line-height: 32px;
            text-align: center;
            letter-spacing: 5px;
        }

        .seat {
            height: 100%;
            width: 100px;
        }
    }

    .list {
        margin-top: 10px;
        overflow-y: auto;
        height: calc(100vh - 150px);
        background-color: rgb(245, 246, 248);
    }
}

.popup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    #chartTitle {
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        div {
            padding-left: 20px;
            padding-right: 30px;
            width: 90%;
            font-size: 35px;
            font-weight: bold;
            letter-spacing: 1px;
            text-align: left;
            border-left: 10px solid rgb(254, 144, 26);
            margin-left: 5%;
            margin-top: 5%;
        }
    }

    #chartBox {
        width: 95%;
        height: 400px;

        #chartBox {
            width: 95%;
            height: 380px;
        }
    }

    #otherInfo {
        width: 95%;
        height: 130px;
        margin-top: 30px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 32px;
        font-weight: 500;
    }

}
</style>