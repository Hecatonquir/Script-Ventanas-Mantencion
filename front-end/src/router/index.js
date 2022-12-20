import { createRouter, createWebHistory } from "vue-router";
import ScriptView from "../views/ScriptView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "script",
      component: ScriptView,
    },
  ],
});

export default router;
