// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYV-9CBk0G9noh6K1c9O5_zGtTt6xvFac",
  authDomain: "career-forage.firebaseapp.com",
  projectId: "career-forage",
  storageBucket: "career-forage.firebasestorage.app",
  messagingSenderId: "768358672689",
  appId: "1:768358672689:web:aedd7fd05756de6600e810",
  measurementId: "G-X4R97GSJH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics conditionally (it only works in browser environments)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize Auth and Firestore so they can be exported and used across the app
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
