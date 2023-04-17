
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCaUBcF98PZWgYkifVdsK7gK7BQi1eUIA0",
  authDomain: "eshop-10d0f.firebaseapp.com",
  projectId: "eshop-10d0f",
  storageBucket: "eshop-10d0f.appspot.com",
  messagingSenderId: "550391112856",
  appId: "1:550391112856:web:1389e50e73a7964e499ced"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app