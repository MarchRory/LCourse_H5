<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
    props: {
        course: {
            type: Object as any,
            required: true,
            default: () => { }
        }
    },
    setup() {
        const router = useRouter()
        const defaultCover = ref("");
        (async () => {
            let dc = await import('@/assets/imgs/Cool-Kids-Discussion.png');
            defaultCover.value = dc.default;
        })();
        return {
            defaultCover,
            router
        }
    }
}
</script>

<template>
    <div>

    </div>
</template>

<style scoped lang="less"></style>