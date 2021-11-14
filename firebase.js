import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLzCkzzVz-iouXT1kGXF0-0avRRz2COtU",
  authDomain: "facebook-clone-6cefc.firebaseapp.com",
  projectId: "facebook-clone-6cefc",
  storageBucket: "facebook-clone-6cefc.appspot.com",
  messagingSenderId: "360819561149",
  appId: "1:360819561149:web:fa438daecef4ac83df1dd4",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { db, storage, app };
