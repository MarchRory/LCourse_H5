<template>
    <div>
        <router-view v-slot="{ Component }">
            <keep-alive exclude="searchRes">
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>