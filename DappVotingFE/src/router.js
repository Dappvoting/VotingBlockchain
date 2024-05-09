import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/page/HomePage.vue";

const routes = [
  {
    path: "/:catchAll(.*)",
    component: HomePage,
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
export default router;