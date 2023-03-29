import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUWL_1sVAdLxJvNlfHH-GRGSNy9Jzwcws",
  authDomain: "blocureid.firebaseapp.com",
  databaseURL:
    "https://blocureid-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blocureid",
  storageBucket: "blocureid.appspot.com",
  messagingSenderId: "1058169563788",
  appId: "1:1058169563788:web:0eb76100f91a8a055f29a9",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { auth, db };
