<template>
  <b-navbar id="navigation" toggleable="md" type="dark">
    <b-navbar-brand class="d-md-none">
      <router-link to="/"
        ><img id="logo" src="@/assets/navlogo.png" alt="PokeCards Logo"
      /></router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item><router-link to="/"><i class="fas fa-home"></i> Home</router-link></b-nav-item>
        <b-nav-item v-if="user.loggedIn"
          ><router-link to="/cardbox"><i class="fas fa-dice-d6"></i> Card box</router-link></b-nav-item
        >
      </b-navbar-nav>
      <b-navbar-nav class="d-none d-md-block mx-auto">
        <b-nav-item>
          <router-link to="/"
            ><img id="logo" src="@/assets/navlogo.png" alt="PokeCards Logo"
          /></router-link>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item v-if="show"
          ><router-link to="/mycards"><i class="fas fa-box-open"></i> Inventário</router-link></b-nav-item
        >
        <b-nav-item v-if="show"
          ><a @click.prevent="signOut"><i class="fas fa-sign-out-alt"></i> Sair</a></b-nav-item
        >
        <b-nav-item v-if="!show"
          ><router-link to="/auth"><i class="fas fa-sign-in-alt"></i> Entrar</router-link></b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { FirebaseManager } from "../firebase/firebase";
import { mapGetters } from "vuex";

export default {
  name: "Navigation",
  computed: {
    ...mapGetters(["user"]),
    show() {
      return this.user.loggedIn;
    },
  },
  methods: {
    signOut() {
      FirebaseManager.logOutUser((response) => {
        if (response) this.$router.push({ name: "Home" });
      });
    },
  },
};
</script>