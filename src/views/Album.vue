<template>
  <div>
    <b-table
      id="albumTable"
      :fields="fields"
      :items="albums"
      :current-page="currentPage"
      small
    ></b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="totalElements"
      :per-page="perPage"
      @change="pageChange"
      aria-controls="albumTable"
    ></b-pagination>
  </div>
</template>

<script>
import AlbumService from "@/services/AlbumService";

export default {
  data() {
    return {
      fields: [
        { key: "id", label: "ID" },
        { key: "name", label: "Nome" },
        { key: "artist.name", label: "Artista" }
      ],
      albums: [],
      perPage: 5,
      currentPage: 1,
      totalElements: 0
    };
  },
  created() {
    this.getPaginated();
  },
  methods: {
    pageChange(pageNumber) {
      this.currentPage = pageNumber;
      this.getPaginated();
    },
    getPaginated() {
      AlbumService.getPaginated(this.perPage, this.currentPage - 1).then(
        response => {
          this.albums = response.data.content;
          this.totalElements = response.data.totalElements;
        }
      );
    }
  }
};
</script>

<style></style>
