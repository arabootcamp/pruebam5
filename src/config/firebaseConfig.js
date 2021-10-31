// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1PVAmfQN_yj0y7n8LiegwmoTGGTASx7o",
  authDomain: "pmod5-40698.firebaseapp.com",
  projectId: "pmod5-40698",
  storageBucket: "pmod5-40698.appspot.com",
  messagingSenderId: "753521204801",
  appId: "1:753521204801:web:099f695c324998bd8df0c0"
};

// Initialize Firebase
export const appFire = initializeApp(firebaseConfig);
//BD
export const dbFire = getFirestore(appFire);

//
