<template>
  <b-row
    :cols="cols"
    :cols-sm="cols_sm"
    :cols-md="cols_md"
    :cols-lg="cols_lg"
    :cols-xl="cols_xl"
  >
    <b-col
      v-for="pokemon in allPokemons"
      :key="pokemon.id"
      style="position: relative"
      col
      no-gutters
      class="mb-4"
    >
      <div v-if="profile" class="border-shadow">
        <b-nav tabs align="center">
          <b-nav-item v-b-modal="`editmodel-${pokemon.id}`"
            ><span style="color: green"><i class="fas fa-edit"></i></span
          ></b-nav-item>
          <b-nav-item @click="openDeleteModal(pokemon)"
            ><span style="color: red"><i class="fas fa-trash-alt"></i></span
          ></b-nav-item>
        </b-nav>
        <div>
          <b-modal
            :id="`editmodel-${pokemon.id}`"
            ref="modal"
            title="Edição de descrição"
            @ok="handleDescriptionSubmit(pokemon)"
          >
            <form ref="form">
              <b-form-textarea
                id="description-textarea"
                v-model.lazy="description"
                :placeholder="(pokemon.description) ? pokemon.description : 'Descrição'"
                rows="3"
                no-resize
              ></b-form-textarea>
            </form>
          </b-modal>
        </div>
        <router-link
          :to="{
            name: 'Pokemon',
            params: { id: pokemon.id, pokemon: pokemon },
          }"
        >
          <b-img-lazy
            :src="pokemon.imageUrl"
            blank-color="#dc35452b"
            class="cards w-100 h-100"
            rounded
          ></b-img-lazy>
        </router-link>
      </div>
      <div v-else>
        <router-link
          :to="{
            name: 'Pokemon',
            params: { id: pokemon.id, pokemon: pokemon },
          }"
        >
          <b-img-lazy
            :src="pokemon.imageUrl"
            blank-color="#dc35452b"
            class="cards w-100 h-100"
            rounded
          ></b-img-lazy>
        </router-link>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { FirebaseManager } from "../firebase/firebase";
import { mapGetters } from "vuex";

export default {
  name: "PokemonsList",
  data() {
    return {
      description: "",
      err: null,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    handleDescriptionSubmit(pokemon) {
      pokemon.description = this.description;
      FirebaseManager.updateUserCard(
        this.user.data.email,
        pokemon,
        (response, result) => {
          if (!response) this.err = result;
          this.description = "";
        }
      );
    },
    openDeleteModal(pokemon) {
      this.$bvModal
        .msgBoxConfirm(
          `Você possui x${pokemon.quantity} card(s) do ${pokemon.name}, deseja descartar ou mante-lo?`,
          {
            title: "Aviso",
            okVariant: "danger",
            okTitle: "Descartar",
            cancelTitle: "Manter",
            cancelVariant: "success",
            footerClass: "p-2",
            centered: true,
          }
        )
        .then((value) => {
          if (value) {
            FirebaseManager.discardUserCard(
              this.user.data.email,
              pokemon,
              (response, result) => {
                if (response) {
                  this.$router.go();
                } else {
                  this.err = result;
                }
              }
            );
          }
        })
        .catch((err) => {
          this.err = err;
        });
    },
  },
  props: {
    cols: Number,
    cols_sm: Number,
    cols_md: Number,
    cols_lg: Number,
    cols_xl: Number,
    profile: Boolean,
    allPokemons: Array,
  },
};
</script>