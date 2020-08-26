import clearToken, { api, setToken } from "../api";

export default {
  namespaced: true,
  state: {
    user: {
      username: null
    },
    profile: null
  },
  getters: {
    username(state) {
      return state.user.username;
    },
    profile(state) {
      return state.profile;
    },
    user(state) {
      return state.user;
    }
  },
  actions: {
    getUser: async function({ commit }) {
      const user = await api.get("/user");
      commit("setUser", user.data);
    },
    async loginUser({ commit }, { email, password }) {
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
    }
  },
  mutations: {
    setUser(state, { user }) {
      state.user = user;
    },
    setProfile(state, { profile }) {
      state.profile = profile;
    }
  }
};
