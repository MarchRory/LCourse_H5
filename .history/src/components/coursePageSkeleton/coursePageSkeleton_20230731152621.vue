<script lang="ts">
import { toRefs } from 'vue'
export default {
    props: {
        skeLoad: {
            type: Boolean,
            default: true,
            required: true
        }
    },
    setup(props) {
        const { skeLoad } = toRefs(props)
        return {
            skeLoad
        }
    }
}
</script>

<template>
    <div>

    </div>
</template>

<style scoped lang="less"></style>
