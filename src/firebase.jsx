// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmdydnxRysh1rdWjKv3syrLilo_-uoLK4",
  authDomain: "sci-games.firebaseapp.com",
  projectId: "sci-games",
  storageBucket: "sci-games.appspot.com",
  messagingSenderId: "456688182075",
  appId: "1:456688182075:web:dabbf336031be629b80d1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export default app;
