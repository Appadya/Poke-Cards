<template>
  <b-container>
    <b-alert variant="danger" :show="hasCards">Você não possui nenhuma carta!</b-alert>
    <PokemonsList
      class="mt-3"
      :cols="2"
      :cols_sm="2"
      :cols_md="3"
      :cols_lg="4"
      :cols_xl="5"
      :profile="true"
      :allPokemons="allPokemons"
    />
  </b-container>
</template>

<script>
import { FirebaseManager } from "../firebase/firebase";
import { mapGetters } from "vuex";
import PokemonsList from "../components/PokemonsList";

export default {
  name: "MyCards",
  data() {
    return {
      allPokemons: [],
      error: null,
    };
  },
  components: {
    PokemonsList,
  },
  computed: {
    ...mapGetters(["user"]),
    hasCards() {
      return this.allPokemons.length > 0 ? false : true;
    },
  },
  created() {
    FirebaseManager.getUserCards(this.user.data.email, (response, result, data) => {
      if(response){
        this.allPokemons = data;
      } else {
        this.error = result;
      }
    })
  },
};
</script>