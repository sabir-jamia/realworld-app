import Vue from "vue";
import Vuex from "vuex";

import users from "../store/modules/users";
import article from "../store/modules/article";
import home from "../store/modules/home";
import { setToken } from "./api";

Vue.use(Vuex);

function initializeToken(store) {
  const token = localStorage.getItem("jwt");
  if (token) {
    setToken(token);
    store.dispatch("users/getUser");
  }

  store.subscribe(mutation => {
    if (mutation.type == "users/setUser") {
      localStorage.setItem("jwt", mutation.payload.user.token);
      setToken(mutation.payload.user.token);
    }
  });
}

export default new Vuex.Store({
  plugins: [initializeToken],
  modules: {
    home,
    users,
    article
  }
});
