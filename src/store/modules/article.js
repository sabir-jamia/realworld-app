import { api } from "../api";

const state = {
  article: {
    title: "",
    description: "",
    body: "",
    tagList: [],
    author: {}
  },
  comments: []
};

const getters = {
  article(state) {
    return state.article;
  },
  comments(state) {
    return state.comments;
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
  },

  async getComments({ commit }, payload) {
    const response = await api.get(`/articles/${payload}/comments`);
    commit("setComments", response.data);
  },

  async storeComment({ dispatch }, payload) {
    const { comment, slug } = payload;
    await api.post(`/articles/${slug}/comments`, { comment });
    dispatch("getComments", slug);
  }
};

const mutations = {
  setArticle(state, { article }) {
    state.article = article;
  },

  setComments(state, { comments }) {
    state.comments = comments;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
