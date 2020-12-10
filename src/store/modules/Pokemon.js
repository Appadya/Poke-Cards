import axios from 'axios'

const state = {
    pokemon: null,
    pokemons: []
},
    getters = {
        specificPokemon: state => state.pokemon,
        allPokemons: state => state.pokemons
    },
    actions = {
        getPagePokemons({ commit }, { page, shuffle }) {
            axios.get(`https://api.pokemontcg.io/v1/cards?page=${page}`)
                .then(response => {
                    if(shuffle){
                        commit('getPagePokemons', response.data.cards.shuffle().slice(0, 6))
                    } else {
                        commit('getPagePokemons', response.data.cards)
                    }
                });
        },
        getSpecificPokemonCardsByName({ commit }, pokemon) {
            axios.get(`https://api.pokemontcg.io/v1/cards?name=${pokemon}`)
                .then(response => {
                    commit('getSpecificPokemonCardsByName', response.data.cards)
                });
        },
        getSpecificPokemonCardsByType({ commit }, type) {
            axios.get(`https://api.pokemontcg.io/v1/cards?types=${type}`)
                .then(response => {
                    commit('getSpecificPokemonCardsByType', response.data.cards)
                });
        },
        getSpecificPokemonCardByid({ commit }, id) {
            axios.get(`https://api.pokemontcg.io/v1/cards/${id}`)
                .then(response => {
                    commit('getSpecificPokemonCardByid', response.data.card);
                })
        }
    },
    mutations = {
        getPagePokemons: (state, data) => state.pokemons.push(...data),
        getSpecificPokemonCardsByName: (state, data) => state.pokemons = data,
        getSpecificPokemonCardsByType: (state, data) => state.pokemons = data,
        getSpecificPokemonCardByid: (state, data) => state.pokemon = data,
    }

// state.pokemons = concatenated.reduce((u, o) => {
//     if (!u.some(p => p.id === o.id)) u.push(o);
//     return u;
// }, []);

Object.defineProperty(Array.prototype, 'shuffle', {
    value: function () {
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
        return this;
    }
});

export default {
    state,
    actions,
    getters,
    mutations
}