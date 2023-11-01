<script setup lang="ts">
import { ref } from "vue";
const themeVars = reactive({
  navBarTextColor: "#e1562a",
  navBarIconColor: "#e1562a",
});
</script>

<template>
  <div>
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
        <template #title><span style="color: #e1562a">历史目标</span></template>
      </van-nav-bar>
      <course-page-skeleton
        :skeLoad="listLoading"
        v-if="listLoading"
      ></course-page-skeleton>
      <div class="container" v-else>
        <van-list
          class="list"
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="loadList"
        >
          <div>
            <van-cell
              v-for="obj in objectList"
              :key="obj.id"
              @click="openObject(obj.id)"
            >
              <div class="object">
                <div class="seat">
                  <van-image
                    width="80%"
                    height="80%"
                    fit="contain"
                    :lazy-load="true"
                    :src="swpuLogo"
                  />
                </div>
                <div class="ObjInfo">
                  <div class="name">
                    {{ obj.objectivesName }}
                  </div>
                  <div>
                    <van-progress
                      v-if="obj.fixRestrictions"
                      :pivot-text="`${
                        (obj.completed / obj.fixRestrictions) * 100
                      }%`"
                      color="#E3562A"
                      :percentage="(obj.completed / obj.fixRestrictions) * 100"
                    />
                    <div v-else style="color: #bbbbba">
                      该目标暂时没有设置修读要求
                    </div>
                  </div>
                </div>
              </div>
            </van-cell>
          </div>
        </van-list>
      </div>
    </van-config-provider>
  </div>
</template>
