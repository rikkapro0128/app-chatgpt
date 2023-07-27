<template>
  <div class="p-3 opening">
    <div :class="store.blockQuestion ? 'opacity-50 pointer-events-none' : ''"
      class="flex items-center transition-opacity">
      <input @keyup="(e) => { e.key === 'Enter' ? handleSendQuestion(e) : null }" v-model="question"
        class="bg-[#fbfbfb] flex-1 py-2 px-3 rounded-xl mr-2 text-sm outline-none text-slate-500 soft--shadow placeholder:text-slate-500"
        placeholder="Câu hỏi của bạn..." type="text" name="message" id="message-question">
      <div @click="(e) => handleSendQuestion(e)"
        class="bg-green-500 transition-transform p-2 rounded-xl flex items-center soft--shadow active:scale-95"
        :class="store.blockQuestion ? 'cursor-not-allowed' : 'cursor-pointer'">
        <i style="line-height: 0;" class="fi fi-rr-paper-plane text-slate-100 text-lg"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useGlobalStore } from '@/store';
import { ref } from 'vue';
import { MessageProps } from '@/components/BodyMessage.vue';
import { delayRender } from '@/utils';

const store = useGlobalStore();
const question = ref<string>('');

interface ResponseChatGPT {
  id: string,
  object: string,
  created: number,
  model: string,
  choices: [
    {
      delta: {
        content?: string,
        role?: string,
      },
      index: number,
      finish_reason: string | null
    }
  ]
}

const handleSendQuestion = async (e: KeyboardEvent | MouseEvent) => {
  // console.log('question: ', question.value);

  if (question.value.length === 0) { return; }

  const elQueueMessage = document.getElementById('queueMessage');

  if (!store.blockQuestion) {
    store.blockQuestion = true;

    store.queueMessage = [...store.queueMessage, { id: Date.now().toString(), type: 'user', content: question.value }] as Array<MessageProps>;
    await delayRender(150);

    const response = await fetch('https://free.churchless.tech/v1/chat/completions', {
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: 'user',
            content: question.value
          }
        ],
        stream: true
      }),
      headers: {
        'Accept': "text/event-stream",
        "Content-Type": "application/json",
        "Authorization": "Bearer MyDiscord"
      },
      method: 'POST',
    })

    question.value = '';

    if (response.body) {
      const readerResponse = response.body.pipeThrough(new TextDecoderStream()).getReader();
      store.queueMessage = [...store.queueMessage, { id: Date.now().toString(), type: 'bot', content: '' }] as Array<MessageProps>;
      const indexLastMessage = store.queueMessage.length - 1;
      while (true) {
        const { value, done } = await readerResponse.read() as { value: string, done: boolean };

        if (elQueueMessage) { elQueueMessage.scrollTo({ left: 0, top: elQueueMessage.scrollHeight, behavior: 'smooth' }); }

        if (done || value === '[DONE]') {
          break;
        }

        let answer = value.split("\n\n");

        for (const paraphrase of answer) {
          try {
            const responseBot: ResponseChatGPT = JSON.parse(paraphrase.substring(6));
            if (responseBot.choices[0].delta?.content) {
              store.queueMessage[indexLastMessage].content += responseBot.choices[0].delta.content;
            }
          } catch (error) {
            break;
          }
        }
      }
    }
    store.blockQuestion = false;
  }
}

</script>

<style scoped></style>