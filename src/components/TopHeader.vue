<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Artistas e Álbuns</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Página Inicial</b-nav-item>
          <b-nav-item v-if="isAuthenticated" to="/artist">Artistas</b-nav-item>
          <b-nav-item v-if="isAuthenticated" to="/album">Álbuns</b-nav-item>
          <b-nav-item v-if="isAuthenticated" to="/album-search">
            Pesquisar Álbuns
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-text v-if="isAuthenticated" class="mr-3">
            {{ name }}
          </b-nav-text>
          <b-button variant="danger" @click="logout" v-if="isAuthenticated">
            Logout
          </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "TopHeader",
  data() {
    return {
      isAuthenticated: this.$keycloak.authenticated,
      name: this.$keycloak.tokenParsed.preferred_username
    };
  },
  methods: {
    logout() {
      this.$keycloak.logout();
    }
  }
};
</script>

<style></style>
