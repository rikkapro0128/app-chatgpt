<template>
  <router-view v-slot="{ Component }">
    <component :class="modeScreen === 'light' ? 'bg-[#EDF1F5]' : ''" :is="Component"></component>
  </router-view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export type ModeScreen = 'light' | 'dark';

const modeScreen = ref<ModeScreen>('light');

</script>

<style scoped></style>
