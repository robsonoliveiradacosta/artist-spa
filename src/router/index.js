import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

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
    path: "/album-detail",
    name: "AlbumDetail",
    component: () => import("../views/AlbumDetail.vue"),
    props: true
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
  const loggedIn = Vue.prototype.$keycloak.authenticated;

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
