<template>
  <transition name="fade" :duration="500">
    <div class="outer absolute top-0 bottom-0 left-0 right-0 bg-opacity-50 bg-gray-500 flex items-center justify-center"
      v-if="show" @click="handleHide()">
      <div class="inner w-3/4 soft--shadow text-slate-400 rounded-lg p-4 bg-[#FBFBFB]">
        <h2 class="font-semibold">Thông tin</h2>
        <i class="divider bg-slate-300 mb-2 mt-1"></i>
        <p class="text-sm">
        <ul class="">
          <li><span class="font-semibold">Phiên bản</span>: 1.0.0</li>
          <li><span class="font-semibold">Ngày phát hành</span>: 28/07/2023</li>
          <li><span class="font-semibold">Người phát triển</span>: Miru 🐧</li>
          <i class="divider bg-slate-300 mb-2 mt-1"></i>
          <li class="italic">(*) Cảm ơn bạn đã tải và sử dụng ứng dụng này, mình sẽ cập nhật một số thay đổi mới ở thời
            gian
            sắp
            tới!</li>
        </ul>
        </p>
        <div class="flex justify-end mt-2">
          <button @click="handleHide()"
            class="bg-green-500 text-white shadow shadow-green-300 px-2 py-1 rounded-md text-sm active:scale-95 transition-transform">xác
            nhận</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">

import { ref, inject } from 'vue';
import { Emitter, EventType } from "mitt";

const modalEvent = inject('app-modal-emit') as Emitter<Record<EventType, unknown>>;

const show = ref<boolean>(false);

const handleShow = () => {
  show.value = true;
}

const handleHide = () => {
  show.value = false;
}

const handleToggle = () => {
  show.value = !show.value;
}

modalEvent.on('show', handleShow);
modalEvent.on('hide', handleHide);
modalEvent.on('toggle', handleToggle);


</script>

<style scoped>
/* transition fade for parent */
.fade-enter-active,

.fade-leave-active {
  transition: all 250ms ease;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* transition fade for child */

.inner {
  transform-origin: center center;
}

.fade-enter-active .inner {
  transition: all 500ms cubic-bezier(0, 1.34, 0, 1.01);
}

.fade-leave-active .inner {
  transition: all 500ms ease-out;
}

.fade-enter-to .inner,
.fade-leave-from .inner {
  opacity: 1;
  transform: scale(1);
}

.fade-enter-from .inner,
.fade-leave-to .inner {
  opacity: 0;
  transform: scale(0);
}
</style>