<template>
  <div class="grid grid-cols-12 slide--up" :style="{ 'animation-duration': `${props.animateTimeShow}ms` }"
    :class="[props.position === 'left' ? 'justify-start' : 'justify-end']">
    <div class="text-[rgb(116,136,153)] text-sm"
      :class="props.position === 'left' ? 'rounded-bl-none col-start-1 col-span-10 mr-2' : 'rounded-br-none col-start-6 col-span-10 ml-2 justify-self-end'">
      <div class="soft--shadow rounded-lg p-3 bg-[#FBFBFB]">
        <div v-if="props.position === 'left'" class="bg-[#9ce53e] w-fit text-[10px] px-2 rounded-full text-[#245313] ">
          BOT
          trả
          lời</div>
        <div v-else class="bg-[#3ebbe5] w-fit text-[10px] px-2 rounded-full text-[#134353] mb-2">bạn hỏi
        </div>
        <MdPreview v-if="props.position === 'left'" editorId="preview-only"
          :modelValue="props.message ? props.message : 'có lỗi xảy ra, mời bạn hỏi lại.'" />
        <div v-else>{{ props.message }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { onMounted, ref } from 'vue';
// import { delayRender } from '@/utils';
// import { useGlobalStore } from '@/store';
import { MdPreview } from 'md-editor-v3';

export type Position = 'left' | 'right';

// const store = useGlobalStore();

const props = defineProps<{
  position: Position,
  message: string,
  animateTimeShow: number
}>();

</script>

<style scoped></style>