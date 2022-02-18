<template>
    <div>
        <!-- <NuxtWelcome /> -->
        <client-only>
            <mv-full-page :pages="pages" v-model:page="page" :config="config">
                <template #page1>1</template>
                <template #page2>2</template>
            </mv-full-page>
        </client-only>
    </div>
</template>

<script setup lang="ts">
import { Config } from 'mv-full-page'


const pages = ref(2)
const page = ref(1)
const config = ref({
    direction: 'h'
} as Config)
</script>

<style scoped>
@import url("../node_modules/mv-full-page/dist-lib/style.css");
</style>