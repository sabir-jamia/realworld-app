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
    path: "/:username",
    name: "Profile",
    compoent: () =>
      import(/* webpackChunName: "profile" */ "../views/Profile.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
