<template>
  <div id="queueMessage" class="p-3 overflow-y-scroll">
    <div class="mb-4" :key="message.id" v-for="message in store.queueMessage">
      <message :animate-time-show="150" :position="message.type === 'bot' ? 'left' : 'right'"
        :message="message.content" />
    </div>
  </div>
</template>

<script setup lang="ts">

import Message from '@/components/Message.vue';

import { reactive, onMounted } from 'vue';

import { delayRender } from '@/utils';
import { useGlobalStore } from '@/store';

export interface MessageProps {
  id: any,
  type: 'user' | 'bot',
  content: string,
}

const store = useGlobalStore();

const introduce = reactive<Array<MessageProps>>(
  [
    {
      id: 'qowujhwqqtyf',
      type: 'user',
      content: 'Xin chào ChatGPT'
    },
    {
      id: 'wtrqbssqaqxz',
      type: 'bot',
      content: 'Chào bạn không biết mình giúp gì được cho bạn ko nhỉ?'
    }
  ]
);

onMounted(() => { // run intro on start app
  (async () => {
    for (const [index, message] of introduce.entries()) {
      if (message.type === 'bot') {
        store.queueMessage = [...store.queueMessage, { ...message, content: '' }] as Array<MessageProps>;
        (async () => {
          store.blockQuestion = true;
          for (const chunk of message.content.split(' ')) {
            store.queueMessage[index].content = `${store.queueMessage[index].content} ${chunk}`;
            await delayRender(50);
          }
          store.blockQuestion = false;
        })()
      } else {
        store.queueMessage = [...store.queueMessage, message] as Array<MessageProps>;
      }
      await delayRender(150);
    }
  })()
})

</script>

<style scoped></style>