import { api } from "../api";

const state = {
  user: {
    token: null,
    username: null,
    isAuthenticated: false
  }
};

const getters = {
  username(state) {
    return state.user.username;
  },
  isAuthenticated() {
    return state.user.username != null;
  },
  currentUser(state) {
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
  async updateUser({ commit }, { email, username, password, image, bio }) {
    const user = { email, username, image, bio };
    if (password) {
      user.password = password;
    }

    const response = await api.put("/user", user);
    commit("setUser", response.data);
  },
  async logoutUser({ commit }) {
    commit("clearUser");
  },
  async storeUser(state, payload) {
    const { user } = payload;
    await api.post("/users", { user });
  }
};

const mutations = {
  setUser(state, { user }) {
    state.user = user;
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
