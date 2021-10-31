<template>
  <div>

    <v-app-bar color="deep-purple" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title class="cursor">Cursos AlfaWeb</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <!--Aparece si el usuario esta logeado-->
      <v-btn text v-if="userEmail!=''" :email="userEmail" @click="logout">
        <span class="mr-2">{{userEmail}}</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!--Barra lateral-->
    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list nav dense>

        <v-list-item :to="{name: 'Home'}" v-if="(userEmail!='')">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{name: 'Administration'}" v-if="(userEmail!='')">
          <v-list-item-icon>
            <v-icon>mdi-wrench</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Administración</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{name: 'Register'}" v-if="!(userEmail!='')">
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Registro</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{name: 'Login'}" v-if="!(userEmail!='')">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!--Modal-->
    <v-dialog max-width="500" v-model="modal.show">
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="deep-purple" dark></v-toolbar>
          <v-card-text>
            <div class="text-h6 pa-12">{{modal.text}}</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn elevation="2" @click="dialog.value = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

  </div>
</template>

<script>
  import {
    getAuth,
    signOut,
  } from "firebase/auth";

  export default {
    name: 'Navbar',
    components: {},
    data() {
      return {
        modal: {
          show: false,
          text: ''
        },
        drawer: false,
      }
    },
    computed: {
      userEmail() {
        return this.$store.getters.getUserEmail;
      }
    },
    methods: {
      logout() {
        console.log(this.userEmail); ////
        const auth = getAuth();
        signOut(auth)
          .then(() => this.$store.dispatch('setUserEmail', ''))
          .then(() => {
            this.$router.push('/')
          })
          .catch((error) => {
            // An error happened.
            console.log(error);
            this.modal.show = "true";
            this.modal.text = error.code;
          });
      }
    }
  }
</script>