import { api, clearToken } from "../api";

const state = {
  user: {
    token: null,
    username: null
  },
  profile: null
};

const getters = {
  username(state) {
    return state.user.username;
  },
  profile(state) {
    return state.profile;
  },
  user(state) {
    return state.user;
  }
};

const actions = {
  async getUser({ commit }) {
    const user = await api.get("/user");
    commit("setUser", user.data);
  },
  async loginUser({ commit }, { email, password }) {
    try {
      const response = await api.post("/users/login", {
        user: {
          email,
          password
        }
      });

      if (response.data.user) {
        commit("setUser", response.data);
      }
    } catch (e) {
      console.error({ e });
      throw e;
    }
  },
  async loadProfile({ commit }, { username }) {
    const uri = `/profiles/${username}`;
    const response = await api.get(uri);
    commit("setProfile", response.data);
  },
  async updateUser({ commit }, { email, username, password, image, bio }) {
    const uri = "/user";
    const user = { email, username, image, bio };
    if (password) {
      user.password = password;
    }

    const response = await api.put(uri, user);
    commit("setUser", response.data);
  },
  async logoutUser({ commit }) {
    commit("clearUser");
  }
};

const mutations = {
  setUser(state, { user }) {
    state.user = user;
  },
  setProfile(state, { profile }) {
    state.profile = profile;
  },
  clearUser(state) {
    state.user = { token: null, username: null };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
