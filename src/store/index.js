import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/Auth'
import pokemon from './modules/Pokemon'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    pokemon,
    auth
  }
})
