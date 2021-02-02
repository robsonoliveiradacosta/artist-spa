<template>
  <div>
    Album Page

    {{ albums }}
  </div>
</template>

<script>
import AlbumService from "@/services/AlbumService";

export default {
  data() {
    return {
      albums: []
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    getAll() {
      AlbumService.getAll().then(response => (this.albums = response.data));
    }
  }
};
</script>

<style></style>
