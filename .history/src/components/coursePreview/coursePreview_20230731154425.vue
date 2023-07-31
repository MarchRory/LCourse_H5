<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
export default {
    props: {

    },
    setup(props) {
        const defaultCover = ref("");
        (async () => {
            let dc = await import("@/assets/imgs/Cool-Kids-Discussion.png");
            defaultCover.value = dc.default;
        })();
    }
}
</script>

<template>
    <div>

    </div>
</template>

<style scoped lang="less"></style>