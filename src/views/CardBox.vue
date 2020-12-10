<template>
  <b-container fluid>
    <div class="border-shadow mt-4 mb-4">
      <b-container>
        <b-row>
          <b-col class="m-4" md>
            <h2>Clique para abrir!</h2>
            <b-img
              id="cards-deck"
              src="../assets/cardbox.png"
              @click="dailyChecker(new Date())"
              alt="Baralho lacrado de cartas Pokémon"
            ></b-img>
          </b-col>
          <b-col md>
            <b-alert :show="render_error" variant="danger">{{
              error_message
            }}</b-alert>
            <PokemonsList
              :cols="2"
              :cols_sm="2"
              :cols_md="3"
              :cols_lg="3"
              :cols_xl="3"
              :profile="false"
              v-if="render_cards"
              :allPokemons="allPokemons"
            />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-container>
</template>

<script>
import { FirebaseManager } from "../firebase/firebase";
import { mapGetters, mapActions } from "vuex";
import PokemonsList from "../components/PokemonsList";

export default {
  name: "CardBox",
  data() {
    return {
      render_cards: false,
      render_error: false,
      error_message: null,
    };
  },
  components: {
    PokemonsList,
  },
  computed: {
    ...mapGetters(["allPokemons", "user"]),
  },
  methods: {
    ...mapActions(["getPagePokemons"]),
    dailyChecker(timeNow) {
      FirebaseManager.setDailyCards(this.user.data.email, timeNow, this.allPokemons, (response, result) => {
        if(response){
          this.render_cards = true;
          this.render_error = false;
        } else {
          this.render_error = true;
          this.error_message = result;
        }
      })
    },
  },
  mounted() {
    this.getPagePokemons({
      page: Math.floor(Math.random() * 130) + 1,
      shuffle: true,
    });
  },
  created() {
    this.allPokemons.splice(0, this.allPokemons.length);
  },
};
</script>