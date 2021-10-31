<template>
  <div>
    <Navbar />

    <v-container>
      <h1 class="my-10">Login de Usuario</h1>

      <v-form ref="form" v-model="valid" lazy-validation>

        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'" name="input-password" label="Password" hint="Al menos 6 caracteres"
          :counter="20" @click:append="showPassword = !showPassword">
        </v-text-field>

        <div class="d-flex flex-column flex-sm-row justify-center align-center">
          <v-btn color="success" :disabled="!valid" class="mt-5" @click="validate">Iniciar</v-btn>
          <v-btn color="error" class="mt-5 mx-5" @click="reset">Limpiar Formulario</v-btn>
          <v-btn color="warning" class="mt-5" @click="resetValidation">Limpiar Validación</v-btn>
        </div>

      </v-form>
    </v-container>

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
  import Navbar from '@/components/Navbar.vue'
  import {
    passwordRules,
    emailRules
  } from '@/module/rules.js'
  import {
    getAuth,
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence
  } from "firebase/auth";

  export default {
    name: 'Login',
    components: {
      Navbar,
    },
    data() {
      return {
        valid: true,
        email: '',
        password: '',
        emailRules,
        showPassword: false,
        passwordRules,
        modal: {
          show: false,
          text: '',
        }
      }
    },
    methods: {
      async validate() {
        if (this.$refs.form.validate()) {

          try {
            const auth = getAuth();
            await setPersistence(auth, browserLocalPersistence);
            await signInWithEmailAndPassword(auth, this.email, this.password);
            this.modal.text = '';
            this.modal.show = false;
            this.$store.dispatch('setUserEmail', this.email);
            this.$router.push('/home');
          } catch (error) {
            this.modal.text = error.code;
            this.modal.show = true;
            console.log(`Código de error: ${error.code} - Mensaje: ${error.message}`);
          }
          /*
          signInWithEmailAndPassword(auth, this.email, this.password)
            .then(() => {
              // Signed in
              this.modal.text = '';
              this.modal.show = false;
              this.$store.dispatch('setUserEmail', this.email);
              this.$router.push('/home');
            })
            .catch((error) => {
              this.modal.text = error.code;
              this.modal.show = true;
              console.log(`Código de error: ${error.code} - Mensaje: ${error.message}`);
            });
            */
        } else {
          this.modal.text = 'Debe ingresar email y password validos';
          this.modal.show = true;
        }
      },
      reset() {
        this.$refs.form.reset();
      },
      resetValidation() {
        this.$refs.form.resetValidation();
      },
    },
  }
</script>