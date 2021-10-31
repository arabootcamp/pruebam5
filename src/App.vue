<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
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
  </v-app>
</template>

<script>
  import {
    getAuth,
    onAuthStateChanged
  } from "firebase/auth";

  export default {
    name: 'App',

    data() {
      return {
        modal: {
          show: false,
          text: ''
        }
      }
    },
    computed: {
      userEmail() {
        return this.$store.getters.getUserEmail;
      }
    },
    created() {
      this.$store.dispatch('coursesRequestDb');
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user && this.userEmail != '') {
          this.modal.text = 'Ingreso correctamente';
          this.modal.show = true;
        } else if (!user && this.userEmail != '') {
          this.modal.text = 'Se deslogeo correctamente';
          this.modal.show = true;
        }
      });
    },
    updated() {
      if (getAuth().currentUser) {
        this.$store.dispatch('setUserEmail', getAuth().currentUser.email);
      }
    }
  };
</script>