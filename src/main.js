import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { BootstrapVue } from "bootstrap-vue";
import Keycloak from "keycloak-js";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

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
    }
  }
}).$mount("#app");
