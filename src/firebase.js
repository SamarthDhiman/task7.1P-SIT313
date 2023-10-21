// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_1fWSyFKg1uUBiTmoEljSL2aoMw1rZdA",
  authDomain: "fir-auth-c4875.firebaseapp.com",
  projectId: "fir-auth-c4875",
  storageBucket: "fir-auth-c4875.appspot.com",
  messagingSenderId: "469513839989",
  appId: "1:469513839989:web:30e873ec15eac8c92c1f3c",
  measurementId: "G-F3R258R3BR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();



export { app, analytics, auth, db };

