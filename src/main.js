import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import Keycloak from "keycloak-js";
import client from "./services/http";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.init();
  },
  methods: {
    init() {
      let keycloak = new Keycloak({
        url: "http://localhost:8080/auth",
        realm: "artist",
        clientId: "artist-spa"
      });
      keycloak.init({ pkceMethod: "S256" });
      this.$store.dispatch("storeKeycloak", keycloak);
      keycloak.onAuthSuccess = () => {
        this.$store.dispatch("axiosToken");
      };
      client.interceptors.response.use(
        response => response, // simply return the response
        error => {
          if (error.response.status === 401) {
            // if we catch a 401 error
            this.$store.dispatch("logout"); // force a log out
          }
          return Promise.reject(error); // reject the Promise, with the error as the reason
        }
      );
    }
  }
}).$mount("#app");
