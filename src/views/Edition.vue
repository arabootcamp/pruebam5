<template>
  <div>
    <Navbar />
    <v-container class="my-10">

      <h1 class="text-center">Editando el curso: {{course.nombre}}</h1>

      <div v-if="loading" class="text-center my-10">
        <v-progress-circular indeterminate color="purple"></v-progress-circular>
      </div>


      <div v-else class="mt-5">
        <v-form ref="form" v-model="valid" lazy-validation>

          <v-text-field type="text" v-model="course.nombre" :counter="20" :rules="nombreRules" label="Nombre" required>
          </v-text-field>

          <v-text-field type="url" v-model="course.imagen" :rules="urlRules" label="URL de la Imagen del curso"
            required></v-text-field>

          <v-text-field type="number" min="0" v-model="course.cupos" :rules="cuposRules" label="Cupos del curso"
            required></v-text-field>
          <!---->
          <v-text-field type="number" min="0" v-model="course.inscritos" :rules="inscritosRules"
            label="Inscritos en el curso" required>
          </v-text-field>
          <!---->
          <v-text-field type="text" v-model="course.duracion" :rules="duracionRules" label="Duración del curso"
            required></v-text-field>

          <v-text-field type="number" min="0" v-model="course.costo" :rules="costoRules" label="Costo del curso"
            required></v-text-field>

          <v-text-field type="text" v-model="course.codigo" :rules="codigoRules" label="Código del curso" required>
          </v-text-field>

          <v-textarea outlined :rules="descripcionRules" label="Descripción del curso" v-model="course.descripcion">
          </v-textarea>

          <v-text-field v-model="course.fechaRegistro" :rules="fechaRegistroRules" label="Fecha de Registro" required>
          </v-text-field>
          <!---->
          <v-switch v-model="course.estado" :label="course.estado ? 'Terminado: Si' : 'Terminado: No'" color="indigo"
            hide-details @change="setInscritos()"></v-switch>

          <div class="d-flex flex-column flex-sm-row justify-center align-center">
            <v-btn color="success" :disabled="!valid" class="mt-5" @click="validate">Actualizar</v-btn>
            <v-btn color="error" class="mt-5 mx-5" @click="reset">Limpiar Formulario</v-btn>
            <v-btn color="warning" class="mt-5" @click="resetValidation">Limpiar Validación</v-btn>
            <v-btn color="primary" class="ms-5 mt-5" @click="$router.go(-1)">Regresar</v-btn>
          </div>
        </v-form>
      </div>
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
            <v-btn v-if="modal.btnSave" elevation="2" @click="modalConfirm" class="me-4">Confirmar</v-btn>
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
    mapGetters
  } from 'vuex';
  import {
    nombreRules,
    urlRules,
    cuposRules,
    funcInscritosRules,
    duracionRules,
    costoRules,
    codigoRules,
    fechaRegistroRules,
    descripcionRules
  } from '@/module/rules.js'


  export default {
    name: 'Edition',
    components: {
      Navbar
    },
    data() {
      return {
        course: [],
        valid: true,
        modal: {
          show: false,
          text: '',
          btnSave: false,
        },
        nombreRules,
        urlRules,
        cuposRules,
        duracionRules,
        costoRules,
        codigoRules,
        fechaRegistroRules,
        descripcionRules
      }
    },
    props: ['id'],
    computed: {
      ...mapGetters(['getOneCourse', 'getLoading']),
      loading() {
        return this.getLoading;
      },
      inscritosRules() {
        return funcInscritosRules(this.course.cupos);
      },
    },
    mounted() {
      let tmp = this.getOneCourse(this.id);
      this.course = JSON.parse(JSON.stringify(tmp));
      let timeStamp = tmp.fechaRegistro;
      let a = new Date(timeStamp.seconds * 1000);
      let time = new Intl.DateTimeFormat('cl').format(a);
      this.course.fechaRegistro = time;
    },
    methods: {
      setInscritos() {
        if (this.course.estado)
          this.course.inscritos = 0;
      },
      modalCustom(text, btnSave, show) {
        this.modal.text = text;
        this.modal.btnSave = btnSave;
        this.modal.show = show;
      },
      validate() {
        let validation = this.$refs.form.validate();
        if (validation)
          this.modalCustom('Confirme para realizar la actualización del curso', true, true)
        else
          this.modalCustom("Favor revise los campos del formulario y complete según lo requerido", false, true)
      },
      reset() {
        this.$refs.form.reset();
      },
      resetValidation() {
        this.$refs.form.resetValidation()
      },
      modalConfirm() {
        this.modalCustom('', false, false);
        this.$store.dispatch('updateCoursetDb', this.course)
          .then(() => {
            this.modalCustom('Actualización de curso realizada.', false, true)
          })
          .catch((error) => {
            this.modalCustom(error, false, true);
          })
      }
    }
  }
</script>