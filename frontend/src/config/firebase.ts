// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOPrMcHzF6NJP0tz6bBIEYoPiQefOXu-8",
  authDomain: "abrio-case-online-shop.firebaseapp.com",
  projectId: "abrio-case-online-shop",
  storageBucket: "abrio-case-online-shop.firebasestorage.app",
  messagingSenderId: "53890150969",
  appId: "1:53890150969:web:3422766e567ca4816c93e8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Provide database
export const db = getFirestore(app);
