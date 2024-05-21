import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/page/HomePage.vue";
import ContactPage from "./components/page/ContactPage.vue";
import AboutPage from "./components/page/AboutPage.vue";
import CampaignPage from "./components/page/CampaignPage.vue";
import DetailCampaign from "./components/campaign/DetailCampaign.vue";
import Profile from "./components/profile/Profile.vue";
import LoginScreen from "./components/auth/LoginScreen.vue";

const routes = [
  {
    path: "/",
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
  {
    path: "/campaign",
    component: CampaignPage,
  },
  {
    path: "/login",
    component: LoginScreen,
  },
  {
    path: "/campaign/details/:id",
    component: DetailCampaign,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/:catchAll(.*)",
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const walletAddress = localStorage.getItem('walletAddress');
  const publicPages = ['/', '/home', '/contact', '/about', '/campaign', '/campaign/details', '/login'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !walletAddress) {
    return next('/login');
  }

  next();
});

export default router;
