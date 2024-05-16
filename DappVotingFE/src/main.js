import { createApp } from 'vue'
import App from './App.vue'
import "./style.css";
import router from "./router";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(router);

app.use(Toast, {
  position: POSITION.TOP_RIGHT
});

app.mount("#app");
