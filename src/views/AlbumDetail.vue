<template>
  <div>
    <b-card header="Álbum" header-tag="header" :title="album.name">
      <b-card-text>{{ album.artist.name }}</b-card-text>
      <b-container fluid class="p-2 bg-dark" v-if="album.covers.length">
        <b-row>
          <b-col
            v-for="item in album.covers"
            :img-src="item.url"
            :key="item.id"
          >
            <b-img thumbnail fluid :src="item.url" width="256" height="256">
            </b-img>
          </b-col>
        </b-row>
      </b-container>
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
