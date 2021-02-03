import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/album",
    name: "Album",
    component: () => import("../views/Album.vue")
  },
  {
    path: "/album-search",
    name: "AlbumSearch",
    component: () => import("../views/AlbumSearch.vue")
  },
  {
    path: "/artist",
    name: "Artist",
    component: () => import("../views/Artist.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters.isAuthenticated;

  if (to.path == "/") {
    return next();
  }

  if (loggedIn) {
    return next();
  } else {
    return next("/");
  }
});

export default router;
