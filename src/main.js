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

let initOptions = {
  url: "http://localhost:8080/auth",
  realm: "artist",
  clientId: "artist-spa",
  onLoad: "login-required"
};

let keycloak = Keycloak(initOptions);
Vue.prototype.$keycloak = keycloak;

keycloak
  .init({ onLoad: initOptions.onLoad, pkceMethod: "S256" })
  .then(auth => {
    if (!auth) {
      window.location.reload();
    } else {
      console.log("Authenticated");

      Vue.config.productionTip = false;
      Vue.use(BootstrapVue);
      Vue.use(BootstrapVueIcons);

      new Vue({
        router,
        store,
        render: h => h(App),
        created() {
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
      }).$mount("#app");
    }

    // Token Refresh
    setInterval(() => {
      keycloak
        .updateToken(70)
        .then(refreshed => {
          if (refreshed) {
            console.log("Token refreshed" + refreshed);
          } else {
            console.log(
              "Token not refreshed, valid for " +
                Math.round(
                  keycloak.tokenParsed.exp +
                    keycloak.timeSkew -
                    new Date().getTime() / 1000
                ) +
                " seconds"
            );
          }
        })
        .catch(() => {
          console.log("Failed to refresh token");
        });
    }, 6000);
  })
  .catch(() => {
    console.log("Authenticated Failed");
  });

keycloak.onAuthSuccess = async function() {
  client.defaults.headers.common["Authorization"] = `Bearer ${keycloak.token}`;
};

keycloak.onAuthRefreshSuccess = async function() {
  client.defaults.headers.common["Authorization"] = `Bearer ${keycloak.token}`;
};
