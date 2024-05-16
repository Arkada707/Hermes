// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdD8E53aqEl4_vRZVWN3mIpp_GjOY2du4",
  authDomain: "cryptic-orion.firebaseapp.com",
  projectId: "cryptic-orion",
  storageBucket: "cryptic-orion.appspot.com",
  messagingSenderId: "520987741389",
  appId: "1:520987741389:web:bf303aedcf754f91786d84",
  measurementId: "G-QRDM5M0S3W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
