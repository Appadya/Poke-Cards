<template>
  <b-container class="border-shadow">
    <b-card
      v-if="!loaded"
      no-body
      class="overflow-hidden p-3"
      style="max-width: 100%"
    >
      <b-row no-gutters>
        <b-col md="4">
          <b-img-lazy :src="getPokemon().imageUrlHiRes" class="w-100" rounded>
          </b-img-lazy>
          <small
            ><p v-if="getPokemon().artist" class="text-center">
              Artista: {{ getPokemon().artist }}
            </p></small
          >
        </b-col>
        <b-col md="8">
          <b-card-body
            :title="`${getPokemon().name} - n° ${
              (getPokemon().nationalPokedexNumber) ? getPokemon().nationalPokedexNumber : 'x'
            }`"
          >
            <div>
              <div v-if="getPokemon().hp">
                <b-card-text
                  ><strong>HP:</strong> {{ getPokemon().hp }}</b-card-text
                >
              </div>
            </div>
            <div>
              <b-card-text v-if="getPokemon().description"><strong>Sua descrição:</strong> {{ getPokemon().description }} </b-card-text>
              <b-card-text v-if="getPokemon().obtained"><strong>Card obtido em:</strong> {{ getPokemon().obtained }}</b-card-text>
              <b-card-text v-for="(text, id) in getPokemon().text" :key="id">
                {{ text }}
              </b-card-text>
            </div>
            <div class="border-shadow p-3">
              <div v-if="getPokemon().ability">
                <b-card-text><strong>Habilidade:</strong></b-card-text>
                <ul>
                  <li>{{ getPokemon().ability.name }}</li>
                  <b-card-text>{{ getPokemon().ability.text }}</b-card-text>
                </ul>
              </div>
              <div v-if="getPokemon().attacks">
                <b-card-text><strong>Ataque(s):</strong></b-card-text>
                <ul>
                  <li v-for="(attack, id) in getPokemon().attacks" :key="id">
                    {{ attack.name }} :
                    <small
                      ><i
                        >custo: {{ attack.cost.join(", ") }} -
                        <small
                          >dano: <strong>{{ attack.damage }}</strong></small
                        ></i
                      ></small
                    >
                    <b-card-text>{{ attack.text }}</b-card-text>
                  </li>
                </ul>
              </div>
              <div v-if="getPokemon().types">
                <b-card-text><strong>Tipo(s):</strong></b-card-text>
                <ul>
                  <li v-for="(type, id) in getPokemon().types" :key="id">
                    {{ type }}
                  </li>
                </ul>
              </div>
              <div v-if="getPokemon().weaknesses">
                <b-card-text><strong>Fraqueza(s):</strong></b-card-text>
                <ul>
                  <li
                    v-for="(weakness, id) in getPokemon().weaknesses"
                    :key="id"
                  >
                    {{ weakness.type }} {{ weakness.value }}
                  </li>
                </ul>
              </div>
              <div v-if="getPokemon().rarity">
                <b-card-text
                  ><strong>Raridade:</strong>
                  {{ getPokemon().rarity }}</b-card-text
                >
              </div>
              <div v-if="getPokemon().series">
                <b-card-text
                  ><strong>Series:</strong>
                  {{ getPokemon().series }}</b-card-text
                >
              </div>
              <div v-if="getPokemon().set">
                <b-card-text
                  ><strong>Set:</strong> {{ getPokemon().series }}</b-card-text
                >
              </div>
            </div>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
    <div class="d-flex justify-content-center m-4" v-else>
      <b-spinner
        variant="primary"
        style="width: 10rem; height: 10rem"
        label="Carregando..."
      ></b-spinner>
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Pokemon",
  data() {
    return {
      id: this.$route.params.id,
      pokemon: this.$route.params.pokemon,
    };
  },
  computed: {
    ...mapGetters(["specificPokemon"]),
    loaded() {
      return !this.pokemon ? !this.specificPokemon : !this.pokemon;
    },
  },
  methods: {
    ...mapActions(["getSpecificPokemonCardByid"]),
    getPokemon() {
      return !this.pokemon ? this.specificPokemon : this.pokemon;
    },
  },
  created() {
    if (!this.pokemon) {
      this.getSpecificPokemonCardByid(this.id);
    }
  },
};
</script>