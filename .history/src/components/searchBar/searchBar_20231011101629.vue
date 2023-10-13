<script setup lang="ts">
// 传入的 关键字
type inputProps = {
  keyWords: string;
};
const inputProps = withDefaults(defineProps<inputProps>(), {
  keyWords: "",
});

// 组件对外发送事件
type Emits = {
  (event: "update:keyWords", value: string): void;
  (event: "searchCourse"): void;
};
const emits = defineEmits<Emits>();

const changeInputValue = (e: string) => {
  emits("update:keyWords", e);
};
const searchCourse = () => {
  emits("searchCourse");
};
</script>

<template>
  <div class="component-searchBar" @click="searchCourse">
    <van-cell-group inset>
      <van-field
        :disabled="true"
        :model-value="inputProps.keyWords"
        @update:model-value="changeInputValue"
        type="text"
        center
        @focus="searchCourse"
        placeholder="请输入关键词搜索课程"
      >
        <template #button>
          <van-icon name="search" color="#3C3A36" size="22" />
        </template>
      </van-field>
    </van-cell-group>
  </div>
</template>

<style lang="less" scoped>
.component-searchBar {
  margin-bottom: 20px;

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
