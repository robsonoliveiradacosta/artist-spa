import Vue from "vue";
import Vuex from "vuex";
import client from "@/services/http";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    keycloak: null
  },
  mutations: {
    SET_KEYCLOAK(state, keycloak) {
      state.keycloak = keycloak;
    },
    LOGIN(state) {
      state.keycloak.login();
    },
    LOGOUT(state) {
      state.keycloak.logout();
    },
    SET_AXIOS_TOKEN(state) {
      client.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${state.keycloak.token}`;
    }
  },
  actions: {
    storeKeycloak({ commit }, keycloak) {
      commit("SET_KEYCLOAK", keycloak);
    },
    login({ commit }) {
      commit("LOGIN");
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    axiosToken({ commit }) {
      commit("SET_AXIOS_TOKEN");
    }
  },
  getters: {
    isAuthenticated: state => {
      return state.keycloak && state.keycloak.authenticated;
    },
    name: state => {
      return state.keycloak.tokenParsed.preferred_username;
    }
  }
});
