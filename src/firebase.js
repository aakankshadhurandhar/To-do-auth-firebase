import firebase from 'firebase/app';
//authentication module
import 'firebase/auth';
import 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyD2rgjteREtntdGgR15EhRhu1rIN6vrQXc",
  authDomain: "photo-gallery-app-b9d09.firebaseapp.com",
  projectId: "photo-gallery-app-b9d09",
  storageBucket: "photo-gallery-app-b9d09.appspot.com",
  messagingSenderId: "604624635043",
  appId: "1:604624635043:web:14f89c8c27e82214476b16"

};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
window.firebase = firebaseApp
const auth = firebase.auth();

export { db, auth};