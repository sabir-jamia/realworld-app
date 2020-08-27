import Vue from "vue";
import Vuex from "vuex";

import users from "../store/modules/users";
import article from "../store/modules/article";
import home from "../store/modules/home";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    users,
    article
  }
});
