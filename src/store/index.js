import Vue from 'vue'
import Vuex from 'vuex'
import {
  collection,
  getDocs,
  //addDoc,
  //setDoc,
  //doc,
  //deleteDoc
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
  },
  mutations: {
    mutaUserEmail: (state, email) => {
      state.userEmail = email;
    },
    mutaCourses:(state,coursesLst)=>{
      state.courses=coursesLst;
    }
  },
  actions: {
    async coursesRequestDb({commit}){
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
    setUserEmail({
      commit
    }, email) {
      commit('mutaUserEmail', email);
    }
  },
  modules: {}
})