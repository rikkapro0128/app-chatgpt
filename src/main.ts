import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@flaticon/flaticon-uicons/css/all/all.css";

import 'md-editor-v3/lib/preview.css';

import "@/tailwindcss/style.css";

/* Theme variables */
import "@/theme/variables.css";

const pinia = createPinia();
const app = createApp(App).use(router).use(pinia);

router.isReady().then(() => {
  app.mount("#app");
});
