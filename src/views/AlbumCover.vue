<template>
  <div>
    <b-card>
      <b-card-header class="display-4">Álbum</b-card-header>
      <b-card-body>
        <b-container>
          <b-row>
            <b-col>{{ album.name }}</b-col>
          </b-row>
          <b-row>
            <b-col>{{ album.artist.name }}</b-col>
          </b-row>
          <b-row
            v-for="item in album.covers"
            v-bind:key="item.id"
            class="mb-2 no-gutters"
            align-v="center"
          >
            <b-col cols="12" lg="1">
              <b-img :src="item.url" width="128" height="128" thumbnail></b-img>
            </b-col>
            <b-col cols="12" lg="1">
              <b-link :href="item.url" target="_blank">
                Visualizar
              </b-link>
            </b-col>
            <b-col cols="12" lg="1">
              <b-button
                variant="danger"
                @click="removeCover(item.objectName)"
                v-b-tooltip
                title="Deletar"
              >
                <b-icon icon="trash"></b-icon>
              </b-button>
            </b-col>
          </b-row>
        </b-container>

        <hr class="my-4" />
        <b-form @submit.prevent="addCover" v-if="show">
          <b-form-group label="Capa" label-for="file">
            <b-form-file
              id="file"
              v-model="file"
              accept="image/*"
              placeholder="Escolha ou solte aqui..."
              drop-placeholder="solte aqui..."
            >
            </b-form-file>
          </b-form-group>

          <b-button type="submit" variant="primary">Salvar</b-button>
        </b-form>
      </b-card-body>
    </b-card>
    <hr class="my-4" />
    <router-link :to="{ path: 'album-search', query: { search: search } }">
      Voltar para Pesquisa
    </router-link>
  </div>
</template>

<script>
import AlbumService from "@/services/AlbumService";
import Swal from "sweetalert2";

export default {
  props: {
    album: {
      type: Object,
      required: true
    },
    search: String
  },
  data() {
    return {
      show: true,
      file: null
    };
  },
  methods: {
    findById() {
      AlbumService.findById(this.album.id).then(
        response => (this.album.covers = response.data.covers)
      );
    },
    addCover() {
      if (!this.file) {
        Swal.fire("", "selecione a Capa", "error");
        return;
      }
      let formData = new FormData();
      formData.append("file", this.file);
      AlbumService.addCover(this.album.id, formData)
        .then(() => this.init("Capa adicionada"))
        .catch(error => Swal.fire("", error.response.data.message, "error"));
    },
    removeCover(objectName) {
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
          AlbumService.removeCover(objectName)
            .then(() => this.init("Capa removida"))
            .catch(error =>
              Swal.fire("", error.response.data.message, "error")
            );
        }
      });
    },
    resetForm() {
      this.file = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    init(message) {
      Swal.fire("", message, "success");
      this.findById();
      this.resetForm();
    }
  }
};
</script>

<style></style>
