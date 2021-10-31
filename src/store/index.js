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

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
  },
  mutations: {
    mutaUserEmail: (state, email) => {
      state.userEmail = email;
    },
    mutaCourses: (state, coursesLst) => {
      state.courses = coursesLst;
    }
  },
  actions: {
    setUserEmail({
      commit
    }, email) {
      commit('mutaUserEmail', email);
    },
    async coursesRequestDb({
      commit
    }) {
      let coursesLst = [];
      const querySnapshot = await getDocs(collection(dbFire, "courses"));
      querySnapshot.forEach((doc) => {
        coursesLst.push({
          key: doc.id,
          ...doc.data()
        });
      });
      commit('mutaCourses', coursesLst);
    },
    async addCoursetDb({
      dispatch
    }, course) {
      await addDoc(collection(dbFire, "courses"), course);
      await dispatch('coursesRequestDb');
    },
    async updateCoursetDb({
      dispatch
    }, payload) {
      let key = payload.key;
      delete payload.key;
      let array = payload.fechaRegistro.split('-');
      let data = JSON.parse(JSON.stringify(payload));
      data.fechaRegistro = new Date(array[2], array[1], array[0])
      await setDoc(doc(dbFire, "courses", key), data);
      await dispatch('coursesRequestDb');
    },
    async deleteCourseDb({
      dispatch
    }, delKey) {
      await deleteDoc(doc(dbFire, "courses", delKey));
      await dispatch('coursesRequestDb');
    },
  },
  modules: {}
})