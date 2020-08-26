import { api } from "../api";

export default {
  namespaced: true,
  state: {
    articles: [],
    comments: []
  },
  getters: {
    articles(state) {
      return state.articles;
    }
  },
  actions: {
    async getArticles({ commit }, payload = { page: 1 }) {
      let uri = "/articles?";
      if (payload) {
        const { tag, author, favorited, page } = payload;
        uri += tag ? `&tag=${tag}` : "";
        uri += author ? `&author=${author}` : "";
        uri += favorited ? `&favorited=${favorited}` : "";
        uri += page ? `&limit=10&offset=${(page - 1) * 10}` : "";
      }

      const response = await api.get(uri);
      commit("setArticles", response.data);
    },
    async getGlobalFeedArticles({ dispatch }, payload = { page: 1 }) {
      await dispatch("getArticles", payload);
    },
    async getUserFeedArticles({ commit }, payload = { page: 1 }) {
      let uri = "/articles/feed?";
      if (payload) {
        const { page } = payload;
        uri += page ? `limit=10&offset=${(page - 1) * 10}` : "";
      }

      const response = await api.get(uri);
      commit("setArticles", response.data);
    }
  },
  mutations: {
    setArticles(state, { articles }) {
      state.articles = articles;
    },
    setUserFeed(state, { articles }) {
      state.articles = articles;
    }
  }
};
