<template>
  <div>
    <b-card header="Álbum" header-tag="header" :title="album.name">
      <b-card-text>{{ album.artist.name }}</b-card-text>
    </b-card>
    <hr class="my-4" />
    <router-link :to="{ path: 'album-search', query: { search: search } }">
      Voltar para Pesquisa
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    album: {
      type: Object,
      required: true
    },
    search: String
  }
};
</script>

<style></style>
