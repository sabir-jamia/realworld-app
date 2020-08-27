import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import HomeGlobal from "../views/HomeGlobal";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "",
        name: "home",
        component: HomeGlobal
      },
      {
        path: "my-feed",
        name: "home-my-feed",
        component: () => import("../views/HomeMyFeed")
      },
      {
        path: "feed/:tag",
        name: "home-tag",
        component: () => import("../views/HomeTag")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register")
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("../views/Settings")
  },
  {
    path: "/editor",
    name: "article-new",
    component: () => import("../views/ArticleCreate")
  },
  {
    path: "/editor/:slug",
    name: "article-edit",
    component: () => import("../views/ArticleEdit")
  },
  {
    path: "/articles/:slug",
    name: "article",
    component: () => import("../views/Article")
  },
  {
    path: "/@:username",
    component: () => import("../views/Profile"),
    children: [
      {
        path: "",
        name: "profile",
        component: () => import("../views/ProfileArticles")
      },
      {
        path: "favorites",
        name: "profile-favorites",
        component: () => import("../views/ProfileFavorited")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
