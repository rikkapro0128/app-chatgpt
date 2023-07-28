import Modal from "@/components/Modal.vue";

import { App, provide, inject } from "vue";
import mitt, { Emitter, EventType } from "mitt";

const emitter = mitt();

export const useModal = () => {
  const modalEvent = inject("app-modal-emit") as Emitter<
    Record<EventType, unknown>
  >;
  return {
    show: () => {
      modalEvent.emit("show");
    },
    hide: () => {
      modalEvent.emit("hide");
    },
    toggle: () => {
      modalEvent.emit("toggle");
    },
  };
};

export default {
  install(app: App): void {
    // configure the app

    app.component("app-modal", Modal);

    app.provide("app-modal-emit", emitter);
  },
};
