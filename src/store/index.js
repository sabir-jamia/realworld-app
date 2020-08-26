import Vue from "vue";
import Vuex from "vuex";

import users from "../store/modules/users";
import articles from "../store/modules/articles";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  modules: {
    users,
    articles
  }
});
