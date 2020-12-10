<template>
  <section style="position: relative" class="mb-3">
    <div id="info-area">
      <b-card no-body>
        <b-card-header id="info-nav" header-tag="nav">
          <b-nav card-header pills>
            <b-nav-item @click="toggler = true">Sobre nós</b-nav-item>
            <b-nav-item @click="toggler = false">Contato</b-nav-item>
          </b-nav>
        </b-card-header>
        <Informations :toggler="toggler" />
      </b-card>
    </div>

    <b-container class="border-shadow">
      <b-row id="search-area">
        <b-col class="mt-3" md>
          <b-input-group class="mb-3">
            <b-form-input
              v-model.lazy="pokename"
              @change="selected = 'all'"
              placeholder="Nome do Pokémon"
            ></b-form-input>
            <b-input-group-append>
              <b-form-select
                v-model="selected"
                @change="pokename = null"
                :options="options"
              ></b-form-select>
              <b-button text="Button" variant="dark" @click="search"
                >Procurar</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <PokemonsList
        :cols="2"
        :cols_sm="2"
        :cols_md="3"
        :cols_lg="4"
        :cols_xl="5"
        :profile="false"
        :allPokemons="allPokemons"
      />
      <b-row>
        <b-col class="text-center mb-3" md>
          <b-button-group>
            <b-button @click="loadMore">Carregar mais</b-button>
            <b-button href="#info-nav"><i class="fas fa-chevron-up"></i></b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Informations from "../components/Informations";
import PokemonsList from "../components/PokemonsList";

export default {
  name: "Home",
  components: {
    Informations,
    PokemonsList,
  },
  data() {
    return {
      page: 1,
      toggler: true,
      pokename: null,
      selected: "all",
      options: [
        { value: "all", text: "All" },
        { value: "colorless", text: "Colorless" },
        { value: "darkness", text: "Darkness" },
        { value: "dragon", text: "Dragon" },
        { value: "fairy", text: "Fairy" },
        { value: "fighting", text: "Fighting" },
        { value: "fire", text: "Fire" },
        { value: "grass", text: "Grass" },
        { value: "lightning", text: "Lightning" },
        { value: "metal", text: "Metal" },
        { value: "psychic", text: "Psychic" },
        { value: "water", text: "Water" },
      ],
    };
  },
  computed: {
    ...mapGetters(["allPokemons"]),
  },
  methods: {
    ...mapActions(["getPagePokemons"]),
    ...mapActions(["getSpecificPokemonCardsByName"]),
    ...mapActions(["getSpecificPokemonCardsByType"]),
    loadMore() {
      this.page++;
      this.getPagePokemons({ page: this.page, shuffle: false });
    },
    search() {
      if (this.pokename) {
        this.page = 0;
        this.getSpecificPokemonCardsByName(this.pokename);
      } else {
        if (this.selected != "all") {
          this.page = 0;
          this.getSpecificPokemonCardsByType(this.selected);
        }
      }
    },
  },
  created() {
    this.allPokemons.splice(0, this.allPokemons.length);
    this.getPagePokemons({ page: this.page, shuffle: false });
  },
};
</script>
