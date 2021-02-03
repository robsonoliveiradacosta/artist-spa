import Vue from "vue";
import Vuex from "vuex";
import client from "@/services/http";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {
    LOGOUT() {
      Vue.prototype.$keycloak.logout();
    },
    SET_AXIOS_TOKEN() {
      client.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${Vue.prototype.$keycloak.token}`;
    }
  },
  actions: {
    logout({ commit }) {
      commit("LOGOUT");
    },
    axiosToken({ commit }) {
      commit("SET_AXIOS_TOKEN");
    }
  }
});
