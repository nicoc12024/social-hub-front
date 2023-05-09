import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWdf4yBDSI44hWjmLV_dZcR0zZk1PLLw8",
  authDomain: "social-f1e79.firebaseapp.com",
  projectId: "social-f1e79",
  storageBucket: "social-f1e79.appspot.com",
  messagingSenderId: "246238907160",
  appId: "1:246238907160:web:36b101551a68aba907ac6d",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
