import { api } from "../api";

const state = {
  profile: {
    image: null,
    username: null
  }
};

const getters = {
  profile(state) {
    return state.profile;
  }
};

const actions = {
  async follow({ commit }, payload) {
    const { username } = payload;
    const response = await api.post(`/profiles/${username}/follow`);
    commit("setProfile", response.data);
  },
  async unfollow({ commit }, payload) {
    const { username } = payload;
    const response = await api.delete(`/profiles/${username}/follow`);
    commit("setProfile", response.data);
  },
  async getProfile({ commit }, payload) {
    const { username } = payload;
    const response = await api.get(`profiles/${username}`);
    commit("setProfile", response.data);
  }
};

const mutations = {
  setProfile(state, { profile }) {
    state.profile = profile;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
