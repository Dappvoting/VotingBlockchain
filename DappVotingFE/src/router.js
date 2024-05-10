import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/page/HomePage.vue";
import ContactPage from "./components/page/ContactPage.vue";
import AboutPage from "./components/page/AboutPage.vue";

const routes = [
  {
    path: "/:catchAll(.*)",
    component: HomePage,
  },
  {
    path: "/contact",
    component: ContactPage,
  },
  {
    path: "/about",
    component: AboutPage,
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
export default router;