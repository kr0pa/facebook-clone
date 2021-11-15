import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBA-WPYLo2WkB6qmJNZ1MCaa7RR6hxKlEQ",
  authDomain: "facebook-clone-8bd5b.firebaseapp.com",
  projectId: "facebook-clone-8bd5b",
  storageBucket: "facebook-clone-8bd5b.appspot.com",
  messagingSenderId: "559991692094",
  appId: "1:559991692094:web:9e9e1faa598f932a8caa6f",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { db, storage, app };
