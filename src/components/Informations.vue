<template>
  <b-card-body>
    <b-container class="border-shadow p-5" v-show="toggler">
      <b-row>
        <b-col class="text-center" md>
          <h2>Bem vindo ao Pokécards!</h2>
          <img
            src="@/assets/nidorinoVectorByChelagirl.png"
            width="50%"
            alt="Pokémon Nidorino"
          />
        </b-col>
        <b-col md>
          <p>
            Aqui você pode procurar qualquer tipo de card de Pokémon! Busque
            pelo nome ou pelo tipo!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur
            similique quis consequatur maxime quo doloremque modi exercitationem
            architecto dolorem temporibus qui, reiciendis vitae aut est
            excepturi consequuntur porro ullam! Porro!
          </p>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="border-shadow p-5" v-show="!toggler">
      <b-row>
        <b-col md>
          <h2>Contate-nos</h2>
          <p>
            Mande para a gente sua opinião sobre a API e como podemos melhorar!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            nostrum commodi doloribus accusantium quis deserunt dolor
            repudiandae aperiam minus. Consequatur eligendi vel, molestiae eius
            at corporis quasi ut odit reprehenderit.
          </p>
        </b-col>
        <b-col md>
          <b-form>
            <b-form-group
              id="input-name"
              label="Nome:"
              label-for="label-input-name"
            >
              <b-form-input
                id="label-input-name"
                required
                placeholder="Nome"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-email"
              label="Email:"
              label-for="label-input-email"
            >
              <b-form-input
                id="label-input-email"
                type="email"
                required
                placeholder="Email"
              ></b-form-input>
            </b-form-group>

            <b-form-textarea
              id="textarea"
              placeholder="Mensagem"
              rows="3"
              max-rows="3"
              no-resize
            ></b-form-textarea>

            <b-button class="w-100" type="submit" variant="dark">Enviar</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </b-card-body>
</template>

<script>
export default {
    name: 'Informations',
    props: {
        toggler: Boolean,
    }
};
</script>