<template>
  <b-card no-body>
    <b-card-header id="info-nav" header-tag="nav">
      <b-nav card-header pills>
        <b-nav-item @click="toggler = true">Logar</b-nav-item>
        <b-nav-item @click="toggler = false">Registrar</b-nav-item>
      </b-nav>
    </b-card-header>
    <div v-show="toggler">
      <Login />
    </div>
    <div v-show="!toggler">
      <Register />
    </div>
  </b-card>
</template>

<script>
import Login from "../components/Login"
import Register from "../components/Register"

export default {
  name: "Logar",
  data() {
    return {
      toggler: true,
    };
  },
  components: {
    Login,
    Register,
  },
};
</script>