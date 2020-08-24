import clearToken, { api, setToken } from "../api";

export default {
  namespaced: true,
  state: {
    user: null,
    profile: null
  },
  getters: {
    username(state) {
      return state?.user?.username;
    }
  },
  actions: {
    getUser: async function({ commit }) {
      const user = await api.get("/user");
      commit("setUser", user);
    },
    loginUser: async function({ commit }, { email, password }) {
      clearToken();
      try {
        const response = await api.post("/users/login", {
          user: {
            email,
            password
          }
        });

        if (response.data.user) {
          setToken(response.data.user.token);
          commit("setUser", response.data.user);
        }
      } catch (e) {
        console.error({ e });
        throw e;
      }
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  }
};
