<template>
  <div>
    <Navbar />

    <v-container class="my-10">
      <div class="d-flex flex-column flex-sm-row justify-center align-center mb-5">
        <h1 class="text-center">Administración</h1>
        <v-btn elevation="2" color="primary" class="mt-3 ms-0 mt-sm-0 ms-sm-5" @click="showModalAddItem">AGREGAR CURSO
        </v-btn>
      </div>
      <!--Tabla de cursos-->
      <v-data-table :headers="headers" :items="getCourses" :items-per-page="10" class="elevation-1">

        <template v-slot:item.costo="{ item }">
          <v-chip color="green" dark>
            {{ item.costo | numberFormat}}
          </v-chip>
        </template>

        <template v-slot:item.fechaRegistro="{ item }">
          <v-chip color="green" dark>
            {{ item.fechaRegistro | dateFormat }}
          </v-chip>
        </template>

        <template v-slot:item.estado="{ item }">
          <v-chip :color="item.estado ? 'blue lighten-1' : 'brown lighten-3'" dark>
            {{ item.estado ? 'Si' : 'No'}}
          </v-chip>
        </template>

        <template v-slot:item.acciones="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>

      <!--Detalles de Cursos-->
      <div class="mt-5">
        <v-alert color="purple" dense elevation="1" icon="mdi-account-group" outlined>
          Cantidad total de alumnos permitidos: <strong>{{getCupos}}</strong> alumnos.
        </v-alert>
        <v-alert color="blue" dense elevation="1" icon="mdi-account-multiple-check" outlined>
          Cantidad total de alumnos inscritos: <strong>{{getInscritos}}</strong> alumnos.
        </v-alert>
        <v-alert color="red" dense elevation="1" icon="mdi-account-clock" outlined>
          Cantidad total de cupos restantes: <strong>{{getDiffCuposInscritos}}</strong> alumnos.
        </v-alert>
        <v-alert color="pink" dense elevation="1" icon="mdi-block-helper" outlined>
          Cantidad total de cursos terminados: <strong>{{getEstadoTrue}}</strong> cursos.
        </v-alert>
        <v-alert color="brown" dense elevation="1" icon="mdi-bell-ring" outlined>
          Cantidad total de cursos activos: <strong>{{getActive}}</strong> cursos.
        </v-alert>
        <v-alert color="deep-orange" dense elevation="1" icon="mdi-bell-ring" outlined>
          Cantidad total de cursos: <strong>{{getTotalCourses}}</strong> cursos.
        </v-alert>
      </div>
    </v-container>

    <!--Dialog para añadir curso-->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-toolbar color="deep-purple" dark>
          <v-spacer></v-spacer>
          <v-btn text @click="closeAddItem">
            Cerrar
          </v-btn>
        </v-toolbar>
        <v-card-title>
          <span class="headline">Agregando Curso</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>

              <v-text-field type="text" v-model="addItem.nombre" :counter="40" :rules="nombreRules" label="Nombre"
                required>
              </v-text-field>

              <v-text-field type="url" v-model="addItem.imagen" :rules="urlRules" label="URL de la Imagen del curso"
                required>
              </v-text-field>

              <v-text-field type="number" min="0" v-model="addItem.cupos" :rules="cuposRules" label="Cupos del curso"
                required>
              </v-text-field>

              <v-text-field type="number" min="0" v-model="addItem.inscritos" :rules="inscritosRules"
                label="Inscritos en el curso" required></v-text-field>

              <v-text-field type="text" v-model="addItem.duracion" :rules="duracionRules" label="Duración del curso"
                required></v-text-field>

              <v-text-field type="number" min="0" v-model="addItem.costo" :rules="costoRules" label="Costo del curso"
                required>
              </v-text-field>

              <v-text-field type="text" v-model="addItem.codigo" :rules="codigoRules" label="Código del curso" required>
              </v-text-field>

              <v-textarea outlined :rules="descripcionRules" label="Descripción del curso" v-model="addItem.descripcion"
                rows="5">
              </v-textarea>


              <div class="d-flex flex-column flex-sm-row justify-center align-center">
                <v-btn color="success" :disabled="!valid" class="mt-5" @click="validate">Agregar</v-btn>
                <v-btn color="error" class="mt-5 mx-5" @click="reset">Limpiar Formulario</v-btn>
                <v-btn color="warning" class="mt-5" @click="resetValidation">Limpiar Validación</v-btn>
              </div>

            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!--Dialog para eliminar curso-->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-toolbar color="deep-purple" dark></v-toolbar>
        <v-card-text class="text-h6 pa-12">Estas seguro de eliminar el item: {{delItem.nombre}}?</v-card-text>
        <v-card-actions class="justify-end">
          <v-spacer></v-spacer>
          <v-btn elevation="2" class="me-4" @click="deleteItemConfirm">Confirmar</v-btn>
          <v-btn elevation="2" @click="closeDelete">Cerrar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--Modal Custom-->
    <v-dialog max-width="500" v-model="modal.show">
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="deep-purple" dark></v-toolbar>
          <v-card-text>
            <div class="text-h6 pa-12">{{modal.text}}</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn v-if="modal.btnSave" elevation="2" @click="saveAddItem" class="me-4">Confirmar</v-btn>
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
  } from 'vuex'
  import {
    nombreRules,
    urlRules,
    cuposRules,
    funcInscritosRules,
    duracionRules,
    costoRules,
    codigoRules,
    descripcionRules
  } from '@/module/rules.js'

  export default {
    name: 'Administration',
    components: {
      Navbar
    },
    data() {
      return {
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
        descripcionRules,
        dialog: false,
        dialogDelete: false,
        delItem: {
          key: '',
          nombre: ''
        },
        addItem: {
          nombre: '',
          imagen: '',
          cupos: 0,
          inscritos: 0,
          costo: 0,
          duracion: '',
          codigo: '',
          descripcion: '',
          fechaRegistro: new Date(),
          estado: false,
        },
        headers: [{
            text: 'Curso',
            align: 'start',
            sortable: true,
            value: 'nombre',
          },
          {
            text: 'Cupos',
            align: 'start',
            sortable: true,
            value: 'cupos',
          },
          {
            text: 'Inscritos',
            align: 'start',
            sortable: true,
            value: 'inscritos',
          },
          {
            text: 'Duración',
            align: 'start',
            sortable: true,
            value: 'duracion',
          },
          {
            text: 'Costo',
            align: 'start',
            sortable: true,
            value: 'costo',
          },
          {
            text: 'Terminado',
            align: 'start',
            sortable: true,
            value: 'estado',
          },
          {
            text: 'Fecha',
            align: 'start',
            sortable: true,
            value: 'fechaRegistro',
          },
          {
            text: 'Acciones',
            align: 'start',
            sortable: true,
            value: 'acciones',
          },
        ]
      }
    },
    computed: {
      ...mapGetters([
        'getCourses',
        'getCupos',
        'getInscritos',
        'getDiffCuposInscritos',
        'getEstadoTrue',
        'getActive',
        'getTotalCourses'
      ]),
      inscritosRules() {
        return funcInscritosRules(this.addItem.cupos);
      },
    },
    filters: {
      dateFormat(timeStamp) {
        let a = new Date(timeStamp.seconds * 1000);
        let time = new Intl.DateTimeFormat('cl').format(a);
        return time;
      },
      numberFormat(number) {
        return new Intl.NumberFormat('cl', {
          style: 'currency',
          currency: 'CLP'
        }).format(number);
      },
    },
    methods: {
      modalCustom(text, btnSave, show) {
        this.modal.text = text;
        this.modal.btnSave = btnSave;
        this.modal.show = show;
      },
      editItem(item) {
        this.$router.push({
          name: 'Edition',
          params: {
            id: item.key
          }
        });
      },
      deleteItem(item) {
        //modal de confirmación
        this.dialogDelete = true;
        this.delItem.key = item.key;
        this.delItem.nombre = item.nombre;
      },
      resetDelItem() {
        this.delItem.key = '';
        this.delItem.nombre = '';
      },
      closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.resetDelItem();
        });
      },
      deleteItemConfirm() {
        this.closeDelete();
        this.$store.dispatch('deleteCourseDb', this.delItem.key)
          .then(() => {
            this.modalCustom('Se elimino el curso a la BD', false, true)
          })
          .catch((error) => {
            this.modalCustom(error, false, true)
          })
      },
      resetAddItem() {
        this.addItem.nombre = '';
        this.addItem.imagen = '';
        this.addItem.cupos = 0;
        this.addItem.inscritos = 0;
        this.addItem.costo = 0;
        this.addItem.duracion = '';
        this.addItem.codigo = '';
        this.addItem.descripcion = '';
        this.addItem.fechaRegistro = new Date();
        this.addItem.estado = false;
      },
      showModalAddItem() {
        this.resetAddItem();
        this.valid = true;
        this.dialog = true;
        this.$nextTick(() => {
          if (this.$refs.form) {
            this.$refs.form.reset();
          }
        });
      },
      saveAddItem() {
        let tmp;
        tmp = parseInt(this.addItem.cupos);
        this.addItem.cupos = tmp;
        tmp = parseInt(this.addItem.inscritos);
        this.addItem.inscritos = tmp;
        tmp = parseInt(this.addItem.costo);
        this.addItem.costo = tmp;

        this.modalCustom('', false, false);
        this.dialog = false;
        this.valid = true;
        this.$store.dispatch('addCoursetDb', this.addItem)
          .then(() => {
            this.modalCustom('Se ingreso el curso a la BD', false, true);
          })
          .catch((error) => {
            this.modalCustom(error, false, true)
          })
      },
      closeAddItem() {
        this.$nextTick(() => {
          this.reset();
        });
        this.dialog = false;
      },
      validate() {
        if (this.$refs.form.validate())
          this.modalCustom('¿Esta seguro de añadir este curso?', true, true);
        else
          this.modalCustom('Debe completar correctamente todos los campos', false, true);
      },
      reset() {
        this.$refs.form.reset();
      },
      resetValidation() {
        this.$refs.form.resetValidation();
      },
    }
  }
</script>

<style scoped>

</style>