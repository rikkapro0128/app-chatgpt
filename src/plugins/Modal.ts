import Modal from "@/components/Modal.vue";

import { App } from "vue";

declare module "vue" {
  interface ComponentCustomProperties {
    $modal: {
      show: () => void;
      hide: () => void;
    };
  }
}

export default {
  install(app: App): void {
    // configure the app

    app.component("app-modal", Modal);

    app.config.globalProperties.$modal = {
      show: () => { console.log('show');
       },
      hide: () => { console.log('hide'); },
    };
    // app.config.globalProperties.$modal.show = handleShow();
    // app.config.globalProperties.$modal.hide = handleHide();
  },
};
