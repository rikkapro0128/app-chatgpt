<template>
  <div class="soft--shadow">
    <div class="bg-green-500 p-4 flex items-center justify-between">
      <div class="flex items-center">
        <i style="line-height: 0;" class="fi fi-rr-comment"></i>
        <h3 class="pl-2">{{ props.title }}</h3>
      </div>
      <i @click="toggle()" style="line-height: 0;" class="fi fi-br-menu-dots-vertical text-lg"></i>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useModal } from '@/plugins/Modal';

const { show, hide, toggle } = useModal();

const props = defineProps({
  title: {
    type: String,
    default: 'Ứng dụng Chat GPT'
  }
})

</script>

<style scoped></style>