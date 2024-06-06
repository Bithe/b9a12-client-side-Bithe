// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "zendesk-survey-client.firebaseapp.com",
  projectId: "zendesk-survey-client",
  storageBucket: "zendesk-survey-client.appspot.com",
  messagingSenderId: "588382154927",
  appId: "1:588382154927:web:88361cc01d37a0e1a3a45a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);