<template>
  <div>
    <b-card>
      <b-card-header class="display-4">Artista</b-card-header>
      <b-card-body>
        <b-form @submit.prevent="save" v-if="show">
          <b-form-group label="Nome" label-for="name">
            <b-form-input id="name" v-model="form.name" required></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Salvar</b-button>
        </b-form>
      </b-card-body>
    </b-card>

    <b-table
      fixed
      responsive
      striped
      :items="artists"
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
        <span class="font-weight-bold display-4">Artistas</span>
      </template>
    </b-table>
  </div>
</template>

<script>
import ArtistService from "@/services/ArtistService";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      show: true,
      fields: [
        { key: "name", label: "Nome" },
        { key: "actions", label: "" }
      ],
      artists: [],
      form: {
        id: null,
        name: ""
      }
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    getAll() {
      ArtistService.getAll().then(response => (this.artists = response.data));
    },
    save() {
      if (this.form.id) {
        ArtistService.update(this.form.id, this.form)
          .then(() => this.init("Artista atualizado."))
          .catch(error => Swal.fire("", error.response.data.message, "error"));
      } else {
        ArtistService.create(this.form)
          .then(() => this.init("Artista criado."))
          .catch(error => Swal.fire("", error.response.data.message, "error"));
      }
    },
    update(artist) {
      this.form = JSON.parse(JSON.stringify(artist));
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
          ArtistService.delete(id).then(() => this.init("Artista deletado."));
        }
      });
    },
    resetForm() {
      this.form.id = null;
      this.form.name = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    init(message) {
      Swal.fire("", message, "success");
      this.getAll();
      this.resetForm();
    }
  }
};
</script>

<style></style>
