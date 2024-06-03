import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyALt0j7XmjxAAX5-shTrEkWkp-q4D-IWIw",
  authDomain: "chatapp-c4019.firebaseapp.com",
  projectId: "chatapp-c4019",
  storageBucket: "chatapp-c4019.appspot.com",
  messagingSenderId: "436707276466",
  appId: "1:436707276466:web:a902282f29b188b4e73bab"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }