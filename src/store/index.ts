import { defineStore } from "pinia";
import { MessageProps } from "@/components/BodyMessage.vue";

interface StateProps {
  blockQuestion: boolean;
  queueMessage: Array<MessageProps> | Array<[]>;
}

export const useGlobalStore = defineStore("global", {
  state: (): StateProps => ({
    blockQuestion: false,
    queueMessage: [],
  }),
});
