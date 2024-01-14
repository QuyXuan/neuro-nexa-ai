import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUtQkDOz8y30m5ca5j5K0OGebjE1X2ZOo",
  authDomain: "neuro-nexa.firebaseapp.com",
  projectId: "neuro-nexa",
  storageBucket: "neuro-nexa.appspot.com",
  messagingSenderId: "193963200150",
  appId: "1:193963200150:web:181f689314be70c3773cb7",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
