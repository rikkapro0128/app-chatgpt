<template>
  <div class="flex flex-col h-screen">
    <Title />
    <body-message class="flex-1" />
    <Insert />
  </div>
</template>

<script setup lang="ts">

import Title from '@/components/Title.vue';
import Insert from '@/components/Insert.vue';
import BodyMessage from '@/components/BodyMessage.vue';

</script>
