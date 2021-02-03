<template>
  <div>
    <b-card header="Álbum" header-tag="header" :title="album.name">
      <b-card-text>{{ album.artist.name }}</b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    album: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
