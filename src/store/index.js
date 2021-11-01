import Vue from 'vue'
import Vuex from 'vuex'
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import {
  dbFire
} from '@/config/firebaseConfig.js'
import VuexPersist from 'vuex-persist'

const vuexLocal = new VuexPersist({
  storage: window.sessionStorage
});


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    preLogin: false,
    userEmail: '',
    courses: []
  },
  getters: {
    getUserEmail: state => state.userEmail,
    getCourses: state => state.courses,
    getCupos: (state, getters) => {
      let sum = 0;
      getters.getCourses.forEach(el => {
        sum = sum + el.cupos;
      });
      return sum;
    },
    getInscritos: (state, getters) => {
      let sum = 0;
      getters.getCourses.forEach(el => {
        sum = sum + el.inscritos;
      });
      return sum;
    },
    getDiffCuposInscritos: (state, getters) => (getters.getCupos - getters.getInscritos),
    getEstadoTrue: (state, getters) => {
      let sum = 0;
      getters.getCourses.forEach(el => {
        if (el.estado)
          sum++;
      });
      return sum;
    },
    getActive: (state, getters) => {
      let sum = 0;
      getters.getCourses.forEach(el => {
        if (!el.estado)
          sum++;
      });
      return sum;
    },
    getTotalCourses: state => state.courses.length,
    getOneCourse: (state) => (id) => {
      for (let i = 0; i < state.courses.length; i++) {
        if (state.courses[i].key == id) {
          return state.courses[i];
        }
      }
      return {};
    },
    getPreLogin: state => state.preLogin,
    getLoading: state => state.loading,
  },
  mutations: {
    mutaUserEmail: (state, data) => {
      state.userEmail = data;
    },
    mutaCourses: (state, coursesLst) => {
      state.courses = coursesLst;
    },
    mutaPreLogin: (state, bool) => {
      state.preLogin = bool
    },
    mutaLoading: (state, bool) => {
      state.loading = bool
    }
  },
  actions: {
    setUserEmail({
      commit
    }, data) {
      commit('mutaUserEmail', data);
    },
    async coursesRequestDb({
      commit
    }) {
      commit('mutaLoading', true);
      let coursesLst = [];
      const querySnapshot = await getDocs(collection(dbFire, "courses"));
      querySnapshot.forEach((doc) => {
        coursesLst.push({
          key: doc.id,
          ...doc.data()
        });
      });
      commit('mutaCourses', coursesLst);
      commit('mutaLoading', false);
    },
    async addCoursetDb({
      commit,
      dispatch
    }, course) {
      commit('mutaLoading', true);
      await addDoc(collection(dbFire, "courses"), course);
      await dispatch('coursesRequestDb');
      commit('mutaLoading', false);
    },
    async updateCoursetDb({
      commit,dispatch
    }, payload) {
       commit('mutaLoading',true);
      let key = payload.key;
      delete payload.key;
      let array = payload.fechaRegistro.split('-');
      let data = JSON.parse(JSON.stringify(payload));
      data.fechaRegistro = new Date(array[2], array[1], array[0])
      await setDoc(doc(dbFire, "courses", key), data);
      await dispatch('coursesRequestDb');
       commit('mutaLoading',false);
    },
    async deleteCourseDb({
      commit,dispatch
    }, delKey) {
       commit('mutaLoading',true);
      await deleteDoc(doc(dbFire, "courses", delKey));
      await dispatch('coursesRequestDb');
       commit('mutaLoading',false);
    },
    setPreLogin({
      commit
    }, bool) {
      commit('mutaPreLogin', bool);
    }
  },
  modules: {},
  plugins: [vuexLocal.plugin]
})