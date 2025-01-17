import { createApp, h } from 'vue';
import App from './App.vue';
import './style.css';
import router from './router';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { DefaultApolloClient } from '@vue/apollo-composable';
import apolloClient from './apollo';
import AOS from 'aos';
import 'aos/dist/aos.css';

const app = createApp({
  setup() {
    return {
      [DefaultApolloClient]: apolloClient,
    };
  },
  render: () => h(App),
});

app.use(Toast, {
  position: POSITION.TOP_RIGHT,
});

app.use(router);

app.mount('#app');

// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
});
