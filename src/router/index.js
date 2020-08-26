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
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue")
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(/* webpackChunName: "settings" */ "../views/Settings.vue")
  },
  {
    path: "/editor",
    name: "EditorNew",
    component: () =>
      import(/* webpackChunName: "editor_new" */ "../views/ArticleCreate.vue")
  },
  {
    path: "/editor/:article-slug",
    name: "EditorEdit",
    component: () =>
      import(/* webpackChunName: "editor_edit" */ "../views/ArticleEdit.vue")
  },
  {
    path: "/article/:article-slug",
    name: "Article",
    component: () =>
      import(/* webpackChunName: "article" */ "../views/Article.vue")
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
