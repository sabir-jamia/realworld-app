import { api } from "../api";

const state = {
  article: {
    title: "",
    description: "",
    body: "",
    tagList: [],
    author: {
      username: ""
    }
  }
};

const getters = {
  article(state) {
    return state.article;
  }
};

const actions = {
  async storeArticle({ commit }, payload) {
    const response = await api.post("/articles", { article: payload });
    commit("setArticle", response.data);
  },

  async getArticle({ commit }, payload) {
    const response = await api.get(`/articles/${payload}`);
    commit("setArticle", response.data);
  }
};

const mutations = {
  setArticle(state, { article }) {
    state.article = article;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
