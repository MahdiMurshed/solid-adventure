// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7gr1vfFaAS2oRXG30JiSNZk21uGpVFao",
  authDomain: "thesis-archieve.firebaseapp.com",
  projectId: "thesis-archieve",
  storageBucket: "thesis-archieve.appspot.com",
  messagingSenderId: "28044444401",
  appId: "1:28044444401:web:0e997b51ed2cff6d0d9f50",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
