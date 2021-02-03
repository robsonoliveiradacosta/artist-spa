<template>
  <div>
    <b-card>
      <b-card-header class="display-4">Álbum</b-card-header>
      <b-card-body>
        <b-form @submit.prevent="save" v-if="show">
          <b-form-group label="Nome" label-for="name">
            <b-form-input id="name" v-model="form.name" required></b-form-input>
          </b-form-group>

          <b-form-group label="Artista" label-for="artist">
            <b-form-select
              id="artist"
              v-model="form.artist.id"
              :options="artists"
              value-field="id"
              text-field="name"
              required
            ></b-form-select>
          </b-form-group>

          <b-button type="submit" variant="primary">Salvar</b-button>
        </b-form>
      </b-card-body>
    </b-card>

    <b-table
      id="albumTable"
      fixed
      responsive
      striped
      :items="albums"
      :fields="fields"
      caption-top
    >
      <template v-slot:cell(actions)="row">
        <b-button
          variant="info"
          class="mr-2"
          @click="update(row.item)"
          v-b-tooltip
          title="Editar"
        >
          <b-icon icon="pencil"></b-icon>
        </b-button>
        <b-button
          variant="danger"
          @click="remove(row.item.id)"
          v-b-tooltip
          title="Deletar"
        >
          <b-icon icon="trash"></b-icon>
        </b-button>
      </template>
      <template #table-caption>
        <span class="font-weight-bold display-4">Álbuns</span>
      </template>
    </b-table>

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
import ArtistService from "@/services/ArtistService";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      show: true,
      fields: [
        { key: "name", label: "Nome" },
        { key: "artist.name", label: "Artista" },
        { key: "actions", label: "" }
      ],
      albums: [],
      form: {
        id: null,
        name: "",
        artist: {
          id: null
        }
      },
      artists: [],
      perPage: 5,
      currentPage: 1,
      totalElements: 0
    };
  },
  created() {
    this.getPaginated();
    this.getArtists();
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
    },
    getArtists() {
      ArtistService.getAll().then(response => (this.artists = response.data));
    },
    save() {
      if (this.form.id) {
        AlbumService.update(this.form.id, this.form)
          .then(() => this.init("Álbum atualizado."))
          .catch(error => Swal.fire("", error.response.data.message, "error"));
      } else {
        AlbumService.create(this.form)
          .then(() => this.init("Álbum criado."))
          .catch(error => Swal.fire("", error.response.data.message, "error"));
      }
    },
    update(album) {
      this.form = JSON.parse(JSON.stringify(album));
    },
    remove(id) {
      Swal.fire({
        title: "Tem certeza?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SIM",
        cancelButtonText: "NÃO"
      }).then(result => {
        if (result.value) {
          AlbumService.delete(id).then(() => this.init("Álbum deletado."));
        }
      });
    },
    resetForm() {
      this.form.id = null;
      this.form.name = "";
      this.form.artist.id = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    init(message) {
      Swal.fire("", message, "success");
      this.getPaginated();
      this.resetForm();
    }
  }
};
</script>

<style></style>
