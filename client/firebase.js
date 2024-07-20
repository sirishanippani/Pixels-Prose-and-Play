// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "pixels-proses-play.firebaseapp.com",
  projectId: "pixels-proses-play",
  storageBucket: "pixels-proses-play.appspot.com",
  messagingSenderId: "998679306364",
  appId: "1:998679306364:web:34eea72e6e5dd5761fe9f9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

