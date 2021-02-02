<template>
  <div>
    Home Page
    <b-button variant="outline-primary" @click="login" v-if="!isAuthenticated">
      Login
    </b-button>
    <b-button variant="danger" @click="logout" v-if="isAuthenticated">
      Logout
    </b-button>
    <h3 v-if="isAuthenticated">Usuário: {{ name }}</h3>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["isAuthenticated", "name"])
  },
  methods: {
    login() {
      this.$store.dispatch("login");
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style></style>
