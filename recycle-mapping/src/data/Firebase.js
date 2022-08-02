import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getStorage } from '@firebase/storage';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDinT6H4eDozS6IAxOm2a9OqIgw0scTzto",
    authDomain: "recycle-mapping-6416c.firebaseapp.com",
    projectId: "recycle-mapping-6416c",
    storageBucket: "recycle-mapping-6416c.appspot.com",
    messagingSenderId: "94628954470",
    appId: "1:94628954470:web:ce71c10a7cf44873bcc8a7",
    measurementId: "G-Z9KMGMQ3NZ"
  };


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

