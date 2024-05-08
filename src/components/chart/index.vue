<script setup lang="ts">
import * as echarts from 'echarts'

interface Props {
    width?: string
    height?: string
    options: echarts.EChartsOption
}

const props = withDefaults(defineProps<Props>(), {
    width: '100%',
    height: '100%'
})

const chartRef = ref<HTMLDivElement | null>()
const myChart = ref<echarts.ECharts | null>()

onMounted(() => {
    myChart.value = echarts.init(chartRef.value)
    myChart.value.setOption(props.options)
})

watch(
    () => props.options,
    (newVal) => {
        myChart.value && myChart.value.setOption(newVal)
    },
    {deep: true}
)

onUnmounted(() => {
    myChart.value && myChart.value.dispose()
    myChart.value = null
})
</script>

<template>
    <div 
        :style="{
            width: props.width,
            height: props.height
        }"
        ref="chartRef" 
    />
</template>

<style scoped lang="less"></style>