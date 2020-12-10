<template>
    <b-container id="header" class="vh-90" fluid>
        <b-row class="vh-90 text-center" align-v="center">
            <b-col md>
                <img id="logo" src="@/assets/websiteLogo.png" alt="PokeCards Logo" @click="secret()">
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        secret(){
            console.log('SECRET');
        }
    }
}
</script>