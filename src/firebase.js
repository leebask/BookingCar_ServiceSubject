import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCvHGdigEzgNsETX92y3_FnDh37gf3VmSs",
    authDomain: "booking-car-964de.firebaseapp.com",
    projectId: "booking-car-964de",
    storageBucket: "booking-car-964de.appspot.com",
    messagingSenderId: "167389914591",
    appId: "1:167389914591:web:8e79766c598826b713906a"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const auth = firebaseApp.auth()

  const db = getFirestore(firebaseApp)

export { auth,db }

