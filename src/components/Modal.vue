<template>
  <div v-if="show" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <h2>Tiêu đề</h2>
    <p>Nội dung</p>
    <div>
      <button>xác nhận</button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

const show = ref<boolean>(false);

const handleShow = () => {
  show.value = true;
}

const handleHide = () => {
  show.value = false;
}

</script>

<style scoped></style>