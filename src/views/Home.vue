<template>
  <div>
    <Navbar />
    <h1 class="my-10 text-center">Lista de Cursos</h1>

    <v-container class="mb-5">
      <v-row>
        <v-col cols="12" sm="6" lg="4" v-for="(item,index) in courses" :key="index">
          <v-card width="360" class="mx-auto">
            <v-img height="250px" width="250px" :src="item.imagen" class="mx-auto">
            </v-img>
            <v-card-text class="my-bgGray">
              <div class="font-weight-bold ml-8 mb-2">
                {{item.nombre}}
              </div>
              <div class="font-weight-bold ml-8 mb-2">
                Información
              </div>
              <v-timeline align-top dense>
                <v-timeline-item color="deep-purple lighten-1" small>
                  <div>
                    <div class="font-weight-normal">
                      Costo: <strong>{{ item.costo }}</strong>
                    </div>
                    <div>Duración: {{ item.duracion }}</div>
                  </div>
                </v-timeline-item>
                <v-timeline-item color="green" small>
                  <div>
                    <div class="font-weight-normal">
                      Cupos: <strong>{{ item.cupos }}</strong>
                    </div>
                    <div>Completado: {{ item.estado ? 'Si' : 'No' }}</div>
                  </div>
                </v-timeline-item>
                <v-timeline-item color="deep-purple lighten-1" small>
                  <div>
                    <div class="font-weight-normal">
                      Fecha de Registro:
                    </div>
                    <div>{{item.fechaRegistro | dateFormat}}</div>
                  </div>
                </v-timeline-item>
                <v-timeline-item color="green lighten-1" small>
                  <div>
                    <div class="font-weight-normal">
                      Descripción:
                    </div>
                    <div>{{  item.descripcion }}</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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

  export default {
    name: 'Home',
    components: {
      Navbar
    },
    data() {
      return {
        modal: {
          show: false,
          test: '',
        }
      }
    },
    computed: {
      courses() {
        return this.$store.getters.getCourses;
      },
      email() {
        return this.$store.getters.getUserEmail;
      }
    },
    filters: {
      dateFormat(registerData) {
        return new Intl.DateTimeFormat('cl').format(registerData.toDate());
      },
    },
  }
</script>

<style scoped>
  img {
    max-width: 100%;
  }

  .my-bgGray {
    background-color: rgb(231, 229, 229) !important;
  }
</style>