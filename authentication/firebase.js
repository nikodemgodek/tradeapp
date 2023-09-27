import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMbX6C5u1he1s82csJ5iEKCUz_eOq42Vk",
  authDomain: "fir-auth-98e7b.firebaseapp.com",
  projectId: "fir-auth-98e7b",
  storageBucket: "fir-auth-98e7b.appspot.com",
  messagingSenderId: "77833150809",
  appId: "1:77833150809:web:8f111ca49a58e64ebe6c48"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);