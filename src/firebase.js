import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNSt146m-TTFIC6Mwf5K1Ctf2diW8EssI",
  authDomain: "codeisles-41f3e.firebaseapp.com",
  projectId: "codeisles-41f3e",
  storageBucket: "codeisles-41f3e.firebasestorage.app",
  messagingSenderId: "672846272263",
  appId: "1:672846272263:web:7cb4470be8baf00e0717a2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);