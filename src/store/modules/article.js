import { api } from "../api";

const initArticle = {
  title: "",
  description: "",
  body: "",
  tagList: [],
  author: {}
};

const state = {
  article: initArticle,
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

  async updateArticle({ commit }, payload) {
    const { slug } = payload;
    const response = await api.put(`/articles/${slug}`, { article: payload });
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
  },

  async addFavorite({ commit }, payload) {
    const { slug } = payload;
    const response = await api.post(`/articles/${slug}/favorite`);
    commit("setArticle", response.data);
    commit("home/setArticleInList", response.data, { root: true });
  },

  async removeFavorite({ commit }, payload) {
    const { slug } = payload;
    const response = await api.delete(`/articles/${slug}/favorite`);
    commit("setArticle", response.data);
    commit("home/setArticleInList", response.data, { root: true });
  },

  async deleteArticle({ dispatch }, payload) {
    const { slug } = payload;
    api.delete(`/articles/${slug}`);
    dispatch("resetArticleState");
  },

  resetArticleState({ commit }) {
    commit("setArticle", { article: initArticle });
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
