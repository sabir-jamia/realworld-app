import { api } from "../api";

const state = {
  articles: [],
  tags: []
};

const getters = {
  tags(state) {
    return state.tags;
  },
  articles(state) {
    return state.articles;
  }
};

const actions = {
  async getArticles({ commit }, payload = { page: 1 }) {
    let uri = "/articles?";
    if (payload) {
      const { page, ...rest } = payload;

      uri += page ? `limit=10&offset=${(page - 1) * 10}` : "";
      uri += Object.entries(rest)
        .map(([prop, value]) => `${prop}=${value}`)
        .join("&");
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
  },

  async getTags({ commit }) {
    const response = await api.get("/tags");
    commit("setTags", response.data);
  }
};

const mutations = {
  setTags(state, { tags }) {
    state.tags = tags;
  },
  setArticles(state, { articles }) {
    state.articles = articles;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
